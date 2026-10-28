import { RemoteConfig, AppVersionInfo, RemoteAnnouncement } from '../types';
import { api } from './api';

const STORAGE_KEY = 'ricecare_remote_config';
const SYNC_TIME_KEY = 'ricecare_remote_config_sync_time';
export const CURRENT_CLIENT_VERSION = '2.0.0';

export const DEFAULT_REMOTE_CONFIG: RemoteConfig = {
  schema_version: '1.0.0',
  config_version: '2026.10.29.1',
  published_at: '2026-10-28T18:30:00Z',
  checksum: 'default-local-fallback',
  app_version: {
    latest_version: CURRENT_CLIENT_VERSION,
    min_supported_version: '1.0.0',
    apk_download_url: 'https://github.com/cherrycharan28352-debug/rice-leaf-disease-detection/releases/download/v2.0.0/RiceCare-AI-v2.0.0.apk',
    play_store_url: 'https://play.google.com/store/apps/details?id=com.ricecare.ai',
    force_update: false,
    release_notes_en: 'CIBRC verified pesticide safety, Kannada voice speech, and offline guides.',
    release_notes_kn: 'CIBRC ಕೀಟನಾಶಕ ಮಾಹಿತಿ, ಕನ್ನಡ ಧ್ವನಿ ವಿವರಣೆ ಮತ್ತು ಆಫ್‌ಲೈನ್ ಮಾರ್ಗದರ್ಶಿ.'
  },
  announcements: [
    {
      id: 'ann-monsoon-blast',
      active: true,
      type: 'advisory',
      priority: 'high',
      title_en: 'Paddy Blast & Leaf Health Alert',
      title_kn: 'ಭತ್ತದ ಬೆಂಕಿ ರೋಗ (Blast) ಜಾಗರೂಕತೆ',
      title_hi: 'धान का झुलसा रोग (Blast) चेतावनी',
      message_en: 'High atmospheric humidity promotes fungal blast lesions. Inspect your crop regularly.',
      message_kn: 'ಹೆಚ್ಚಿನ ತೇವಾಂಶವಿದ್ದಾಗ ಬೆಂಕಿ ರೋಗ ಹರಡುವ ಸಾಧ್ಯತೆ ಇರುತ್ತದೆ. ಎಲೆಯ ಮೇಲೆ ಚುಕ್ಕೆಗಳಿವೆಯೇ ಪರಿಶೀಲಿಸಿ.',
      message_hi: 'अधिक नमी होने पर ब्लास्ट रोग के लक्षण तेजी से फैल सकते हैं। नियमित निरीक्षण करें।'
    }
  ],
  home_messages: {
    title_kn: 'RiceCare AI',
    subtitle_kn: 'ನಿಮ್ಮ ಭತ್ತದ ಬೆಳೆಯ ಆರೋಗ್ಯ ತಿಳಿಯಿರಿ',
    tagline_kn: 'ಭತ್ತದ ಎಲೆಯ ಫೋಟೋ ತೆಗೆದು ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ತಕ್ಷಣವೇ ಪರಿಶೀಲಿಸಿ.',
    title_en: 'RiceCare AI',
    subtitle_en: 'Check the health of your rice crop',
    tagline_en: 'Take a photo of a rice leaf to check for possible disease.',
    title_hi: 'RiceCare AI',
    subtitle_hi: 'अपनी धान की फसल का स्वास्थ्य जानें',
    tagline_hi: 'संभावित रोग की जांच के लिए धान की पत्ती का फोटो लें।'
  },
  feature_flags: {
    enable_offline_queue: true,
    enable_audio_tts: true,
    enable_sample_picker: true,
    enable_pesticide_safety_warnings: true,
    max_upload_size_mb: 16
  },
  support_contacts: {
    kisan_call_center: '1800-180-1551',
    karnataka_agri_helpdesk: '080-22212804',
    raitha_samparka_kendra: 'Visit your nearest Hobli Raitha Samparka Kendra (RSK)'
  },
  content_overrides: {},
  disease_overrides: {},
  pesticide_overrides: {}
};

class RemoteConfigService {
  private config: RemoteConfig;
  private listeners: Set<(config: RemoteConfig) => void> = new Set();
  private isFetching = false;

  constructor() {
    this.config = this.loadCachedConfig();
    // Attempt automatic sync on initial service creation
    this.fetchRemoteConfig();
    
    // Auto-sync when reconnecting to network
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.fetchRemoteConfig();
      });
    }
  }

  private loadCachedConfig(): RemoteConfig {
    if (typeof window === 'undefined') return DEFAULT_REMOTE_CONFIG;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (this.validateSchema(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('[RemoteConfig] Cache read failure, using default:', e);
    }
    return DEFAULT_REMOTE_CONFIG;
  }

  private validateSchema(obj: any): obj is RemoteConfig {
    return (
      obj &&
      typeof obj === 'object' &&
      typeof obj.schema_version === 'string' &&
      typeof obj.config_version === 'string' &&
      typeof obj.home_messages === 'object' &&
      typeof obj.feature_flags === 'object' &&
      typeof obj.app_version === 'object'
    );
  }

  public getConfig(): RemoteConfig {
    return this.config;
  }

  public getLastSyncTime(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(SYNC_TIME_KEY);
  }

  public subscribe(listener: (config: RemoteConfig) => void): () => void {
    this.listeners.add(listener);
    listener(this.config);
    return () => {
      this.listeners.delete(listener);
    };
  }

  public async fetchRemoteConfig(): Promise<RemoteConfig> {
    if (this.isFetching) return this.config;
    this.isFetching = true;

    try {
      const baseUrl = api.getBaseUrl();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch(`${baseUrl}/api/v1/remote-config`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (this.validateSchema(data)) {
          this.config = data;
          if (typeof window !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
            localStorage.setItem(SYNC_TIME_KEY, new Date().toISOString());
          }
          this.listeners.forEach((fn) => fn(this.config));
          return this.config;
        }
      }
    } catch (e) {
      console.log('[RemoteConfig] Remote sync skipped or offline, using cached/default config.');
    } finally {
      this.isFetching = false;
    }

    return this.config;
  }

  public isUpdateAvailable(): { available: boolean; latest: string; isMandatory: boolean } {
    const latest = this.config.app_version?.latest_version || CURRENT_CLIENT_VERSION;
    const minSupported = this.config.app_version?.min_supported_version || '1.0.0';
    
    const available = latest !== CURRENT_CLIENT_VERSION;
    const isMandatory = this.config.app_version?.force_update || false;

    return { available, latest, isMandatory };
  }
}

export const remoteConfigService = new RemoteConfigService();
