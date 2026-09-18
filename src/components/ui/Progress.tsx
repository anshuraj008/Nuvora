import React from 'react';
import { clsx } from 'clsx';
import { ArrowLeft } from 'lucide-react';

export interface ProgressProps {
  currentStep: number; // 1 to 4
  totalSteps?: number;
  stepTitles?: string[];
  onBack?: () => void;
  canGoBack?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  currentStep,
  totalSteps = 4,
  stepTitles = ['Identity', 'Profile', 'Location', 'Vibes'],
  onBack,
  canGoBack = true,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  const currentTitle = stepTitles[currentStep - 1] || `Step ${currentStep}`;

  return (
    <div className="w-full mb-6">
      {/* Top row with Back button and Step counter */}
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center space-x-2">
          {canGoBack && onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go to previous step"
              className="p-2 -ml-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors touch-target flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" aria-hidden="true" />
            </button>
          ) : null}
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-400">
              Step {currentStep} of {totalSteps}
            </span>
            <h2 className="text-lg font-bold text-white leading-tight">{currentTitle}</h2>
          </div>
        </div>

        <span className="text-xs font-medium text-slate-400 tabular-nums">
          {percentage}% Complete
        </span>
      </div>

      {/* Accessible Progress Bar */}
      <div
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuetext={`Step ${currentStep} of ${totalSteps}: ${currentTitle}`}
        className="w-full bg-slate-800 h-2 rounded-full overflow-hidden flex"
      >
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div
              key={idx}
              className={clsx(
                'h-full flex-1 transition-all duration-300 border-r border-slate-900 last:border-r-0',
                isCompleted
                  ? 'bg-brand-500'
                  : isCurrent
                  ? 'bg-brand-400'
                  : 'bg-slate-800'
              )}
            />
          );
        })}
      </div>
    </div>
  );
};
