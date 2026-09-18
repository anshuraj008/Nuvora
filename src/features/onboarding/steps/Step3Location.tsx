import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, GraduationCap } from 'lucide-react';
import { step3Schema, Step3FormData } from '../schemas';
import { useOnboarding } from '../store/OnboardingContext';
import { US_STATES, CITIES_BY_STATE } from '../data/locationData';
import { Select } from '../../../components/ui/Select';
import { Button } from '../../../components/ui/Button';
import { clsx } from 'clsx';

export const Step3Location: React.FC = () => {
  const { state, updateDraft, nextStep } = useOnboarding();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    setFocus,
    formState: { errors },
  } = useForm<Step3FormData>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      state: state.draft.state || '',
      city: state.draft.city || '',
      college: state.draft.college || '',
      bio: state.draft.bio || '',
    },
    mode: 'onBlur',
  });

  const selectedState = useWatch({ control, name: 'state' });
  const selectedCity = useWatch({ control, name: 'city' });
  const bioValue = useWatch({ control, name: 'bio' }) || '';

  // Filter cities by selected state
  const availableCities = selectedState ? CITIES_BY_STATE[selectedState] || [] : [];

  // Filter colleges by selected city
  const matchedCity = availableCities.find((c) => c.value === selectedCity);
  const suggestedColleges = matchedCity?.colleges || [];

  // Cross-field dependency cleanup: if state changes, reset city and college
  useEffect(() => {
    if (selectedState && state.draft.state && selectedState !== state.draft.state) {
      setValue('city', '');
      setValue('college', '');
    }
  }, [selectedState, state.draft.state, setValue]);

  const onSubmit = (data: Step3FormData) => {
    updateDraft({
      state: data.state,
      city: data.city,
      college: data.college,
      bio: data.bio,
    });
    nextStep();
  };

  const onError = (formErrors: typeof errors) => {
    if (formErrors.state) setFocus('state');
    else if (formErrors.city) setFocus('city');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6" noValidate>
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Campus & Location
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Discover peer matches, study groups, and campus events near your university area.
          </p>
        </div>

        {/* State Selection */}
        <Select
          label="State / Province"
          placeholder="Select your State"
          required
          options={US_STATES}
          error={errors.state?.message}
          {...register('state')}
        />

        {/* Dependent City Selection */}
        <Select
          label="City / Metro Area"
          placeholder={selectedState ? 'Select your City' : 'Please select a state first'}
          required
          disabled={!selectedState}
          options={availableCities.map((c) => ({ value: c.value, label: c.label }))}
          error={errors.city?.message}
          {...register('city')}
        />

        {/* Suggested College Selection or Custom Input */}
        <div className="space-y-1.5">
          <label
            htmlFor="college-input"
            className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300"
          >
            University / College (Optional)
          </label>

          <div className="relative">
            <input
              id="college-input"
              list="college-suggestions"
              type="text"
              placeholder="e.g. UC Berkeley, NYU, Harvard..."
              className={clsx(
                'w-full bg-[#0a0e18] text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm transition-all duration-200 border touch-target shadow-inner',
                'focus:outline-none focus:ring-2 focus:ring-[#ff385c]/30 focus:border-[#ff385c] focus:bg-[#0c1220] border-slate-800 hover:border-slate-700'
              )}
              {...register('college')}
            />
            <datalist id="college-suggestions">
              {suggestedColleges.map((col) => (
                <option key={col} value={col} />
              ))}
            </datalist>
          </div>

          {suggestedColleges.length > 0 && (
            <div className="pt-1.5 flex flex-wrap gap-1.5 items-center">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                <GraduationCap className="w-3.5 h-3.5 text-[#ff758c]" /> Quick pick:
              </span>
              {suggestedColleges.slice(0, 3).map((col) => (
                <button
                  key={col}
                  type="button"
                  onClick={() => setValue('college', col)}
                  className="text-[11px] bg-[#141b2d] hover:bg-[#1e2740] text-slate-200 px-2.5 py-1 rounded-lg border border-slate-700/60 transition-all font-medium"
                >
                  {col}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Bio / About */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label
              htmlFor="bio-input"
              className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300"
            >
              Short Bio / Campus Vibe (Optional)
            </label>
            <span
              className={clsx(
                'text-[11px] font-mono',
                bioValue.length >= 160 ? 'text-rose-400' : 'text-slate-500'
              )}
            >
              {bioValue.length}/160
            </span>
          </div>

          <textarea
            id="bio-input"
            rows={3}
            maxLength={160}
            placeholder="Introduce yourself to future study partners, clubs, or roommates..."
            className={clsx(
              'w-full bg-[#0a0e18] text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm transition-all duration-200 border resize-none shadow-inner',
              'focus:outline-none focus:ring-2 focus:ring-[#ff385c]/30 focus:border-[#ff385c] focus:bg-[#0c1220] border-slate-800 hover:border-slate-700'
            )}
            {...register('bio')}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          size="lg"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Vibes & Review
        </Button>
      </form>
    </div>
  );
};
