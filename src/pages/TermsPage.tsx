import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, FileCheck, Lock, Users, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#ff385c]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-20 bg-[#07090e]/85 backdrop-blur-xl border-b border-white/[0.07]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back to previous page"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors touch-target py-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#ff385c] to-[#ff758c] flex items-center justify-center shadow-md shadow-[#ff385c]/25">
              <span className="font-extrabold text-white text-xs">N</span>
            </div>
            <span className="font-bold text-sm text-white tracking-tight">Nuvora Legal & Safety</span>
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={() => navigate('/signup')}
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
          >
            Go to Signup
          </Button>
        </div>
      </header>

      {/* Main Content (Max-width tuned for 65-75 characters per line readability) */}
      <main className="max-w-3xl mx-auto px-6 py-10 flex-1 relative z-10">
        <div className="space-y-8">
          <div className="border-b border-white/[0.08] pb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff385c]/10 border border-[#ff385c]/25 text-[#ff758c] text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Campus Standards & Safety
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Terms of Service & Community Policy
            </h1>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              Effective: January 2026 • Verified Student Platform Guidelines
            </p>
          </div>

          {/* Section 1 */}
          <section aria-labelledby="section-1" className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-[#ff758c]">
              <AlertCircle className="w-5 h-5" />
              <h2 id="section-1" className="text-lg font-bold text-white">
                1. Acceptance of Terms & Eligibility (18+)
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Welcome to Nuvora. By accessing, downloading, or registering an account on our
              platform, you agree to enter into a legally binding agreement with Nuvora Inc.
            </p>
            <p className="text-sm leading-relaxed text-slate-300">
              <strong className="text-white">Strict Age Requirement:</strong> You must be at least
              eighteen (18) years of age to create an account or participate in Nuvora community
              activities. Registration by minors is strictly prohibited and subject to immediate
              blocking and account termination.
            </p>
          </section>

          {/* Section 2 */}
          <section aria-labelledby="section-2" className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-sky-400">
              <Lock className="w-5 h-5" />
              <h2 id="section-2" className="text-lg font-bold text-white">
                2. Student Identity & Authenticity
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Nuvora provides a protected campus network environment. You agree to provide accurate,
              current, and complete information during registration, including your real name, valid
              email address, and affiliated educational institution. Impersonation of students,
              faculty, or staff is grounds for permanent exclusion.
            </p>
          </section>

          {/* Section 3 */}
          <section aria-labelledby="section-3" className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-purple-400">
              <Users className="w-5 h-5" />
              <h2 id="section-3" className="text-lg font-bold text-white">
                3. Community Conduct Guidelines
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              Our mission is to foster respectful, inclusive, and positive campus connections. You
              agree NOT to:
            </p>
            <ul className="list-disc pl-6 text-sm text-slate-300 space-y-2 leading-relaxed">
              <li>Engage in bullying, stalking, harassment, or hate speech targeting any student.</li>
              <li>Share explicit, non-consensual, violent, or illegal media.</li>
              <li>Spam campus channels with commercial advertisements, bots, or unauthorized solicitations.</li>
              <li>Circulate academic dishonesty materials in violation of university honor codes.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section aria-labelledby="section-4" id="privacy" className="glass-card rounded-2xl p-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
              <h2 id="section-4" className="text-lg font-bold text-white">
                4. Privacy & Data Handling
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              We respect your privacy. All user profile data and student credentials are encrypted
              in transit and at rest using modern security standards. Your exact GPS coordinates
              are never broadcasted to other members, and campus event grouping uses
              privacy-preserving locality matching.
            </p>
          </section>
        </div>

        {/* Bottom action dock */}
        <div className="mt-12 p-6 rounded-3xl glass-card flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/[0.1]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#ff385c]/15 text-[#ff758c]">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Ready to join your university community?</p>
              <p className="text-xs text-slate-400">Takes less than 2 minutes to complete onboarding.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate('/')}
              className="flex-1 sm:flex-initial"
            >
              Return Home
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/signup')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="flex-1 sm:flex-initial"
            >
              Accept & Start
            </Button>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-4xl mx-auto px-6 py-6 border-t border-white/[0.06] text-center text-xs text-slate-500">
        Nuvora Inc. • All rights reserved.
      </footer>
    </div>
  );
};
