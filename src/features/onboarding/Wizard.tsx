import React from 'react';
import { useOnboarding } from './store/OnboardingContext';
import { Progress } from '../../components/ui/Progress';
import { Step1Identity } from './steps/Step1Identity';
import { Step2Profile } from './steps/Step2Profile';
import { Step3Location } from './steps/Step3Location';
import { Step4Preferences } from './steps/Step4Preferences';
import { useNavigate } from 'react-router-dom';
import { Sparkles, MapPin, School, ShieldCheck, User, QrCode } from 'lucide-react';
import { POPULAR_VIBES } from './data/locationData';

export const Wizard: React.FC = () => {
  const { state, prevStep } = useOnboarding();
  const navigate = useNavigate();

  const handleBack = () => {
    if (state.currentStep === 1) {
      navigate('/');
    } else {
      prevStep();
    }
  };

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return <Step1Identity />;
      case 2:
        return <Step2Profile />;
      case 3:
        return <Step3Location />;
      case 4:
        return <Step4Preferences />;
      default:
        return <Step1Identity />;
    }
  };

  const selectedVibeItems = POPULAR_VIBES.filter((v) => state.draft.vibes.includes(v.id));

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Main Wizard Panel */}
        <div className="lg:col-span-7 bg-[#0e1320]/90 border border-white/[0.08] backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Ambient card top glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-36 bg-[#ff385c]/10 blur-3xl pointer-events-none" />

          <Progress
            currentStep={state.currentStep}
            totalSteps={4}
            onBack={handleBack}
            canGoBack={true}
          />

          <div className="relative z-10">{renderCurrentStep()}</div>
        </div>

        {/* Right / Sticky Live Student Pass Preview (Desktop only) */}
        <aside
          aria-label="Live Profile Preview"
          className="hidden lg:block lg:col-span-5 sticky top-8 self-start space-y-4"
        >
          <div className="flex items-center justify-between px-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ff385c]" /> Live Campus ID Preview
            </span>
            <span className="text-[10px] font-mono text-[#ff385c] bg-[#ff385c]/10 border border-[#ff385c]/25 px-2.5 py-0.5 rounded-full font-bold">
              Step {state.currentStep} of 4
            </span>
          </div>

          {/* Holographic Campus Identity Card */}
          <div className="glass-card rounded-3xl p-6 border border-white/[0.1] shadow-2xl relative overflow-hidden transition-all duration-300">
            {/* Ambient inner gradient glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-[#ff385c]/20 to-transparent rounded-full blur-2xl pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#ff385c] to-[#ff758c] flex items-center justify-center shadow-md shadow-[#ff385c]/30">
                  <span className="font-extrabold text-white text-sm">N</span>
                </div>
                <div>
                  <span className="text-xs font-bold text-white tracking-tight block">
                    Nuvora Student Pass
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Official Collegiate ID
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/15 border border-emerald-500/25 px-2.5 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                <span>{state.draft.emailVerified ? 'Verified' : 'Pending'}</span>
              </div>
            </div>

            {/* Avatar & Name */}
            <div className="flex items-start space-x-4 mb-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/[0.12] flex items-center justify-center text-slate-200 shadow-inner font-bold text-lg shrink-0">
                {state.draft.fullName ? (
                  state.draft.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()
                ) : (
                  <User className="w-6 h-6 text-slate-500" />
                )}
              </div>

              <div className="space-y-1 min-w-0">
                <h4 className="text-base font-bold text-white tracking-tight truncate">
                  {state.draft.fullName || 'Your Name'}
                </h4>
                <p className="text-xs text-[#ff758c] font-medium font-mono">
                  {state.draft.pronouns || 'pronouns'}{' '}
                  {state.draft.age ? `• Age ${state.draft.age}` : ''}
                </p>
                <p className="text-[11px] text-slate-400 truncate font-mono">
                  {state.draft.email || 'student@university.edu'}
                </p>
              </div>
            </div>

            {/* Campus Info */}
            <div className="space-y-2.5 p-3.5 rounded-2xl bg-[#090d16]/80 border border-white/[0.05] text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-[#ff385c] shrink-0" />
                <span className="truncate font-semibold">
                  {state.draft.city
                    ? `${state.draft.city}, ${state.draft.state}`
                    : 'City, State Selection'}
                </span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <School className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="truncate">
                  {state.draft.college || 'Affiliated Campus / University'}
                </span>
              </div>
            </div>

            {/* Bio Preview */}
            {state.draft.bio && (
              <p className="mt-3 text-[11px] text-slate-300 italic bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04] line-clamp-2">
                "{state.draft.bio}"
              </p>
            )}

            {/* Vibes Preview */}
            <div className="mt-4 pt-3 border-t border-white/[0.06]">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Campus Vibes ({selectedVibeItems.length}/5)
              </span>
              <div className="flex flex-wrap gap-1.5 min-h-[32px]">
                {selectedVibeItems.length > 0 ? (
                  selectedVibeItems.map((v) => (
                    <span
                      key={v.id}
                      className="inline-flex items-center gap-1 text-[10px] bg-[#ff385c]/10 text-[#ff758c] border border-[#ff385c]/25 px-2 py-0.5 rounded-md font-medium"
                    >
                      <span>{v.emoji}</span>
                      <span>{v.label}</span>
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-slate-500 italic">No vibes chosen yet</span>
                )}
              </div>
            </div>

            {/* Footer QR preview */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-slate-400">
              <span className="flex items-center gap-1">
                <QrCode className="w-3.5 h-3.5 text-slate-300" /> Digital Student Identity
              </span>
              <span className="font-mono text-slate-400">PASS ACTIVE</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
