import React, { useState } from 'react';
import { 
  Sprout, Camera, BookOpen, BarChart3, History, Info, 
  Menu, X, Smartphone, Settings, Globe
} from 'lucide-react';
import { UserProfile } from '../types';
import { SupportedLanguage, UI_TEXT } from '../translations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenDownload: () => void;
  onOpenSettings: () => void;
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenDownload,
  onOpenSettings,
  lang,
  setLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = UI_TEXT[lang];

  const navItems = [
    { id: 'home', label: t.nav_home, icon: Sprout },
    { id: 'detect', label: t.nav_check, icon: Camera },
    { id: 'library', label: t.nav_guide, icon: BookOpen },
    { id: 'history', label: t.nav_history, icon: History },
  ];

  const handleTabClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo & Brand */}
          <div
            onClick={() => handleTabClick('home')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:bg-emerald-700 transition">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition">
                  RiceCare<span className="text-emerald-600"> AI</span>
                </span>
                <span className="hidden md:inline-flex px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-full">
                  {lang === 'kn' ? 'ಭತ್ತದ ರೋಗ ಪತ್ತೆ' : 'Rice Leaf AI'}
                </span>
              </div>
              <p className="text-[11px] text-emerald-800 font-semibold hidden sm:block">
                {t.app_subtitle}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 shadow-xs'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons: Language Selector & APK Download */}
          <div className="flex items-center space-x-2 sm:space-x-2.5">
            
            {/* Quick Language Switcher */}
            <div className="flex items-center rounded-xl bg-slate-100 p-0.5 border border-slate-200 text-xs font-bold">
              <button
                onClick={() => setLang('kn')}
                className={`px-2.5 py-1 rounded-lg transition ${
                  lang === 'kn' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="ಕನ್ನಡ"
              >
                ಕನ್ನಡ
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-1 rounded-lg transition ${
                  lang === 'en' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 py-1 rounded-lg transition ${
                  lang === 'hi' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
                title="हिन्दी"
              >
                हिन्दी
              </button>
            </div>

            {/* Download Android APK Button */}
            <button
              onClick={onOpenDownload}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-bold transition shadow-xs"
              title="Download Android APK"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
              <span className="hidden sm:inline">ಆ್ಯಪ್ / APK</span>
              <span className="sm:hidden">APK</span>
            </button>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
