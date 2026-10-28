import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';
import { AuthModal } from './components/AuthModal';
import { DownloadModal } from './components/DownloadModal';
import { ServerSettingsModal } from './components/ServerSettingsModal';
import { HomePage } from './pages/HomePage';
import { DetectPage } from './pages/DetectPage';
import { DiseaseLibraryPage } from './pages/DiseaseLibraryPage';
import { DashboardPage } from './pages/DashboardPage';
import { HistoryPage } from './pages/HistoryPage';
import { AboutPage } from './pages/AboutPage';
import { UserProfile } from './types';
import { api } from './services/api';
import { SupportedLanguage } from './translations';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [preselectedDisease, setPreselectedDisease] = useState<string | null>(null);
  const [selectedSampleUrl, setSelectedSampleUrl] = useState<string | null>(null);

  // Language state: Defaults to Kannada ('kn')
  const [lang, setLangState] = useState<SupportedLanguage>(() => {
    return (localStorage.getItem('ricecare_lang') as SupportedLanguage) || 'kn';
  });

  const setLang = (newLang: SupportedLanguage) => {
    setLangState(newLang);
    localStorage.setItem('ricecare_lang', newLang);
  };

  useEffect(() => {
    // Check existing auth session if available
    api.getCurrentUser().then((user) => {
      if (user) setCurrentUser(user);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ricecare_token');
    setCurrentUser(null);
  };

  const handleViewLibraryItem = (diseaseName: string) => {
    setPreselectedDisease(diseaseName);
    setCurrentTab('library');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSampleForDetection = (sampleUrl: string) => {
    setSelectedSampleUrl(sampleUrl);
    setCurrentTab('detect');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Top Header Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'settings') {
            setSettingsModalOpen(true);
          } else {
            setPreselectedDisease(null);
            setCurrentTab(tab);
          }
        }}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenDownload={() => setDownloadModalOpen(true)}
        onOpenSettings={() => setSettingsModalOpen(true)}
        lang={lang}
        setLang={setLang}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HomePage 
              setCurrentTab={setCurrentTab} 
              onOpenDownload={() => setDownloadModalOpen(true)}
              lang={lang}
              setLang={setLang}
              onSelectSampleForDetection={handleSelectSampleForDetection}
            />
          </div>
        )}

        {currentTab === 'detect' && (
          <DetectPage 
            onViewLibraryItem={handleViewLibraryItem}
            lang={lang}
            initialSampleUrl={selectedSampleUrl}
          />
        )}

        {currentTab === 'library' && (
          <DiseaseLibraryPage
            onSelectSampleForDetection={handleSelectSampleForDetection}
            preselectedDisease={preselectedDisease}
            lang={lang}
          />
        )}

        {currentTab === 'dashboard' && (
          <DashboardPage
            onNavigateToDetect={() => setCurrentTab('detect')}
            onNavigateToHistory={() => setCurrentTab('history')}
          />
        )}

        {currentTab === 'history' && (
          <HistoryPage
            onNavigateToDetect={() => setCurrentTab('detect')}
            onViewLibraryItem={handleViewLibraryItem}
            lang={lang}
          />
        )}

        {currentTab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AboutPage />
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Home, Check Leaf, Guide, Settings) */}
      <BottomNav
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'settings') {
            setSettingsModalOpen(true);
          } else {
            setPreselectedDisease(null);
            setCurrentTab(tab);
          }
        }}
        lang={lang}
      />

      {/* Footer */}
      <Footer 
        setCurrentTab={setCurrentTab} 
        onOpenDownload={() => setDownloadModalOpen(true)}
      />

      {/* Authentication Modal (Optional) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      {/* Android Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />

      {/* Server & Language Settings Modal */}
      <ServerSettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        lang={lang}
        setLang={setLang}
      />
    </div>
  );
}

export default App;
