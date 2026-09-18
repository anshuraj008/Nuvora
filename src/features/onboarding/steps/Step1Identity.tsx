import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, ShieldCheck, ArrowRight, Edit2, Clock, Info } from 'lucide-react';
import { step1Schema, Step1FormData } from '../schemas';
import { useOnboarding } from '../store/OnboardingContext';
import { mockApi, DEMO_VALID_OTP, DEMO_FAIL_EMAIL } from '../mockApi';
import { Field } from '../../../components/ui/Field';
import { Button } from '../../../components/ui/Button';
import { OtpInput } from '../../../components/ui/OtpInput';
import { Toast } from '../../../components/ui/Toast';

export const Step1Identity: React.FC = () => {
  const { state, updateDraft, setEmailVerified, nextStep } = useOnboarding();
  const [stepMode, setStepMode] = useState<'email' | 'otp'>(
    state.draft.emailVerified ? 'otp' : 'email'
  );
  const [otpValue, setOtpValue] = useState(state.draft.otp || '');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      email: state.draft.email || '',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (state.draft.email) {
      setValue('email', state.draft.email);
    }
  }, [state.draft.email, setValue]);

  // Resend OTP countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (stepMode === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [stepMode, resendTimer]);

  const onEmailSubmit = async (data: Step1FormData) => {
    setErrorMsg(null);
    setIsLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      await mockApi.verifyEmail(data.email, abortControllerRef.current.signal);
      updateDraft({ email: data.email });
      setStepMode('otp');
      setResendTimer(30);
      setCanResend(false);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      const message = err instanceof Error ? err.message : 'Failed to send verification code';
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const onOtpSubmit = async (codeToVerify?: string) => {
    const code = codeToVerify || otpValue;
    if (code.length < 6) {
      setErrorMsg('Please enter all 6 digits of the verification code.');
      return;
    }

    setErrorMsg(null);
    setIsLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    try {
      await mockApi.verifyOtp(code, abortControllerRef.current.signal);
      updateDraft({ otp: code });
      setEmailVerified(true);
      nextStep();
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      const message = err instanceof Error ? err.message : 'Invalid verification code';
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || isLoading) return;
    setErrorMsg(null);
    setIsLoading(true);
    try {
      await mockApi.verifyEmail(state.draft.email);
      setResendTimer(30);
      setCanResend(false);
      setOtpValue('');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to resend code';
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Demo testing banner hint */}
      <div className="mb-5 p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="leading-relaxed">
          <span className="font-semibold text-slate-200">Demo Testing Guide:</span> Demo OTP is{' '}
          <span className="font-mono bg-brand-500/20 text-brand-300 px-1 py-0.5 rounded font-bold">
            {DEMO_VALID_OTP}
          </span>
          . Use <span className="font-mono text-amber-300">{DEMO_FAIL_EMAIL}</span> to test network
          error retry.
        </div>
      </div>

      {errorMsg && (
        <div className="mb-5">
          <Toast
            type="error"
            title="Verification Error"
            message={errorMsg}
            onClose={() => setErrorMsg(null)}
            onRetry={stepMode === 'email' ? handleSubmit(onEmailSubmit) : () => onOtpSubmit()}
            retryText="Try Again"
          />
        </div>
      )}

      {stepMode === 'email' ? (
        <form onSubmit={handleSubmit(onEmailSubmit)} className="space-y-6" noValidate>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">What's your email address?</h3>
            <p className="text-sm text-slate-400">
              We'll send a 6-digit verification code to confirm your student/personal identity.
            </p>
          </div>

          <Field
            label="Email Address"
            type="email"
            placeholder="alex@university.edu"
            autoComplete="email"
            required
            leftIcon={<Mail className="w-5 h-5" />}
            error={errors.email?.message}
            {...register('email')}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
            loadingText="Sending Code..."
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Send Verification Code
          </Button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Enter Verification Code</h3>
              <button
                type="button"
                onClick={() => {
                  setStepMode('email');
                  setErrorMsg(null);
                }}
                className="text-xs text-brand-400 hover:text-brand-300 inline-flex items-center gap-1 font-medium touch-target"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Change Email
              </button>
            </div>
            <p className="text-sm text-slate-400">
              Sent to <span className="font-semibold text-slate-200">{state.draft.email}</span>
            </p>
          </div>

          <div className="py-2">
            <OtpInput
              value={otpValue}
              onChange={(val) => {
                setOtpValue(val);
                if (errorMsg) setErrorMsg(null);
              }}
              onComplete={(fullCode) => {
                onOtpSubmit(fullCode);
              }}
              isError={Boolean(errorMsg)}
              disabled={isLoading}
              autoFocus
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-slate-500" aria-hidden="true" />
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={isLoading}
                  className="text-brand-400 hover:text-brand-300 font-semibold underline underline-offset-2 touch-target"
                >
                  Resend Code
                </button>
              ) : (
                <span>Resend code in {resendTimer}s</span>
              )}
            </div>

            <span className="text-slate-500">Paste code supported</span>
          </div>

          <Button
            type="button"
            onClick={() => onOtpSubmit()}
            variant="primary"
            fullWidth
            isLoading={isLoading}
            loadingText="Verifying Code..."
            disabled={otpValue.length < 6}
            leftIcon={<ShieldCheck className="w-4 h-4" />}
          >
            Verify & Continue
          </Button>
        </div>
      )}
    </div>
  );
};
