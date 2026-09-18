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
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6" noValidate>
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">Tell us about yourself</h3>
          <p className="text-sm text-slate-400">
            This information will appear on your public Nuvora profile.
          </p>
        </div>

        {/* Full Name */}
        <Field
          label="Full Name"
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
          label="Age"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="e.g. 20"
          helperText="Must be 18 or older to participate in campus events."
          required
          leftIcon={<Calendar className="w-5 h-5" />}
          error={errors.age?.message}
          {...register('age')}
        />

        {/* Pronouns Selection */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
            Pronouns <span className="text-brand-500 ml-1" aria-hidden="true">*</span>
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
                        'px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border text-center touch-target',
                        isSelected
                          ? 'bg-brand-500/15 border-brand-500 text-brand-300 shadow-sm'
                          : 'bg-[#111726] border-slate-700/80 text-slate-300 hover:border-slate-600 hover:bg-slate-800/40'
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
            <p role="alert" className="text-xs font-medium text-red-400 mt-1">
              {errors.pronouns.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Location
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
          <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-white">Age Verification Notice</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Nuvora is currently strictly restricted to university students and individuals aged 18
            and older in compliance with campus community safety standards and privacy policies.
          </p>
          <p className="text-xs text-slate-400">
            Please verify your age once you become eligible to join.
          </p>
        </div>
      </Modal>
    </div>
  );
};
