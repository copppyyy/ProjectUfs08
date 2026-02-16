import React from 'react';
import { QuoteProposal } from '../types';
import { CheckCircle2, Clock, UserCheck, Briefcase, Zap, Star } from 'lucide-react';

interface ProposalViewProps {
  proposal: QuoteProposal;
  onAccept: () => void;
  onNegotiate: () => void;
}

// Helper to get consistent random images based on name/index
const getConsultantImage = (idx: number) => {
  const images = [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=250&auto=format&fit=crop", // Man Professional
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=250&auto=format&fit=crop", // Woman Professional
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=250&auto=format&fit=crop", // Man Professional 2
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop", // Woman Professional 2
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop", // Man Professional 3
    "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=250&auto=format&fit=crop", // Man Professional 4
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=250&auto=format&fit=crop", // Woman Professional 3
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=250&auto=format&fit=crop", // Man Professional 5
  ];
  return images[idx % images.length];
};

export const ProposalView: React.FC<ProposalViewProps> = ({ proposal, onAccept, onNegotiate }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12 animate-fade-in">
      
      {/* Header Summary */}
      <div className="bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
        
        <h2 className="text-3xl font-bold text-slate-900 mb-2 relative z-10">Analisi e Strategia</h2>
        <div className="h-1.5 w-24 bg-brand-600 rounded-full mb-8 relative z-10"></div>
        
        <p className="text-slate-600 text-lg leading-relaxed mb-8 italic relative z-10 font-normal border-l-4 border-brand-200 pl-6 bg-slate-50 py-4 pr-4 rounded-r-lg">
          "{proposal.companyAnalysis}"
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
           <div className="bg-brand-50 p-6 rounded-2xl border border-brand-100">
             <h4 className="text-brand-800 font-bold mb-3 flex items-center gap-2 text-lg">
               <Zap className="w-5 h-5 fill-brand-200 text-brand-600" /> Strategia Suggerita
             </h4>
             <p className="text-slate-700 leading-relaxed">{proposal.suggestedStrategy}</p>
           </div>
           
           <div className="flex flex-col justify-center gap-6 pl-0 md:pl-8 border-l-0 md:border-l border-slate-100">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100">
                    <Clock className="w-6 h-6 text-brand-600" />
                </div>
                <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Tempistiche</p>
                    <p className="text-slate-900 font-bold text-lg">{proposal.timeline}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center border border-green-100">
                    <Briefcase className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider font-bold">Investimento</p>
                    <p className="text-slate-900 font-bold text-lg">{proposal.totalEstimate}</p>
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Suggested Team */}
      <div>
        <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-brand-600 rounded-xl shadow-md">
               <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
               <h3 className="text-2xl font-bold text-slate-900">Il Team Selezionato</h3>
               <p className="text-slate-500 text-sm">Esperti verificati pronti per il sopralluogo</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposal.team.map((consultant, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-1 border border-slate-200 hover:border-brand-300 transition-all group hover:-translate-y-1 duration-300 shadow-md hover:shadow-xl">
              <div className="bg-white rounded-xl p-6 h-full flex flex-col relative overflow-hidden">
                <div className="flex items-start gap-4 mb-6 relative z-10">
                  <img 
                    src={getConsultantImage(idx)} 
                    alt={consultant.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 shadow-sm group-hover:border-brand-500 transition-colors"
                  />
                  <div>
                    <h4 className="text-slate-900 font-bold text-lg leading-tight">{consultant.name}</h4>
                    <span className="text-brand-600 text-sm font-semibold block mt-1">{consultant.role}</span>
                    <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm mb-6 min-h-[60px] leading-relaxed relative z-10">
                   "{consultant.bio}"
                </p>
                
                <div className="mt-auto space-y-3 relative z-10">
                    <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-3">
                         <span className="text-slate-400 font-semibold">Specializzazione</span>
                         <span className="text-brand-700 font-medium bg-brand-50 px-2 py-1 rounded border border-brand-100">{consultant.specialization}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                         <span className="text-slate-400 font-semibold">Esperienza</span>
                         <span className="text-slate-700 font-bold">{consultant.experienceYears} Anni</span>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Proposed Services Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg">
        <div className="px-8 py-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900">Piano di Intervento</h3>
          <span className="text-xs font-mono text-slate-500 uppercase border border-slate-300 bg-white px-2 py-1 rounded">Draft v1.0</span>
        </div>
        <div className="divide-y divide-slate-100">
          {proposal.services.map((service, idx) => (
            <div key={idx} className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50 transition-colors group">
              <div className="flex gap-4">
                <div className="mt-1 font-mono text-slate-400 text-sm">0{idx + 1}</div>
                <div>
                    <h5 className="text-slate-900 font-bold text-lg mb-1 group-hover:text-brand-600 transition-colors">{service.title}</h5>
                    <p className="text-slate-600 text-sm max-w-2xl">{service.description}</p>
                </div>
              </div>
              <div className="text-slate-600 text-sm font-semibold whitespace-nowrap bg-slate-100 px-4 py-2 rounded-lg border border-slate-200">
                ~ {service.estimatedHours} ore
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Bar */}
      <div className="sticky bottom-6 z-50 bg-white/90 backdrop-blur-xl border border-slate-200 p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto ring-1 ring-black/5">
        <div className="flex items-center gap-3 px-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <p className="text-slate-500 text-sm font-medium">Offerta valida per 14 giorni</p>
        </div>
        <div className="flex w-full sm:w-auto gap-3">
          <button 
            onClick={onNegotiate}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-semibold transition-colors text-sm"
          >
            Discuti o Modifica
          </button>
          <button 
            onClick={onAccept}
            className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-brand-700 text-white hover:bg-brand-800 font-bold shadow-lg shadow-brand-500/20 flex items-center justify-center gap-2 transition-all transform hover:scale-105 text-sm"
          >
            <CheckCircle2 className="w-5 h-5" />
            Accetta e Procedi
          </button>
        </div>
      </div>
    </div>
  );
};