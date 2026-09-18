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
          className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300"
        >
          {label}
          {required && <span className="text-[#ff385c] ml-1" aria-hidden="true">*</span>}
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
                'w-full appearance-none bg-[#0a0e18] text-white font-semibold rounded-xl px-4 py-3 pr-10 text-sm transition-all duration-200 border touch-target cursor-pointer shadow-inner',
                'focus:outline-none focus:ring-2 focus:ring-[#ff385c]/30 focus:border-[#ff385c] focus:bg-[#0c1220]',
                isInvalid
                  ? 'border-rose-500/80 bg-rose-500/[0.04] focus:ring-rose-500/30 focus:border-rose-500'
                  : 'border-slate-800 hover:border-slate-700',
                disabled && 'opacity-50 cursor-not-allowed bg-slate-900/50',
                className
              )
            )}
            {...props}
          >
            <option value="" disabled className="bg-[#0e131f] text-slate-500">
              {placeholder}
            </option>
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-[#0e131f] text-white font-medium py-2"
              >
                {opt.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 flex items-center pointer-events-none text-slate-400">
            {isInvalid ? (
              <AlertCircle className="w-5 h-5 text-rose-400" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-300" aria-hidden="true" />
            )}
          </div>
        </div>

        {isInvalid && (
          <p id={errorId} role="alert" className="text-xs font-medium text-rose-400 mt-1">
            {error}
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

Select.displayName = 'Select';
