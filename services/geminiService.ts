import { GoogleGenAI, Type } from "@google/genai";
import { QuoteProposal, Consultant } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Data pools for random generation
const firstNames = ["Marco", "Giulia", "Alessandro", "Francesca", "Luca", "Sofia", "Matteo", "Chiara", "Davide", "Elena", "Lorenzo", "Sara", "Simone", "Valentina"];
const lastNames = ["Rossi", "Bianchi", "Ferrari", "Esposito", "Ricci", "Marino", "Greco", "Bruno", "Gallo", "Conti", "De Luca", "Costa", "Rizzo", "Lombardi"];
const roles = [
    { title: "Cloud Architect Junior", spec: "AWS & Kubernetes", bio: "Specializzato nella migrazione 'gentile' da server fisici a cloud ibrido." },
    { title: "Cybersecurity Analyst", spec: "Network Hardening", bio: "Esperta nel mettere in sicurezza reti legacy senza interrompere i servizi." },
    { title: "DevOps Engineer", spec: "CI/CD & Docker", bio: "Focalizzato sull'automazione dei processi di sviluppo e containerizzazione." },
    { title: "System Admin Linux", spec: "RedHat & Debian", bio: "Gestione avanzata di server Linux e ottimizzazione delle performance." },
    { title: "Network Specialist", spec: "Cisco & Routing", bio: "Progettazione di reti aziendali sicure e VPN ad alte prestazioni." },
    { title: "Full Stack Developer", spec: "React & Node.js", bio: "Sviluppo di interfacce moderne per vecchi gestionali (Legacy Modernization)." }
];

const getRandomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

const generateRandomTeam = (): Consultant[] => {
    const teamSize = Math.random() > 0.5 ? 2 : 3; // 2 or 3 consultants
    const team: Consultant[] = [];
    const usedIndices = new Set<number>();

    while (team.length < teamSize) {
        const roleIdx = Math.floor(Math.random() * roles.length);
        if (!usedIndices.has(roleIdx)) {
            usedIndices.add(roleIdx);
            const roleData = roles[roleIdx];
            team.push({
                name: `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`,
                role: roleData.title,
                specialization: roleData.spec,
                bio: roleData.bio,
                experienceYears: Math.floor(Math.random() * 4) + 2 // 2 to 5 years
            });
        }
    }
    return team;
};

export const generateSmartQuote = async (
  companyName: string,
  infrastructureDescription: string
): Promise<QuoteProposal> => {
  
  if (!process.env.API_KEY) {
    console.warn("No API_KEY found. Returning mock data.");
    return mockQuoteResponse(companyName);
  }

  try {
    const prompt = `
      Sei l'intelligenza artificiale di ITISSUE, un servizio che modernizza reparti IT obsoleti inviando giovani sistemisti esperti.
      
      Analizza la seguente richiesta di un cliente.
      Nome Azienda: ${companyName}
      Descrizione Infrastruttura attuale: ${infrastructureDescription}
      
      Genera una proposta strutturata in formato JSON che includa:
      1. Un'analisi empatica e tecnica della situazione attuale.
      2. Una strategia di intervento che valorizza il personale esistente ma introduce novità.
      3. Una lista di 2-3 profili di "Giovani Sistemisti" ideali per questo lavoro (nomi fittizi ma competenze reali e diverse).
      4. Una lista di servizi specifici da attuare.
      5. Una stima dei costi e dei tempi.
      
      Rispondi ESCLUSIVAMENTE con il JSON conforme allo schema richiesto.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            companyAnalysis: { type: Type.STRING },
            suggestedStrategy: { type: Type.STRING },
            totalEstimate: { type: Type.STRING },
            timeline: { type: Type.STRING },
            team: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  specialization: { type: Type.STRING },
                  bio: { type: Type.STRING },
                  experienceYears: { type: Type.NUMBER },
                }
              }
            },
            services: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  estimatedHours: { type: Type.NUMBER },
                }
              }
            }
          }
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as QuoteProposal;
    }
    throw new Error("Empty response from AI");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return mockQuoteResponse(companyName);
  }
};

export const sendChatToSalesAI = async (
    history: {role: 'user' | 'ai', content: string}[],
    newMessage: string,
    proposalContext: QuoteProposal
): Promise<string> => {
    
    if (!process.env.API_KEY) {
        return "Sono un'AI dimostrativa (API Key mancante). Posso dirti che la tua strategia " + proposalContext.suggestedStrategy.substring(0, 20) + "... è ottima!";
    }

    try {
        const systemInstruction = `
            Sei l'assistente virtuale commerciale di ITISSUE. Stai parlando con un cliente che ha appena ricevuto un preventivo.
            
            DETTAGLI PREVENTIVO ATTUALE:
            Analisi: ${proposalContext.companyAnalysis}
            Strategia: ${proposalContext.suggestedStrategy}
            Costo Stimato: ${proposalContext.totalEstimate}
            Tempistiche: ${proposalContext.timeline}
            
            Il tuo obiettivo è rassicurare il cliente, spiegare i dettagli tecnici in modo semplice e difendere il valore della proposta.
            Sii professionale, cortese e conciso (max 3 frasi per risposta).
            Se il cliente chiede sconti, spiega che il prezzo riflette la qualità dei senior + junior.
            Non inventare nuovi prezzi.
        `;

        const contents = [
            ...history.map(msg => ({
                role: msg.role === 'ai' ? 'model' : 'user',
                parts: [{ text: msg.content }]
            })),
            { role: 'user', parts: [{ text: newMessage }] }
        ];

        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: contents,
            config: {
                systemInstruction: systemInstruction
            }
        });

        return response.text || "Mi scuso, non ho capito. Può ripetere?";

    } catch (e) {
        console.error("Chat Error", e);
        return "Al momento i nostri sistemi sono sovraccarichi. Riprova tra poco.";
    }
};

// Fallback mock data if API fails or is missing
const mockQuoteResponse = (companyName: string): QuoteProposal => ({
  id: `PREV-${Math.floor(Math.random() * 8999) + 1000}`,
  companyAnalysis: `Abbiamo analizzato la struttura di ${companyName}. Notiamo una forte dipendenza da sistemi legacy on-premise che, sebbene stabili, rallentano l'innovazione.`,
  suggestedStrategy: "Proponiamo un approccio ibrido: mantenere il core business sui sistemi attuali mentre migriamo i servizi collaborativi su cloud, affiancando i vostri tecnici senior con i nostri specialisti DevOps.",
  totalEstimate: "€ 4.500 - € 6.000 (Fase Iniziale)",
  timeline: "3 Settimane",
  team: generateRandomTeam(),
  services: [
    {
      title: "Audit Infrastrutturale",
      description: "Mappatura completa hardware e software esistente.",
      estimatedHours: 16
    },
    {
      title: "Formazione Team Interno",
      description: "Workshop su Docker e metodologie Agile per il vostro staff.",
      estimatedHours: 10
    }
  ]
});