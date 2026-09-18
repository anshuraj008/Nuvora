import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Sparkles,
  Compass,
  Heart,
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#07090e] text-slate-100 relative overflow-hidden">
      {/* Dynamic ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[#ff385c]/15 via-purple-600/5 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-[#ff385c]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff385c] via-[#ff4d6d] to-[#ff5a78] flex items-center justify-center shadow-lg shadow-[#ff385c]/30 border border-white/20">
            <span className="font-extrabold text-white text-xl tracking-tighter">N</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white leading-none">Nuvora</h1>
            <span className="text-[10px] font-bold text-[#ff758c] tracking-widest uppercase">
              Student Network
            </span>
          </div>
        </div>

        <nav className="flex items-center space-x-4">
          <Link
            to="/terms"
            className="text-xs font-semibold text-slate-400 hover:text-white transition-colors touch-target py-2"
          >
            Terms & Safety
          </Link>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => navigate('/signup')}
            className="hidden sm:inline-flex border-slate-700/80"
          >
            Sign In
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-8 sm:py-14 text-center flex flex-col items-center justify-center my-auto">
        {/* Glowing Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff385c]/10 border border-[#ff385c]/30 text-[#ff758c] text-xs font-semibold mb-6 shadow-sm shadow-[#ff385c]/10 animate-in fade-in duration-300">
          <Sparkles className="w-3.5 h-3.5 text-[#ff385c]" />
          <span>The Verified Social Hub for University Students</span>
        </div>

        {/* Hero Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mb-6">
          Find your crowd.{' '}
          <span className="bg-gradient-to-r from-[#ff385c] via-[#ff758c] to-[#ff8fa3] bg-clip-text text-transparent">
            Match your campus vibe.
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-10">
          Connect with peers at your university, discover active clubs and study squads, and explore
          local campus nightlife in four seamless onboarding steps.
        </p>

        {/* CTA Cluster */}
        <div className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
          <Button
            size="lg"
            variant="primary"
            fullWidth
            onClick={() => navigate('/signup')}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="shadow-xl shadow-[#ff385c]/30 text-base font-bold py-4"
          >
            Start Student Onboarding
          </Button>

          <Button
            size="lg"
            variant="secondary"
            fullWidth
            onClick={() => navigate('/terms')}
            className="text-sm font-semibold py-4"
          >
            Read Safety Standards
          </Button>
        </div>

        {/* Floating Social Proof / Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl text-left">
          {/* Card 1 */}
          <div className="glass-card glass-card-interactive p-5 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-[#ff385c]/15 text-[#ff758c] border border-[#ff385c]/25">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                100% Verified
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Authenticated Students</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                6-digit OTP verification ensures exclusive, safe campus network environments.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-card glass-card-interactive p-5 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-purple-500/15 text-purple-400 border border-purple-500/25">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                Cross-Campus
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Dynamic Campus Filter</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Seamless state-to-city college discovery across top university metro areas.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-card glass-card-interactive p-5 rounded-2xl flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/25">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-rose-300 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                Vibe Matching
              </span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white mb-1">Shared Vibes & Interests</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tag study habits, gaming, concerts, and tech interests for genuine matches.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div>
          <span>© 2026 Nuvora Inc. • Senior Frontend Architecture Replication.</span>
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/terms" className="hover:text-slate-300 transition-colors touch-target py-2">
            Terms of Service
          </Link>
          <Link to="/terms#privacy" className="hover:text-slate-300 transition-colors touch-target py-2">
            Privacy Policy
          </Link>
          <Link to="/signup" className="text-[#ff758c] hover:text-white font-semibold touch-target py-2">
            Four-Step Wizard →
          </Link>
        </div>
      </footer>
    </div>
  );
};
