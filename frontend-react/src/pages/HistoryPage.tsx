import React, { useState, useEffect } from 'react';
import { 
  History, Trash2, Eye, Search, Calendar, ShieldCheck, Microscope, 
  AlertCircle, X, ChevronRight, Camera, FileText
} from 'lucide-react';
import { api } from '../services/api';
import { HistoryRecord, DiseaseItem } from '../types';
import { SupportedLanguage, UI_TEXT, DISEASE_TRANSLATIONS } from '../translations';

interface HistoryPageProps {
  onNavigateToDetect: () => void;
  onViewLibraryItem: (diseaseName: string) => void;
  lang: SupportedLanguage;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({
  onNavigateToDetect,
  onViewLibraryItem,
  lang,
}) => {
  const [history, setHistory] = useState<HistoryRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [deleteMessage, setDeleteMessage] = useState<string | null>(null);
  const t = UI_TEXT[lang];

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const data = await api.getHistory(100);
      setHistory(data);
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.deleteHistory(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
      setDeleteConfirmId(null);
      setDeleteMessage('Record deleted successfully.');
      setTimeout(() => setDeleteMessage(null), 3000);
    } catch (err: any) {
      alert(err.message || 'Failed to delete record.');
    }
  };

  const filteredHistory = history.filter((item) =>
    item.disease_name.toLowerCase().includes(search.toLowerCase()) ||
    (item.scientific_name && item.scientific_name.toLowerCase().includes(search.toLowerCase())) ||
    item.created_at.includes(search)
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
            <History className="w-3.5 h-3.5 text-emerald-600" />
            <span>Diagnostic Audit Trail</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Prediction History
          </h1>
          <p className="text-sm text-slate-500">
            Review, inspect, or manage previous rice foliage analyses.
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

      {deleteMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center justify-between">
          <span>{deleteMessage}</span>
          <button onClick={() => setDeleteMessage(null)}>
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search records by disease name or date..."
            className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-emerald-500"
          />
        </div>
      </div>

      {/* History Records Table / Cards */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading prediction history...</div>
      ) : filteredHistory.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <History className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            {search ? 'No Matching Records Found' : 'No Prediction History Recorded'}
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {search
              ? 'Try modifying your search query or view all records.'
              : 'Perform your first leaf scan to maintain a personal botanical log.'}
          </p>
          {!search && (
            <button
              onClick={onNavigateToDetect}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition"
            >
              <Camera className="w-4 h-4" />
              <span>Scan First Leaf</span>
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filteredHistory.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50/80 transition"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 shadow-inner">
                    <img
                      src={item.image_url}
                      alt={item.disease_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-bold text-slate-900">
                        {lang === 'kn' && DISEASE_TRANSLATIONS[item.disease_name]
                          ? `${DISEASE_TRANSLATIONS[item.disease_name].kannada_name} (${item.disease_name})`
                          : item.disease_name}
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {item.confidence}%
                      </span>
                    </div>
                    {item.scientific_name && (
                      <p className="text-xs italic text-slate-500">{item.scientific_name}</p>
                    )}
                    <div className="flex items-center space-x-3 text-[11px] text-slate-400 font-mono">
                      <span>{item.created_at}</span>
                      <span>•</span>
                      <span>Severity: {item.severity_level}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <button
                    onClick={() => setSelectedRecord(item)}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-700 transition"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Result</span>
                  </button>

                  {deleteConfirmId === item.id ? (
                    <div className="flex items-center space-x-1 animate-in fade-in">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-2.5 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-1.5 bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-300"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      title="Delete record"
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Full Result Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden">
            <div className="flex justify-between items-center p-5 border-b border-slate-100 bg-emerald-50/50">
              <h3 className="font-bold text-slate-900 text-base">Historical Diagnosis Dossier</h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                <img
                  src={selectedRecord.image_url}
                  alt={selectedRecord.disease_name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <h2 className="text-xl font-bold text-slate-900">{selectedRecord.disease_name}</h2>
                  <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {selectedRecord.confidence}%
                  </span>
                </div>
                <p className="text-slate-400 font-mono text-[11px]">{selectedRecord.created_at}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400">Severity Level:</span>
                  <p className="font-bold text-slate-800">{selectedRecord.severity_level}</p>
                </div>
                <div>
                  <span className="text-slate-400">Affected Area:</span>
                  <p className="font-bold text-slate-800">{selectedRecord.affected_area_pct}%</p>
                </div>
                <div>
                  <span className="text-slate-400">Healthy Area:</span>
                  <p className="font-bold text-slate-800">{selectedRecord.healthy_area_pct}%</p>
                </div>
                <div>
                  <span className="text-slate-400">Lesion Count:</span>
                  <p className="font-bold text-slate-800">{selectedRecord.lesion_count} detected</p>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
              <button
                onClick={() => {
                  const disease = selectedRecord.disease_name;
                  setSelectedRecord(null);
                  onViewLibraryItem(disease);
                }}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                View in Encyclopedia &rarr;
              </button>
              <button
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
