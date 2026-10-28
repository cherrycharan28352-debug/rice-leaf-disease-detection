/**
 * Farmer Voice Guidance Helper using Web Speech API (Text-to-Speech)
 * Supports Kannada (kn-IN), Hindi (hi-IN), and English (en-IN).
 */

export interface SpeechOptions {
  lang?: 'kn' | 'hi' | 'en';
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

class SpeechService {
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSupported: boolean = false;

  constructor() {
    this.isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  public canSpeak(): boolean {
    return this.isSupported;
  }

  public stop(): void {
    if (this.isSupported && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  public speak(text: string, options: SpeechOptions = {}): boolean {
    if (!this.isSupported || !text) return false;

    try {
      this.stop();

      const utterance = new SpeechSynthesisUtterance(text);
      const lang = options.lang || 'kn';

      // Map language code
      if (lang === 'kn') {
        utterance.lang = 'kn-IN';
      } else if (lang === 'hi') {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }

      utterance.rate = options.rate ?? 0.9; // slightly slower for better clarity for farmers
      utterance.pitch = options.pitch ?? 1.0;

      // Try selecting a matching voice if available
      const voices = window.speechSynthesis.getVoices();
      const matchingVoice = voices.find(v => v.lang.startsWith(utterance.lang) || v.lang.includes(lang));
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }

      utterance.onstart = () => {
        if (options.onStart) options.onStart();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        if (options.onEnd) options.onEnd();
      };

      utterance.onerror = (e) => {
        this.currentUtterance = null;
        if (options.onError) options.onError(e);
      };

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      return false;
    }
  }
}

export const speechService = new SpeechService();
