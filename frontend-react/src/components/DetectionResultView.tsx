import React, { useState } from 'react';
import { 
  CheckCircle2, AlertTriangle, ShieldCheck, Microscope, Info, ArrowLeft, 
  Printer, Activity, Thermometer, ShieldAlert, Sparkles, Eye, FileText, ChevronRight
} from 'lucide-react';
import { PredictionResult } from '../types';

interface DetectionResultViewProps {
  result: PredictionResult;
  onReset: () => void;
  onViewLibraryItem: (diseaseName: string) => void;
}

export const DetectionResultView: React.FC<DetectionResultViewProps> = ({
  result,
  onReset,
  onViewLibraryItem,
}) => {
  const [activeTab, setActiveTab] = useState<'management' | 'symptoms' | 'causes' | 'prevention'>('management');
  const [showGradcam, setShowGradcam] = useState(false);

  // Confidence styling
  const isHigh = result.confidence_level === 'High';
  const isModerate = result.confidence_level === 'Moderate';
  const confColor = isHigh ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : isModerate ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-red-700 bg-red-50 border-red-200';
  const confProgressColor = isHigh ? 'bg-emerald-500' : isModerate ? 'bg-amber-500' : 'bg-red-500';

  // Severity styling
  const sev = result.severity.severity_level.toLowerCase();
  const sevBadge = sev.includes('severe') ? 'bg-red-100 text-red-800 border-red-200' : sev.includes('moderate') ? 'bg-amber-100 text-amber-800 border-amber-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <button
          onClick={onReset}
          className="inline-flex items-center space-x-2 text-sm font-semibold text-slate-600 hover:text-emerald-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Analyze Another Leaf</span>
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={() => onViewLibraryItem(result.disease)}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition"
          >
            <span>Botanical Encyclopedia</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Diagnosis Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Leaf Image & Grad-CAM toggle */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 aspect-4/3 flex items-center justify-center shadow-inner">
                <img
                  src={showGradcam && result.gradcam_url ? result.gradcam_url : result.image_url}
                  alt={result.disease}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/70 backdrop-blur-md text-white text-[11px] font-medium flex items-center space-x-1">
                  <span>{showGradcam ? 'Grad-CAM Heatmap' : 'Leaf Specimen'}</span>
                </div>
              </div>

              {/* Heatmap toggle if available */}
              {result.gradcam_url && (
                <button
                  type="button"
                  onClick={() => setShowGradcam(!showGradcam)}
                  className="w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100/60 text-emerald-800 text-xs font-semibold transition"
                >
                  <Eye className="w-4 h-4" />
                  <span>{showGradcam ? 'Switch to Original Photo' : 'View Explainable Grad-CAM Heatmap'}</span>
                </button>
              )}

              {/* Severity & Metrics Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 flex items-center space-x-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Lesion Severity:</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${sevBadge}`}>
                    {result.severity.severity_level}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-slate-600">
                    <span>Healthy Tissue Area:</span>
                    <span className="font-mono font-bold text-emerald-700">{result.severity.healthy_area_pct}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-2 rounded-full"
                      style={{ width: `${result.severity.healthy_area_pct}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-600 border-t border-slate-200">
                  <div>
                    <span className="text-slate-400">Infected Lesions:</span>
                    <p className="font-bold text-slate-800 font-mono text-xs">{result.severity.lesion_count} detected</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Affected Area:</span>
                    <p className="font-bold text-slate-800 font-mono text-xs">{result.severity.affected_area_pct}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Diagnostic Information */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                    {result.pathogen_type}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${confColor}`}>
                    {result.confidence_level} Confidence ({result.confidence_percentage}%)
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {result.disease}
                </h1>
                <p className="text-sm font-medium italic text-slate-500 mt-0.5">
                  Scientific: {result.scientific_name}
                </p>
              </div>

              {/* Confidence Gauge */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div className="flex justify-between items-center mb-1.5 text-xs font-semibold text-slate-700">
                  <span>Model Confidence Score</span>
                  <span className="font-mono text-sm font-bold text-slate-900">
                    {result.confidence_percentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div
                    className={`${confProgressColor} h-2.5 rounded-full transition-all duration-500`}
                    style={{ width: `${result.confidence_percentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Prediction computed from deep residual convolution features and variational quantum expectation measurements.
                </p>
              </div>

              {/* Botanical Advisory Notice */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start space-x-2.5">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Agronomic Advisory: </span>
                  {result.advisory}
                </div>
              </div>

              {/* Navigation Tabs for Details */}
              <div className="border-b border-slate-200">
                <div className="flex space-x-4">
                  {[
                    { id: 'management', label: 'Management' },
                    { id: 'symptoms', label: 'Symptoms' },
                    { id: 'causes', label: 'Conditions & Causes' },
                    { id: 'prevention', label: 'Prevention' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`pb-2 text-xs font-bold tracking-wide uppercase transition border-b-2 ${
                        activeTab === tab.id
                          ? 'border-emerald-600 text-emerald-700'
                          : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="text-sm text-slate-700 leading-relaxed min-h-36">
                {activeTab === 'management' && (
                  <div className="space-y-4 animate-in fade-in">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5 flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Recommended Crop Management:</span>
                      </h4>
                      <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs leading-relaxed text-slate-700">
                        {result.management}
                      </p>
                    </div>

                    {result.next_steps && result.next_steps.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                          Suggested Next Steps for the Farmer:
                        </h4>
                        <ul className="space-y-1.5 text-xs">
                          {result.next_steps.map((step, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'symptoms' && (
                  <div className="space-y-3 animate-in fade-in">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                      <Microscope className="w-4 h-4 text-emerald-600" />
                      <span>Observed Foliar Symptoms:</span>
                    </h4>
                    <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs leading-relaxed text-slate-700">
                      {result.symptoms}
                    </p>
                  </div>
                )}

                {activeTab === 'causes' && (
                  <div className="space-y-3 animate-in fade-in">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                      <Thermometer className="w-4 h-4 text-amber-600" />
                      <span>Favorable Weather & Environmental Conditions:</span>
                    </h4>
                    <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs leading-relaxed text-slate-700">
                      {result.causes}
                    </p>
                    {result.contributing_factors && (
                      <p className="text-xs text-slate-600">
                        <span className="font-semibold text-slate-800">Contributing Factors: </span>
                        {result.contributing_factors}
                      </p>
                    )}
                  </div>
                )}

                {activeTab === 'prevention' && (
                  <div className="space-y-3 animate-in fade-in">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Preventive Cultural Practices:</span>
                    </h4>
                    <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 text-xs leading-relaxed text-slate-700">
                      {result.prevention}
                    </p>
                  </div>
                )}
              </div>

              {/* Disclaimer */}
              <p className="text-[11px] text-slate-400 italic pt-2 border-t border-slate-100">
                {result.disclaimer || "AI predictions are advisory and meant to assist agricultural decision-making. Always verify diagnoses with an agronomist or extension officer."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
