import React, { useState, useEffect } from 'react';
import { 
  Search, BookOpen, Microscope, ShieldCheck, Thermometer, ShieldAlert, 
  X, ArrowRight, ExternalLink, Sparkles, Filter, Camera
} from 'lucide-react';
import { api } from '../services/api';
import { DiseaseItem } from '../types';

interface DiseaseLibraryPageProps {
  onSelectSampleForDetection: (sampleFile: string) => void;
  preselectedDisease?: string | null;
}

export const DiseaseLibraryPage: React.FC<DiseaseLibraryPageProps> = ({
  onSelectSampleForDetection,
  preselectedDisease,
}) => {
  const [diseases, setDiseases] = useState<DiseaseItem[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('All');
  const [selectedDisease, setSelectedDisease] = useState<DiseaseItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDiseases();
  }, []);

  useEffect(() => {
    if (preselectedDisease && diseases.length > 0) {
      const match = diseases.find((d) => d.name.toLowerCase() === preselectedDisease.toLowerCase());
      if (match) setSelectedDisease(match);
    }
  }, [preselectedDisease, diseases]);

  const loadDiseases = async () => {
    setLoading(true);
    try {
      const data = await api.getDiseases();
      setDiseases(data);
    } catch (err) {
      console.error('Failed to load diseases:', err);
    } finally {
      setLoading(false);
    }
  };

  const pathogenFilters = ['All', 'Fungal', 'Bacterial', 'Viral', 'Insect', 'Healthy'];

  const filteredDiseases = diseases.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.scientific_name.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase());

    if (filterType === 'All') return matchesSearch;
    if (filterType === 'Fungal') return matchesSearch && d.pathogen_type.toLowerCase().includes('fungal');
    if (filterType === 'Bacterial') return matchesSearch && d.pathogen_type.toLowerCase().includes('bacterial');
    if (filterType === 'Viral') return matchesSearch && d.pathogen_type.toLowerCase().includes('viral');
    if (filterType === 'Insect') return matchesSearch && (d.pathogen_type.toLowerCase().includes('insect') || d.pathogen_type.toLowerCase().includes('pest') || d.name.includes('Damage') || d.name.includes('Hispa'));
    if (filterType === 'Healthy') return matchesSearch && d.pathogen_type.toLowerCase().includes('healthy');

    return matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
          <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
          <span>Botanical Rice Pathology Encyclopedia</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Rice Foliage Disease Library
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Explore comprehensive diagnostic dossiers, pathogen taxonomy, and recommended agronomic management for 20 major rice diseases and conditions.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by disease name, scientific taxon, or symptoms..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-slate-200 focus:outline-emerald-500"
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          <span className="text-slate-400 font-semibold mr-1 flex items-center space-x-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Pathogen:</span>
          </span>
          {pathogenFilters.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilterType(tag)}
              className={`px-3 py-1 rounded-full font-semibold transition ${
                filterType === tag
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Disease Cards Grid */}
      {loading ? (
        <div className="py-20 text-center text-slate-400">Loading botanical library...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredDiseases.map((d) => (
            <div
              key={d.id}
              onClick={() => setSelectedDisease(d)}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-400 transition cursor-pointer flex flex-col group"
            >
              <div className="aspect-4/3 bg-slate-100 overflow-hidden relative">
                {d.sample_image_url ? (
                  <img
                    src={d.sample_image_url}
                    alt={d.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300">
                    <Microscope className="w-8 h-8" />
                  </div>
                )}
                <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-900/70 backdrop-blur-md text-white">
                  {d.pathogen_type.split(' ')[0]}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-emerald-700 transition">
                    {d.name}
                  </h3>
                  <p className="text-[11px] italic text-slate-500 line-clamp-1 mt-0.5">
                    {d.scientific_name}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                    {d.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-600 font-semibold">
                  <span>View Full Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Disease Detail Modal */}
      {selectedDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-start p-6 border-b border-slate-100 bg-emerald-50/50">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  {selectedDisease.pathogen_type}
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {selectedDisease.name}
                </h2>
                <p className="text-xs italic text-slate-500 font-medium">
                  {selectedDisease.scientific_name}
                </p>
              </div>
              <button
                onClick={() => setSelectedDisease(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 leading-relaxed">
              {selectedDisease.sample_image_url && (
                <div className="rounded-xl overflow-hidden aspect-21/9 bg-slate-100 border border-slate-200">
                  <img
                    src={selectedDisease.sample_image_url}
                    alt={selectedDisease.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Botanical Description:
                </h4>
                <p className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                  {selectedDisease.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center space-x-1.5 text-emerald-800">
                  <Microscope className="w-4 h-4 text-emerald-600" />
                  <span>Observed Symptoms:</span>
                </h4>
                <p className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                  {selectedDisease.symptoms}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center space-x-1.5 text-amber-800">
                  <Thermometer className="w-4 h-4 text-amber-600" />
                  <span>Favorable Conditions & Causes:</span>
                </h4>
                <p className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                  {selectedDisease.favorable_conditions}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center space-x-1.5 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Preventive Cultural Practices:</span>
                </h4>
                <p className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                  {selectedDisease.prevention}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-1 flex items-center space-x-1.5 text-emerald-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Recommended Crop Management:</span>
                </h4>
                <p className="bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                  {selectedDisease.management}
                </p>
              </div>

              {selectedDisease.expert_consultation && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Expert Consultation Threshold: </span>
                    {selectedDisease.expert_consultation}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setSelectedDisease(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
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
