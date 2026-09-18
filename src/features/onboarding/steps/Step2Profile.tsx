import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Calendar, ArrowRight, ShieldAlert } from 'lucide-react';
import { step2Schema, Step2FormData } from '../schemas';
import { useOnboarding } from '../store/OnboardingContext';
import { PRONOUN_OPTIONS } from '../data/locationData';
import { Field } from '../../../components/ui/Field';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { clsx } from 'clsx';

export const Step2Profile: React.FC = () => {
  const { state, updateDraft, nextStep } = useOnboarding();
  const [showAgeBlockModal, setShowAgeBlockModal] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setFocus,
    formState: { errors },
  } = useForm<Step2FormData>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      fullName: state.draft.fullName || '',
      age: state.draft.age !== null ? (state.draft.age as number) : ('' as unknown as number),
      pronouns: state.draft.pronouns || '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: Step2FormData) => {
    if (data.age < 18) {
      setShowAgeBlockModal(true);
      return;
    }
    updateDraft({
      fullName: data.fullName,
      age: data.age,
      pronouns: data.pronouns,
    });
    nextStep();
  };

  const onError = (formErrors: typeof errors) => {
    if (formErrors.fullName) {
      setFocus('fullName');
    } else if (formErrors.age) {
      setFocus('age');
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6" noValidate>
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Tell us about yourself
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Your name and pronouns are shown on your verified campus profile.
          </p>
        </div>

        {/* Full Name */}
        <Field
          label="Full Legal / Preferred Name"
          type="text"
          placeholder="e.g. Jordan Taylor"
          autoComplete="name"
          required
          leftIcon={<User className="w-5 h-5" />}
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        {/* Age */}
        <Field
          label="Your Age (Years)"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="e.g. 20"
          helperText="Must be 18 or older for campus safety and eligibility compliance."
          required
          leftIcon={<Calendar className="w-5 h-5" />}
          error={errors.age?.message}
          {...register('age')}
        />

        {/* Pronouns Selection */}
        <div className="space-y-2">
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300">
            Pronouns <span className="text-[#ff385c] ml-1" aria-hidden="true">*</span>
          </label>

          <Controller
            control={control}
            name="pronouns"
            render={({ field }) => (
              <div
                role="radiogroup"
                aria-label="Select Pronouns"
                className="grid grid-cols-2 sm:grid-cols-3 gap-2"
              >
                {PRONOUN_OPTIONS.map((option) => {
                  const isSelected = field.value === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="radio"
                      aria-checked={isSelected}
                      onClick={() => field.onChange(option.value)}
                      className={clsx(
                        'px-3.5 py-3 rounded-xl text-xs font-semibold transition-all border text-center touch-target',
                        isSelected
                          ? 'bg-[#ff385c]/15 border-[#ff385c] text-[#ff758c] shadow-sm shadow-[#ff385c]/20 ring-1 ring-[#ff385c]'
                          : 'bg-[#0a0e18] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50'
                      )}
                    >
                      {option.label}
                    </button>
                  );
                })}
              </div>
            )}
          />

          {errors.pronouns?.message && (
            <p role="alert" className="text-xs font-medium text-rose-400 mt-1">
              {errors.pronouns.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Campus & Location
        </Button>
      </form>

      {/* Under-18 Blocking Modal */}
      <Modal
        isOpen={showAgeBlockModal}
        onClose={() => setShowAgeBlockModal(false)}
        title="Age Requirement Restriction"
        footer={
          <Button
            variant="secondary"
            onClick={() => setShowAgeBlockModal(false)}
          >
            I Understand
          </Button>
        }
      >
        <div className="flex flex-col items-center text-center py-2 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <h4 className="text-base font-bold text-white">Age Verification Notice</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Nuvora is strictly limited to university students and individuals aged 18 and older in
            strict compliance with collegiate community safety guidelines.
          </p>
          <p className="text-xs text-slate-400">
            Please register once you attain the required eligibility age.
          </p>
        </div>
      </Modal>
    </div>
  );
};
