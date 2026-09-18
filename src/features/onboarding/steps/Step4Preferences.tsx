import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, CheckCircle2, FileText, UserCheck, Eye } from 'lucide-react';
import { step4Schema, Step4FormData } from '../schemas';
import { useOnboarding } from '../store/OnboardingContext';
import { POPULAR_VIBES } from '../data/locationData';
import { mockApi } from '../mockApi';
import { Button } from '../../../components/ui/Button';
import { Toast } from '../../../components/ui/Toast';
import { Modal } from '../../../components/ui/Modal';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

export const Step4Preferences: React.FC = () => {
  const { state, updateDraft, dispatch } = useOnboarding();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Step4FormData>({
    resolver: zodResolver(step4Schema),
    defaultValues: {
      vibes: state.draft.vibes || [],
      allowDiscovery: state.draft.allowDiscovery !== undefined ? state.draft.allowDiscovery : true,
      termsAccepted: state.draft.termsAccepted || (false as unknown as true),
    },
    mode: 'onBlur',
  });

  const selectedVibes = watch('vibes') || [];
  const allowDiscovery = watch('allowDiscovery');

  const toggleVibe = (id: string) => {
    if (selectedVibes.includes(id)) {
      const updated = selectedVibes.filter((v) => v !== id);
      setValue('vibes', updated, { shouldValidate: true });
    } else {
      if (selectedVibes.length >= 5) return;
      const updated = [...selectedVibes, id];
      setValue('vibes', updated, { shouldValidate: true });
    }
  };

  const onSubmit = async (data: Step4FormData) => {
    setErrorMsg(null);
    setIsLoading(true);

    const fullPayload = {
      ...state.draft,
      vibes: data.vibes,
      allowDiscovery: data.allowDiscovery,
      termsAccepted: data.termsAccepted,
    };

    updateDraft(fullPayload);

    try {
      await mockApi.submitProfile(fullPayload);
      dispatch({ type: 'COMPLETE_ONBOARDING' });
      navigate('/success');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Submission failed. Please try again.';
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6">
      {errorMsg && (
        <Toast
          type="error"
          title="Submission Notice"
          message={errorMsg}
          onClose={() => setErrorMsg(null)}
          onRetry={handleSubmit(onSubmit)}
          retryText="Retry Submission"
        />
      )}

      {/* Review Snapshot Card */}
      <div className="glass-card rounded-2xl p-4.5 space-y-3 border border-white/[0.08]">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff758c] flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" /> Verified Profile Snapshot
          </span>
          <span className="text-xs text-slate-300 font-mono font-medium">
            {state.draft.pronouns || 'Not specified'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">
              Full Name & Age
            </span>
            <span className="font-bold text-white text-sm">
              {state.draft.fullName || 'Anonymous'} ({state.draft.age || '—'})
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">
              Campus / City
            </span>
            <span className="font-bold text-white text-sm truncate block">
              {state.draft.city || '—'}, {state.draft.state || '—'}
            </span>
          </div>
        </div>

        {state.draft.college && (
          <div className="pt-2 border-t border-white/[0.04]">
            <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-0.5">
              University / Institute
            </span>
            <span className="font-semibold text-slate-200 text-xs">
              {state.draft.college}
            </span>
          </div>
        )}

        {state.draft.bio && (
          <p className="text-xs text-slate-300 italic bg-[#0a0e18]/80 p-2.5 rounded-xl border border-white/[0.04]">
            "{state.draft.bio}"
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Vibes Tag Selector in Balanced Responsive Grid */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
              Select Your Campus Vibes (1 to 5) <span className="text-[#ff385c]">*</span>
            </label>
            <span
              className={clsx(
                'text-xs font-mono font-medium',
                selectedVibes.length >= 5 ? 'text-amber-400' : 'text-slate-400'
              )}
            >
              {selectedVibes.length}/5 selected
            </span>
          </div>

          <div
            role="group"
            aria-label="Select Vibes"
            className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1"
          >
            {POPULAR_VIBES.map((vibe) => {
              const isSelected = selectedVibes.includes(vibe.id);
              return (
                <button
                  key={vibe.id}
                  type="button"
                  onClick={() => toggleVibe(vibe.id)}
                  aria-pressed={isSelected}
                  className={clsx(
                    'px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center justify-between gap-1.5 touch-target border text-left',
                    isSelected
                      ? 'bg-gradient-to-r from-[#ff385c] to-[#ff5a78] text-white border-transparent shadow-md shadow-[#ff385c]/30 font-semibold'
                      : 'bg-[#0a0e18] text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-800/60'
                  )}
                >
                  <span className="flex items-center gap-1.5 truncate">
                    <span aria-hidden="true">{vibe.emoji}</span>
                    <span className="truncate">{vibe.label}</span>
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0 stroke-[2.5]" />}
                </button>
              );
            })}
          </div>

          {errors.vibes?.message && (
            <p role="alert" className="text-xs font-medium text-rose-400 mt-1">
              {errors.vibes.message}
            </p>
          )}
        </div>

        {/* Discovery Preference Toggle */}
        <div className="p-4 rounded-2xl bg-[#0a0e18] border border-slate-800 flex items-center justify-between shadow-inner">
          <div className="space-y-0.5 pr-3">
            <label
              htmlFor="discovery-toggle"
              className="text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-4 h-4 text-[#ff758c]" />
              Campus Peer Discovery
            </label>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Allow verified students in your university network to discover your profile.
            </p>
          </div>

          <input
            id="discovery-toggle"
            type="checkbox"
            checked={allowDiscovery}
            onChange={(e) => setValue('allowDiscovery', e.target.checked)}
            className="w-5 h-5 rounded accent-[#ff385c] cursor-pointer touch-target shrink-0"
          />
        </div>

        {/* Terms Acceptance */}
        <div className="space-y-1.5">
          <div className="flex items-start gap-3">
            <Controller
              control={control}
              name="termsAccepted"
              render={({ field }) => (
                <input
                  id="terms-checkbox"
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  className="w-5 h-5 mt-0.5 rounded accent-[#ff385c] cursor-pointer touch-target shrink-0"
                />
              )}
            />
            <label
              htmlFor="terms-checkbox"
              className="text-xs text-slate-300 leading-relaxed cursor-pointer"
            >
              I agree to the{' '}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-[#ff758c] hover:text-white underline font-semibold inline-flex items-center gap-0.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" /> Terms & Conditions
              </button>{' '}
              and campus safety guidelines.
            </label>
          </div>

          {errors.termsAccepted?.message && (
            <p role="alert" className="text-xs font-medium text-rose-400 mt-1">
              {errors.termsAccepted.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          isLoading={isLoading}
          loadingText="Creating Account..."
          leftIcon={<CheckCircle2 className="w-5 h-5" />}
        >
          Complete Onboarding
        </Button>
      </form>

      {/* Quick Terms Modal */}
      <Modal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms & Community Guidelines"
        maxWidth="lg"
        footer={
          <Button
            variant="primary"
            onClick={() => {
              setValue('termsAccepted', true, { shouldValidate: true });
              setShowTermsModal(false);
            }}
          >
            Agree & Close
          </Button>
        }
      >
        <div className="space-y-3.5 text-xs leading-relaxed text-slate-300 max-h-64 overflow-y-auto pr-2">
          <h5 className="font-bold text-white text-sm">1. Community Conduct</h5>
          <p>
            Nuvora is designed for positive and authentic campus connections. Harassment, hate
            speech, impersonation, or deceptive behavior are strictly prohibited and result in
            permanent account suspension.
          </p>
          <h5 className="font-bold text-white text-sm">2. Age and Eligibility</h5>
          <p>
            Users must be at least 18 years of age and enrolled or affiliated with verified higher
            education institutions.
          </p>
          <h5 className="font-bold text-white text-sm">3. Privacy and Data Security</h5>
          <p>
            We never sell your personal information or broadcast private contact details. Your
            location coordinates are strictly fuzzy-matched for campus event grouping.
          </p>
        </div>
      </Modal>
    </div>
  );
};
