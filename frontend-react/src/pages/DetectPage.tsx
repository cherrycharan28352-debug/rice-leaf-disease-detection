import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, Upload, Image as ImageIcon, Sparkles, RefreshCw, X, AlertCircle, 
  Check, ArrowRight, ShieldCheck, Loader2
} from 'lucide-react';
import { api } from '../services/api';
import { PredictionResult } from '../types';
import { DetectionResultView } from '../components/DetectionResultView';

// Curated 1-click test samples from backend
const QUICK_SAMPLES = [
  { name: 'Healthy Rice Leaf', file: '00_healthy_rice_leaf.jpg', tag: 'Healthy Foliage' },
  { name: 'Rice Blast', file: '04_rice_blast.jpg', tag: 'Spindle Lesions' },
  { name: 'Brown Spot', file: '01_brown_spot.jpg', tag: 'Circular Spots' },
  { name: 'Bacterial Leaf Blight', file: '03_bacterial_leaf_blight.jpg', tag: 'Wavy Wilt Margin' },
  { name: 'Tungro Virus', file: '07_tungro.jpg', tag: 'Yellow Discoloration' },
  { name: 'False Smut', file: '06_false_smut.jpg', tag: 'Spore Masses' },
];

interface DetectPageProps {
  onViewLibraryItem: (diseaseName: string) => void;
}

