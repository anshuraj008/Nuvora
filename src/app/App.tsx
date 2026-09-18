import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { OnboardingProvider } from '../features/onboarding/store/OnboardingContext';
import { AppRoutes } from './router';
import { DemoGuideDrawer } from '../components/ui/DemoGuideDrawer';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <OnboardingProvider>
        <AppRoutes />
        <DemoGuideDrawer />
      </OnboardingProvider>
    </BrowserRouter>
  );
};

export default App;
