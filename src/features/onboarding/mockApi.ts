import { OnboardingDraft } from './types';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
}

const delay = (ms: number, signal?: AbortSignal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(new DOMException('Aborted', 'AbortError'));
      });
    }
  });

export const DEMO_VALID_OTP = '123456';
export const DEMO_FAIL_EMAIL = 'fail@example.com';
export const DEMO_SUBMIT_FAIL_EMAIL = 'submitfail@example.com';

export const mockApi = {
  /**
   * Simulates sending a verification code to user's email.
   * Trigger error by entering 'fail@example.com'.
   */
  async verifyEmail(email: string, signal?: AbortSignal): Promise<ApiResponse<{ email: string }>> {
    await delay(600, signal);

    const normalized = email.trim().toLowerCase();
    if (normalized === DEMO_FAIL_EMAIL || normalized.startsWith('error@')) {
      throw new Error(
        'Simulated network failure: Could not deliver verification code. (Demo failure for testing error retry)'
      );
    }

    return {
      success: true,
      data: { email: normalized },
      message: 'Verification code sent successfully.',
    };
  },

  /**
   * Simulates verifying the 6-digit OTP code.
   * Valid code is 123456.
   */
  async verifyOtp(code: string, signal?: AbortSignal): Promise<ApiResponse<{ verified: boolean }>> {
    await delay(500, signal);

    if (code !== DEMO_VALID_OTP) {
      throw new Error(
        `Invalid verification code entered. Please enter the demo code: ${DEMO_VALID_OTP}`
      );
    }

    return {
      success: true,
      data: { verified: true },
      message: 'Email verified successfully!',
    };
  },

  /**
   * Simulates final profile submission.
   * Trigger error by entering 'submitfail@example.com' on step 1.
   */
  async submitProfile(
    payload: OnboardingDraft,
    signal?: AbortSignal
  ): Promise<ApiResponse<{ profileId: string }>> {
    await delay(800, signal);

    if (payload.email.toLowerCase() === DEMO_SUBMIT_FAIL_EMAIL) {
      throw new Error(
        'Simulated server error: Unable to create account right now. Please try again. (Demo submit failure trigger)'
      );
    }

    return {
      success: true,
      data: { profileId: 'nuv_' + Math.random().toString(36).substring(2, 9) },
      message: 'Welcome to Nuvora! Profile successfully created.',
    };
  },
};
