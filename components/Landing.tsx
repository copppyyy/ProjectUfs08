import React from 'react';
import { ArrowRight, Server, ShieldCheck, Users, Terminal, Cpu, Network, Database, LineChart, Building2, TrendingUp, CheckCircle2 } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  
  const scrollToCases = () => {
    const section = document.getElementById('casi-studio');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section - Clean Corporate Style */}
      <div className="min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden bg-white">
        
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:6rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        
        <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center pt-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-50 border border-brand-100 text-brand-700 mb-8 animate-fade-in shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
            </span>
            <span className="text-sm font-semibold tracking-wide">Network Attivo: +150 Sistemisti Disponibili</span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
            Innovazione IT <br/>
            <span className="text-brand-700">senza interruzioni.</span>
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            La piattaforma B2B che connette le aziende italiane con i migliori talenti IT freelance. 
            Modernizziamo la tua infrastruttura legacy affiancando i tuoi team storici.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-700 text-white hover:bg-brand-800 rounded-lg font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Inizia la Trasformazione
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={scrollToCases}
              className="w-full sm:w-auto px-8 py-4 rounded-lg border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-semibold transition-all shadow-sm"
            >
              Scopri i casi studio
            </button>
          </div>

          {/* Stats - Corporate Look */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-10 border-t border-slate-200 w-full max-w-5xl">
             <div>
                <div className="text-4xl font-bold text-slate-900 mb-1">98%</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Successo Migrazioni</div>
             </div>
             <div>
                <div className="text-4xl font-bold text-slate-900 mb-1">-40%</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Costi Operativi</div>
             </div>
             <div>
                <div className="text-4xl font-bold text-slate-900 mb-1">24h</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Risposta Team</div>
             </div>
             <div>
                <div className="text-4xl font-bold text-slate-900 mb-1">500+</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Ore Formazione</div>
             </div>
          </div>
        </div>
      </div>

      {/* Case Studies Section - Real Images */}
      <section id="casi-studio" className="py-24 bg-slate-50 relative">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                   <span className="text-brand-700 font-bold tracking-wider uppercase text-sm mb-2 block">Casi di Successo</span>
                   <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Risultati concreti.</h2>
                </div>
                <p className="text-slate-600 max-w-md text-lg">
                   Ecco come abbiamo aiutato aziende tradizionali a colmare il gap tecnologico.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Case Study 1 */}
               <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="h-48 overflow-hidden relative">
                     <img 
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800" 
                        alt="Logistica" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                     <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 font-semibold">
                            <Building2 className="w-5 h-5" /> Logistica Veneta S.p.A.
                        </div>
                     </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                     <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">
                        Da AS/400 al Cloud Ibrido
                     </h3>
                     <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1">
                        Modernizzazione del gestionale di magazzino mantenendo i dati storici on-premise ma esponendo API sicure per i palmari moderni.
                     </p>
                     <div className="border-t border-slate-100 pt-4 mt-auto">
                        <div className="flex items-center gap-2 mb-2">
                           <TrendingUp className="w-4 h-4 text-green-600" />
                           <span className="text-slate-700 font-semibold text-sm">+30% Efficienza Picking</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <LineChart className="w-4 h-4 text-brand-600" />
                           <span className="text-slate-500 text-sm">ROI in 6 mesi</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Case Study 2 */}
               <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="h-48 overflow-hidden relative">
                     <img 
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
                        alt="Ufficio Legale" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                     <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 font-semibold">
                            <Users className="w-5 h-5" /> Studio Legale Associato
                        </div>
                     </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                     <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">
                        Sicurezza e Smart Working
                     </h3>
                     <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1">
                        Implementazione VPN sicura, migrazione archivi cartacei su Cloud criptato e formazione cybersecurity per 25 avvocati.
                     </p>
                     <div className="border-t border-slate-100 pt-4 mt-auto">
                        <div className="flex items-center gap-2 mb-2">
                           <ShieldCheck className="w-4 h-4 text-green-600" />
                           <span className="text-slate-700 font-semibold text-sm">Zero Data Breach</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <CheckCircle2 className="w-4 h-4 text-brand-600" />
                           <span className="text-slate-500 text-sm">Lavoro remoto 100%</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Case Study 3 */}
               <div className="group bg-white rounded-xl overflow-hidden border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="h-48 overflow-hidden relative">
                     <img 
                        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" 
                        alt="Manifattura" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                     <div className="absolute bottom-4 left-4 text-white">
                        <div className="flex items-center gap-2 font-semibold">
                            <Cpu className="w-5 h-5" /> Manifattura Meccanica
                        </div>
                     </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                     <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">
                        IoT su Macchinari Legacy
                     </h3>
                     <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-1">
                        Interfacciamento di presse anni '90 con sensori moderni per manutenzione predittiva senza sostituire i macchinari.
                     </p>
                     <div className="border-t border-slate-100 pt-4 mt-auto">
                        <div className="flex items-center gap-2 mb-2">
                           <TrendingUp className="w-4 h-4 text-green-600" />
                           <span className="text-slate-700 font-semibold text-sm">-60% Fermi Macchina</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Database className="w-4 h-4 text-brand-600" />
                           <span className="text-slate-500 text-sm">Dashboard Real-time</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Network Showcase - Clean & Tech */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Competenze Certificate</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Il nostro team copre ogni aspetto dell'IT moderno, garantendo compatibilità con il passato.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
               { icon: Server, color: "text-blue-600", bg: "bg-blue-50", title: "Windows Server", count: "15+" },
               { icon: Terminal, color: "text-orange-600", bg: "bg-orange-50", title: "Linux DevOps", count: "24+" },
               { icon: Network, color: "text-purple-600", bg: "bg-purple-50", title: "Networking", count: "10+" },
               { icon: Cpu, color: "text-cyan-600", bg: "bg-cyan-50", title: "Cloud Arch.", count: "8+" }
            ].map((item, idx) => (
                <div key={idx} className="p-6 rounded-xl bg-white border border-slate-200 hover:border-brand-300 hover:shadow-lg transition-all flex flex-col items-center text-center group">
                    <div className={`p-4 rounded-full ${item.bg} mb-4 group-hover:scale-110 transition-transform`}>
                         <item.icon className={`w-8 h-8 ${item.color}`} />
                    </div>
                    <h3 className="text-slate-900 font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.count} Esperti</p>
                </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Bar - Professional Logos (Dark Gray) */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-10">Collaboriamo con</p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Accenture Logo (Text based style representation) */}
                <div className="h-8 flex items-center">
                   <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="h-8 md:h-9" />
                </div>
                
                {/* Generic Tech Company */}
                <div className="h-8 flex items-center">
                   <svg viewBox="0 0 100 30" className="h-8 md:h-10 fill-slate-700">
                      <path d="M10,15 L20,5 L30,15 L20,25 Z M40,5 H50 V25 H40 Z M60,5 H80 V10 H65 V12 H75 V17 H65 V25 H60 Z" />
                   </svg>
                   <span className="ml-2 font-bold text-xl text-slate-700">NEXUS</span>
                </div>

                {/* Generic Logistics */}
                <div className="h-8 flex items-center">
                   <Building2 className="w-8 h-8 md:w-9 md:h-9 text-slate-700 mr-2" />
                   <span className="font-bold text-xl text-slate-700">LOGISTICA<span className="font-light">IT</span></span>
                </div>

                {/* Generic Manufacturing */}
                <div className="h-8 flex items-center">
                   <div className="border-2 border-slate-700 p-1 mr-2 rounded">
                      <Cpu className="w-6 h-6 md:w-7 md:h-7 text-slate-700" />
                   </div>
                   <span className="font-bold text-xl text-slate-700">MECH<span className="text-brand-700">IND</span></span>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};
