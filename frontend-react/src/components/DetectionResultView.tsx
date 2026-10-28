import React, { useState } from 'react';
import { 
  ArrowLeft, Volume2, VolumeX, Share2, BookOpen, ShieldCheck, 
  AlertTriangle, CheckCircle2, ChevronDown, ChevronUp, Eye, Sparkles,
  RefreshCw, PhoneCall, HelpCircle, Activity, AlertOctagon,
  Clock, ShieldAlert, FileText, CheckCircle, ExternalLink
} from 'lucide-react';
import { PredictionResult, PesticideAdvisory } from '../types';
import { SupportedLanguage, UI_TEXT, DISEASE_TRANSLATIONS } from '../translations';
import { speechService } from '../utils/speech';
import { networkService } from '../services/network';

interface DetectionResultViewProps {
  result: PredictionResult;
  onReset: () => void;
  onViewLibraryItem: (diseaseName: string) => void;
  lang: SupportedLanguage;
}

export const DetectionResultView: React.FC<DetectionResultViewProps> = ({
  result,
  onReset,
  onViewLibraryItem,
  lang,
}) => {
  const t = UI_TEXT[lang];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showScientificDetails, setShowScientificDetails] = useState(false);
  const [showGradcam, setShowGradcam] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Fallback for unreliable predictions
  if (result.unreliable) {
    return (
      <div className="max-w-2xl mx-auto p-6 sm:p-8 bg-amber-50 rounded-3xl border-2 border-amber-300 text-center space-y-5 animate-in fade-in">
        <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto text-amber-700">
          <AlertTriangle className="w-9 h-9" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-amber-950">
            {lang === 'kn' ? 'ರೋಗವನ್ನು ನಿಖರವಾಗಿ ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ' : 'Unable to identify disease reliably'}
          </h3>
          <p className="text-sm sm:text-base text-amber-900 leading-relaxed max-w-lg mx-auto font-medium">
            {lang === 'kn'
              ? 'ರೋಗವನ್ನು ನಿಖರವಾಗಿ ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟವಾದ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ ಅಥವಾ ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ.'
              : 'Unable to identify the disease reliably. Please take a clearer photo or consult an agricultural expert.'}
          </p>
        </div>

        {/* Selected Leaf Image */}
        {result.image_url && (
          <div className="max-w-xs mx-auto rounded-2xl overflow-hidden border-2 border-amber-200 shadow-sm aspect-square bg-slate-200">
            <img src={result.image_url} alt="Analyzed Leaf" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Helpful Tips */}
        <div className="bg-white/80 p-4 rounded-2xl border border-amber-200 text-left text-xs text-amber-950 space-y-1.5 max-w-md mx-auto">
          <span className="font-bold block">💡 {lang === 'kn' ? 'ಉತ್ತಮ ಫೋಟೋ ಸಲಹೆಗಳು:' : 'Tips for clearer photo:'}</span>
          <ul className="list-disc pl-5 space-y-1">
            <li>{t.camera_tip_1}</li>
            <li>{t.camera_tip_2}</li>
            <li>{t.camera_tip_3}</li>
          </ul>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onReset}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-md transition active:scale-95 flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{lang === 'kn' ? 'ಮತ್ತೊಂದು ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆಯಿರಿ' : 'Take a Clearer Photo'}</span>
          </button>
          <button
            onClick={() => onViewLibraryItem('Rice Blast')}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white border border-amber-300 hover:bg-amber-50 text-amber-950 font-bold text-sm transition"
          >
            <BookOpen className="w-4 h-4 inline mr-1.5" />
            <span>{lang === 'kn' ? 'ರೋಗ ಮಾಹಿತಿ ನೋಡಿ' : 'Browse Disease Guide'}</span>
          </button>
        </div>
      </div>
    );
  }

  // Look up translation & verified pesticide advisory
  const trans = DISEASE_TRANSLATIONS[result.disease] || {
    kannada_name: result.disease,
    english_name: result.disease,
    hindi_name: result.disease,
    meaning: { kn: result.advisory, en: result.advisory, hi: result.advisory },
    symptoms: { kn: result.symptoms, en: result.symptoms, hi: result.symptoms },
    next_steps: { kn: result.management, en: result.management, hi: result.management },
    prevention: { kn: result.prevention, en: result.prevention, hi: result.prevention },
    expert_advice: { kn: result.advisory, en: result.advisory, hi: result.advisory },
  };

  const advisory: PesticideAdvisory | null = result.pesticide_advisory || null;
  const isStale = advisory ? networkService.isAdvisoryStale(advisory.verification_date) : false;

  const diseaseDisplayName = lang === 'kn' 
    ? `${trans.kannada_name} (${trans.english_name})`
    : lang === 'hi'
    ? `${trans.hindi_name} (${trans.english_name})`
    : trans.english_name;

  const handleAudioSpeak = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
      return;
    }

    let speechText = "";
    if (lang === 'kn') {
      speechText = `ರೋಗ: ${trans.kannada_name}. ${trans.meaning.kn} ರೋಗ ನಿರ್ವಹಣೆ: ${advisory ? advisory.nonchemical_management_kn : trans.next_steps.kn} `;
      if (advisory && advisory.has_chemical_option) {
        speechText += `ಶಿಫಾರಸು ಮಾಡಿದ ಔಷಧಿ: ${advisory.active_ingredient}. ಪ್ರಮಾಣ: ${advisory.label_rate}. `;
      }
      speechText += "ಯಾವುದೇ ರಾಸಾಯನಿಕ ಸಿಂಪಡಿಸುವ ಮುನ್ನ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.";
    } else {
      speechText = `Disease detected: ${trans.english_name}. ${trans.meaning.en}. Management: ${advisory ? advisory.nonchemical_management_en : trans.next_steps.en}. `;
      if (advisory && advisory.has_chemical_option) {
        speechText += `Recommended formulation: ${advisory.active_ingredient}. Dosage: ${advisory.label_rate}. `;
      }
      speechText += "Always verify with your local agricultural extension officer.";
    }

    setIsPlayingAudio(true);
    speechService.speak(speechText, {
      lang: lang,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  const handleShare = async () => {
    const textToShare = lang === 'kn'
      ? `🌾 ರೈಸ್ ಕೇರ್ ಎಐ ರೋಗ ನಿರ್ವಹಣಾ ವರದಿ:\nರೋಗ: ${trans.kannada_name} (${trans.english_name})\nಕೃಷಿ ನಿರ್ವಹಣೆ: ${advisory ? advisory.nonchemical_management_kn : trans.next_steps.kn}\n${advisory?.has_chemical_option ? `ಔಷಧಿ: ${advisory.active_ingredient} (${advisory.label_rate})` : ''}\nಸೂಚನೆ: ಕೃಷಿ ಅಧಿಕಾರಿಯ ಸಲಹೆ ಪಡೆಯಿರಿ.`
      : `🌾 RiceCare AI Disease Advisory:\nDisease: ${trans.english_name}\nManagement: ${advisory ? advisory.nonchemical_management_en : trans.next_steps.en}\nVerified formulation: ${advisory?.has_chemical_option ? advisory.active_ingredient : 'Non-chemical only'}\nGenerated by RiceCare AI.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'RiceCare AI Advisory',
          text: textToShare,
          url: window.location.href,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (err) {
        console.log('Share dismissed');
      }
    } else {
      navigator.clipboard.writeText(textToShare);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const isHealthy = result.disease.toLowerCase().includes('healthy');

  return (
    <div className="space-y-6 pb-20 sm:pb-10 max-w-4xl mx-auto animate-in fade-in duration-200">
      
      {/* Top Action Header */}
      <div className="flex items-center justify-between gap-3 p-2 bg-emerald-50 rounded-2xl border border-emerald-100">
        <button
          onClick={onReset}
          className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-xs transition active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 text-emerald-700" />
          <span>{t.btn_check_another}</span>
        </button>

        <div className="flex items-center space-x-2">
          {/* Read Aloud Voice Button */}
          <button
            onClick={handleAudioSpeak}
            className={`inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition active:scale-95 ${
              isPlayingAudio 
                ? 'bg-amber-400 text-slate-950 animate-pulse' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isPlayingAudio ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>{t.btn_stop_audio}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>{t.btn_read_aloud} 🔊</span>
              </>
            )}
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs sm:text-sm font-bold shadow-xs transition active:scale-95"
          >
            <Share2 className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">{shareSuccess ? 'Copied!' : t.btn_share}</span>
          </button>
        </div>
      </div>

      {/* Primary Result Banner & Leaf Specimen */}
      <div className={`rounded-3xl p-6 sm:p-8 border-2 shadow-lg ${
        isHealthy 
          ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
          : 'bg-amber-50/70 border-amber-300 text-slate-950'
      }`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* Leaf Photograph */}
          <div className="w-full md:w-56 shrink-0 space-y-2">
            <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-200 shadow-md border-2 border-white">
              <img
                src={showGradcam && result.gradcam_url ? result.gradcam_url : result.image_url}
                alt={result.disease}
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-bold">
                {showGradcam ? 'AI Heatmap' : 'ನಿಮ್ಮ ಎಲೆ / Leaf'}
              </span>
            </div>

            {result.gradcam_url && (
              <button
                type="button"
                onClick={() => setShowGradcam(!showGradcam)}
                className="w-full py-1.5 px-2 rounded-lg bg-white/90 border border-slate-200 text-slate-700 text-[11px] font-bold hover:bg-white flex items-center justify-center space-x-1 transition"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-600" />
                <span>{showGradcam ? 'ಫೋಟೋ ನೋಡಿ' : 'AI ಹೀಟ್‌ಮ್ಯಾಪ್'}</span>
              </button>
            )}
          </div>

          {/* Heading and Disease Title */}
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide bg-white/80 border border-slate-200/80 text-emerald-800 shadow-xs">
              {isHealthy ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
              <span>{t.result_heading}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              {diseaseDisplayName}
            </h2>

            {/* Simple One-Line Farmer Summary */}
            <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed bg-white/70 p-3.5 rounded-2xl border border-slate-200/60">
              {trans.meaning[lang]}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs text-slate-600 font-semibold">
              <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200">
                {t.badge_confidence}: <strong className="text-emerald-700 font-bold">{result.confidence_percentage}%</strong>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-600">
                {result.pathogen_type}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE 2: Recommended Disease Management (ರೋಗ ನಿರ್ವಹಣೆಯ ಸಲಹೆಗಳು) */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-200 shadow-sm space-y-6 text-left">
        <div className="border-b border-emerald-100 pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center space-x-2">
              <Activity className="w-6 h-6 text-emerald-600" />
              <span>{lang === 'kn' ? 'ರೋಗ ನಿರ್ವಹಣೆಯ ಸಲಹೆಗಳು' : 'Recommended Disease Management'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'kn' 
                ? 'ಕೇಂದ್ರ ಕೀಟನಾಶಕ ಮಂಡಳಿ (CIBRC) ಮತ್ತು ಕೃಷಿ ವಿಶ್ವವಿದ್ಯಾನಿಲಯಗಳ ಶಿಫಾರಸುಗಳ ಆಧಾರದ ಮೇಲೆ ಸಿದ್ಧಪಡಿಸಲಾಗಿದೆ.'
                : 'Based on official CIBRC & Agricultural University Package of Practices.'}
            </p>
          </div>

          {advisory && (
            <div className="flex items-center space-x-2 text-[11px] font-mono">
              <span className={`px-2.5 py-1 rounded-full font-bold flex items-center space-x-1 ${
                isStale ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified: {advisory.verification_date}</span>
              </span>
            </div>
          )}
        </div>

        {/* Stale Advisory Warning (if applicable) */}
        {isStale && (
          <div className="p-3 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {lang === 'kn'
                ? 'ಎಚ್ಚರಿಕೆ: ಈ ಶಿಫಾರಸಿನ ಪರಿಶೀಲನಾ ದಿನಾಂಕ ಹಳೆಯದಾಗಿರಬಹುದು. ಕೀಟನಾಶಕ ಖರೀದಿಸುವ ಮುನ್ನ ಇತ್ತೀಚಿನ ಲೇಬಲ್ ಮತ್ತು ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.'
                : 'Notice: This advisory is over 180 days old. Verify latest label recommendations with your local agricultural officer.'}
            </span>
          </div>
        )}

        {/* 1. Symptoms & Visible Signs */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h4 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>{t.section_symptoms}</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {trans.symptoms[lang]}
          </p>
        </div>

        {/* 2. Non-Chemical & Cultural Management (PRIORITIZED) */}
        <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-black text-emerald-950 text-sm flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'kn' ? '1. ಸಾಂಪ್ರದಾಯಿಕ ಮತ್ತು ಕೃಷಿ ನಿರ್ವಹಣೆ (Non-Chemical)' : '1. Cultural & Non-Chemical Management'}</span>
            </h4>
            <span className="px-2 py-0.5 rounded-md bg-emerald-200/80 text-emerald-900 font-bold text-[10px]">
              ಪ್ರಾಥಮಿಕ ಆದ್ಯತೆ / Priority 1
            </span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium whitespace-pre-line">
            {advisory ? advisory.nonchemical_management_kn : trans.next_steps.kn}
          </p>
        </div>

        {/* 3. Preventive Cultural Measures */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <h4 className="font-extrabold text-slate-900 text-sm flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>{t.section_prevention}</span>
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {advisory ? advisory.prevention_kn : trans.prevention[lang]}
          </p>
        </div>

        {/* 4. Verified Pesticide / Fungicide Guidance (If applicable) */}
        {advisory && advisory.has_chemical_option ? (
          <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/70 border-2 border-amber-300 space-y-4">
            <div className="flex items-center justify-between border-b border-amber-200 pb-3">
              <div className="flex items-center space-x-2 text-amber-950">
                <ShieldAlert className="w-5 h-5 text-amber-700" />
                <h4 className="font-black text-sm sm:text-base">
                  {lang === 'kn' ? '2. ಅಧಿಕೃತ ಕೀಟನಾಶಕ / ಶಿಲೀಂಧ್ರನಾಶಕ ಆಯ್ಕೆ' : '2. Verified Chemical Treatment Option'}
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-200 text-amber-950 font-bold text-[10px]">
                CIBRC Verified
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">
                  {lang === 'kn' ? 'ಔಷಧಿಯ ಹೆಸರು & ಘಟಕ:' : 'Active Ingredient & Formulation:'}
                </span>
                <span className="font-extrabold text-slate-900 text-sm block">
                  {advisory.active_ingredient}
                </span>
                <span className="text-[11px] text-slate-600 block font-mono">
                  Formulation: {advisory.formulation}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">
                  {lang === 'kn' ? 'ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಮಾಣ (ಡೋಸೇಜ್):' : 'Label-Approved Dosage:'}
                </span>
                <span className="font-extrabold text-emerald-800 text-sm block">
                  {advisory.label_rate}
                </span>
                <span className="text-[11px] text-slate-600 block">
                  Crop: {advisory.registered_crop}
                </span>
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 space-y-1 sm:col-span-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase block">
                  {lang === 'kn' ? 'ಸಿಂಪಡಿಸುವ ವಿಧಾನ:' : 'Application Method:'}
                </span>
                <span className="text-slate-800 font-medium leading-relaxed block">
                  {advisory.application_method}
                </span>
              </div>

              {/* Intervals */}
              <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">
                    {lang === 'kn' ? 'ಕೊಯ್ಲಿಗೆ ಕಾಯುವ ಅವಧಿ (PHI):' : 'Pre-Harvest Interval (PHI):'}
                  </span>
                  <span className="font-black text-slate-900 text-xs">
                    {advisory.pre_harvest_interval_days} Days
                  </span>
                </div>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>

              <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">
                    {lang === 'kn' ? 'ಗದ್ದೆ ಮರುಪ್ರವೇಶದ ಅವಧಿ (REI):' : 'Re-Entry Interval (REI):'}
                  </span>
                  <span className="font-black text-slate-900 text-xs">
                    {advisory.re_entry_interval_hours} Hours
                  </span>
                </div>
                <Clock className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            {/* Strict Safety Guidelines */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-950 space-y-2 text-xs">
              <span className="font-black flex items-center space-x-1.5 text-red-900">
                <AlertOctagon className="w-4 h-4 text-red-700" />
                <span>{lang === 'kn' ? 'ರೈತರಿಗೆ ಕಡ್ಡಾಯ ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆಗಳು:' : 'Critical Pesticide Safety Precautions:'}</span>
              </span>
              <p className="leading-relaxed">
                {advisory.safety_precautions}
              </p>
              <ul className="list-disc pl-5 space-y-0.5 text-[11px] text-red-900 font-medium">
                <li>{lang === 'kn' ? 'ಕೀಟನಾಶಕಗಳನ್ನು ಮಕ್ಕಳು, ಆಹಾರ ಮತ್ತು ಪ್ರಾಣಿಗಳಿಂದ ದೂರವಿಡಿ.' : 'Keep pesticides strictly away from children, food, drinking water, and livestock.'}</li>
                <li>{lang === 'kn' ? 'ಕಡ್ಡಾಯವಾಗಿ ರಬ್ಬರ್ ಕೈಗವಸು ಮತ್ತು ಮುಖಗವಸು (PPE Mask) ಧರಿಸಿ.' : 'Wear personal protective equipment (PPE mask & gloves) during mixing and spraying.'}</li>
                <li>{lang === 'kn' ? 'ಯಾವುದೇ ಎರಡು ಔಷಧಿಗಳನ್ನು ಅಧಿಕೃತ ಅನುಮತಿಯಿಲ್ಲದೆ ಒಟ್ಟಿಗೆ ಬೆರೆಸಬೇಡಿ.' : 'Never combine multiple chemicals unless explicitly authorized on product label.'}</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
            <span className="font-bold flex items-center space-x-1.5 text-emerald-900">
              <CheckCircle className="w-4 h-4 text-emerald-700" />
              <span>{lang === 'kn' ? 'ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆ ಅಗತ್ಯವಿಲ್ಲ' : 'No Chemical Treatment Required'}</span>
            </span>
            <p className="leading-relaxed">
              {lang === 'kn'
                ? 'ಈ ಬೆಳೆಗೆ ಯಾವುದೇ ಕೀಟನಾಶಕ ಅಥವಾ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಣೆ ಅಗತ್ಯವಿಲ್ಲ. ಮೇಲಿನ ಕೃಷಿ ನಿರ್ವಹಣಾ ಕ್ರಮಗಳನ್ನು ಮಾತ್ರ ಪಾಲಿಸಿ.'
                : 'Chemical pesticide intervention is not required or recommended for this condition. Follow cultural and preventive management.'}
            </p>
          </div>
        )}

        {/* Local Officer Advice */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 text-xs flex items-start space-x-2.5">
          <PhoneCall className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-bold block">
              {lang === 'kn' ? 'ಸ್ಥಳೀಯ ಕೃಷಿ ಅಧಿಕಾರಿಗಳ ಸಂಪರ್ಕ:' : 'Local Agricultural Officer Contact:'}
            </span>
            <p className="leading-relaxed">
              {lang === 'kn'
                ? 'ಯಾವುದೇ ಹೊಸ ಔಷಧಿ ಖರೀದಿಸುವ ಅಥವಾ ಸಿಂಪಡಿಸುವ ಮುನ್ನ ನಿಮ್ಮ ಗ್ರಾಮದ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ (RSK) ಅಥವಾ ಕೃಷಿ ವಿಜ್ಞಾನ ಕೇಂದ್ರವನ್ನು (KVK) ಸಂಪರ್ಕಿಸಿ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.'
                : 'Always verify pest severity and product label approval with your local Raitha Samparka Kendra (RSK) or KVK agronomist.'}
            </p>
          </div>
        </div>

        {/* Source and Verification Notice */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
          <span>Source: {advisory ? advisory.source_url : 'CIBRC National Registry'}</span>
          <span>Cycle: {advisory ? advisory.verification_date : '2026-04'}</span>
        </div>
      </section>

      {/* Main Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition active:scale-95"
        >
          <RefreshCw className="w-5 h-5" />
          <span>{t.btn_check_another}</span>
        </button>

        <button
          onClick={() => onViewLibraryItem(result.disease)}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base transition active:scale-95 shadow-xs"
        >
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <span>{lang === 'kn' ? 'ಹೆಚ್ಚಿನ ರೋಗ ಮಾಹಿತಿ' : 'Disease Guide'}</span>
        </button>
      </div>

      {/* Optional Expandable Scientific Section for Students / Researchers */}
      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={() => setShowScientificDetails(!showScientificDetails)}
          className="w-full flex items-center justify-between p-4 bg-slate-100 hover:bg-slate-200/80 rounded-2xl text-slate-800 text-xs sm:text-sm font-bold transition"
        >
          <span className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>🔬 {t.btn_view_more} (For Students & Researchers)</span>
          </span>
          {showScientificDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showScientificDetails && (
          <div className="mt-3 p-5 bg-white rounded-2xl border border-slate-200 space-y-4 text-xs text-left animate-in fade-in duration-150">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Scientific Name:</span>
                <span className="font-mono font-bold text-slate-800">{result.scientific_name}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Lesion Area:</span>
                <span className="font-bold text-slate-800">{result.severity?.affected_area_pct}% affected</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Lesion Clusters:</span>
                <span className="font-bold text-slate-800">{result.severity?.lesion_count} detected</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] text-slate-500 block">Neural Model:</span>
                <span className="font-bold text-emerald-700">4-Qubit VQC + CNN</span>
              </div>
            </div>

            {result.top_predictions && result.top_predictions.length > 0 && (
              <div className="space-y-1.5 pt-2">
                <span className="font-bold text-slate-700 block">Top Neural Probabilities:</span>
                <div className="space-y-1">
                  {result.top_predictions.slice(0, 3).map((p, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px] p-2 bg-slate-50 rounded-lg">
                      <span className="font-medium text-slate-800">{p.disease}</span>
                      <span className="font-mono font-bold text-slate-600">{(p.confidence * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
