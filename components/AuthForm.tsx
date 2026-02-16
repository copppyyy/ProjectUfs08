import React, { useState } from 'react';
import { User } from '../types';

interface AuthFormProps {
  onLogin: (user: User) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    onLogin({
      email,
      companyName: company || 'Azienda Cliente SpA'
    });
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8 bg-white p-10 rounded-2xl border border-slate-200 shadow-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            {isLogin ? 'Bentornato' : 'Inizia la Trasformazione'}
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            {isLogin ? 'Accedi per gestire le tue richieste' : 'Crea un account per richiedere un sopralluogo'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="company" className="sr-only">Nome Azienda</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  required={!isLogin}
                  className="relative block w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:z-10 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 sm:text-sm transition-colors"
                  placeholder="Nome della tua Azienda"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">Email</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:z-10 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 sm:text-sm transition-colors"
                placeholder="Indirizzo Email Aziendale"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:z-10 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 sm:text-sm transition-colors"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-lg bg-brand-700 px-4 py-3 text-sm font-bold text-white hover:bg-brand-800 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-all shadow-md"
            >
              {isLogin ? 'Accedi' : 'Registrati e Richiedi Preventivo'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-semibold text-brand-600 hover:text-brand-800"
          >
            {isLogin ? 'Non hai un account? Registrati' : 'Hai già un account? Accedi'}
          </button>
        </div>
      </div>
    </div>
  );
};