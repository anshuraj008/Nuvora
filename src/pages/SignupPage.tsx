import React from 'react';
import { Wizard } from '../features/onboarding/Wizard';
import { Link } from 'react-router-dom';

export const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-5xl mx-auto px-6 py-4 flex items-center justify-between relative z-10">
        <Link to="/" className="flex items-center space-x-2.5 touch-target py-2">
          <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center shadow-md shadow-brand-500/20">
            <span className="font-bold text-white text-sm">N</span>
          </div>
          <span className="font-extrabold text-base text-white tracking-tight">Nuvora</span>
        </Link>

        <Link
          to="/terms"
          className="text-xs text-slate-400 hover:text-white transition-colors touch-target py-2"
        >
          Terms & Guidelines
        </Link>
      </header>

      {/* Main Wizard */}
      <main className="flex-1 flex items-center justify-center relative z-10">
        <Wizard />
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-6 py-4 text-center text-xs text-slate-500 relative z-10">
        © 2026 Nuvora Inc. • Verified Student Network • Encrypted & Secure
      </footer>
    </div>
  );
};
