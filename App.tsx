import React, { useState, useRef, useEffect } from 'react';
import { User, AppView, QuoteProposal, SupportRequest, ChatMessage } from './types';
import { generateSmartQuote, sendChatToSalesAI } from './services/geminiService';
import { Landing } from './components/Landing';
import { AuthForm } from './components/AuthForm';
import { ProposalView } from './components/ProposalView';
import { ProfileView } from './components/ProfileView';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { Loader2, MessageSquare, Terminal, X, Send, Wrench, UserPlus, Headset, Lock, ChevronRight } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<AppView>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [infrastructureText, setInfrastructureText] = useState('');
  const [proposal, setProposal] = useState<QuoteProposal | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for the "Discuss Details" (AI Chat) modal
  const [showContactModal, setShowContactModal] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatTyping, setIsChatTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // State for "Technical Support" modal
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');

  // --- ADMIN / GOD MODE STATES ---
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    setView('request');
  };

  const handleRequestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    setView('processing');

    try {
      const result = await generateSmartQuote(user.companyName, infrastructureText);
      // Add current request to user history (mock)
      const updatedUser = { 
        ...user, 
        requests: [ { ...result, status: 'pending', createdAt: new Date().toLocaleDateString() } as any ] 
      };
      setUser(updatedUser);
      setProposal(result);
      setView('proposal');
    } catch (err) {
      console.error(err);
      setView('request');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    // Update the latest request status to 'reviewing' so it appears as "Analisi" in Profile
    if (user && user.requests && user.requests.length > 0) {
        const updatedRequests = [...user.requests];
        updatedRequests[0].status = 'reviewing'; // Changed from 'scheduled' to 'reviewing'
        setUser({...user, requests: updatedRequests});
    }
    setView('success');
  };

  const handleLogoClick = () => {
    setView('landing');
  };

  const handleProfileClick = () => {
    if (user) setView('profile');
  };

  // --- ADMIN LOGIC ---
  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminUser === 'admin' && adminPass === '1234') {
        setIsAdminLoggedIn(true);
        // Don't close modal, show controls
    } else {
        alert("Credenziali Errate");
    }
  };

  const simulateTimePassage = () => {
      if (!user) {
          alert("Nessun utente loggato su cui applicare le modifiche.");
          return;
      }
      
      let statusChanged = false;

      setUser(prevUser => {
          if (!prevUser) return null;
          
          // 1. Advance Project Requests
          const updatedRequests = prevUser.requests?.map(req => {
              let newStatus = req.status;
              
              // Strict linear progression: Pending -> Reviewing -> Scheduled -> Accepted
              if (req.status === 'pending') {
                  newStatus = 'reviewing';
                  statusChanged = true;
              } else if (req.status === 'reviewing') {
                  newStatus = 'scheduled';
                  statusChanged = true;
              } else if (req.status === 'scheduled') {
                  newStatus = 'accepted';
                  statusChanged = true;
              }
              // If already accepted, do nothing
              
              return { ...req, status: newStatus };
          });

          // 2. Advance Support Tickets
          const updatedTickets = prevUser.supportTickets?.map(ticket => {
              let newStatus = ticket.status;
              let newMessage = ticket.message;

              // Cycle: pending -> reviewing -> resolved
              if (ticket.status === 'pending') {
                  newStatus = 'reviewing';
              } else if (ticket.status === 'reviewing') {
                  newStatus = 'resolved';
                  // Append a simulated response to the message for visual feedback
                  if (!ticket.message.includes("RISPOSTA:")) {
                      if (ticket.type === 'human_request') {
                          newMessage = ticket.message + " // RISPOSTA STAFF: Colloquio fissato per domani alle 10:00.";
                      } else {
                          newMessage = ticket.message + " // RISPOSTA STAFF: Problema analizzato e risolto dal team tecnico.";
                      }
                  }
              }
              
              return { ...ticket, status: newStatus, message: newMessage };
          });

          return { 
              ...prevUser, 
              requests: updatedRequests, 
              supportTickets: updatedTickets 
          };
      });

      if (statusChanged) {
          alert("Tempo avanzato con successo! Stato del progetto aggiornato.");
      } else {
          alert("Tempo avanzato. (Nessun progetto in attesa di aggiornamento stato)");
      }
  };
  // --- END ADMIN LOGIC ---


  // --- Chat Logic ---

  const openChatModal = () => {
      if(chatMessages.length === 0) {
          setChatMessages([{
              role: 'ai',
              content: `Salve! Sono l'assistente virtuale di ITISSUE. Come posso aiutarla riguardo al preventivo per ${user?.companyName}?`
          }]);
      }
      setShowContactModal(true);
  };

  const handleSendChatMessage = async () => {
      if (!chatInput.trim() || !proposal) return;

      const newUserMsg: ChatMessage = { role: 'user', content: chatInput };
      const updatedHistory = [...chatMessages, newUserMsg];
      
      setChatMessages(updatedHistory);
      setChatInput('');
      setIsChatTyping(true);

      try {
          // Call AI Service
          const aiResponseText = await sendChatToSalesAI(updatedHistory, chatInput, proposal);
          
          setChatMessages(prev => [...prev, { role: 'ai', content: aiResponseText }]);
      } catch (error) {
          setChatMessages(prev => [...prev, { role: 'ai', content: "Mi dispiace, ho avuto un problema tecnico. Riprova più tardi." }]);
      } finally {
          setIsChatTyping(false);
      }
  };

  const handleRequestHumanConsultant = () => {
    if (!user) return;

    // Create a specific "Human Request" ticket
    const newTicket: SupportRequest = {
      id: `HUM-${Math.floor(Math.random() * 10000)}`,
      message: "Richiesta colloquio con consulente umano avviata dalla chat.",
      status: 'reviewing', // Will be displayed as "In Visione" or similar
      createdAt: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString().slice(0,5),
      type: 'human_request'
    };

    const updatedUser = {
      ...user,
      supportTickets: [newTicket, ...(user.supportTickets || [])]
    };

    setUser(updatedUser);
    
    // Add system message to chat
    setChatMessages(prev => [...prev, { 
        role: 'ai', 
        content: "Ho inoltrato la tua richiesta al nostro team Senior. Un consulente umano ti contatterà telefonicamente entro 2 ore. Puoi monitorare lo stato della richiesta nel tuo Profilo." 
    }]);
    
    // Optional: Close modal after delay? No, let user read.
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // --- End Chat Logic ---

  const handleSendSupportMessage = () => {
    // Technical Support Logic
    const ticketId = `TECH-${Math.floor(Math.random() * 10000)}`;
    
    // If user is logged in, save to profile, otherwise just alert
    if (user) {
        const newTicket: SupportRequest = {
            id: ticketId,
            message: supportMessage,
            status: 'pending', // Starts as pending (step 1)
            createdAt: new Date().toLocaleDateString(),
            type: 'technical'
        };
        const updatedUser = {
            ...user,
            supportTickets: [newTicket, ...(user.supportTickets || [])]
        };
        setUser(updatedUser);
    }

    setSupportMessage('');
    setShowSupportModal(false);
    alert(`Ticket #${ticketId} aperto. Il supporto tecnico ti risponderà all'email indicata.`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-brand-200 selection:text-brand-900">
      {/* Navigation - Light & Clean */}
      <nav className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div 
              className="flex items-center gap-3 cursor-pointer group"
              onClick={handleLogoClick}
            >
              {/* Logo Fix: Ensure size and display are robust */}
              <div className="relative w-12 h-12 flex items-center justify-center">
                
                {/* 
                  ====================================================
                  LOGO AZIENDALE - MODIFICA QUI L'URL DELL'IMMAGINE
                  Inserisci il link del tuo logo dentro src="..."
                  ====================================================
                */}
                <img 
                    src="https://fal.media/files/monkey/O04_L3-4R1wH_uR7qUo_p_image.png" 
                    alt="ITISSUE" 
                    className="max-w-full max-h-full object-contain drop-shadow-md"
                    onError={(e) => {
                        // Fallback if image fails
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('bg-brand-700', 'rounded-lg');
                        e.currentTarget.parentElement!.innerHTML = '<span class="text-white font-bold text-xs">IT</span>';
                    }}
                />
              </div>
              <span className="font-bold text-2xl tracking-tight text-slate-900 hidden sm:block">IT<span className="text-brand-700">ISSUE</span></span>
            </div>
            
            <div className="flex items-center gap-6">
                {!user && view === 'landing' && (
                    <button onClick={() => setView('auth')} className="text-sm font-semibold px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm">
                        Area Clienti
                    </button>
                )}
                
                {user && (
                <div 
                    className="flex items-center gap-3 cursor-pointer p-1.5 pr-4 rounded-full hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all"
                    onClick={handleProfileClick}
                >
                    <div className="flex flex-col items-end hidden sm:block leading-tight">
                        <span className="text-sm font-bold text-slate-800">{user.companyName}</span>
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">Profilo</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand-700 ring-2 ring-white flex items-center justify-center text-sm font-bold text-white shadow-md">
                        {user.companyName.charAt(0)}
                    </div>
                </div>
                )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative">
        
        {view === 'landing' && <Landing onStart={() => setView('auth')} />}
        {view === 'auth' && <AuthForm onLogin={handleLogin} />}
        {view === 'profile' && user && (
            <ProfileView 
                user={user} 
                onContactSupport={() => setShowSupportModal(true)} 
            />
        )}
        {view === 'privacy' && <PrivacyPolicy onBack={() => setView('landing')} />}
        {view === 'terms' && <TermsOfService onBack={() => setView('landing')} />}

        {view === 'request' && (
          <div className="max-w-3xl mx-auto px-4 py-16 animate-fade-in">
            <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
              
              <h2 className="text-3xl font-bold mb-4 text-slate-900 relative z-10">Descrivi la tua Infrastruttura</h2>
              <p className="text-slate-600 mb-10 leading-relaxed relative z-10">
                Per permettere ai nostri sistemi di selezionare i sistemisti più adatti (DevOps, SysAdmin, Network Specialist) 
                e generare un preventivo accurato, raccontaci brevemente come è composto il tuo reparto IT attuale.
              </p>
              
              <form onSubmit={handleRequestSubmit} className="relative z-10">
                <div className="mb-8">
                  <label htmlFor="infra" className="block text-sm font-bold text-slate-700 mb-3 ml-1">
                    Dettagli Tecnici (Server, Software, Problemi attuali)
                  </label>
                  <textarea
                    id="infra"
                    rows={6}
                    required
                    className="w-full rounded-xl bg-slate-50 border border-slate-300 text-slate-900 p-5 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none transition-all resize-none shadow-inner text-lg placeholder-slate-400"
                    placeholder="Esempio: Abbiamo 4 server fisici Windows 2012 in sede, usiamo un gestionale legacy lento. Vorremmo passare al cloud ma abbiamo paura di perdere dati..."
                    value={infrastructureText}
                    onChange={(e) => setInfrastructureText(e.target.value)}
                  />
                </div>
                <div className="flex justify-end">
                   <button
                    type="submit"
                    className="bg-brand-700 hover:bg-brand-800 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-3 transform hover:-translate-y-0.5"
                  >
                    Genera Analisi e Preventivo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {view === 'processing' && (
          <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
            <div className="relative mb-8">
               <div className="absolute inset-0 bg-brand-200 blur-xl opacity-50 animate-pulse"></div>
               <Loader2 className="w-20 h-20 text-brand-600 animate-spin relative z-10" />
            </div>
            <h3 className="text-3xl font-bold text-slate-900 mb-3">Analisi in corso...</h3>
            <p className="text-slate-600 max-w-md text-lg">
              La nostra AI sta valutando la tua infrastruttura e selezionando i migliori profili junior per il tuo caso.
            </p>
          </div>
        )}

        {view === 'proposal' && proposal && (
          <ProposalView 
            proposal={proposal} 
            onAccept={handleAccept}
            onNegotiate={openChatModal}
          />
        )}

        {view === 'success' && (
          <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center animate-fade-in">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 border border-green-200 shadow-lg">
              <Terminal className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Benvenuto nel futuro!</h2>
            <p className="text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed">
              La tua richiesta è stata presa in carico. Controlla il tuo Profilo per aggiornamenti sullo stato del sopralluogo.
            </p>
            <div className="flex gap-4">
                <button 
                onClick={() => setView('profile')}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-colors shadow-md"
                >
                Vai al Profilo
                </button>
                <button 
                onClick={() => setView('landing')}
                className="px-8 py-4 text-brand-700 hover:bg-brand-50 font-semibold rounded-xl transition-colors border border-transparent hover:border-brand-200"
                >
                Torna alla Home
                </button>
            </div>
          </div>
        )}
      </main>

      {/* Negotiation/Sales AI Chat Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-lg h-[600px] flex flex-col overflow-hidden transform scale-100 transition-all">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50/80 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-brand-100 rounded-lg relative">
                           <MessageSquare className="w-5 h-5 text-brand-600" />
                           <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">Assistente Commerciale</h3>
                            <p className="text-xs text-slate-500">Online | Risponde in tempo reale</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setShowContactModal(false)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
                    {chatMessages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`
                                max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed
                                ${msg.role === 'user' 
                                    ? 'bg-brand-600 text-white rounded-br-none' 
                                    : 'bg-slate-100 text-slate-800 rounded-bl-none'}
                            `}>
                                {msg.content}
                            </div>
                        </div>
                    ))}
                    {isChatTyping && (
                        <div className="flex justify-start">
                             <div className="bg-slate-100 rounded-2xl p-3 rounded-bl-none flex items-center gap-1">
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                             </div>
                        </div>
                    )}
                    <div ref={chatEndRef}></div>
                </div>

                {/* "Talk to Human" CTA */}
                <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs text-slate-500">Vuoi parlare con una persona?</span>
                    <button 
                        onClick={handleRequestHumanConsultant}
                        className="text-xs flex items-center gap-1 bg-white border border-slate-300 hover:border-brand-500 hover:text-brand-600 text-slate-600 px-3 py-1.5 rounded-full transition-colors font-medium shadow-sm"
                    >
                        <Headset className="w-3 h-3" />
                        Richiedi Consulente Umano
                    </button>
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-slate-200 bg-white">
                    <div className="flex gap-2">
                        <input 
                            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none text-sm transition-all"
                            placeholder="Scrivi un messaggio..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                            autoFocus
                        />
                        <button 
                            onClick={handleSendChatMessage}
                            disabled={!chatInput.trim() || isChatTyping}
                            className="bg-brand-700 hover:bg-brand-800 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all shadow-md flex items-center justify-center"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Technical Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl border border-red-100 shadow-2xl w-full max-w-lg overflow-hidden transform scale-100 transition-all">
                <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-red-50/50">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded-lg">
                           <Wrench className="w-5 h-5 text-red-600" />
                        </div>
                        Assistenza Tecnica
                    </h3>
                    <button 
                        onClick={() => setShowSupportModal(false)}
                        className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors"
                        aria-label="Chiudi"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="p-8">
                    <p className="text-slate-600 mb-6 leading-relaxed">
                        Riscontri problemi con la piattaforma o hai bisogno di assistenza tecnica sui servizi attivi? Descrivi il problema.
                    </p>
                    <textarea 
                        className="w-full h-40 bg-slate-50 border border-slate-300 rounded-xl p-5 text-slate-900 placeholder-slate-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 focus:outline-none resize-none mb-6 shadow-inner"
                        placeholder="Descrivi qui il bug o il problema tecnico..."
                        value={supportMessage}
                        onChange={(e) => setSupportMessage(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end gap-3">
                        <button 
                            onClick={() => setShowSupportModal(false)}
                            className="px-6 py-3 text-slate-600 hover:text-slate-900 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            Annulla
                        </button>
                        <button 
                            onClick={handleSendSupportMessage}
                            disabled={!supportMessage.trim()}
                            className="px-8 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-bold flex items-center gap-2 transition-all shadow-md"
                        >
                            <Send className="w-4 h-4" />
                            Apri Ticket
                        </button>
                    </div>
                </div>
            </div>
        </div>
      )}

      {/* Admin Login / Controls Modal */}
      {showAdminLogin && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden p-6">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <Lock className="w-5 h-5 text-slate-500" /> 
                          {isAdminLoggedIn ? 'Admin Panel' : 'Admin Access'}
                      </h3>
                      <button onClick={() => setShowAdminLogin(false)}><X className="w-5 h-5 text-slate-400" /></button>
                  </div>
                  
                  {!isAdminLoggedIn ? (
                      <form onSubmit={handleAdminAuth} className="space-y-4">
                          <div>
                              <input 
                                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" 
                                  placeholder="Username" 
                                  value={adminUser} 
                                  onChange={e => setAdminUser(e.target.value)} 
                              />
                          </div>
                          <div>
                              <input 
                                  type="password"
                                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" 
                                  placeholder="Password" 
                                  value={adminPass} 
                                  onChange={e => setAdminPass(e.target.value)} 
                              />
                          </div>
                          <button className="w-full bg-slate-900 text-white rounded-lg py-2 font-bold text-sm hover:bg-slate-800">Login</button>
                      </form>
                  ) : (
                      <div className="space-y-4">
                          <div className="bg-green-50 text-green-800 p-3 rounded-lg text-xs border border-green-200">
                              Accesso garantito. Utilizza i controlli qui sotto per simulare il passaggio del tempo.
                          </div>
                          <button 
                              onClick={simulateTimePassage}
                              className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-3 font-bold text-sm flex items-center justify-center gap-2 shadow-md"
                          >
                              Avanza Tempo (Simulazione) <ChevronRight className="w-4 h-4" />
                          </button>
                          <p className="text-xs text-slate-400 text-center mt-2">
                              Avanza lo stato di preventivi e ticket di uno step.
                          </p>
                      </div>
                  )}
              </div>
          </div>
      )}

      {/* Footer - Professional Dark */}
      <footer className="border-t border-slate-200 bg-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-slate-500 text-sm">
          <div className="mb-4 md:mb-0">
             <span className="font-bold text-lg text-slate-900 block mb-2">IT<span className="text-brand-700">ISSUE</span></span>
             <p>&copy; {new Date().getFullYear()} ITISSUE S.r.l. - P.IVA 12345678901</p>
          </div>
          <div className="flex gap-8 items-center">
            <button onClick={() => setView('privacy')} className="hover:text-brand-700 transition-colors">Privacy Policy</button>
            <button onClick={() => setView('terms')} className="hover:text-brand-700 transition-colors">Termini di Servizio</button>
            <button 
              onClick={() => setShowSupportModal(true)} 
              className="hover:text-brand-700 transition-colors flex items-center gap-2 font-medium"
            >
              <Wrench className="w-4 h-4" /> Supporto Tecnico
            </button>
            {/* Admin Trigger */}
            <button onClick={() => setShowAdminLogin(true)} className="text-slate-300 hover:text-slate-500 transition-colors ml-4" aria-label="Admin">
                <Lock className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}