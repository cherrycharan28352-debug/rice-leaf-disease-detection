import React, { useState, useEffect } from 'react';
import { Download, Sparkles, X, ExternalLink } from 'lucide-react';
import { remoteConfigService } from '../services/remoteConfig';
import { SupportedLanguage } from '../translations';

interface AppUpdateBannerProps {
  lang: SupportedLanguage;
  onOpenDownloadModal?: () => void;
}

export const AppUpdateBanner: React.FC<AppUpdateBannerProps> = ({ lang, onOpenDownloadModal }) => {
  const [updateInfo, setUpdateInfo] = useState<{ available: boolean; latest: string; isMandatory: boolean }>({
    available: false,
    latest: '',
    isMandatory: false
  });
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const check = () => {
      setUpdateInfo(remoteConfigService.isUpdateAvailable());
    };
    check();
    const unsub = remoteConfigService.subscribe(() => check());
    return unsub;
  }, []);

  if (!updateInfo.available || dismissed) return null;

  const cfg = remoteConfigService.getConfig();
  const notes = lang === 'kn' 
    ? cfg.app_version?.release_notes_kn 
    : cfg.app_version?.release_notes_en;

  return (
    <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-xs z-30">
      <div className="flex items-center space-x-2.5">
        <span className="p-1.5 bg-white/20 rounded-lg">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
        </span>
        <div>
          <span className="font-extrabold block">
            {lang === 'kn' ? `ಹೊಸ ಆವೃತ್ತಿ ಲಭ್ಯವಿದೆ: v${updateInfo.latest}` : `New Version Available: v${updateInfo.latest}`}
          </span>
          <span className="text-[11px] text-emerald-100 hidden sm:inline">
            {notes || (lang === 'kn' ? 'ಉತ್ತಮ ನಿಖರತೆ ಮತ್ತು ಹೊಸ ಸೌಲಭ್ಯಗಳಿಗಾಗಿ ಅಪ್‌ಡೇಟ್ ಮಾಡಿ.' : 'Update for improved accuracy & new features.')}
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <a
          href={cfg.app_version?.apk_download_url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-lg flex items-center space-x-1 shadow-sm transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{lang === 'kn' ? 'ಅಪ್‌ಡೇಟ್ ಮಾಡಿ' : 'Update App'}</span>
        </a>

        {!updateInfo.isMandatory && (
          <button
            onClick={() => setDismissed(true)}
            className="p-1 hover:bg-white/10 rounded-lg text-white/80"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};