import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MediaPage } from './pages/MediaPage';
import { FuturePage } from './pages/FuturePage';
import { PreMedHealthcarePage } from './pages/PreMedHealthcarePage';
import { LanguageAndGamingPage } from './pages/LanguageAndGamingPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { PageId } from './types';

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // Sync with URL hash if present (#home, #media, #future, #choice-1, #choice-2, #contact, #admin)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageId;
      const validPages: PageId[] = [
        'home', 
        'media', 
        'future', 
        'choice-1', 
        'choice-2', 
        'contact', 
        'admin',
        'goals',
        'projects',
        'choice'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fetchUnreadCount = async () => {
    try {
      const res = await fetch('/api/admin/stats');
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.newCount ?? data.unreadCount ?? 0);
      }
    } catch (err) {
      // Quietly ignore in background
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 12000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col font-sans selection:bg-emerald-700 selection:text-white">
      {/* Universal Header with active navigation & Mohammed branding */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        unreadCount={unreadCount}
      />

      {/* Main Content Area: All 6 Required Pages + Admin Dashboard */}
      <main className="grow max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} />
        )}

        {(currentPage === 'media' || currentPage === 'projects') && (
          <MediaPage />
        )}

        {(currentPage === 'future' || currentPage === 'goals') && (
          <FuturePage />
        )}

        {(currentPage === 'choice-1' || currentPage === 'choice') && (
          <PreMedHealthcarePage />
        )}

        {currentPage === 'choice-2' && (
          <LanguageAndGamingPage />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            onSubmissionSuccess={fetchUnreadCount}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPage
            onNavigate={handleNavigate}
            onRefreshBadge={fetchUnreadCount}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
