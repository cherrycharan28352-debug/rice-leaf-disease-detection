import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, Image as ImageIcon, Sparkles, RefreshCw, X, AlertCircle, 
  Check, ArrowRight, ShieldCheck, Loader2, Volume2, VolumeX, HelpCircle,
  WifiOff
} from 'lucide-react';
import { api } from '../services/api';
import { PredictionResult } from '../types';
import { DetectionResultView } from '../components/DetectionResultView';
import { SupportedLanguage, UI_TEXT } from '../translations';
import { speechService } from '../utils/speech';

interface DetectPageProps {
  onViewLibraryItem: (diseaseName: string) => void;
  lang: SupportedLanguage;
  initialSampleUrl?: string | null;
}

export const DetectPage: React.FC<DetectPageProps> = ({ 
  onViewLibraryItem,
  lang,
  initialSampleUrl
}) => {
  const t = UI_TEXT[lang];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOfflineError, setIsOfflineError] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  // Camera handling
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  // Load sample if passed from home page
  useEffect(() => {
    if (initialSampleUrl) {
      loadSampleFromUrl(initialSampleUrl);
    }
  }, [initialSampleUrl]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const loadSampleFromUrl = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const file = new File([blob], 'sample_leaf.jpg', { type: 'image/jpeg' });
      setSelectedFile(file);
      setPreviewUrl(url);
      setPredictionResult(null);
      setError(null);
    } catch (e) {
      console.warn('Could not load sample file:', e);
    }
  };

  const startCamera = async () => {
    setCameraError(null);
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: 'environment' }, // prefer rear camera for leaves
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCameraStream(stream);
      setCameraActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.warn('Direct camera stream failed, falling back to camera file picker:', err);
      // Fallback to native camera input on mobile
      if (cameraInputRef.current) {
        cameraInputRef.current.click();
      } else {
        setCameraError(
          lang === 'kn'
            ? 'ಕ್ಯಾಮೆರಾ ತೆರೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಗ್ಯಾಲರಿಯಿಂದ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ.'
            : 'Could not open camera directly. Please choose from gallery.'
        );
      }
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setCameraActive(false);
  };

  const capturePhotoFromStream = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `rice_leaf_${Date.now()}.jpg`, { type: 'image/jpeg' });
          setSelectedFile(file);
          setPreviewUrl(canvas.toDataURL('image/jpeg'));
          stopCamera();
          setPredictionResult(null);
          setError(null);
        }
      }, 'image/jpeg', 0.95);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setPredictionResult(null);
      setError(null);
      stopCamera();
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPredictionResult(null);
    setError(null);
    setIsOfflineError(false);
    stopCamera();
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const handleRunAnalysis = async () => {
    if (!selectedFile) return;

    setAnalyzing(true);
    setError(null);
    setIsOfflineError(false);

    try {
      const res = await api.predictLeaf(selectedFile);
      if (res && res.success) {
        setPredictionResult(res);
      } else {
        setError((res as any)?.message || 'Analysis failed. Please try with another clear photo.');
      }
    } catch (err: any) {
      console.error('Prediction API error:', err);
      // Check if network error
      if (!navigator.onLine || err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        setIsOfflineError(true);
        setError(t.offline_alert);
      } else {
        setError(err.message || 'An error occurred while connecting to the diagnostic server.');
      }
    } finally {
      setAnalyzing(false);
    }
  };

  // If a prediction has been obtained, show the result view
  if (predictionResult) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <DetectionResultView
          result={predictionResult}
          onReset={handleClear}
          onViewLibraryItem={onViewLibraryItem}
          lang={lang}
        />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8 space-y-6 pb-24 sm:pb-12 text-center">
      
      {/* Hidden file inputs for Camera and Gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Page Title & Instructions */}
      <div className="space-y-2">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
          {lang === 'kn' ? 'ಭತ್ತದ ಎಲೆ ಪರೀಕ್ಷೆ' : lang === 'hi' ? 'धान की पत्ती जाँच' : 'Rice Leaf Disease Diagnosis'}
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          {t.home_instruction}
        </p>
      </div>

      {/* Camera Live View (if active) */}
      {cameraActive && (
        <div className="bg-slate-950 rounded-3xl overflow-hidden p-3 shadow-xl space-y-3 animate-in fade-in">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-2 border-dashed border-amber-300/60 pointer-events-none rounded-2xl m-4 flex items-center justify-center">
              <span className="bg-black/60 px-3 py-1 rounded-full text-[11px] text-amber-300 font-bold">
                {lang === 'kn' ? 'ಎಲೆಯನ್ನು ಇಲ್ಲಿ ಕೇಂದ್ರೀಕರಿಸಿ' : 'Center leaf here'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 py-2">
            <button
              onClick={stopCamera}
              className="px-5 py-2.5 rounded-xl bg-slate-800 text-white text-xs font-bold hover:bg-slate-700 transition"
            >
              {lang === 'kn' ? 'ರದ್ದುಮಾಡಿ' : 'Cancel'}
            </button>
            <button
              onClick={capturePhotoFromStream}
              className="px-8 py-3.5 rounded-full bg-amber-400 text-slate-950 text-base font-black hover:bg-amber-300 shadow-lg transition active:scale-95 flex items-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>{lang === 'kn' ? 'ಫೋಟೋ ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Capture Photo'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Image Preview Card (if photo selected) */}
      {previewUrl && !cameraActive && (
        <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-emerald-300 shadow-lg space-y-4 animate-in zoom-in-95">
          <div className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden bg-slate-100 shadow-inner border border-slate-200">
            <img
              src={previewUrl}
              alt="Selected rice leaf"
              className="w-full h-full object-cover"
            />
            <button
              onClick={handleClear}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center shadow-md transition"
              title="Remove"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Retake & Remove options */}
          <div className="flex justify-center gap-3">
            <button
              onClick={() => {
                if (cameraInputRef.current) cameraInputRef.current.click();
                else startCamera();
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center space-x-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t.btn_retake}</span>
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-rose-100 text-rose-700 text-xs font-bold transition flex items-center space-x-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>{t.btn_remove}</span>
            </button>
          </div>

          {/* Big One-Click Analysis Button */}
          <button
            onClick={handleRunAnalysis}
            disabled={analyzing}
            className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-base sm:text-lg font-black shadow-xl shadow-emerald-600/30 transition active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {analyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t.analyzing_text}</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>{t.btn_check_leaf}</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      )}

      {/* Main Choice Selector (when no image selected and camera not active) */}
      {!previewUrl && !cameraActive && (
        <div className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Option A: Open Camera */}
            <button
              onClick={() => {
                if (cameraInputRef.current) cameraInputRef.current.click();
                else startCamera();
              }}
              className="p-6 rounded-3xl bg-emerald-600 hover:bg-emerald-700 text-white flex flex-col items-center justify-center space-y-3 shadow-lg shadow-emerald-600/25 transition active:scale-95 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="block text-lg font-black">{t.btn_take_photo}</span>
                <span className="text-xs text-emerald-100">
                  {lang === 'kn' ? 'ಕ್ಯಾಮೆರಾದಿಂದ ನೇರ ಫೋಟೋ' : 'Take photo now'}
                </span>
              </div>
            </button>

            {/* Option B: Choose from Gallery */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="p-6 rounded-3xl bg-white hover:bg-emerald-50 text-slate-900 border-2 border-emerald-200 flex flex-col items-center justify-center space-y-3 shadow-md transition active:scale-95 group"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition">
                <ImageIcon className="w-8 h-8 text-emerald-700" />
              </div>
              <div>
                <span className="block text-lg font-black text-emerald-950">{t.btn_choose_gallery}</span>
                <span className="text-xs text-slate-500">
                  {lang === 'kn' ? 'ಮೊಬೈಲ್ ಗ್ಯಾಲರಿ ಚಿತ್ರ' : 'Choose existing photo'}
                </span>
              </div>
            </button>
          </div>

          {/* Simple Guidance Card */}
          <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 text-left space-y-2">
            <h4 className="font-bold text-emerald-950 text-xs flex items-center space-x-1.5">
              <HelpCircle className="w-4 h-4 text-emerald-700" />
              <span>{t.camera_guidance_title}</span>
            </h4>
            <ul className="text-xs text-emerald-900 space-y-1 pl-5 list-disc">
              <li>{t.camera_tip_1}</li>
              <li>{t.camera_tip_2}</li>
              <li>{t.camera_tip_3}</li>
            </ul>
          </div>
        </div>
      )}

      {/* Error Message & Offline Notice */}
      {error && (
        <div className={`p-4 rounded-2xl border text-xs sm:text-sm text-left flex items-start space-x-3 ${
          isOfflineError ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-red-50 border-red-200 text-red-900'
        }`}>
          {isOfflineError ? <WifiOff className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />}
          <div className="space-y-1">
            <p className="font-bold">{isOfflineError ? (lang === 'kn' ? 'ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವಿಲ್ಲ' : 'Offline Notice') : 'Error'}</p>
            <p className="leading-relaxed">{error}</p>
            {isOfflineError && selectedFile && (
              <button
                onClick={handleRunAnalysis}
                className="mt-2 px-4 py-1.5 rounded-lg bg-amber-600 text-white font-bold text-xs hover:bg-amber-700 transition"
              >
                {lang === 'kn' ? 'ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ' : 'Retry Now'}
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
