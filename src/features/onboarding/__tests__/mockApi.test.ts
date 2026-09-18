import { describe, it, expect } from 'vitest';
import { mockApi, DEMO_VALID_OTP, DEMO_FAIL_EMAIL, DEMO_SUBMIT_FAIL_EMAIL } from '../mockApi';
import { OnboardingDraft } from '../types';

describe('Mock API Service Contract', () => {
  describe('verifyEmail', () => {
    it('successfully sends code for valid normal emails', async () => {
      const res = await mockApi.verifyEmail('student@harvard.edu');
      expect(res.success).toBe(true);
      expect(res.data?.email).toBe('student@harvard.edu');
    });

    it('rejects with simulated network failure for DEMO_FAIL_EMAIL trigger', async () => {
      await expect(mockApi.verifyEmail(DEMO_FAIL_EMAIL)).rejects.toThrow(
        'Could not deliver verification code'
      );
    });
  });

  describe('verifyOtp', () => {
    it('accepts correct 6-digit demo code (123456)', async () => {
      const res = await mockApi.verifyOtp(DEMO_VALID_OTP);
      expect(res.success).toBe(true);
      expect(res.data?.verified).toBe(true);
    });

    it('rejects invalid or wrong OTP codes', async () => {
      await expect(mockApi.verifyOtp('000000')).rejects.toThrow('Invalid or expired verification code');
    });
  });

  describe('submitProfile', () => {
    const mockDraft: OnboardingDraft = {
      email: 'student@berkeley.edu',
      otp: '123456',
      emailVerified: true,
      fullName: 'Alex Rivera',
      age: 22,
      pronouns: 'they/them',
      state: 'JH',
      city: 'dumka',
      college: 'Sido Kanhu Murmu University (SKMU)',
      bio: 'Ready to connect!',
      vibes: ['tech', 'coffee'],
      allowDiscovery: true,
      termsAccepted: true,
    };

    it('successfully creates profile for regular draft payload', async () => {
      const res = await mockApi.submitProfile(mockDraft);
      expect(res.success).toBe(true);
      expect(res.data?.profileId).toMatch(/^nuv_/);
    });

    it('triggers simulated server failure for DEMO_SUBMIT_FAIL_EMAIL trigger', async () => {
      await expect(
        mockApi.submitProfile({
          ...mockDraft,
          email: DEMO_SUBMIT_FAIL_EMAIL,
        })
      ).rejects.toThrow('Unable to complete registration');
    });
  });
});
