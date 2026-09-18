import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      loadingText,
      disabled,
      leftIcon,
      rightIcon,
      fullWidth = false,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 select-none disabled:opacity-50 disabled:cursor-not-allowed touch-target active:scale-[0.98]';

    const variants = {
      primary:
        'bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 focus-visible:outline-brand-400 active:bg-brand-700',
      secondary:
        'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/60 focus-visible:outline-slate-400 active:bg-slate-900',
      outline:
        'bg-transparent hover:bg-slate-800/60 text-slate-200 border border-slate-700 hover:border-slate-600 focus-visible:outline-brand-400',
      ghost:
        'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white focus-visible:outline-brand-400',
      danger:
        'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 focus-visible:outline-red-400',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-2 min-h-[38px] gap-1.5',
      md: 'text-sm px-5 py-3 min-h-[46px] gap-2 font-semibold',
      lg: 'text-base px-6 py-3.5 min-h-[52px] gap-2.5 font-semibold',
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading}
        className={twMerge(
          clsx(
            baseStyles,
            variants[variant],
            sizes[size],
            fullWidth && 'w-full',
            className
          )
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" aria-hidden="true" />
            <span>{loadingText || children}</span>
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0" aria-hidden="true">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="shrink-0" aria-hidden="true">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
