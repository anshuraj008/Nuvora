export interface OnboardingDraft {
  // Step 1 - Identity & Verification
  email: string;
  otp: string;
  emailVerified: boolean;

  // Step 2 - Profile
  fullName: string;
  age: number | null;
  pronouns: string;

  // Step 3 - Location & College
  state: string;
  city: string;
  college: string;
  bio: string;

  // Step 4 - Vibes & Preferences
  vibes: string[];
  allowDiscovery: boolean;
  termsAccepted: boolean;
}

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

export interface OnboardingState {
  currentStep: number;
  draft: OnboardingDraft;
  requestStatus: RequestStatus;
  lastError: string | null;
  isCompleted: boolean;
  ageBlocked: boolean;
}

export type OnboardingAction =
  | { type: 'SET_STEP'; payload: number }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'UPDATE_DRAFT'; payload: Partial<OnboardingDraft> }
  | { type: 'SET_EMAIL_VERIFIED'; payload: boolean }
  | { type: 'SET_REQUEST_STATUS'; payload: { status: RequestStatus; error?: string | null } }
  | { type: 'SET_AGE_BLOCKED'; payload: boolean }
  | { type: 'RESET' }
  | { type: 'COMPLETE_ONBOARDING' };