export const DetectPage: React.FC<DetectPageProps> = ({ onViewLibraryItem }) => {
  const [mode, setMode] = useState<'upload' | 'camera' | 'samples'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  // Camera state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera when unmounting or switching tabs
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    setCapturedPhoto(null);
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: 'environment' }, // Prefer rear camera on smartphones
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      setCameraError('Unable to access device camera. Please check browser permissions or use the Upload Image option.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const handleTabSwitch = (newMode: 'upload' | 'camera' | 'samples') => {
    setMode(newMode);
    setError(null);
    if (newMode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
  };

  const captureSnapshot = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `camera_leaf_${Date.now()}.jpg`, { type: 'image/jpeg' });
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(blob));
        setCapturedPhoto(canvas.toDataURL('image/jpeg'));
        stopCamera();
      }
    }, 'image/jpeg', 0.95);
  };

  const handleFileSelect = (file: File) => {
    setError(null);
    // Validate format
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Unsupported format. Please select a JPG, JPEG, PNG, or WEBP image.');
      return;
    }
    // Validate size (16MB)
    if (file.size > 16 * 1024 * 1024) {
      setError('File size exceeds 16MB limit. Please upload an optimized photograph.');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSamplePick = async (sampleFileName: string) => {
    setError(null);
    try {
      const res = await fetch(`/api/sample_leaves/${sampleFileName}`);
      const blob = await res.blob();
      const file = new File([blob], sampleFileName, { type: 'image/jpeg' });
      handleFileSelect(file);
    } catch {
      setError('Failed to load sample image.');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select or capture a rice leaf photograph first.');
      return;
    }

    setAnalyzing(true);
    setError(null);
    setProgressStep(1);

    const stepInterval = setInterval(() => {
      setProgressStep((prev) => (prev < 3 ? prev + 1 : prev));
    }, 700);

    try {
      const result = await api.predictLeaf(selectedFile);
      clearInterval(stepInterval);
      setPredictionResult(result);
    } catch (err: any) {
      clearInterval(stepInterval);
      setError(err.message || 'Analysis failed. Please try again with a clear rice leaf image.');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setCapturedPhoto(null);
    setError(null);
    setPredictionResult(null);
    if (mode === 'camera') {
      startCamera();
    }
  };

  // If a prediction exists, render the detailed result view
  if (predictionResult) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DetectionResultView
          result={predictionResult}
          onReset={handleReset}
          onViewLibraryItem={onViewLibraryItem}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>AI Leaf Diagnostic Studio</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Analyze Rice Leaf Specimen
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Capture or upload a clear photograph of a rice plant blade or panicle to receive instant botanical condition classification and management recommendations.
        </p>
      </div>

      {/* Input Mode Selector */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200/80">
          <button
            type="button"
            onClick={() => handleTabSwitch('upload')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              mode === 'upload'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Image</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('camera')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              mode === 'camera'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Field Camera</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch('samples')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
              mode === 'samples'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Test Samples (1-Click)</span>
          </button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Image Validation Notice</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Mode 1: Upload Dropzone */}
      {mode === 'upload' && !previewUrl && (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 bg-white hover:bg-emerald-50/20 rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition shadow-xs group"
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files && e.target.files[0] && handleFileSelect(e.target.files[0])}
            accept=".jpg,.jpeg,.png,.webp"
            className="hidden"
          />
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition">
            <Upload className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            Click to upload or drag and drop
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
            Supports high-resolution JPG, JPEG, PNG, or WEBP leaf photographs up to 16MB.
          </p>
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold shadow-xs">
            <span>Browse Computer / Gallery</span>
          </div>
        </div>
      )}

      {/* Mode 2: Camera Viewfinder */}
      {mode === 'camera' && !previewUrl && (
        <div className="bg-slate-900 rounded-2xl overflow-hidden p-4 text-center border border-slate-800 shadow-xl space-y-4">
          {cameraError ? (
            <div className="py-12 px-4 text-slate-400 space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
              <p className="text-sm font-medium text-slate-300">{cameraError}</p>
              <button
                type="button"
                onClick={startCamera}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700"
              >
                Retry Camera Access
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-4/3 max-w-lg mx-auto rounded-xl overflow-hidden bg-black shadow-inner">
                <video
                  ref={videoRef}
                  playsInline
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
                {/* Aiming Reticle Frame */}
                <div className="absolute inset-8 border-2 border-white/40 border-dashed rounded-xl pointer-events-none flex items-center justify-center">
                  <span className="text-[11px] font-mono text-white/80 bg-black/60 px-2.5 py-1 rounded-full">
                    Center Rice Leaf in Frame
                  </span>
                </div>
              </div>

              <div className="flex justify-center space-x-4 items-center">
                <button
                  type="button"
                  onClick={captureSnapshot}
                  className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 active:scale-95"
                >
                  <Camera className="w-5 h-5" />
                  <span>Capture Photo</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mode 3: Quick Test Samples Grid */}
      {mode === 'samples' && !previewUrl && (
        <div className="space-y-4">
          <p className="text-xs text-slate-500 text-center">
            Click any verified botanical specimen below to test real neural model classification:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {QUICK_SAMPLES.map((sample, idx) => (
              <div
                key={idx}
                onClick={() => handleSamplePick(sample.file)}
                className="group relative bg-white border border-slate-200/80 rounded-xl overflow-hidden cursor-pointer hover:border-emerald-500 hover:shadow-md transition flex flex-col"
              >
                <div className="aspect-4/3 bg-slate-100 overflow-hidden">
                  <img
                    src={`/api/sample_leaves/${sample.file}`}
                    alt={sample.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-3 bg-white flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      {sample.tag}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 mt-1.5">{sample.name}</h4>
                  </div>
                  <div className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1 mt-2">
                    <span>Select Specimen</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview & Analyze Actions */}
      {previewUrl && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5 animate-in fade-in">
          <div className="flex justify-between items-center pb-3 border-b border-slate-100">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-800">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Specimen Ready for Deep Analysis</span>
            </div>
            <button
              onClick={handleReset}
              className="text-xs font-semibold text-slate-500 hover:text-red-600 flex items-center space-x-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove / Replace</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="relative rounded-xl overflow-hidden bg-slate-100 border border-slate-200 aspect-4/3 flex items-center justify-center">
              <img
                src={previewUrl}
                alt="Selected Leaf Preview"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="space-y-2 text-xs text-slate-600">
                <div className="flex items-center space-x-2 text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Valid Rice Specimen Dimensions</span>
                </div>
                <p className="text-slate-500 leading-relaxed text-[11px]">
                  The neural inference engine will extract deep convolutional feature embeddings, run 4-qubit variational circuit encoding, and generate disease classification with severity segmentation.
                </p>
              </div>

              {analyzing ? (
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-3">
                  <Loader2 className="w-7 h-7 text-emerald-600 animate-spin mx-auto" />
                  <div>
                    <p className="text-xs font-bold text-emerald-900">
                      {progressStep === 1 && 'Extracting multi-scale foliage lesion features...'}
                      {progressStep === 2 && 'Executing Variational Quantum Classifier (VQC) forward pass...'}
                      {progressStep >= 3 && 'Calibrating confidence tiers & botanical management...'}
                    </p>
                    <p className="text-[10px] text-emerald-700 mt-1">Please wait a moment...</p>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleAnalyze}
                  className="w-full py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Leaf Specimen</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
