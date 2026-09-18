import React, { useId } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChevronDown, AlertCircle } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  placeholder?: string;
  containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      options,
      error,
      helperText,
      placeholder = 'Select an option',
      className,
      containerClassName,
      id: customId,
      disabled,
      required,
      value,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const selectId = customId || generatedId;
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;
    const isInvalid = Boolean(error);

    return (
      <div className={twMerge('w-full flex flex-col space-y-1.5', containerClassName)}>
        <label
          htmlFor={selectId}
          className="block text-xs font-semibold uppercase tracking-wider text-slate-300"
        >
          {label}
          {required && <span className="text-brand-500 ml-1" aria-hidden="true">*</span>}
        </label>

        <div className="relative flex items-center">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            required={required}
            value={value}
            aria-invalid={isInvalid}
            aria-describedby={clsx(
              isInvalid && errorId,
              helperText && !isInvalid && helperId
            )}
            className={twMerge(
              clsx(
                'w-full appearance-none bg-[#111726] text-slate-100 rounded-xl px-4 py-3 pr-10 text-sm transition-all duration-150 border touch-target cursor-pointer',
                'focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500',
                isInvalid
                  ? 'border-red-500/80 bg-red-500/[0.03] focus:ring-red-500 focus:border-red-500'
                  : 'border-slate-700/70 hover:border-slate-600',
                disabled && 'opacity-50 cursor-not-allowed bg-slate-900',
                !value && 'text-slate-400',
                className
              )
            )}
            {...props}
          >
            <option value="" disabled className="bg-[#131926] text-slate-400">
              {placeholder}
            </option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-[#131926] text-slate-100 py-1">
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 flex items-center pointer-events-none text-slate-400">
            {isInvalid ? (
              <AlertCircle className="w-5 h-5 text-red-400" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5" aria-hidden="true" />
            )}
          </div>
        </div>

        {isInvalid && (
          <p id={errorId} role="alert" className="text-xs font-medium text-red-400 mt-1">
            {error}
          </p>
        )}

        {helperText && !isInvalid && (
          <p id={helperId} className="text-xs text-slate-400 mt-1">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';
