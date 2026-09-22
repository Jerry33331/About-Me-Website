import React, { useState } from 'react';
import { Menu, X, ShieldAlert, CheckCircle2, CircleDot, Sparkles } from 'lucide-react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, unreadCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Rubric: All 6 required pages + Admin exist and load with active states
  const navItems: { id: PageId; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'media', label: 'Media (Gallery)' },
    { id: 'future', label: 'Future (5-Year)' },
    { id: 'choice-1', label: 'Pre-Med & Health' },
    { id: 'choice-2', label: 'Language & Gaming' },
    { id: 'contact', label: 'Contact' },
    {
      id: 'admin',
      label: 'Admin',
      badge: unreadCount > 0 ? `${unreadCount} new` : undefined
    }
  ];

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to determine active state including aliases
  const isItemActive = (itemId: PageId) => {
    if (currentPage === itemId) return true;
    if (itemId === 'future' && currentPage === 'goals') return true;
    if (itemId === 'media' && currentPage === 'projects') return true;
    if (itemId === 'choice-1' && currentPage === 'choice') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-emerald-800 text-white shadow-md border-b-2 border-emerald-900">
      {/* Top micro-bar showing student assignment metadata */}
      <div className="bg-emerald-950/90 px-4 py-1 text-2xs text-emerald-200 border-b border-emerald-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white">Student:</span>
          <span className="bg-emerald-700/60 px-2 py-0.5 rounded text-emerald-100 font-bold">Mohammed Albayati</span>
          <span className="hidden sm:inline text-emerald-400">• Grossmont High School AI Portfolio</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block"></span>
            <span>Primary: Green</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
            <span>Secondary: Red</span>
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Student Name */}
          <button
            id="brand-logo-button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left group cursor-pointer focus:outline-hidden"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-emerald-800 font-extrabold text-lg flex items-center justify-center shadow-xs border-2 border-emerald-600 transition-transform group-hover:scale-105">
              MA
            </div>
            <div>
              <div className="font-bold text-base sm:text-lg text-white tracking-tight leading-tight flex items-center gap-1.5">
                <span>Mohammed Albayati</span>
                <span className="w-2 h-2 rounded-full bg-red-500 inline-block" title="Secondary Theme: Red"></span>
              </div>
              <div className="text-2xs text-emerald-200 font-medium">
                Grossmont High School • Class of 2029
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav id="main-navigation" className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isItemActive(item.id);
              const isAdmin = item.id === 'admin';

              return (
                <button
                  key={item.id}
                  id={`nav-button-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? 'bg-emerald-950 text-white shadow-xs ring-1 ring-emerald-400 font-extrabold'
                      : 'text-emerald-100 hover:bg-emerald-700 hover:text-white'
                  }`}
                >
                  {isAdmin && <ShieldAlert className="w-3.5 h-3.5 text-red-400" />}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.2 rounded-full bg-red-600 text-white text-2xs font-bold animate-pulse">
                      {item.badge}
                    </span>
                  )}
                  {active && (
                    <span className="absolute bottom-0 inset-x-2 h-0.5 bg-red-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white focus:outline-hidden cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden bg-emerald-900 border-t border-emerald-700 px-4 py-3 space-y-1">
          {navItems.map((item) => {
            const active = isItemActive(item.id);
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between cursor-pointer ${
                  active
                    ? 'bg-emerald-950 text-white border-l-4 border-red-500'
                    : 'text-emerald-100 hover:bg-emerald-800'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-2xs font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
