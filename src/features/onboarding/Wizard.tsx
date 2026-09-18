import React from 'react';
import { useOnboarding } from './store/OnboardingContext';
import { Progress } from '../../components/ui/Progress';
import { Step1Identity } from './steps/Step1Identity';
import { Step2Profile } from './steps/Step2Profile';
import { Step3Location } from './steps/Step3Location';
import { Step4Preferences } from './steps/Step4Preferences';
import { useNavigate } from 'react-router-dom';

export const Wizard: React.FC = () => {
  const { state, prevStep } = useOnboarding();
  const navigate = useNavigate();

  const handleBack = () => {
    if (state.currentStep === 1) {
      navigate('/');
    } else {
      prevStep();
    }
  };

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 1:
        return <Step1Identity />;
      case 2:
        return <Step2Profile />;
      case 3:
        return <Step3Location />;
      case 4:
        return <Step4Preferences />;
      default:
        return <Step1Identity />;
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-10">
      <div className="bg-[#131926]/90 border border-slate-800 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl">
        <Progress
          currentStep={state.currentStep}
          totalSteps={4}
          onBack={handleBack}
          canGoBack={true}
        />

        <div className="mt-4 transition-all duration-200">
          {renderCurrentStep()}
        </div>
      </div>
    </div>
  );
};
