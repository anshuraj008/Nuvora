import React from 'react';
import { AlertTriangle, CheckCircle2, Info, X, RefreshCw } from 'lucide-react';
import { clsx } from 'clsx';

export interface ToastProps {
  type?: 'error' | 'success' | 'info' | 'warning';
  title: string;
  message?: string;
  onClose?: () => void;
  onRetry?: () => void;
  retryText?: string;
}

export const Toast: React.FC<ToastProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  onRetry,
  retryText = 'Retry',
}) => {
  const configs = {
    error: {
      bg: 'bg-red-950/90 border-red-500/50 text-red-200',
      icon: <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />,
      btn: 'bg-red-800 hover:bg-red-700 text-white',
    },
    success: {
      bg: 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />,
      btn: 'bg-emerald-800 hover:bg-emerald-700 text-white',
    },
    warning: {
      bg: 'bg-amber-950/90 border-amber-500/50 text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" aria-hidden="true" />,
      btn: 'bg-amber-800 hover:bg-amber-700 text-white',
    },
    info: {
      bg: 'bg-sky-950/90 border-sky-500/50 text-sky-200',
      icon: <Info className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" aria-hidden="true" />,
      btn: 'bg-sky-800 hover:bg-sky-700 text-white',
    },
  };

  const config = configs[type];

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      className={clsx(
        'w-full p-4 rounded-xl border backdrop-blur-md shadow-lg flex items-start gap-3 transition-all animate-in fade-in slide-in-from-top-2 duration-200',
        config.bg
      )}
    >
      {config.icon}
      <div className="flex-1 text-sm">
        <h4 className="font-semibold text-white leading-snug">{title}</h4>
        {message && <p className="mt-0.5 text-xs opacity-90 leading-relaxed">{message}</p>}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className={clsx(
              'mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors touch-target min-h-[32px]',
              config.btn
            )}
          >
            <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
            {retryText}
          </button>
        )}
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close notification"
          className="p-1 -mr-1 -mt-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors touch-target"
        >
          <X className="w-4 h-4" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};
