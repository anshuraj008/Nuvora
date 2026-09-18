import React, { createContext, useContext, useReducer } from 'react';
import { OnboardingState, OnboardingAction, OnboardingDraft } from '../types';

const STORAGE_KEY = 'nuvora_onboarding_draft_v1';

const initialDraft: OnboardingDraft = {
  email: '',
  otp: '',
  emailVerified: false,
  fullName: '',
  age: null,
  pronouns: '',
  state: '',
  city: '',
  college: '',
  bio: '',
  vibes: [],
  allowDiscovery: true,
  termsAccepted: false,
};

const initialState: OnboardingState = {
  currentStep: 1,
  draft: initialDraft,
  requestStatus: 'idle',
  lastError: null,
  isCompleted: false,
  ageBlocked: false,
};

function loadStoredDraft(): Partial<OnboardingDraft> | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Ignore storage parse errors
  }
  return null;
}

function saveDraftToStorage(draft: OnboardingDraft) {
  try {
    // Minimal non-sensitive draft persistence
    const toSave: Partial<OnboardingDraft> = {
      email: draft.email,
      emailVerified: draft.emailVerified,
      fullName: draft.fullName,
      age: draft.age,
      pronouns: draft.pronouns,
      state: draft.state,
      city: draft.city,
      college: draft.college,
      bio: draft.bio,
      vibes: draft.vibes,
      allowDiscovery: draft.allowDiscovery,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch {
    // Storage quota or disabled fallback
  }
}

function onboardingReducer(state: OnboardingState, action: OnboardingAction): OnboardingState {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        currentStep: Math.max(1, Math.min(4, action.payload)),
        lastError: null,
      };

    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(4, state.currentStep + 1),
        lastError: null,
      };

    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(1, state.currentStep - 1),
        lastError: null,
      };

    case 'UPDATE_DRAFT': {
      const updatedDraft = { ...state.draft, ...action.payload };
      saveDraftToStorage(updatedDraft);
      return {
        ...state,
        draft: updatedDraft,
      };
    }

    case 'SET_EMAIL_VERIFIED': {
      const updatedDraft = { ...state.draft, emailVerified: action.payload };
      saveDraftToStorage(updatedDraft);
      return {
        ...state,
        draft: updatedDraft,
      };
    }

    case 'SET_REQUEST_STATUS':
      return {
        ...state,
        requestStatus: action.payload.status,
        lastError: action.payload.error !== undefined ? action.payload.error : state.lastError,
      };

    case 'SET_AGE_BLOCKED':
      return {
        ...state,
        ageBlocked: action.payload,
      };

    case 'COMPLETE_ONBOARDING':
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      return {
        ...state,
        isCompleted: true,
        requestStatus: 'success',
      };

    case 'RESET':
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

interface OnboardingContextValue {
  state: OnboardingState;
  dispatch: React.Dispatch<OnboardingAction>;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateDraft: (fields: Partial<OnboardingDraft>) => void;
  setEmailVerified: (verified: boolean) => void;
  resetOnboarding: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(onboardingReducer, initialState, (defaultInit) => {
    const saved = loadStoredDraft();
    if (saved) {
      return {
        ...defaultInit,
        draft: {
          ...defaultInit.draft,
          ...saved,
        },
        currentStep: saved.emailVerified ? 2 : 1,
      };
    }
    return defaultInit;
  });

  const setStep = (step: number) => dispatch({ type: 'SET_STEP', payload: step });
  const nextStep = () => dispatch({ type: 'NEXT_STEP' });
  const prevStep = () => dispatch({ type: 'PREV_STEP' });
  const updateDraft = (fields: Partial<OnboardingDraft>) =>
    dispatch({ type: 'UPDATE_DRAFT', payload: fields });
  const setEmailVerified = (verified: boolean) =>
    dispatch({ type: 'SET_EMAIL_VERIFIED', payload: verified });
  const resetOnboarding = () => dispatch({ type: 'RESET' });

  return (
    <OnboardingContext.Provider
      value={{
        state,
        dispatch,
        setStep,
        nextStep,
        prevStep,
        updateDraft,
        setEmailVerified,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
