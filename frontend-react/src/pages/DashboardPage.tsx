import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Activity, ShieldCheck, Microscope, ArrowRight, Camera, 
  Clock, AlertTriangle, TrendingUp, Sparkles, CheckCircle2, ChevronRight
} from 'lucide-react';
import { api } from '../services/api';
import { DashboardStats } from '../types';

interface DashboardPageProps {
  onNavigateToDetect: () => void;
  onNavigateToHistory: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateToDetect,
  onNavigateToHistory,
}) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setLoading(true);
    try {
      const data = await api.getDashboardStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center text-slate-400">
        Loading agricultural analytics...
      </div>
    );
  }

  const hasData = stats && stats.total_analyses > 0;
  const maxCount = stats && stats.disease_distribution.length > 0 
    ? Math.max(...stats.disease_distribution.map((d) => d.count))
    : 1;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Field Pathology Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Disease Diagnostic Dashboard
          </h1>
          <p className="text-sm text-slate-500">
            Real-time statistical distribution of scanned rice foliar conditions.
          </p>
        </div>

        <button
          onClick={onNavigateToDetect}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-xs transition"
        >
          <Camera className="w-4 h-4" />
          <span>New Leaf Scan</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1.5">
            <Microscope className="w-4 h-4 text-emerald-600" />
            <span>Total Analyses</span>
          </span>
          <span className="block text-3xl font-extrabold text-slate-900">
            {stats?.total_analyses || 0}
          </span>
          <span className="text-[11px] text-slate-400">Specimens classified by neural model</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Most Detected Disease</span>
          </span>
          <span className="block text-lg font-bold text-slate-900 truncate">
            {stats?.most_common_disease || 'None recorded'}
          </span>
          <span className="text-[11px] text-slate-400">Primary localized pathogen risk</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1.5">
            <Activity className="w-4 h-4 text-emerald-600" />
            <span>Average Model Confidence</span>
          </span>
          <span className="block text-3xl font-extrabold text-emerald-700">
            {stats?.average_confidence ? `${stats.average_confidence}%` : '0%'}
          </span>
          <span className="text-[11px] text-slate-400">Across verified prediction history</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <span className="text-xs font-semibold text-slate-500 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Active Classes</span>
          </span>
          <span className="block text-3xl font-extrabold text-slate-900">20</span>
          <span className="text-[11px] text-slate-400">Multi-class classification scope</span>
        </div>
      </div>

      {/* Main Charts & Analytics */}
      {!hasData ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <BarChart3 className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            No Leaf Analyses Recorded Yet
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Analyze your first rice leaf specimen to generate real-time pathogen frequency charts and severity distributions.
          </p>
          <button
            onClick={onNavigateToDetect}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition"
          >
            <Camera className="w-4 h-4" />
            <span>Start First Diagnosis</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bar Chart: Disease Frequency Distribution */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 text-emerald-600" />
                <span>Detected Conditions Frequency</span>
              </h3>
              <span className="text-[11px] text-slate-400">Historical Scans</span>
            </div>

            {/* Custom SVG / Bar representation */}
            <div className="space-y-3 pt-2">
              {stats.disease_distribution.map((item, idx) => {
                const percentage = Math.round((item.count / maxCount) * 100);
                return (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-800">{item.disease_name}</span>
                      <span className="font-mono text-slate-500 text-[11px]">
                        {item.count} scans ({item.avg_conf ? Math.round(item.avg_conf) : 0}% avg conf)
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Severity Breakdown */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-100 mb-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <span>Severity Spread</span>
                </h3>
              </div>

              <div className="space-y-3">
                {stats.severity_distribution.map((sev, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex justify-between items-center text-xs"
                  >
                    <span className="font-semibold text-slate-800">{sev.severity_level}</span>
                    <span className="font-mono font-bold text-emerald-700 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                      {sev.count} cases
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-800 space-y-1">
              <span className="font-bold">Agronomic Guidance:</span>
              <p>Severity levels are quantified by lesion area percentages and infected leaf tissue ratios.</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Predictions Table / Feed */}
      {hasData && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Recent Scans</span>
            </h3>
            <button
              onClick={onNavigateToHistory}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
            >
              <span>View Full History</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {stats.recent_scans.map((scan) => (
              <div
                key={scan.id}
                className="px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-slate-50/80 transition"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                    <img
                      src={scan.image_url}
                      alt={scan.disease_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{scan.disease_name}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">{scan.created_at}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs self-end sm:self-center">
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {scan.confidence}% Conf.
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700 border border-slate-200">
                    {scan.severity_level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
