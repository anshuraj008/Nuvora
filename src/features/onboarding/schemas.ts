import { z } from 'zod';

export const emailSchema = z
  .string({ required_error: 'Email address is required' })
  .trim()
  .min(1, 'Email address is required')
  .email('Please enter a valid email address (e.g., alex@university.edu)')
  .max(100, 'Email address is too long');

export const otpSchema = z
  .string({ required_error: 'Verification code is required' })
  .trim()
  .length(6, 'Verification code must be exactly 6 digits')
  .regex(/^\d+$/, 'Verification code must only contain digits');

export const step1Schema = z.object({
  email: emailSchema,
});

export const step2Schema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name cannot exceed 50 characters')
    .refine((val) => val.length > 0, 'Name cannot be blank'),
  age: z
    .union([z.number(), z.string()])
    .transform((val) => (typeof val === 'string' ? parseInt(val, 10) : val))
    .pipe(
      z
        .number({ invalid_type_error: 'Please enter a valid age' })
        .int('Age must be a whole number')
        .min(18, 'You must be at least 18 years old to join Nuvora')
        .max(120, 'Please enter a realistic age')
    ),
  pronouns: z
    .string({ required_error: 'Please select your pronouns' })
    .min(1, 'Please select your pronouns'),
});

export const step3Schema = z.object({
  state: z
    .string({ required_error: 'Please select your state' })
    .min(1, 'Please select your state'),
  city: z
    .string({ required_error: 'Please select your city' })
    .min(1, 'Please select your city'),
  college: z
    .string()
    .trim()
    .max(100, 'College/University name cannot exceed 100 characters')
    .optional()
    .default(''),
  bio: z
    .string()
    .trim()
    .max(160, 'Bio cannot exceed 160 characters')
    .optional()
    .default(''),
});

export const step4Schema = z.object({
  vibes: z
    .array(z.string())
    .min(1, 'Please select at least 1 vibe')
    .max(5, 'You can select up to 5 vibes'),
  allowDiscovery: z.boolean().default(true),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to the Terms & Conditions to complete signup' }),
  }),
});

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type Step4FormData = z.infer<typeof step4Schema>;
