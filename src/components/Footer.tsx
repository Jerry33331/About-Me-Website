import React from 'react';
import { ArrowUp, Heart, ShieldCheck, Mail, Globe, Sparkles } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-emerald-950 text-emerald-200 border-t-4 border-red-600 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-emerald-800/60">
          {/* Col 1: Brand & Theme */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs border border-emerald-400">
                MA
              </div>
              <span className="font-bold text-white text-base">Mohammed Albayati's Portfolio</span>
            </div>
            <p className="text-xs text-emerald-300/80 leading-relaxed max-w-md">
              Grossmont High School student portfolio in AI development and design. Built with primary Green and secondary Red accents, persistent server-side JSON storage at <code className="text-emerald-200 font-mono">data/contactReceived.json</code>, and authenticated administrative management.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-700/80 text-2xs text-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Primary: Green (#15803d)</span>
              <span className="text-emerald-500">|</span>
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span>Secondary: Red (#dc2626)</span>
            </div>
          </div>

          {/* Col 2: Pages Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Portfolio Pages
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Home (About Me)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('media')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Media Showcase (9 Cards)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('future')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Future (5-Year Plan)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('choice-1')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Choice #1: Pre-Med & Healthcare
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('choice-2')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Choice #2: Language & Gaming
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact Form
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Admin & Storage */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Backend & Server
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="inline-flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Dashboard</span>
                </button>
              </li>
              <li className="text-2xs text-emerald-400 font-mono">
                Storage: data/contactReceived.json
              </li>
              <li className="text-2xs text-emerald-400 font-mono">
                Endpoint: POST /api/contact
              </li>
              <li className="text-2xs text-emerald-400 font-mono">
                Auth: Server-Side Verified
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & back to top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-2xs text-emerald-400">
          <div>
            © {new Date().getFullYear()} Mohammed Albayati • Grossmont High School Class of 2029 • Built for AI Development & Design Class.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-emerald-300 hover:text-white transition-colors cursor-pointer self-start sm:self-auto font-semibold"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
