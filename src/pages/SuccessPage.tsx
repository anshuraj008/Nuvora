import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  Sparkles,
  MapPin,
  School,
  RefreshCcw,
  Home,
  QrCode,
  ShieldCheck,
  Award,
} from 'lucide-react';
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
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-b from-[#ff385c]/25 via-purple-600/10 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-lg space-y-6">
        {/* Celebration Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-400 to-emerald-500 mx-auto flex items-center justify-center shadow-xl shadow-emerald-500/30 border border-white/20 animate-bounce">
            <CheckCircle className="w-9 h-9 text-slate-950 stroke-[2.5]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Onboarding Complete</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Welcome to Nuvora!
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Your profile has been created successfully. You are ready to explore campus events and
            connect with peers.
          </p>
        </div>

        {/* Holographic Verified Student Pass Card */}
        <div className="glass-card rounded-3xl p-6 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Top banner */}
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ff385c] to-[#ff758c] flex items-center justify-center shadow-md shadow-[#ff385c]/30">
                <span className="font-extrabold text-white text-sm">N</span>
              </div>
              <div>
                <span className="text-xs font-bold text-white tracking-tight block">
                  Nuvora Student Pass
                </span>
                <span className="text-[10px] text-slate-400 font-mono">ID: NUV-2026-CAMPUS</span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified</span>
            </div>
          </div>

          {/* Profile Details */}
          <div className="flex items-start space-x-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-inner">
              {state.draft.fullName
                ? state.draft.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()
                : 'ST'}
            </div>

            <div className="space-y-0.5 min-w-0">
              <h3 className="text-base font-bold text-white truncate">
                {state.draft.fullName || 'Jordan Taylor'}
              </h3>
              <p className="text-xs text-[#ff758c] font-medium font-mono">
                {state.draft.pronouns || 'They/Them'} • Age {state.draft.age || 21}
              </p>
              <p className="text-[11px] text-slate-400 font-mono truncate">
                {state.draft.email || 'student@university.edu'}
              </p>
            </div>
          </div>

          {/* Location & College info */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-[#090d16]/80 border border-white/[0.05] text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-[#ff385c] shrink-0" />
              <span className="font-medium">
                {state.draft.city ? `${state.draft.city}, ${state.draft.state}` : 'Kolkata, WB'}
              </span>
            </div>

            <div className="flex items-center gap-2 text-slate-300">
              <School className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">
                {state.draft.college || 'University Campus Network'}
              </span>
            </div>
          </div>

          {/* Bio quote if provided */}
          {state.draft.bio && (
            <p className="mt-3 text-xs text-slate-300 italic bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04]">
              "{state.draft.bio}"
            </p>
          )}

          {/* Vibes Chips */}
          {selectedVibeDetails.length > 0 && (
            <div className="mt-4 pt-3 border-t border-white/[0.06]">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Campus Vibes & Passions
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedVibeDetails.map((v) => (
                  <span
                    key={v.id}
                    className="inline-flex items-center gap-1 text-[11px] bg-[#ff385c]/10 text-[#ff758c] border border-[#ff385c]/25 px-2.5 py-0.5 rounded-md font-medium"
                  >
                    <span>{v.emoji}</span>
                    <span>{v.label}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom QR Code Mockup Bar */}
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center space-x-2 text-slate-400 text-[11px]">
              <QrCode className="w-6 h-6 text-slate-300" />
              <span>Digital Campus QR</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
              <Award className="w-3.5 h-3.5 text-amber-400" /> PASS ID #8921-VERIFIED
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3 pt-2">
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
            variant="secondary"
            fullWidth
            size="md"
            onClick={handleRestart}
            leftIcon={<RefreshCcw className="w-4 h-4" />}
          >
            Restart Demo Onboarding Flow
          </Button>
        </div>
      </div>
    </div>
  );
};
