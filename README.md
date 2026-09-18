# Nuvora — Responsive Onboarding Wizard

A high-fidelity, accessible, responsive four-step onboarding web application replicating the mobile onboarding experience for **Nuvora** (the verified student community platform).

Built with **React + TypeScript + Vite + Tailwind CSS + React Hook Form + Zod + Vitest**.

---

## 🚀 Quick Start

### Prerequisites
- Node.js `v18+` or `v20+` or `v24+`
- npm `v9+` or `v10+` or `v11+`

### Installation & Local Development
```bash
# 1. Clone repository
git clone https://github.com/anshuraj008/Nuvora.git
cd Nuvora

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Testing & Build Commands

```bash
# Run unit & component test suite (Vitest + React Testing Library)
npm run test:run

# Run tests in watch mode
npm run test

# Production build and strict TypeScript verification
npm run build
```

---

## 📱 Onboarding Flow & Screen Breakdown

| Screen | Route / Step | Description | Key Features |
|---|---|---|---|
| **Landing Screen** | `/` | Brand hero, dynamic value props, fast paint | Primary CTA, community badges, navigation to Terms & Signup |
| **Terms & Conditions** | `/terms` | Legal & safety guidelines | 60–75 char line-length readability, semantic sections, sticky action bar |
| **Step 1: Identity & OTP** | `/signup` (Step 1) | Identity & student verification | Email validation, 6-digit segmented OTP input, paste support, resend timer |
| **Step 2: Basic Profile** | `/signup` (Step 2) | Name, Age & Pronouns | Real-time validation, **explicit under-18 blocking guard (< 18 restriction modal)** |
| **Step 3: Location & Campus** | `/signup` (Step 3) | State, City & College | Cross-field dynamic dependency: selecting State dynamically filters Cities and cleans incompatible selections |
| **Step 4: Vibes & Review** | `/signup` (Step 4) | Campus vibes & terms agreement | 1–5 vibe chip selector, discovery toggle, summary snapshot, submit failure simulation |
| **Success Screen** | `/success` | Verified onboarding completion | Animated celebration badge, full profile recap, restart/continue actions |

---

## 🔑 Demo Test Triggers & Mock Contract

This is a **frontend-only application** designed for assessment reproducibility. All async operations use deterministic mock services with short, realistic loading delays:

- **Valid Verification OTP Code**: Enter or paste `123456`
- **Simulate Email Verification Failure / Retry**: Use email `fail@example.com`
- **Simulate Final Submission Failure / Retry**: Use email `submitfail@example.com`
- **Under-18 Blocking Verification**: Enter age `< 18` (e.g. `16` or `17`) on Step 2 to test the safety modal

---

## 🛠️ Architecture & State Management

```
src/
├── app/
│   ├── App.tsx                     # Top-level Router and Context wrapper
│   └── router.tsx                  # Declarative client-side routes
├── pages/
│   ├── LandingPage.tsx             # Landing hero & features
│   ├── TermsPage.tsx               # Terms & safety guidelines
│   ├── SignupPage.tsx              # Wizard shell host
│   └── SuccessPage.tsx             # Completion & profile summary
├── features/onboarding/
│   ├── steps/
│   │   ├── Step1Identity.tsx       # Email + OTP verification
│   │   ├── Step2Profile.tsx        # Name, Age (<18 guard), Pronouns
│   │   ├── Step3Location.tsx       # State -> City/College dynamic filtering
│   │   └── Step4Preferences.tsx    # Vibe tags, discovery, terms, submit
│   ├── store/
│   │   └── OnboardingContext.tsx   # Typed Context + Reducer with safe draft sync
│   ├── schemas.ts                  # Zod validation schemas
│   ├── mockApi.ts                  # Deterministic mock service
│   ├── types.ts                    # TypeScript types
│   └── Wizard.tsx                  # Stepper & backward navigation container
├── components/ui/
│   ├── Button.tsx                  # Accessible button with loading spinner
│   ├── Field.tsx                   # Text input with ARIA error associations
│   ├── Select.tsx                  # Accessible dropdown
│   ├── OtpInput.tsx                # Segmented OTP with paste & auto-advance
│   ├── Progress.tsx                # Accessible Step N of 4 progress bar
│   ├── Toast.tsx                   # Banner with retry actions
│   └── Modal.tsx                   # Accessible modal dialog
└── styles/
    ├── tokens.css                  # CSS design tokens
    └── globals.css                 # Tailwind base styles & accessibility rules
```

---

## ♿ Accessibility & Quality Standards

- **Semantic HTML & ARIA**: Form inputs use `aria-invalid`, `aria-describedby` linked directly to error IDs, and `aria-live` for dynamic alerts.
- **Keyboard Operable**: Full keyboard tab order and Shift+Tab backward navigation without focus traps.
- **Touch Target Sizing**: All interactive buttons, chips, and inputs enforce minimum 44×44px hit targets.
- **Zero Secrets**: No real credentials, API secrets, or private data transmissions.
- **State Preservation**: Navigating backward via the Stepper or Back button preserves all entered valid field data.
