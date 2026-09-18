import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Sparkles, Compass, Heart } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0b0f19] text-slate-100 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-b from-brand-500/15 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-500/10 blur-3xl pointer-events-none" />

      {/* Navigation Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <span className="font-extrabold text-white text-xl tracking-tighter">N</span>
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-white leading-none">Nuvora</h1>
            <span className="text-[10px] font-semibold text-brand-400 tracking-wider uppercase">
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
            variant="outline"
            onClick={() => navigate('/signup')}
            className="hidden sm:inline-flex"
          >
            Sign In
          </Button>
        </nav>
      </header>

      {/* Main Hero Section */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 py-8 sm:py-16 text-center flex flex-col items-center justify-center my-auto">
        {/* Floating pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span>Exclusive College Community & Vibes</span>
        </div>

        {/* Hero Title */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.15] max-w-3xl mb-6">
          Find your crowd.{' '}
          <span className="bg-gradient-to-r from-brand-400 via-rose-300 to-brand-500 bg-clip-text text-transparent">
            Match your campus vibe.
          </span>
        </h2>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
          The verified social hub for university students. Discover study squads, weekend events,
          roommates, and authentic campus communities in 4 quick onboarding steps.
        </p>

        {/* Primary CTA button cluster */}
        <div className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <Button
            size="lg"
            variant="primary"
            fullWidth
            onClick={() => navigate('/signup')}
            rightIcon={<ArrowRight className="w-5 h-5" />}
            className="shadow-xl shadow-brand-500/30 text-base font-bold py-4"
          >
            Get Started — It's Free
          </Button>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl pt-6 border-t border-slate-800/80">
          <div className="p-4 rounded-2xl bg-[#131926]/70 border border-slate-800/80 text-left flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Verified Students Only</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Authentic identity checks and verified .edu networks.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#131926]/70 border border-slate-800/80 text-left flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Local Campus Hubs</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Filter and discover communities across your city and state.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#131926]/70 border border-slate-800/80 text-left flex items-start space-x-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Vibe-First Matching</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Connect over real shared passions, study habits, and events.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span>© 2026 Nuvora Inc. Frontend Replication Assessment.</span>
        </div>

        <div className="flex items-center space-x-6">
          <Link to="/terms" className="hover:text-slate-300 transition-colors touch-target py-2">
            Terms of Service
          </Link>
          <Link to="/terms#privacy" className="hover:text-slate-300 transition-colors touch-target py-2">
            Privacy Policy
          </Link>
          <Link to="/signup" className="text-brand-400 hover:text-brand-300 font-semibold touch-target py-2">
            Signup Flow →
          </Link>
        </div>
      </footer>
    </div>
  );
};
