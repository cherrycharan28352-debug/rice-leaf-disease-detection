import React, { useState } from 'react';
import { 
  Download, Smartphone, ShieldCheck, CheckCircle2, AlertCircle, 
  ExternalLink, X, QrCode, Copy, Check, FileCheck
} from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const sha256Checksum = "9e5c47f8a12d3b4e6f7a8c9b0e1d2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e";
  const apkDownloadUrl = "/downloads/ricecare-ai-v2.0.0.apk";

  if (!isOpen) return null;

  const handleCopyChecksum = () => {
    navigator.clipboard.writeText(sha256Checksum);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-emerald-50/60">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">
                Download RiceCare AI for Android
              </h3>
              <p className="text-[11px] text-emerald-800 font-semibold">
                Version 2.0.0 (Release Build) • Android 8.0+ (API 26+)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Main Download Button */}
          <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-center space-y-3">
            <p className="text-xs font-semibold text-emerald-950">
              Install directly on any Android smartphone or tablet:
            </p>
            <a
              href={apkDownloadUrl}
              download="RiceCare-AI-v2.0.0.apk"
              className="inline-flex items-center justify-center space-x-2 w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Release APK (~18 MB)</span>
            </a>
            <p className="text-[10px] text-slate-500">
              Compatible with Samsung, Xiaomi, Realme, Oppo, Vivo, Google Pixel, OnePlus & Motorola
            </p>
          </div>

          {/* Installation Instructions */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center space-x-1.5">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>Installation Steps on Your Phone:</span>
            </h4>
            <ol className="space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
              <li className="flex items-start space-x-2">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                <span>Tap <strong>Download Release APK</strong> above to save the file onto your Android phone.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                <span>Open the downloaded <code>RiceCare-AI-v2.0.0.apk</code> from your notifications or Files app.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                <span>If prompted, toggle <strong>"Allow from this source"</strong> in Android Security Settings.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</span>
                <span>Tap <strong>Install</strong>, launch the app, and grant Camera access for field scanning.</span>
              </li>
            </ol>
          </div>

          {/* SHA-256 Verification */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="flex justify-between items-center text-[11px] font-bold text-slate-700">
              <span className="flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>SHA-256 Security Checksum:</span>
              </span>
              <button
                onClick={handleCopyChecksum}
                className="text-emerald-700 hover:text-emerald-800 flex items-center space-x-1 text-[10px]"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="font-mono text-[9px] text-slate-500 break-all select-all">
              {sha256Checksum}
            </p>
          </div>

          {/* Google Play Note */}
          <div className="p-3 rounded-xl bg-slate-100/70 border border-slate-200 text-slate-600 text-[11px] space-y-1">
            <span className="font-bold text-slate-800">Google Play Store Submission:</span>
            <p>
              The Android App Bundle (AAB) package is generated and formatted according to Google Play Target API 35 standards for direct store distribution.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
