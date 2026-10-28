import React from 'react';
import { 
  Sprout, Camera, BookOpen, BarChart3, ShieldCheck, Microscope, 
  Cpu, ArrowRight, CheckCircle2, ChevronRight, Activity, Leaf, Sparkles,
  Smartphone, Download, ExternalLink
} from 'lucide-react';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
  onOpenDownload?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setCurrentTab, onOpenDownload }) => {
  return (
    <div className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white rounded-3xl border border-emerald-100/60 p-8 sm:p-12 lg:p-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-300/80 text-emerald-900 text-xs font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>AI-Powered Botanical Precision Agriculture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Detect Rice Leaf Diseases <br className="hidden sm:inline" />
            with <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy decoration-2">Quantum AI</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Upload a rice leaf image to identify possible diseases and learn about suitable management practices. Engineered for farmers, agricultural students, and researchers.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <button
              onClick={() => setCurrentTab('detect')}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow-md shadow-emerald-600/25 transition active:scale-95"
            >
              <Camera className="w-5 h-5" />
              <span>Detect Disease</span>
            </button>
            {onOpenDownload && (
              <button
                onClick={onOpenDownload}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 shadow-md shadow-slate-900/20 transition active:scale-95 border border-slate-700"
              >
                <Smartphone className="w-5 h-5 text-emerald-400" />
                <span>Download Android App</span>
              </button>
            )}
            <button
              onClick={() => setCurrentTab('library')}
              className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-50 hover:border-slate-400 transition"
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Explore Diseases (20 Classes)</span>
            </button>
          </div>

          {/* Quick Metrics Banner */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
              <span className="block text-2xl font-black text-emerald-600">20</span>
              <span className="text-xs font-semibold text-slate-600">Rice Conditions</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
              <span className="block text-2xl font-black text-slate-900">4-Qubit</span>
              <span className="text-xs font-semibold text-slate-600">Quantum VQC Circuit</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
              <span className="block text-2xl font-black text-emerald-600">Grad-CAM</span>
              <span className="text-xs font-semibold text-slate-600">Foliar Heatmaps</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/80 border border-slate-200/80 shadow-xs">
              <span className="block text-2xl font-black text-slate-900">Real-time</span>
              <span className="text-xs font-semibold text-slate-600">Mobile Field Capture</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Streamlined Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How RiceCare AI Works
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto">
            From paddy field capture to verified agronomic management in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 hover:border-emerald-300 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg border border-emerald-200">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Capture or Upload Leaf
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Use your smartphone camera directly in the rice field or upload an existing photo of a diseased or suspected leaf blade from your gallery.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 hover:border-emerald-300 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg border border-emerald-200">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Neural & Quantum Analysis
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The hybrid RiceNet residual CNN and Variational Quantum Circuit extract lesion textures, calculate spot contours, and quantify severity in milliseconds.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 hover:border-emerald-300 transition">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg border border-emerald-200">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Evidence-Based Management
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive verified scientific symptoms, favorable environmental causes, preventive cultural measures, and crop-specific management steps.
            </p>
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="space-y-8 bg-slate-50 p-8 sm:p-12 rounded-3xl border border-slate-200/80">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Scientific Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Engineered for Agricultural Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Hybrid Quantum CNN</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Trained on multi-class pathology datasets combining deep residual SE-attention with 4-qubit quantum angle encoding.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Lesion Severity Profiler</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automatic contour segmentation determines healthy vs. affected leaf blade percentage and counts necrotic lesion clusters.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Foliar Validation</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Built-in quality filters immediately reject pitch-dark, blurred, or unrelated non-leaf photographs to prevent false diagnoses.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-slate-900">Botanical Encyclopedia</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Instant access to scientific descriptions, pathogen taxonomies, and agronomic care for 20 major rice diseases and conditions.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile Android App Dedicated Section */}
      <section className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl border border-emerald-700/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-xl text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-700/60 text-emerald-200 text-xs font-bold border border-emerald-600/60">
              <Smartphone className="w-3.5 h-3.5" />
              <span>Available for Android Phones & Tablets</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Diagnose Rice Diseases In The Field
            </h3>
            <p className="text-sm text-emerald-100/90 leading-relaxed">
              Take RiceCare AI with you to your paddy fields. Download the native Android application (APK) with live camera autofocus, offline tolerance, and instant quantum VQC predictions.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {onOpenDownload ? (
                <button
                  onClick={onOpenDownload}
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  <span>Download APK for Android (8.28 MB)</span>
                </button>
              ) : (
                <a
                  href="https://github.com/cherrycharan28352-debug/rice-leaf-disease-detection/releases/download/v2.0.0/RiceCare-AI-v2.0.0.apk"
                  download="RiceCare-AI-v2.0.0.apk"
                  className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-emerald-500/25 transition active:scale-95"
                >
                  <Download className="w-5 h-5" />
                  <span>Download APK for Android (8.28 MB)</span>
                </a>
              )}
              <a
                href="https://github.com/cherrycharan28352-debug/rice-leaf-disease-detection/releases/tag/v2.0.0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition"
              >
                <span>Release Notes</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-3 shrink-0">
            <div className="w-16 h-16 rounded-2xl bg-emerald-400 text-slate-950 flex items-center justify-center mx-auto shadow-md">
              <Smartphone className="w-9 h-9" />
            </div>
            <div className="text-sm font-bold text-white">RiceCare AI Mobile</div>
            <div className="text-xs text-emerald-200">v2.0.0 • Android 8.0+</div>
            <div className="text-[11px] text-emerald-300/80">Samsung • Xiaomi • Realme • OnePlus</div>
          </div>
        </div>
      </section>

      {/* Explore Diseases CTA Banner */}
      <section className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="px-3 py-1 rounded-full bg-emerald-800/80 text-emerald-200 text-xs font-bold border border-emerald-700">
            Open Agricultural Knowledge Base
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Explore 20 Rice Disease Profiles
          </h3>
          <p className="text-sm text-emerald-200 leading-relaxed">
            From Rice Blast, Bacterial Leaf Blight, and Brown Spot to False Smut, Tungro, and Sheath Rot — review causal pathogens and evidence-based field treatments.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentTab('library')}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-white text-emerald-900 font-bold text-xs hover:bg-emerald-50 transition shadow-md"
            >
              <span>Browse Disease Library</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
