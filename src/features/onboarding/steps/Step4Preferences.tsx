import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles, Check, CheckCircle2, FileText, UserCheck, Eye } from 'lucide-react';
import { step4Schema, Step4FormData } from '../schemas';
import { useOnboarding } from '../store/OnboardingContext';
import { POPULAR_VIBES } from '../data/locationData';
import { mockApi, DEMO_SUBMIT_FAIL_EMAIL } from '../mockApi';
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
    <div className="w-full max-w-md mx-auto space-y-6">
      {/* Demo helper */}
      <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
        <Sparkles className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-slate-200">Final Step:</span> Select 1 to 5 vibes.
          Tip: Set email to <span className="font-mono text-amber-300">{DEMO_SUBMIT_FAIL_EMAIL}</span>{' '}
          to simulate submission error retry.
        </div>
      </div>

      {errorMsg && (
        <Toast
          type="error"
          title="Submission Failed"
          message={errorMsg}
          onClose={() => setErrorMsg(null)}
          onRetry={handleSubmit(onSubmit)}
          retryText="Retry Submission"
        />
      )}

      {/* Review Snapshot Card */}
      <div className="bg-[#111726] border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-400 flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5" /> Profile Snapshot
          </span>
          <span className="text-xs text-slate-400 font-mono">
            {state.draft.pronouns || 'Not specified'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Full Name & Age</span>
            <span className="font-semibold text-white">
              {state.draft.fullName || 'Anonymous'} ({state.draft.age || '—'})
            </span>
          </div>

          <div>
            <span className="text-slate-400 block text-[11px]">Campus / City</span>
            <span className="font-semibold text-white truncate block">
              {state.draft.city || '—'}, {state.draft.state || '—'}
            </span>
          </div>
        </div>

        {state.draft.bio && (
          <p className="text-xs text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
            "{state.draft.bio}"
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Vibes Tag Selector */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Select Your Vibes (1 to 5) <span className="text-brand-500">*</span>
            </label>
            <span
              className={clsx(
                'text-xs font-medium',
                selectedVibes.length >= 5 ? 'text-amber-400' : 'text-slate-400'
              )}
            >
              {selectedVibes.length}/5 selected
            </span>
          </div>

          <div
            role="group"
            aria-label="Select Vibes"
            className="flex flex-wrap gap-2 pt-1"
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
                    'px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-150 flex items-center gap-1.5 touch-target border',
                    isSelected
                      ? 'bg-brand-500 text-white border-brand-500 shadow-md shadow-brand-500/20'
                      : 'bg-[#111726] text-slate-300 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800'
                  )}
                >
                  <span aria-hidden="true">{vibe.emoji}</span>
                  <span>{vibe.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 ml-0.5" />}
                </button>
              );
            })}
          </div>

          {errors.vibes?.message && (
            <p role="alert" className="text-xs font-medium text-red-400 mt-1">
              {errors.vibes.message}
            </p>
          )}
        </div>

        {/* Discovery Preference Toggle */}
        <div className="p-3.5 rounded-xl bg-[#111726] border border-slate-800 flex items-center justify-between">
          <div className="space-y-0.5 pr-3">
            <label htmlFor="discovery-toggle" className="text-xs font-bold text-white flex items-center gap-1.5 cursor-pointer">
              <Eye className="w-3.5 h-3.5 text-brand-400" />
              Community Discovery
            </label>
            <p className="text-[11px] text-slate-400">
              Allow verified students in your university to discover your profile.
            </p>
          </div>

          <input
            id="discovery-toggle"
            type="checkbox"
            checked={allowDiscovery}
            onChange={(e) => setValue('allowDiscovery', e.target.checked)}
            className="w-5 h-5 rounded accent-brand-500 cursor-pointer touch-target shrink-0"
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
                  className="w-5 h-5 mt-0.5 rounded accent-brand-500 cursor-pointer touch-target shrink-0"
                />
              )}
            />
            <label htmlFor="terms-checkbox" className="text-xs text-slate-300 leading-relaxed cursor-pointer">
              I have read and agree to the{' '}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-brand-400 hover:text-brand-300 underline font-semibold inline-flex items-center gap-0.5"
              >
                <FileText className="w-3 h-3" /> Terms & Conditions
              </button>{' '}
              and community safety guidelines.
            </label>
          </div>

          {errors.termsAccepted?.message && (
            <p role="alert" className="text-xs font-medium text-red-400 mt-1">
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
        <div className="space-y-3 text-xs leading-relaxed text-slate-300 max-h-60 overflow-y-auto pr-2">
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
