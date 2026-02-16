import React from 'react';
import { ShieldCheck, ArrowLeft } from 'lucide-react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
             <ShieldCheck className="w-8 h-8 text-brand-700" />
           </div>
           <div>
             <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
             <p className="text-slate-500 text-sm">Ultimo aggiornamento: 24 Ottobre 2023</p>
           </div>
        </div>

        <div className="space-y-8 text-slate-600 leading-relaxed text-justify">
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">1. Titolare del Trattamento</h3>
            <p>
              Ai sensi dell'art. 13 del Regolamento UE 2016/679 ("GDPR"), si informa che il Titolare del trattamento dei dati personali è <strong>ITISSUE S.r.l.</strong>, con sede legale in Via dell'Innovazione Tecnologica 42, 20100 Milano (MI), P.IVA 12345678901. Il Titolare può essere contattato per questioni relative alla privacy all'indirizzo PEC: <em>privacy@pec.itissue.it</em>.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">2. Oggetto del Trattamento</h3>
            <p>
              Il Titolare tratta i dati personali, identificativi (ad esempio, nome, cognome, ragione sociale, indirizzo, telefono, e-mail, riferimenti bancari e di pagamento) comunicati dall'interessato in occasione della conclusione di contratti per i servizi del Titolare o della richiesta di preventivi tramite la piattaforma web.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">3. Finalità del Trattamento</h3>
            <p>
              I Vostri dati personali sono trattati:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>A) Senza il Vostro consenso espresso (art. 6 lett. b, e GDPR), per le seguenti Finalità di Servizio: concludere i contratti per i servizi del Titolare; adempiere agli obblighi precontrattuali, contrattuali e fiscali derivanti da rapporti con Voi in essere.</li>
              <li>B) Solo previo Vostro specifico e distinto consenso (art. 7 GDPR), per Finalità di Marketing: inviarVi via e-mail, posta e/o sms e/o contatti telefonici, newsletter, comunicazioni commerciali e/o materiale pubblicitario su prodotti o servizi offerti dal Titolare.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">4. Modalità di Trattamento</h3>
            <p>
              Il trattamento dei Vostri dati personali è realizzato per mezzo delle operazioni indicate all'art. 4 n. 2) GDPR e precisamente: raccolta, registrazione, organizzazione, conservazione, consultazione, elaborazione, modificazione, selezione, estrazione, raffronto, utilizzo, interconnessione, blocco, comunicazione, cancellazione e distruzione dei dati. I Vostri dati personali sono sottoposti a trattamento sia cartaceo che elettronico e/o automatizzato.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">5. Conservazione dei Dati</h3>
            <p>
              Il Titolare tratterà i dati personali per il tempo necessario per adempiere alle finalità di cui sopra e comunque per non oltre 10 anni dalla cessazione del rapporto per le Finalità di Servizio e per non oltre 2 anni dalla raccolta dei dati per le Finalità di Marketing.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">6. Diritti dell'Interessato</h3>
            <p>
              Nella Vostra qualità di interessati, avete i diritti di cui all'art. 15 GDPR e precisamente i diritti di: ottenere la conferma dell'esistenza o meno di dati personali che Vi riguardano; ottenere l'indicazione dell'origine dei dati personali, delle finalità e modalità del trattamento; ottenere l'aggiornamento, la rettificazione ovvero l'integrazione dei dati.
            </p>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">Documento generato e validato dall'Ufficio Legale ITISSUE S.r.l.</p>
        </div>
      </div>
    </div>
  );
};