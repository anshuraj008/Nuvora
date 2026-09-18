import React, { useRef, useEffect } from 'react';
import { clsx } from 'clsx';

export interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  isError?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}

export const OtpInput: React.FC<OtpInputProps> = ({
  length = 6,
  value,
  onChange,
  onComplete,
  isError = false,
  disabled = false,
  autoFocus = true,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (autoFocus && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [autoFocus]);

  const digits = Array.from({ length }, (_, i) => value[i] || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const rawVal = e.target.value;
    const char = rawVal.replace(/[^0-9]/g, '').slice(-1);

    const newDigits = [...digits];
    newDigits[index] = char;
    const combined = newDigits.join('');
    onChange(combined);

    if (char && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (combined.length === length && onComplete) {
      onComplete(combined);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim().replace(/[^0-9]/g, '').slice(0, length);
    if (!pasteData) return;

    onChange(pasteData);

    const focusIndex = Math.min(pasteData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();

    if (pasteData.length === length && onComplete) {
      onComplete(pasteData);
    }
  };

  return (
    <div
      role="group"
      aria-label="Verification Code Input"
      className="flex justify-between items-center gap-2 sm:gap-3 my-2"
    >
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          autoComplete="one-time-code"
          value={digits[index] || ''}
          disabled={disabled}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-invalid={isError}
          className={clsx(
            'w-11 h-13 sm:w-13 sm:h-15 text-center text-xl sm:text-2xl font-bold rounded-xl transition-all duration-150',
            'bg-[#111726] border text-white touch-target',
            'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
            isError
              ? 'border-red-500 bg-red-500/10 text-red-300 focus:ring-red-500'
              : digits[index]
              ? 'border-brand-500/60 bg-brand-500/5'
              : 'border-slate-700 hover:border-slate-600',
            disabled && 'opacity-50 cursor-not-allowed bg-slate-900'
          )}
        />
      ))}
    </div>
  );
};
