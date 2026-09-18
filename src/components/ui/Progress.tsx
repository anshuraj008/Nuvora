import React from 'react';
import { clsx } from 'clsx';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

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
  stepTitles = ['Identity & OTP', 'Profile & Age', 'Campus & City', 'Vibes & Review'],
  onBack,
  canGoBack = true,
}) => {
  const percentage = Math.round((currentStep / totalSteps) * 100);
  const currentTitle = stepTitles[currentStep - 1] || `Step ${currentStep}`;

  return (
    <div className="w-full mb-8">
      {/* Top row with Back navigation and Step Pill */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {canGoBack && onBack ? (
            <button
              type="button"
              onClick={onBack}
              aria-label="Go to previous step"
              className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors touch-target flex items-center justify-center border border-transparent hover:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            </button>
          ) : null}

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ff385c]/10 border border-[#ff385c]/25 text-[#ff385c] text-[10px] font-bold tracking-wider uppercase mb-1">
              <Sparkles className="w-3 h-3" /> Step {currentStep} of {totalSteps}
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
              {currentTitle}
            </h2>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-slate-400 font-mono">
            {percentage}% Complete
          </span>
        </div>
      </div>

      {/* Segmented Stepper Track */}
      <div
        role="progressbar"
        aria-valuenow={currentStep}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-valuetext={`Step ${currentStep} of ${totalSteps}: ${currentTitle}`}
        className="w-full grid grid-cols-4 gap-2"
      >
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNum = idx + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={idx} className="space-y-1.5">
              <div
                className={clsx(
                  'h-1.5 rounded-full transition-all duration-300',
                  isCompleted
                    ? 'bg-[#ff385c]'
                    : isCurrent
                    ? 'bg-gradient-to-r from-[#ff385c] to-[#ff758c] shadow-sm shadow-[#ff385c]/50'
                    : 'bg-slate-800/80'
                )}
              />
              <div className="flex items-center justify-between px-0.5">
                <span
                  className={clsx(
                    'text-[10px] font-semibold flex items-center gap-1 transition-colors',
                    isCompleted
                      ? 'text-[#ff385c]'
                      : isCurrent
                      ? 'text-white'
                      : 'text-slate-600'
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-3 h-3 text-[#ff385c] stroke-[3]" />
                  ) : (
                    <span>0{stepNum}</span>
                  )}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
