import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Sparkles, MapPin, School, RefreshCcw, Home } from 'lucide-react';
import { useOnboarding } from '../features/onboarding/store/OnboardingContext';
import { POPULAR_VIBES } from '../features/onboarding/data/locationData';
import { Button } from '../components/ui/Button';

export const SuccessPage: React.FC = () => {
  const { state, resetOnboarding } = useOnboarding();
  const navigate = useNavigate();

  const handleRestart = () => {
    resetOnboarding();
    navigate('/signup');
  };

  const handleHome = () => {
    resetOnboarding();
    navigate('/');
  };

  const selectedVibeDetails = POPULAR_VIBES.filter((v) => state.draft.vibes.includes(v.id));

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg bg-[#131926]/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-300">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-emerald-400 mx-auto flex items-center justify-center shadow-xl shadow-emerald-500/25 animate-bounce">
          <CheckCircle className="w-9 h-9 text-slate-950 stroke-[2.5]" />
        </div>

        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Onboarding Complete</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome to Nuvora, {state.draft.fullName || 'Student'}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Your university profile is now active and ready to explore campus events and peer
            matches.
          </p>
        </div>

        {/* Profile Card Summary */}
        <div className="bg-[#101522] border border-slate-800 rounded-2xl p-4 text-left space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <div>
              <span className="text-sm font-bold text-white block">
                {state.draft.fullName || 'Jordan Taylor'}
              </span>
              <span className="text-xs text-brand-400 font-mono">
                {state.draft.pronouns || 'They/Them'} • Age {state.draft.age || 20}
              </span>
            </div>

            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
              Verified
            </span>
          </div>

          <div className="text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>
                {state.draft.city || 'San Francisco'}, {state.draft.state || 'CA'}
              </span>
            </div>

            {state.draft.college && (
              <div className="flex items-center gap-2">
                <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{state.draft.college}</span>
              </div>
            )}
          </div>

          {state.draft.bio && (
            <p className="text-xs text-slate-300 italic bg-slate-900/80 p-2 rounded-lg border border-slate-800">
              "{state.draft.bio}"
            </p>
          )}

          {/* Vibes badges */}
          {selectedVibeDetails.length > 0 && (
            <div className="pt-2 border-t border-slate-800/60">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                Vibes & Interests
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedVibeDetails.map((v) => (
                  <span
                    key={v.id}
                    className="inline-flex items-center gap-1 text-[11px] bg-brand-500/10 text-brand-300 border border-brand-500/20 px-2 py-0.5 rounded-md font-medium"
                  >
                    <span>{v.emoji}</span>
                    <span>{v.label}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          <Button
            variant="primary"
            fullWidth
            size="lg"
            onClick={handleHome}
            leftIcon={<Home className="w-4 h-4" />}
          >
            Explore Community Feed
          </Button>

          <Button
            variant="outline"
            fullWidth
            size="md"
            onClick={handleRestart}
            leftIcon={<RefreshCcw className="w-4 h-4" />}
          >
            Restart Demo Onboarding
          </Button>
        </div>
      </div>
    </div>
  );
};
