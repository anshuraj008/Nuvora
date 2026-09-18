import React, { useId } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

export interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightAction?: React.ReactNode;
  containerClassName?: string;
  charCount?: { current: number; max: number };
}

export const Field = React.forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      label,
      error,
      helperText,
      success,
      leftIcon,
      rightAction,
      className,
      containerClassName,
      id: customId,
      disabled,
      required,
      charCount,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const fieldId = customId || generatedId;
    const errorId = `${fieldId}-error`;
    const helperId = `${fieldId}-helper`;

    const isInvalid = Boolean(error);

    return (
      <div className={twMerge('w-full flex flex-col space-y-1.5', containerClassName)}>
        <div className="flex justify-between items-center">
          <label
            htmlFor={fieldId}
            className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300"
          >
            {label}
            {required && <span className="text-[#ff385c] ml-1" aria-hidden="true">*</span>}
          </label>
          {charCount && (
            <span
              className={clsx(
                'text-[11px] font-mono',
                charCount.current >= charCount.max ? 'text-rose-400' : 'text-slate-500'
              )}
              aria-live="polite"
            >
              {charCount.current}/{charCount.max}
            </span>
          )}
        </div>

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={fieldId}
            disabled={disabled}
            required={required}
            aria-invalid={isInvalid}
            aria-describedby={clsx(
              isInvalid && errorId,
              helperText && !isInvalid && helperId
            )}
            className={twMerge(
              clsx(
                'w-full bg-[#0a0e18] text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 text-sm transition-all duration-200 border touch-target shadow-inner',
                'focus:outline-none focus:ring-2 focus:ring-[#ff385c]/30 focus:border-[#ff385c] focus:bg-[#0c1220]',
                leftIcon ? 'pl-11' : 'pl-4',
                rightAction || isInvalid || success ? 'pr-11' : 'pr-4',
                isInvalid
                  ? 'border-rose-500/80 bg-rose-500/[0.04] focus:ring-rose-500/30 focus:border-rose-500'
                  : 'border-slate-800 hover:border-slate-700',
                disabled && 'opacity-50 cursor-not-allowed bg-slate-900/50',
                className
              )
            )}
            {...props}
          />

          <div className="absolute right-3.5 flex items-center space-x-1.5">
            {rightAction}
            {isInvalid && (
              <AlertCircle className="w-5 h-5 text-rose-400 animate-pulse shrink-0" aria-hidden="true" />
            )}
            {success && !isInvalid && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" aria-hidden="true" />
            )}
          </div>
        </div>

        {isInvalid && (
          <p id={errorId} role="alert" className="text-xs font-medium text-rose-400 flex items-center gap-1 mt-1">
            <span>{error}</span>
          </p>
        )}

        {helperText && !isInvalid && (
          <p id={helperId} className="text-xs text-slate-400 mt-1 leading-relaxed">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Field.displayName = 'Field';
