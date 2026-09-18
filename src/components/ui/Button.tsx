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
      'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 select-none disabled:opacity-50 disabled:cursor-not-allowed touch-target active:scale-[0.98]';

    const variants = {
      primary:
        'bg-gradient-to-r from-[#ff385c] via-[#ff4d6d] to-[#ff5a78] hover:from-[#e11d48] hover:to-[#f43f5e] text-white shadow-lg shadow-[#ff385c]/25 border border-white/15 focus-visible:outline-[#ff385c]',
      secondary:
        'bg-[#121826] hover:bg-[#1a2236] text-slate-200 border border-slate-700/80 hover:border-slate-600 focus-visible:outline-slate-400 shadow-sm',
      outline:
        'bg-transparent hover:bg-slate-800/60 text-slate-200 border border-slate-700 hover:border-slate-500 focus-visible:outline-[#ff385c]',
      ghost:
        'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white focus-visible:outline-[#ff385c]',
      danger:
        'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg shadow-red-600/20 border border-white/10 focus-visible:outline-red-500',
    };

    const sizes = {
      sm: 'text-xs px-3.5 py-2 min-h-[38px] gap-1.5 font-medium tracking-wide',
      md: 'text-sm px-5 py-2.5 min-h-[46px] gap-2 font-semibold tracking-wide',
      lg: 'text-base px-6 py-3.5 min-h-[52px] gap-2.5 font-semibold tracking-wide',
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
