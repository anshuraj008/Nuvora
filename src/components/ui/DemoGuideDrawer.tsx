import React, { useState } from 'react';
import { HelpCircle, X, Check, AlertTriangle, KeyRound, ShieldAlert, Sparkles } from 'lucide-react';

export const DemoGuideDrawer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Discreet Trigger in Bottom-Right Corner */}
      <div className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121826]/90 hover:bg-[#1a2236] border border-white/10 hover:border-[#ff385c]/40 text-slate-400 hover:text-white text-xs font-semibold backdrop-blur-md shadow-lg transition-all duration-200"
          aria-label="Open assessment evaluation guide"
        >
          <HelpCircle className="w-3.5 h-3.5 text-[#ff758c]" />
          <span>Evaluation Guide</span>
        </button>
      </div>

      {/* Floating Modal / Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="demo-guide-title"
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-sm glass-card rounded-3xl p-5 border border-white/15 shadow-2xl space-y-4 text-xs animate-in slide-in-from-bottom-4 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#ff385c]/15 text-[#ff758c]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 id="demo-guide-title" className="font-bold text-white text-sm">
                    Assessment Triggers
                  </h3>
                  <p className="text-[10px] text-slate-400">Deterministic Mock Service Keys</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close guide"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-slate-300">
              <div className="p-2.5 rounded-xl bg-[#090d16]/90 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1">
                  <KeyRound className="w-3 h-3" /> Valid OTP Code
                </span>
                <p className="text-white font-mono font-bold text-sm">123456</p>
                <p className="text-[11px] text-slate-400">
                  Accepts paste or single-digit typing. Any other 6 digits rejects with error.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#090d16]/90 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Email Verification Error Trigger
                </span>
                <p className="text-amber-300 font-mono font-semibold">fail@example.com</p>
                <p className="text-[11px] text-slate-400">
                  Simulates network failure to demonstrate retry toast without losing inputs.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#090d16]/90 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1">
                  <ShieldAlert className="w-3 h-3" /> Under-18 Age Blocking Modal
                </span>
                <p className="text-white font-mono font-semibold">Age &lt; 18 (e.g. 16, 17)</p>
                <p className="text-[11px] text-slate-400">
                  Triggers safety blocking alert and blocks advancing.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-[#090d16]/90 border border-white/5 space-y-1">
                <span className="text-[10px] uppercase font-bold text-purple-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Submit Error Retry Trigger
                </span>
                <p className="text-purple-300 font-mono font-semibold">submitfail@example.com</p>
                <p className="text-[11px] text-slate-400">
                  Simulates final submit error with retry button.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold text-xs transition-colors"
            >
              Close Reference
            </button>
          </div>
        </div>
      )}
    </>
  );
};
