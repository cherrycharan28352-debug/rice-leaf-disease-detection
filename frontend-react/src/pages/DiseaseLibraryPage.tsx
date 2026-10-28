import React, { useState, useEffect } from 'react';
import { 
  Search, BookOpen, Volume2, VolumeX, ShieldCheck, PhoneCall, 
  X, ArrowRight, Activity, Filter, HelpCircle
} from 'lucide-react';
import { api } from '../services/api';
import { DiseaseItem } from '../types';
import { SupportedLanguage, UI_TEXT, DISEASE_TRANSLATIONS } from '../translations';
import { speechService } from '../utils/speech';

interface DiseaseLibraryPageProps {
  onSelectSampleForDetection: (sampleFile: string) => void;
  preselectedDisease?: string | null;
  lang: SupportedLanguage;
}

export const DiseaseLibraryPage: React.FC<DiseaseLibraryPageProps> = ({
  onSelectSampleForDetection,
  preselectedDisease,
  lang,
}) => {
  const t = UI_TEXT[lang];
  const [diseases, setDiseases] = useState<DiseaseItem[]>([]);
  const [search, setSearch] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<DiseaseItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

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

  const filteredDiseases = diseases.filter((d) => {
    const trans = DISEASE_TRANSLATIONS[d.name];
    const knName = trans ? trans.kannada_name.toLowerCase() : '';
    const hiName = trans ? trans.hindi_name.toLowerCase() : '';
    const enName = d.name.toLowerCase();
    const q = search.toLowerCase();

    return enName.includes(q) || knName.includes(q) || hiName.includes(q);
  });

  const handleAudioSpeak = (disease: DiseaseItem) => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
      return;
    }

    const trans = DISEASE_TRANSLATIONS[disease.name];
    let speechText = "";
    if (trans) {
      if (lang === 'kn') {
        speechText = `ರೋಗದ ಹೆಸರು: ${trans.kannada_name}. ಲಕ್ಷಣಗಳು: ${trans.symptoms.kn}. ನಿರ್ವಹಣೆ: ${trans.next_steps.kn}. ತಡೆಗಟ್ಟುವಿಕೆ: ${trans.prevention.kn}.`;
      } else if (lang === 'hi') {
        speechText = `रोग: ${trans.hindi_name}. लक्षण: ${trans.symptoms.hi}. उपाय: ${trans.next_steps.hi}.`;
      } else {
        speechText = `Disease: ${trans.english_name}. Symptoms: ${trans.symptoms.en}. Management: ${trans.next_steps.en}.`;
      }
    } else {
      speechText = disease.name;
    }

    setIsPlayingAudio(true);
    speechService.speak(speechText, {
      lang: lang,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  return (
    <div className="space-y-6 py-4 sm:py-8 max-w-6xl mx-auto px-4 pb-24 sm:pb-12 text-left">
      
      {/* Title & Search Bar */}
      <div className="space-y-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {lang === 'kn' ? '🌿 ಭತ್ತದ ರೋಗಗಳ ಮಾಹಿತಿ ಕೈಪಿಡಿ' : lang === 'hi' ? '🌿 धान के प्रमुख रोग' : '🌿 Rice Disease Library'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {lang === 'kn'
              ? 'ಕರ್ನಾಟಕದ ಪ್ರಮುಖ 20 ಭತ್ತದ ರೋಗಗಳು, ಲಕ್ಷಣಗಳು ಮತ್ತು ನಿರ್ವಹಣಾ ಕ್ರಮಗಳು.'
              : '20 major rice diseases, visible symptoms, and certified management practices.'}
          </p>
        </div>

        {/* Search input */}
        <div className="relative max-w-md">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              lang === 'kn'
                ? 'ರೋಗದ ಹೆಸರು ಹುಡುಕಿ (ಉದಾ: ಬೆಂಕಿ ರೋಗ, ಬ್ಲಾಸ್ಟ್)...'
                : 'Search disease name (e.g. Blast, Blight)...'
            }
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm shadow-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of 20 Diseases */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 font-bold text-sm">
          {lang === 'kn' ? 'ಮಾಹಿತಿ ಲೋಡ್ ಆಗುತ್ತಿದೆ...' : 'Loading disease library...'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDiseases.map((d) => {
            const trans = DISEASE_TRANSLATIONS[d.name];
            const knName = trans ? trans.kannada_name : d.name;
            const hiName = trans ? trans.hindi_name : d.name;
            const title = lang === 'kn' ? knName : lang === 'hi' ? hiName : d.name;
            const subTitle = lang === 'kn' ? d.name : knName;

            return (
              <div
                key={d.id}
                onClick={() => setSelectedDisease(d)}
                className="cursor-pointer group p-5 bg-white rounded-3xl border border-slate-200/90 hover:border-emerald-500 shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                      {d.pathogen_type}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAudioSpeak(d);
                      }}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-800 transition"
                      title="Listen"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-black text-slate-900 group-hover:text-emerald-700 transition leading-snug">
                    {title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {subTitle}
                  </p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {trans ? trans.meaning[lang] : d.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>{lang === 'kn' ? 'ಪೂರ್ಣ ಮಾಹಿತಿ ನೋಡಿ' : 'View Full Details'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Disease Detail Modal */}
      {selectedDisease && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold">
                  {selectedDisease.pathogen_type}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {lang === 'kn' && DISEASE_TRANSLATIONS[selectedDisease.name]
                    ? `${DISEASE_TRANSLATIONS[selectedDisease.name].kannada_name} (${selectedDisease.name})`
                    : selectedDisease.name}
                </h3>
                <p className="text-xs font-mono text-slate-500 italic">
                  {selectedDisease.scientific_name}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAudioSpeak(selectedDisease)}
                  className={`p-2 rounded-xl transition ${
                    isPlayingAudio ? 'bg-amber-400 text-slate-950 animate-pulse' : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                  }`}
                  title="Listen"
                >
                  {isPlayingAudio ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => {
                    speechService.stop();
                    setIsPlayingAudio(false);
                    setSelectedDisease(null);
                  }}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Disease Info Sections */}
            {DISEASE_TRANSLATIONS[selectedDisease.name] ? (
              (() => {
                const tr = DISEASE_TRANSLATIONS[selectedDisease.name];
                return (
                  <div className="space-y-4 text-xs sm:text-sm">
                    {/* Meaning */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
                        <BookOpen className="w-4 h-4 text-emerald-700" />
                        <span>{t.section_meaning}</span>
                      </h4>
                      <p className="text-slate-700 leading-relaxed">{tr.meaning[lang]}</p>
                    </div>

                    {/* Symptoms */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                      <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
                        <HelpCircle className="w-4 h-4 text-emerald-700" />
                        <span>{t.section_symptoms}</span>
                      </h4>
                      <p className="text-slate-700 leading-relaxed">{tr.symptoms[lang]}</p>
                    </div>

                    {/* Next Steps / Management */}
                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1">
                      <h4 className="font-bold text-emerald-950 flex items-center space-x-1.5">
                        <Activity className="w-4 h-4 text-emerald-700" />
                        <span>{t.section_next_steps}</span>
                      </h4>
                      <p className="text-emerald-950 leading-relaxed font-medium">{tr.next_steps[lang]}</p>
                    </div>

                    {/* Prevention */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                      <h4 className="font-bold text-slate-900 flex items-center space-x-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        <span>{t.section_prevention}</span>
                      </h4>
                      <p className="text-slate-700 leading-relaxed">{tr.prevention[lang]}</p>
                    </div>

                    {/* Expert Advice */}
                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
                      <h4 className="font-bold text-amber-950 flex items-center space-x-1.5">
                        <PhoneCall className="w-4 h-4 text-amber-700" />
                        <span>{t.section_expert}</span>
                      </h4>
                      <p className="text-amber-900 leading-relaxed">{tr.expert_advice[lang]}</p>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="space-y-3 text-xs sm:text-sm">
                <p className="text-slate-700">{selectedDisease.description}</p>
                <div className="p-3 bg-slate-50 rounded-xl">
                  <strong>Symptoms:</strong> {selectedDisease.symptoms}
                </div>
                <div className="p-3 bg-emerald-50 rounded-xl">
                  <strong>Management:</strong> {selectedDisease.management}
                </div>
              </div>
            )}

            {/* Modal Close Button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  speechService.stop();
                  setIsPlayingAudio(false);
                  setSelectedDisease(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
              >
                {lang === 'kn' ? 'ಮುಚ್ಚಿ' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
