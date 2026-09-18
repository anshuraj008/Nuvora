import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { OnboardingProvider } from '../features/onboarding/store/OnboardingContext';
import { AppRoutes } from './router';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <OnboardingProvider>
        <AppRoutes />
      </OnboardingProvider>
    </BrowserRouter>
  );
};

export default App;
