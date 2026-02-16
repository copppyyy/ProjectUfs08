import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';

interface TermsOfServiceProps {
  onBack: () => void;
}

export const TermsOfService: React.FC<TermsOfServiceProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-fade-in">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-brand-700 mb-8 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Torna Indietro
      </button>

      <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-xl">
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100">
           <div className="p-3 bg-brand-50 rounded-xl">
             <FileText className="w-8 h-8 text-brand-700" />
           </div>
           <div>
             <h1 className="text-3xl font-bold text-slate-900">Termini e Condizioni</h1>
             <p className="text-slate-500 text-sm">Condizioni Generali di Contratto per l'erogazione di servizi IT</p>
           </div>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed text-justify">
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Art. 1 - Premesse e Definizioni</h3>
            <p>
              Le presenti Condizioni Generali di Contratto ("CGC") disciplinano i rapporti commerciali tra ITISSUE S.r.l. ("Fornitore") e il Cliente ("Utente" o "Cliente") relativi all'utilizzo della piattaforma web e dei servizi di consulenza IT ivi proposti. L'accesso alla piattaforma e la richiesta di preventivi implicano l'accettazione integrale delle presenti CGC.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Art. 2 - Oggetto del Servizio</h3>
            <p>
              ITISSUE fornisce un servizio di intermediazione qualificata e consulenza tecnica finalizzato alla modernizzazione di infrastrutture IT obsolete. Il servizio include l'analisi preliminare (automatizzata o umana), la selezione di personale specializzato freelance ("Sistemisti") e la supervisione dei progetti di migrazione tecnologica.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Art. 3 - Obblighi del Cliente</h3>
            <p>
              Il Cliente si impegna a fornire informazioni veritiere e corrette in fase di registrazione e richiesta preventivo. È fatto divieto di utilizzare il servizio per scopi illeciti o per sollecitare i Sistemisti proposti scavalcando la piattaforma ITISSUE (divieto di disintermediazione), pena l'applicazione di una penale pari a € 5.000,00 per ogni violazione accertata.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Art. 4 - Limitazione di Responsabilità</h3>
            <p>
              Il Fornitore agisce con la diligenza professionale richiesta dalla natura dell'incarico. Tuttavia, ITISSUE non potrà essere ritenuta responsabile per danni diretti o indiretti, perdita di dati o interruzione di servizio derivanti da cause di forza maggiore, malfunzionamenti dell'infrastruttura preesistente del Cliente o interventi non autorizzati di terze parti. La responsabilità complessiva di ITISSUE è limitata al valore del corrispettivo pagato dal Cliente per il singolo servizio contestato.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Art. 5 - Proprietà Intellettuale</h3>
            <p>
              Tutti i contenuti presenti sulla piattaforma (loghi, testi, software, algoritmi di matching) sono di proprietà esclusiva di ITISSUE S.r.l. e sono protetti dalle leggi sul diritto d'autore e sulla proprietà industriale. È vietata qualsiasi riproduzione non autorizzata.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Art. 6 - Legge Applicabile e Foro Competente</h3>
            <p>
              Il presente contratto è regolato dalla legge italiana. Per qualsiasi controversia derivante dall'interpretazione o esecuzione delle presenti CGC, sarà competente in via esclusiva il Foro di Milano.
            </p>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100 bg-slate-50 -mx-8 -mb-8 md:-mx-12 md:-mb-12 p-8 rounded-b-3xl">
            <p className="text-sm text-slate-500 mb-4 font-medium">Per accettazione specifica delle clausole vessatorie ai sensi degli artt. 1341 e 1342 c.c. (Art. 3 - Divieto di disintermediazione; Art. 4 - Limitazione di Responsabilità; Art. 6 - Foro Competente).</p>
            <button className="w-full bg-slate-200 text-slate-400 font-bold py-3 rounded-xl cursor-not-allowed" disabled>
                Accettazione già acquisita in fase di registrazione
            </button>
        </div>
      </div>
    </div>
  );
};