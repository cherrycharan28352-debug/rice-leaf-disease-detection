import React from 'react';
import { 
  Sprout, Cpu, ShieldAlert, Award, Microscope, BookOpen, 
  ExternalLink, CheckCircle2, Leaf, Heart
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <Sprout className="w-4 h-4 text-emerald-600" />
          <span>Research & Methodology</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About RiceCare AI
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Bridging advanced deep learning, quantum computing architectures, and field agronomy to protect global rice crops against debilitating foliar pathogens.
        </p>
      </div>

      {/* Core Mission Section */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <h2 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <Leaf className="w-5 h-5 text-emerald-600" />
          <span>Agricultural Mission</span>
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          Rice is the primary caloric staple for more than 3.5 billion people worldwide. However, foliar diseases such as Rice Blast, Bacterial Leaf Blight, and Brown Spot cause annual yield losses exceeding 20–30% in vulnerable farming regions. RiceCare AI was created to place immediate, scientifically verified plant pathology tools directly into the hands of farmers, agronomists, and agricultural students through responsive web and mobile interfaces.
        </p>
      </div>

      {/* Hybrid Architecture Breakdown */}
      <div className="space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Neural Pipeline
          </span>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Hybrid Quantum-Classical Architecture
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">1. RiceNet Residual Backbone</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Custom deep residual convolutional network with Squeeze-and-Excitation (SE) channel attention optimized for extracting subtle foliar lesion patterns and texture gradients.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
              <Microscope className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">2. Variational Quantum Circuit (VQC)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Features are compressed via PCA and angle-encoded into a 4-qubit quantum state simulator with parameterized Ry/Rz rotation gates and Pauli-Z expectation measurements.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">3. Explainable Grad-CAM</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Target convolutional gradients generate visual class-activation heatmaps so agronomists can visually verify precisely which leaf regions triggered the diagnosis.
            </p>
          </div>
        </div>
      </div>

      {/* 20 Conditions Classification Scope */}
      <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200/80 space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          20 Supported Rice Conditions & Pathologies
        </h3>
        <p className="text-xs text-slate-600">
          RiceCare AI evaluates leaf photographs across all 20 standardized botanical classes:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          {[
            'Healthy Rice Leaf', 'Brown Spot', 'Leaf Smut', 'Bacterial Leaf Blight',
            'Rice Blast', 'Sheath Blight', 'False Smut', 'Tungro',
            'Bacterial Leaf Streak', 'Sheath Rot', 'Narrow Brown Leaf Spot', 'Rice Hispa',
            'Bacterial Panicle Blight', 'Bakanae', 'Stem Borer Damage', 'Rice Grassy Stunt',
            'Rice Ragged Stunt', 'Dirty Panicle', 'Kernel Smut', 'Udbatta Disease'
          ].map((item, idx) => (
            <div key={idx} className="p-2.5 rounded-lg bg-white border border-slate-200/60 font-semibold text-slate-700 flex items-center space-x-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Official Advisory Disclaimer Notice */}
      <div className="p-6 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
        <div className="flex items-center space-x-2 font-bold text-amber-950 text-sm">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Agricultural Practice & Advisory Disclaimer</span>
        </div>
        <p className="leading-relaxed">
          The predictions, symptoms, and agronomic management instructions provided by RiceCare AI are computational advisory estimates intended to assist crop scouting. Diagnosis should be cross-verified with local agricultural university extension services or certified crop protection specialists before purchasing or applying commercial chemical inputs.
        </p>
      </div>
    </div>
  );
};
