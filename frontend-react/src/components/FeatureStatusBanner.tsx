import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, CheckCircle2, Cloud, HardDrive, RefreshCw } from 'lucide-react';
import { networkService } from '../services/network';
import { remoteConfigService } from '../services/remoteConfig';
import { SupportedLanguage } from '../translations';

interface FeatureStatusBannerProps {
  lang: SupportedLanguage;
}

export const FeatureStatusBanner: React.FC<FeatureStatusBannerProps> = ({ lang }) => {
  const [isOnline, setIsOnline] = useState(networkService.isOnline());
  const [lastSync, setLastSync] = useState<string | null>(remoteConfigService.getLastSyncTime() || networkService.getLastSyncTime());
  const [queueCount, setQueueCount] = useState(networkService.getQueuedOfflineScans().length);
  const [configVersion, setConfigVersion] = useState(remoteConfigService.getConfig().config_version);

  useEffect(() => {
    const unsubNet = networkService.subscribe((online) => {
      setIsOnline(online);
      setLastSync(remoteConfigService.getLastSyncTime() || networkService.getLastSyncTime());
      setQueueCount(networkService.getQueuedOfflineScans().length);
    });
    const unsubCfg = remoteConfigService.subscribe((cfg) => {
      setConfigVersion(cfg.config_version);
      setLastSync(remoteConfigService.getLastSyncTime() || networkService.getLastSyncTime());
    });
    return () => {
      unsubNet();
      unsubCfg();
    };
  }, []);

  const formattedSyncTime = lastSync 
    ? new Date(lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : 'Local Default';

  return (
    <div className={`text-xs py-1.5 px-3 border-b flex flex-wrap items-center justify-between gap-2 transition-colors ${
      isOnline 
        ? 'bg-emerald-50/80 border-emerald-200/60 text-emerald-900' 
        : 'bg-amber-100 border-amber-300 text-amber-950 font-bold'
    }`}>
      <div className="flex items-center space-x-2">
        {isOnline ? (
          <span className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold">
              {lang === 'kn' ? 'ಆನ್‌ಲೈನ್' : lang === 'hi' ? 'ऑनलाइन' : 'Online'}
            </span>
          </span>
        ) : (
          <span className="flex items-center space-x-1.5 text-amber-900">
            <WifiOff className="w-3.5 h-3.5" />
            <span>
              {lang === 'kn' ? 'ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವಿಲ್ಲ (ಆಫ್‌ಲೈನ್)' : 'Offline Mode'}
            </span>
          </span>
        )}

        <span className="text-slate-400">•</span>

        <span className="flex items-center space-x-1 text-[11px] text-slate-700">
          <HardDrive className="w-3 h-3 text-emerald-600" />
          <span>
            {lang === 'kn' ? 'ಆಫ್‌ಲೈನ್ ಮಾಹಿತಿ ಸಿದ್ಧ' : 'Offline Guides Cached'}
          </span>
        </span>

        <span className="text-slate-400 hidden sm:inline">•</span>

        <span className="hidden sm:flex items-center space-x-1 text-[11px] text-slate-500">
          <RefreshCw className="w-2.5 h-2.5 text-slate-400" />
          <span>
            {lang === 'kn' ? `ಸಿಂಕ್: ${formattedSyncTime}` : `Sync: ${formattedSyncTime}`}
          </span>
        </span>
      </div>

      <div className="flex items-center space-x-3 text-[11px] text-slate-600">
        <span className="hidden sm:inline">
          {lang === 'kn' ? 'ಲೈವ್ AI ಪರೀಕ್ಷೆಗೆ ಇಂಟರ್ನೆಟ್ ಬೇಕು' : 'Internet required for cloud AI'}
        </span>
        {queueCount > 0 && (
          <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white font-bold text-[10px]">
            {queueCount} {lang === 'kn' ? 'ಬಾಕಿ ಸ್ಕ್ಯಾನ್' : 'queued'}
          </span>
        )}
      </div>
    </div>
  );
};
