import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
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

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [preselectedDisease, setPreselectedDisease] = useState<string | null>(null);

  useEffect(() => {
    // Check existing auth session
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

  const handleSelectSampleForDetection = (sampleFile: string) => {
    setCurrentTab('detect');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setPreselectedDisease(null);
          setCurrentTab(tab);
        }}
        currentUser={currentUser}
        onOpenAuth={() => setAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenDownload={() => setDownloadModalOpen(true)}
        onOpenSettings={() => setSettingsModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <HomePage setCurrentTab={setCurrentTab} />
          </div>
        )}

        {currentTab === 'detect' && (
          <DetectPage onViewLibraryItem={handleViewLibraryItem} />
        )}

        {currentTab === 'library' && (
          <DiseaseLibraryPage
            onSelectSampleForDetection={handleSelectSampleForDetection}
            preselectedDisease={preselectedDisease}
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
          />
        )}

        {currentTab === 'about' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AboutPage />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer setCurrentTab={setCurrentTab} />

      {/* Authentication Modal */}
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

      {/* Server Settings Modal */}
      <ServerSettingsModal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
      />
    </div>
  );
}

export default App;
