import React from 'react';
import { User, SupportRequest } from '../types';
import { Building2, Mail, Clock, CheckCircle2, AlertCircle, MessageCircle, FileText, Headset, Wrench, Check } from 'lucide-react';

interface ProfileViewProps {
  user: User;
  onContactSupport: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, onContactSupport }) => {
  const requests = user.requests || [];
  const tickets = user.supportTickets || [];

  // Helper function to render progress steps for Technical Tickets
  const renderTechProgress = (status: string) => {
    const steps = [
      { id: 'pending', label: 'Inviato' },
      { id: 'reviewing', label: 'In Lavorazione' },
      { id: 'resolved', label: 'Risolto' }
    ];

    let currentStepIndex = steps.findIndex(s => s.id === status);
    if (currentStepIndex === -1) currentStepIndex = 0; // default

    return (
      <div className="mt-4">
        <div className="flex items-center justify-between relative">
          {/* Background Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full -z-10"></div>
          
          {steps.map((step, idx) => {
            const isCompleted = idx <= currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            
            return (
              <div key={step.id} className="flex flex-col items-center gap-2">
                <div className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-[10px] border-2 transition-all
                  ${isCompleted ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-slate-300 text-slate-300'}
                  ${isCurrent ? 'ring-2 ring-brand-200 ring-offset-1 scale-110' : ''}
                `}>
                  {isCompleted ? <Check className="w-3 h-3" /> : (idx + 1)}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${isCompleted ? 'text-brand-700' : 'text-slate-400'}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Helper to determine width of project progress bar
  const getProjectProgressWidth = (status: string | undefined) => {
      if (status === 'accepted') return 'w-full'; // 100%
      if (status === 'scheduled') return 'w-2/3'; // 66%
      return 'w-1/3'; // 33% (pending or reviewing)
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Il Mio Profilo</h2>

      {/* User Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-lg mb-12 flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-24 h-24 rounded-full bg-brand-700 flex items-center justify-center text-3xl font-bold text-white shadow-xl ring-4 ring-slate-50">
          {user.companyName.charAt(0)}
        </div>
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900">{user.companyName}</h3>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200 mt-2">
              <CheckCircle2 className="w-3 h-3" />
              Cliente Verificato
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <Mail className="w-5 h-5 text-brand-600" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <Building2 className="w-5 h-5 text-brand-600" />
              <span>Sede Principale</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column: Project Requests */}
        <div className="lg:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-6 h-6 text-brand-600" />
                Storico Preventivi
            </h3>

            {requests.length > 0 ? (
            requests.map((req: any, idx) => (
                <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-md hover:border-brand-300 transition-all group">
                <div className="p-6 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div>
                             <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-1 rounded mb-2 inline-block border border-slate-200">ID: {req.id}</span>
                            <h4 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-brand-700 transition-colors">
                                {req.suggestedStrategy ? req.suggestedStrategy.substring(0, 60) + '...' : 'Richiesta di Sopralluogo'}
                            </h4>
                            <p className="text-sm text-slate-500">Data: {req.createdAt || 'Oggi'}</p>
                        </div>
                        {req.status === 'scheduled' ? (
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full border border-yellow-200 text-xs font-bold whitespace-nowrap">
                            <Clock className="w-3 h-3" />
                            In Attesa di Sopralluogo
                            </span>
                        ) : req.status === 'accepted' ? (
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-200 text-xs font-bold whitespace-nowrap">
                            <CheckCircle2 className="w-3 h-3" />
                            Esecuzione Avviata
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 px-3 py-1 bg-brand-50 text-brand-700 rounded-full border border-brand-200 text-xs font-bold whitespace-nowrap">
                            <AlertCircle className="w-3 h-3" />
                            In Analisi
                            </span>
                        )}
                    </div>
                    
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                        <div className="flex justify-between text-sm mb-1">
                            <span className="text-slate-500 font-medium">Preventivo Stimato</span>
                            <span className="text-slate-900 font-bold">{req.totalEstimate}</span>
                        </div>
                    </div>
                </div>
                
                {/* Progress Bar Visualization for Quotes */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-100">
                    <div className="relative pt-4 pb-2">
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                           className={`h-full bg-brand-600 relative transition-all duration-1000 ${getProjectProgressWidth(req.status)}`}
                        >
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow border border-brand-200"></div>
                        </div>
                    </div>
                    <div className="flex justify-between mt-3 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                        <span className="text-brand-600">Richiesta</span>
                        
                        <span className={req.status === 'reviewing' || req.status === 'scheduled' || req.status === 'accepted' ? "text-brand-600" : ""}>
                            Analisi
                        </span>
                        
                        <span className={req.status === 'scheduled' || req.status === 'accepted' ? "text-brand-600" : ""}>
                            Sopralluogo
                        </span>
                        
                        <span className={req.status === 'accepted' ? "text-brand-600" : ""}>
                            Esecuzione
                        </span>
                    </div>
                    </div>
                </div>
                </div>
            ))
            ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200 border-dashed">
                <p className="text-slate-500">Nessuna richiesta attiva.</p>
            </div>
            )}
        </div>

        {/* Side Column: Support Tickets */}
        <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <MessageCircle className="w-6 h-6 text-purple-600" />
                Richieste & Ticket
            </h3>

            <div className="space-y-4">
                {tickets.length > 0 ? (
                    tickets.map((ticket, idx) => (
                        <div key={idx} className={`rounded-xl p-5 border shadow-sm transition-colors relative overflow-hidden ${
                            ticket.type === 'human_request' 
                                ? 'bg-orange-50 border-orange-200' 
                                : ticket.type === 'technical'
                                    ? 'bg-white border-blue-200'
                                    : 'bg-white border-slate-200'
                        }`}>
                            {/* Icon Badges */}
                            {ticket.type === 'human_request' && (
                                <div className="absolute top-0 right-0 p-1.5 bg-orange-100 rounded-bl-xl text-orange-600">
                                    <Headset className="w-4 h-4" />
                                </div>
                            )}
                            {ticket.type === 'technical' && (
                                <div className="absolute top-0 right-0 p-1.5 bg-blue-100 rounded-bl-xl text-blue-600">
                                    <Wrench className="w-4 h-4" />
                                </div>
                            )}

                            {/* Ticket Header */}
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[10px] font-mono text-slate-400 uppercase">#{ticket.id}</span>
                            </div>
                            
                            {/* Ticket Content */}
                            <div className="mb-4">
                                <p className={`text-sm font-semibold mb-1 ${ticket.type === 'human_request' ? 'text-orange-900' : 'text-slate-900'}`}>
                                    {ticket.type === 'human_request' ? 'Richiesta Consulente Umano' : (ticket.type === 'technical' ? 'Supporto Tecnico' : 'Info Generali')}
                                </p>
                                {ticket.type !== 'human_request' && (
                                    <p className="text-slate-600 text-xs italic line-clamp-2">
                                        "{ticket.message}"
                                    </p>
                                )}
                            </div>

                            {/* Visual Progress Bars */}
                            {ticket.type === 'human_request' ? (
                                <div className="space-y-2 mt-4 bg-white/50 p-3 rounded-lg border border-orange-100/50">
                                     <div className="flex justify-between text-[10px] font-bold text-orange-800 mb-1">
                                        <span>Stato Richiesta</span>
                                        <span>In Assegnazione</span>
                                     </div>
                                     <div className="h-1.5 w-full bg-orange-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-orange-500 w-1/2 animate-pulse rounded-full"></div>
                                     </div>
                                </div>
                            ) : ticket.type === 'technical' ? (
                                renderTechProgress(ticket.status)
                            ) : (
                                // Fallback for general tickets
                                <div className="mt-2 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full inline-block">
                                    Stato: {ticket.status === 'reviewing' ? 'In Visione' : ticket.status}
                                </div>
                            )}

                            <div className="text-[10px] text-slate-400 pt-3 mt-3 border-t border-black/5 flex justify-between">
                                <span>Aperto il: {ticket.createdAt}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 border-dashed text-center">
                        <MessageCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <p className="text-slate-400 text-sm">Non hai ticket aperti.</p>
                    </div>
                )}
                
                <div className="bg-brand-50 rounded-xl p-4 border border-brand-100 shadow-sm">
                    <h4 className="text-brand-900 font-semibold text-sm mb-2">Hai bisogno di aiuto?</h4>
                    <p className="text-brand-700/70 text-xs mb-3">Il nostro team tecnico risponde entro 4 ore lavorative.</p>
                    <button 
                        onClick={onContactSupport}
                        className="w-full py-2.5 bg-white hover:bg-white/80 text-brand-700 border border-brand-200 text-xs rounded-lg transition-colors font-bold shadow-sm active:scale-95 transform duration-100"
                    >
                        Contatta Supporto Generale
                    </button>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};