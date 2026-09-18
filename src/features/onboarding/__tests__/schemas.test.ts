import { describe, it, expect } from 'vitest';
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  emailSchema,
  otpSchema,
} from '../schemas';

describe('Validation Schemas', () => {
  describe('Email & OTP Schemas', () => {
    it('validates correct email formats and trims whitespace', () => {
      const valid = emailSchema.parse('  student@stanford.edu  ');
      expect(valid).toBe('student@stanford.edu');
    });

    it('rejects invalid emails', () => {
      expect(() => emailSchema.parse('not-an-email')).toThrow();
      expect(() => emailSchema.parse('')).toThrow();
      expect(() => emailSchema.parse('   ')).toThrow();
    });

    it('validates 6-digit numeric OTP code', () => {
      expect(otpSchema.parse('123456')).toBe('123456');
    });

    it('validates step1Schema object with email', () => {
      const res = step1Schema.parse({ email: 'alex@ucla.edu' });
      expect(res.email).toBe('alex@ucla.edu');
    });

    it('rejects OTP with non-digits or wrong length', () => {
      expect(() => otpSchema.parse('12345')).toThrow();
      expect(() => otpSchema.parse('1234567')).toThrow();
      expect(() => otpSchema.parse('12345a')).toThrow();
    });
  });

  describe('Step 2 Profile Schema', () => {
    it('accepts valid name, age >= 18, and pronouns', () => {
      const result = step2Schema.parse({
        fullName: 'Jordan Taylor',
        age: '21',
        pronouns: 'they/them',
      });
      expect(result.fullName).toBe('Jordan Taylor');
      expect(result.age).toBe(21);
      expect(result.pronouns).toBe('they/them');
    });

    it('rejects under-18 age with explicit error message', () => {
      const parseAttempt = () =>
        step2Schema.parse({
          fullName: 'Alex Student',
          age: 16,
          pronouns: 'she/her',
        });
      expect(parseAttempt).toThrow('You must be at least 18 years old to join Nuvora');
    });

    it('rejects blank or short names', () => {
      expect(() =>
        step2Schema.parse({
          fullName: ' ',
          age: 20,
          pronouns: 'he/him',
        })
      ).toThrow();

      expect(() =>
        step2Schema.parse({
          fullName: 'A',
          age: 20,
          pronouns: 'he/him',
        })
      ).toThrow('Name must be at least 2 characters');
    });
  });

  describe('Step 3 Location Schema', () => {
    it('validates required state and city with optional bio', () => {
      const result = step3Schema.parse({
        state: 'CA',
        city: 'berkeley',
        college: 'UC Berkeley',
        bio: 'CS student passionate about AI',
      });
      expect(result.state).toBe('CA');
      expect(result.city).toBe('berkeley');
      expect(result.college).toBe('UC Berkeley');
    });

    it('fails when state or city is missing', () => {
      expect(() =>
        step3Schema.parse({
          state: '',
          city: 'berkeley',
        })
      ).toThrow('Please select your state');
    });
  });

  describe('Step 4 Preferences Schema', () => {
    it('requires at least 1 vibe and accepted terms', () => {
      const result = step4Schema.parse({
        vibes: ['tech', 'coffee'],
        allowDiscovery: true,
        termsAccepted: true,
      });
      expect(result.vibes).toHaveLength(2);
      expect(result.termsAccepted).toBe(true);
    });

    it('rejects empty vibes selection', () => {
      expect(() =>
        step4Schema.parse({
          vibes: [],
          allowDiscovery: true,
          termsAccepted: true,
        })
      ).toThrow('Please select at least 1 vibe');
    });

    it('rejects unaccepted terms', () => {
      expect(() =>
        step4Schema.parse({
          vibes: ['tech'],
          allowDiscovery: true,
          termsAccepted: false,
        })
      ).toThrow('You must agree to the Terms & Conditions');
    });
  });
});
