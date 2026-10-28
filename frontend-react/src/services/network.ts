/**
 * RiceCare AI - Resilient Offline-First Network & Synchronization Client
 * 
 * Features:
 * 1. Online / Offline state monitoring
 * 2. 25-second AbortController timeouts
 * 3. Exponential backoff retry mechanism (max 2 retries)
 * 4. Local caching of verified pesticide advisories and disease guides
 * 5. Offline prediction queue (stores leaf scans taken in remote fields until reconnected)
 * 6. Stale advisory detector (flags data older than 180 days)
 */

import { PesticideAdvisory, DiseaseItem } from '../types';

export interface SyncStatus {
  isOnline: boolean;
  lastSyncTime: string | null;
  pendingQueueCount: number;
  advisoryCount: number;
}

export interface QueuedOfflineScan {
  id: string;
  timestamp: string;
  imageBlobUrl: string;
  notes?: string;
}

class NetworkService {
  private onlineStatus: boolean = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private listeners: ((online: boolean) => void)[] = [];
  private readonly TIMEOUT_MS = 25000;
  private readonly MAX_RETRIES = 2;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleStatusChange(true));
      window.addEventListener('offline', () => this.handleStatusChange(false));
    }
  }

  private handleStatusChange(isOnline: boolean) {
    this.onlineStatus = isOnline;
    this.listeners.forEach((cb) => cb(isOnline));
  }

  public isOnline(): boolean {
    return typeof navigator !== 'undefined' ? navigator.onLine : this.onlineStatus;
  }

  public subscribe(callback: (online: boolean) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  /**
   * Fetch with timeout, exponential backoff, and offline awareness
   */
  public async fetchWithRetry<T = any>(
    url: string,
    options: RequestInit = {},
    retries = this.MAX_RETRIES
  ): Promise<T> {
    if (!this.isOnline()) {
      throw new Error('OFFLINE_NETWORK_ERROR');
    }

    let lastError: any = null;

    for (let attempt = 0; attempt <= retries; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT_MS);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Server returned HTTP ${response.status}`);
        }

        return (await response.json()) as T;
      } catch (err: any) {
        clearTimeout(timeoutId);
        lastError = err;

        if (err.name === 'AbortError') {
          lastError = new Error('Request timed out after 25 seconds. Please check your network connection.');
        }

        // Only retry if network error and attempts remain
        if (attempt < retries) {
          const delayMs = Math.pow(2, attempt) * 1000;
          await new Promise((r) => setTimeout(r, delayMs));
        }
      }
    }

    throw lastError;
  }

  /* ====================================================================
   * Local Offline Caching for Verified Advisories
   * ==================================================================== */

  public cacheAdvisories(advisories: PesticideAdvisory[]): void {
    try {
      localStorage.setItem('ricecare_cached_advisories', JSON.stringify(advisories));
      localStorage.setItem('ricecare_last_sync_time', new Date().toISOString());
    } catch (e) {
      console.warn('Could not cache advisories to localStorage:', e);
    }
  }

  public getCachedAdvisories(): PesticideAdvisory[] {
    try {
      const raw = localStorage.getItem('ricecare_cached_advisories');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  public getLastSyncTime(): string | null {
    return localStorage.getItem('ricecare_last_sync_time');
  }

  public isAdvisoryStale(verificationDateStr: string): boolean {
    try {
      const vDate = new Date(verificationDateStr);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - vDate.getTime()) / (1000 * 3600 * 24));
      return diffDays > 180; // Flag if older than 6 months
    } catch (e) {
      return false;
    }
  }

  /* ====================================================================
   * Offline Scans Queue (when in field without internet)
   * ==================================================================== */

  public queueOfflineScan(scan: QueuedOfflineScan): void {
    try {
      const queue = this.getQueuedOfflineScans();
      queue.push(scan);
      localStorage.setItem('ricecare_offline_queue', JSON.stringify(queue));
    } catch (e) {
      console.warn('Failed to queue offline scan:', e);
    }
  }

  public getQueuedOfflineScans(): QueuedOfflineScan[] {
    try {
      const raw = localStorage.getItem('ricecare_offline_queue');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  public removeQueuedScan(id: string): void {
    try {
      const queue = this.getQueuedOfflineScans().filter((s) => s.id !== id);
      localStorage.setItem('ricecare_offline_queue', JSON.stringify(queue));
    } catch (e) {
      console.warn('Failed to remove queued scan:', e);
    }
  }

  public clearOfflineQueue(): void {
    localStorage.removeItem('ricecare_offline_queue');
  }
}

export const networkService = new NetworkService();
