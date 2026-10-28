import React from 'react';
import { Home, Camera, BookOpen, Settings } from 'lucide-react';
import { SupportedLanguage, UI_TEXT } from '../translations';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: SupportedLanguage;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, setCurrentTab, lang }) => {
  const t = UI_TEXT[lang];

  const tabs = [
    { id: 'home', label: t.nav_home, icon: Home },
    { id: 'detect', label: t.nav_check, icon: Camera, primary: true },
    { id: 'library', label: t.nav_guide, icon: BookOpen },
    { id: 'settings', label: t.nav_settings, icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-emerald-200/80 shadow-lg px-2 py-1.5 sm:hidden">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          if (tab.primary) {
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setCurrentTab(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center -mt-5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/40 scale-105'
                    : 'bg-emerald-600 text-white shadow-md'
                }`}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center">
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="text-[10px] font-bold mt-[-2px] pb-1 px-1">{tab.label}</span>
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition ${
                isActive
                  ? 'text-emerald-700 font-extrabold'
                  : 'text-slate-500 hover:text-slate-700 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className="text-[11px] mt-1">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
