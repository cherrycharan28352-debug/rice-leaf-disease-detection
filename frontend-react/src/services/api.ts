import { PredictionResult, DiseaseItem, DashboardStats, HistoryRecord, UserProfile, PesticideAdvisory } from '../types';
import { networkService } from './network';

export const getApiBase = (): string => {
  const custom = localStorage.getItem('ricecare_api_url');
  if (custom) {
    return custom.replace(/\/$/, '') + '/api';
  }
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '') + '/api';
  }
  // If running inside native Android WebView (Capacitor file:// or capacitor://)
  if (typeof window !== 'undefined' && (window.location.protocol === 'capacitor:' || window.location.protocol === 'file:')) {
    return 'http://10.233.122.153:8000/api';
  }
  return '/api';
};

export const getUploadsBase = (): string => {
  const custom = localStorage.getItem('ricecare_api_url');
  if (custom) {
    return custom.replace(/\/$/, '');
  }
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL.replace(/\/$/, '');
  }
  if (typeof window !== 'undefined' && (window.location.protocol === 'capacitor:' || window.location.protocol === 'file:')) {
    return 'http://10.233.122.153:8000';
  }
  return '';
};

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('ricecare_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

function resolveAssetUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  const base = getUploadsBase();
  return `${base}${url}`;
}

export const api = {
  async getHealth() {
    const res = await fetch(`${getApiBase()}/health`);
    return res.json();
  },

  async predictLeaf(file: File): Promise<PredictionResult> {
    const formData = new FormData();
    formData.append('file', file);

    const data: PredictionResult = await networkService.fetchWithRetry(`${getApiBase()}/predict`, {
      method: 'POST',
      headers: {
        ...getAuthHeader(),
      },
      body: formData,
    });

    // Resolve asset URLs for native mobile compatibility
    if (data.image_url) data.image_url = resolveAssetUrl(data.image_url) || data.image_url;
    if (data.gradcam_url) data.gradcam_url = resolveAssetUrl(data.gradcam_url);

    return data;
  },

  async getAdvisories(): Promise<PesticideAdvisory[]> {
    try {
      if (!networkService.isOnline()) {
        const cached = networkService.getCachedAdvisories();
        if (cached.length > 0) return cached;
      }
      const res = await networkService.fetchWithRetry<{ advisories: PesticideAdvisory[] }>(
        `${getApiBase()}/advisories`
      );
      if (res && res.advisories) {
        networkService.cacheAdvisories(res.advisories);
        return res.advisories;
      }
      return networkService.getCachedAdvisories();
    } catch (e) {
      console.warn('Falling back to local cached advisories:', e);
      return networkService.getCachedAdvisories();
    }
  },

  async getDiseases(search?: string): Promise<DiseaseItem[]> {
    const url = search ? `${getApiBase()}/diseases?search=${encodeURIComponent(search)}` : `${getApiBase()}/diseases`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch diseases');
    const list: DiseaseItem[] = await res.json();
    return list.map((d) => ({
      ...d,
      sample_image_url: resolveAssetUrl(d.sample_image_url),
    }));
  },

  async getDiseaseDetails(codeOrName: string): Promise<DiseaseItem> {
    const res = await fetch(`${getApiBase()}/diseases/${encodeURIComponent(codeOrName)}`);
    if (!res.ok) throw new Error('Failed to fetch disease details');
    const d: DiseaseItem = await res.json();
    return {
      ...d,
      sample_image_url: resolveAssetUrl(d.sample_image_url),
    };
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const res = await fetch(`${getApiBase()}/dashboard/stats`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error('Failed to fetch dashboard statistics');
    const data: DashboardStats = await res.json();
    if (data.recent_scans) {
      data.recent_scans = data.recent_scans.map((s) => ({
        ...s,
        image_url: resolveAssetUrl(s.image_url) || s.image_url,
        gradcam_url: resolveAssetUrl(s.gradcam_url),
      }));
    }
    return data;
  },

  async getHistory(limit = 50): Promise<HistoryRecord[]> {
    const res = await fetch(`${getApiBase()}/history?limit=${limit}`, {
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error('Failed to fetch prediction history');
    const list: HistoryRecord[] = await res.json();
    return list.map((h) => ({
      ...h,
      image_url: resolveAssetUrl(h.image_url) || h.image_url,
      gradcam_url: resolveAssetUrl(h.gradcam_url),
    }));
  },

  async deleteHistory(id: number): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${getApiBase()}/history/${id}`, {
      method: 'DELETE',
      headers: getAuthHeader(),
    });
    if (!res.ok) throw new Error('Failed to delete history record');
    return res.json();
  },

  async login(emailOrUsername: string, password: string): Promise<{ token: string; user: UserProfile }> {
    const res = await fetch(`${getApiBase()}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_or_username: emailOrUsername, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.detail || 'Login failed');
    return data;
  },

  async register(data: { full_name: string; username: string; email: string; password: string; location?: string }): Promise<{ token: string; user: UserProfile }> {
    const res = await fetch(`${getApiBase()}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.detail || 'Registration failed');
    return result;
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    const token = localStorage.getItem('ricecare_token');
    if (!token) return null;
    try {
      const res = await fetch(`${getApiBase()}/auth/me`, {
        headers: getAuthHeader(),
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  }
};
