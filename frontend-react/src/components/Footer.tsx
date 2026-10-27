import React from 'react';
import { Sprout, ShieldAlert, Cpu, Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentTab }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Purpose */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shadow-md">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                RiceCare<span className="text-emerald-400"> AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              A scientific, field-ready plant pathology platform combining deep residual neural networks (RiceNet) and Variational Quantum Classifiers (VQC) to empower farmers, students, and agronomists with immediate rice leaf disease diagnosis.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-slate-800 text-emerald-400 text-xs font-mono border border-slate-700">
                <Cpu className="w-3.5 h-3.5" />
                <span>PyTorch 2.14 + VQC</span>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
                20 Rice Conditions
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-mono border border-slate-700">
                Grad-CAM Explainable AI
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setCurrentTab('home')}
                  className="hover:text-emerald-400 transition"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('detect')}
                  className="hover:text-emerald-400 transition"
                >
                  AI Disease Detection
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('library')}
                  className="hover:text-emerald-400 transition"
                >
                  Botanical Disease Library
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="hover:text-emerald-400 transition"
                >
                  Analytics & Statistics
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('history')}
                  className="hover:text-emerald-400 transition"
                >
                  Diagnosis History
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentTab('about')}
                  className="hover:text-emerald-400 transition"
                >
                  Research & Methodology
                </button>
              </li>
            </ul>
          </div>

          {/* Advisory Disclaimer Notice */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center space-x-1.5 text-amber-400">
              <ShieldAlert className="w-4 h-4 text-amber-400" />
              <span>Agricultural Advisory</span>
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-800/60 p-3 rounded-lg border border-slate-700/80">
              Predictions produced by RiceCare AI are computational advisory assessments designed to support crop inspection. Users should verify uncertain diagnoses with a local agricultural extension officer or certified plant pathologist prior to chemical application.
            </p>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 space-y-3 sm:space-y-0">
          <div>
            © {new Date().getFullYear()} RiceCare AI. Dedicated to global food security and sustainable rice agronomy.
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-slate-400">
              <span>Engineered with care for farmers</span>
              <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
