import React, { useState, useEffect } from 'react';
import { Settings, Globe, Check, AlertCircle, X, RefreshCw, Server, Wifi, Volume2, ShieldCheck, Sparkles } from 'lucide-react';
import { SupportedLanguage, UI_TEXT } from '../translations';
import { remoteConfigService } from '../services/remoteConfig';
import { DEFAULT_PRODUCTION_API_URL } from '../services/api';

interface ServerSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
}

export const ServerSettingsModal: React.FC<ServerSettingsModalProps> = ({ 
  isOpen, 
  onClose,
  lang,
  setLang
}) => {
  const currentBase = localStorage.getItem('ricecare_api_url') || '';
  const [serverUrl, setServerUrl] = useState(currentBase);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [syncingConfig, setSyncingConfig] = useState(false);
  const [configVersion, setConfigVersion] = useState(remoteConfigService.getConfig().config_version);
  const [lastSync, setLastSync] = useState(remoteConfigService.getLastSyncTime());
  const t = UI_TEXT[lang];

  const handleSyncRemoteConfig = async () => {
    setSyncingConfig(true);
    try {
      const cfg = await remoteConfigService.fetchRemoteConfig();
      setConfigVersion(cfg.config_version);
      setLastSync(remoteConfigService.getLastSyncTime());
    } finally {
      setSyncingConfig(false);
    }
  };

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setTesting(true);
    setTestResult(null);
    try {
      const cleanUrl = serverUrl.trim().replace(/\/$/, '');
      const testEndpoint = cleanUrl ? `${cleanUrl}/api/health` : `/api/health`;
      const res = await fetch(testEndpoint, { method: 'GET' });
      if (res.ok) {
        const data = await res.json();
        setTestResult({
          success: true,
          message: lang === 'kn'
            ? `ಸಂಪರ್ಕ ಯಶಸ್ವಿಯಾಗಿದೆ! (AI ಮಾದರಿ ಸಿದ್ಧವಾಗಿದೆ)`
            : `Connected successfully! Model: ${data.model_architecture || 'Loaded'}`
        });
      } else {
        setTestResult({
          success: false,
          message: `Server returned HTTP status ${res.status}.`
        });
      }
    } catch (err: any) {
      setTestResult({
        success: false,
        message: lang === 'kn'
          ? `ಸರ್ವರ್ ಸಂಪರ್ಕ ವಿಫಲವಾಗಿದೆ. ಇಂಟರ್ನೆಟ್ ಪರಿಶೀಲಿಸಿ.`
          : `Could not reach server. Please check internet connection.`
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSave = () => {
    const cleanUrl = serverUrl.trim().replace(/\/$/, '');
    if (cleanUrl) {
      localStorage.setItem('ricecare_api_url', cleanUrl);
    } else {
      localStorage.removeItem('ricecare_api_url');
    }
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-emerald-50">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {t.nav_settings}
              </h3>
              <p className="text-[11px] text-emerald-800 font-semibold">
                {lang === 'kn' ? 'ಭಾಷೆ ಮತ್ತು ಸರ್ವರ್ ಆಯ್ಕೆಗಳು' : 'Language & Connection Settings'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 text-xs text-slate-700">
          
          {/* 1. Language Selector Card */}
          <div className="space-y-2">
            <label className="block font-bold text-slate-900 text-xs flex items-center space-x-1.5">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>{t.settings_language}</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setLang('kn')}
                className={`py-3 px-2 rounded-xl text-xs font-black transition border-2 ${
                  lang === 'kn' 
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm' 
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                ಕನ್ನಡ
              </button>
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition border-2 ${
                  lang === 'en' 
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm' 
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`py-3 px-2 rounded-xl text-xs font-bold transition border-2 ${
                  lang === 'hi' 
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm' 
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          {/* 2. Voice Audio Guidance Status */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Volume2 className="w-4 h-4 text-emerald-600" />
              <div>
                <span className="font-bold text-slate-900 block text-xs">{t.settings_audio}</span>
                <span className="text-[10px] text-slate-500">
                  {lang === 'kn' ? 'ಸ್ಪೀಕರ್ ಬಟನ್ ಮೂಲಕ ಧ್ವನಿ ವಿವರಣೆ ಲಭ್ಯ' : 'Audio read-aloud via speaker button'}
                </span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
              ON
            </span>
          </div>

          {/* 3. Remote Content & Configuration Updates (Zero Reinstall) */}
          <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200/70 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-slate-900 text-xs">
                  {lang === 'kn' ? 'ರಿಮೋಟ್ ಮಾಹಿತಿ ಮತ್ತು ಸಲಹೆಗಳು' : 'Remote Advisory & Content'}
                </span>
              </div>
              <span className="text-[10px] font-mono bg-white px-2 py-0.5 rounded-full border border-emerald-200 text-emerald-800 font-bold">
                v{configVersion}
              </span>
            </div>
            
            <p className="text-[11px] text-slate-600">
              {lang === 'kn' 
                ? 'ಕೀಟನಾಶಕಗಳು, ಬೆಳೆ ಸಲಹೆಗಳು ಮತ್ತು ಪ್ರಕಟಣೆಗಳು ಹೊಸ ಅಪ್ಲಿಕೇಶನ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡದೆಯೇ ತಾನಾಗಿಯೇ ಅಪ್‌ಡೇಟ್ ಆಗುತ್ತವೆ.'
                : 'Pesticides, advisories, and announcements update automatically without reinstalling the app.'}
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-500">
                {lastSync ? `${lang === 'kn' ? 'ಕೊನೆಯ ಸಿಂಕ್:' : 'Last sync:'} ${new Date(lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Default'}
              </span>
              <button
                type="button"
                onClick={handleSyncRemoteConfig}
                disabled={syncingConfig}
                className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] flex items-center space-x-1 shadow-xs transition"
              >
                <RefreshCw className={`w-3 h-3 ${syncingConfig ? 'animate-spin' : ''}`} />
                <span>{syncingConfig ? 'Syncing...' : (lang === 'kn' ? 'ಈಗ ಸಿಂಕ್ ಮಾಡಿ' : 'Sync Now')}</span>
              </button>
            </div>
          </div>

          {/* AI Diagnostic Engine Indicator */}
          <div className="p-3.5 bg-sky-50/80 rounded-2xl border border-sky-200/80 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span className="font-bold text-slate-900 text-xs">
                  {lang === 'kn' ? 'AI ರೋಗ ಪತ್ತೆ ಎಂಜಿನ್' : 'AI Diagnostic Engine'}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center space-x-1">
                <Check className="w-3 h-3" />
                <span>{lang === 'kn' ? 'ಸರ್ವರ್ ಮುಕ್ತ / 24/7 ಸಿದ್ಧ' : 'Edge WebAssembly Active'}</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-600">
              {lang === 'kn'
                ? 'ಕ್ಲೈಂಟ್-ಸೈಡ್ ನ್ಯೂರಲ್ ಎಂಜಿನ್ ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ನೇರವಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ. ಲ್ಯಾಪ್ಟಾಪ್ ಅಥವಾ ಸರ್ವರ್ ಆಫ್ ಆಗಿದ್ದರೂ ಯಾವುದೇ ಅಡಚಣೆಯಿಲ್ಲದೆ ರೋಗ ಪತ್ತೆ ಲಭ್ಯ.'
                : 'In-browser WebAssembly neural engine runs directly on your device. Diagnosis works 24/7/365 with zero dependence on any development laptop being on.'}
            </p>
          </div>

          {/* 4. Server URL (for advanced users / mobile config) */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between">
              <label className="block font-semibold text-slate-800 text-[11px]">
                {lang === 'kn' ? 'ಸರ್ವರ್ ಲಿಂಕ್ (ಐಚ್ಛಿಕ):' : 'Backend Server URL (Optional):'}
              </label>
            </div>

            {/* Quick preset chips */}
            <div className="flex flex-wrap gap-1.5 pb-1">
              <button
                type="button"
                onClick={() => setServerUrl('https://ricecare-ai.onrender.com')}
                className="px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 transition"
              >
                Render Cloud
              </button>
              <button
                type="button"
                onClick={() => setServerUrl('https://lowest-governor-marker-craps.trycloudflare.com')}
                className="px-2 py-0.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[10px] font-bold border border-teal-200 transition"
              >
                Live Dev Tunnel
              </button>
            </div>

            <input
              type="text"
              value={serverUrl}
              onChange={(e) => setServerUrl(e.target.value)}
              placeholder="e.g. https://ricecare-ai.onrender.com"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-emerald-500 font-mono"
            />

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testing}
                className="flex-1 py-2 px-3 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] transition"
              >
                {testing ? 'Testing...' : (lang === 'kn' ? 'ಸಂಪರ್ಕ ಪರೀಕ್ಷಿಸಿ' : 'Test Connection')}
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="py-2 px-4 rounded-xl bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition"
              >
                {lang === 'kn' ? 'ಉಳಿಸಿ' : 'Save'}
              </button>
            </div>

            {testResult && (
              <div className={`p-2.5 rounded-xl text-[11px] flex items-center space-x-2 ${
                testResult.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
              }`}>
                {testResult.success ? <Check className="w-3.5 h-3.5 shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 shrink-0" />}
                <span>{testResult.message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition"
          >
            {lang === 'kn' ? 'ಮುಚ್ಚಿ' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
