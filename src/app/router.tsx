import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage';
import { TermsPage } from '../pages/TermsPage';
import { SignupPage } from '../pages/SignupPage';
import { SuccessPage } from '../pages/SuccessPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
