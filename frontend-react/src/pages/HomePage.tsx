import React, { useState } from 'react';
import { 
  Camera, Image as ImageIcon, BookOpen, Volume2, VolumeX, 
  Smartphone, Download, ShieldCheck, Sparkles, CheckCircle2,
  ArrowRight, Info, HelpCircle
} from 'lucide-react';
import { SupportedLanguage, UI_TEXT } from '../translations';
import { speechService } from '../utils/speech';

interface HomePageProps {
  setCurrentTab: (tab: string) => void;
  onOpenDownload?: () => void;
  lang: SupportedLanguage;
  setLang: (lang: SupportedLanguage) => void;
  onSelectSampleForDetection?: (sampleUrl: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ 
  setCurrentTab, 
  onOpenDownload,
  lang,
  setLang,
  onSelectSampleForDetection
}) => {
  const t = UI_TEXT[lang];
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const sampleLeaves = [
    {
      id: 'rice_blast',
      nameKn: 'ಬೆಂಕಿ ರೋಗ',
      nameEn: 'Rice Blast',
      nameHi: 'ब्लास्ट रोग',
      path: '/api/sample_leaves/blast.jpg',
      badge: 'Fungal'
    },
    {
      id: 'bacterial_blight',
      nameKn: 'ದುಂಡಾಣು ಕವಚ ರೋಗ',
      nameEn: 'Bacterial Blight',
      nameHi: 'जीवाणु झुलसा',
      path: '/api/sample_leaves/bacterial_blight.jpg',
      badge: 'Bacterial'
    },
    {
      id: 'brown_spot',
      nameKn: 'ಕಂದು ಚುಕ್ಕೆ',
      nameEn: 'Brown Spot',
      nameHi: 'भूरा धब्बा',
      path: '/api/sample_leaves/brown_spot.jpg',
      badge: 'Fungal'
    },
    {
      id: 'healthy',
      nameKn: 'ಆರೋಗ್ಯಕರ ಎಲೆ',
      nameEn: 'Healthy Leaf',
      nameHi: 'स्वस्थ पत्ती',
      path: '/api/sample_leaves/healthy.jpg',
      badge: 'Healthy'
    }
  ];

  const handleAudioSpeak = () => {
    if (isPlayingAudio) {
      speechService.stop();
      setIsPlayingAudio(false);
      return;
    }

    let speechText = "";
    if (lang === 'kn') {
      speechText = "ರೈಸ್ ಕೇರ್ ಎಐ ಗೆ ಸ್ವಾಗತ. ನಿಮ್ಮ ಭತ್ತದ ಬೆಳೆಯ ಆರೋಗ್ಯ ತಿಳಿಯಿರಿ. ಭತ್ತದ ಎಲೆಯ ಫೋಟೋ ತೆಗೆದು ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ಸುಲಭವಾಗಿ ಪರಿಶೀಲಿಸಿ. ಫೋಟೋ ತೆಗೆಯಲು ಕ್ಯಾಮೆರಾ ಬಟನ್ ಒತ್ತಿ, ಅಥವಾ ಗ್ಯಾಲರಿಯಿಂದ ಫೋಟೋ ಆಯ್ಕೆಮಾಡಿ.";
    } else if (lang === 'hi') {
      speechText = "राइस केयर एआई में आपका स्वागत है। अपनी धान की फसल का स्वास्थ्य जानें। धान की पत्ती का फोटो लेकर रोग के लक्षणों की जांच करें। फोटो खींचने के लिए कैमरा बटन दबाएं या गैलरी से फोटो चुनें।";
    } else {
      speechText = "Welcome to RiceCare AI. Check the health of your rice crop. Take a photo of an affected rice leaf to check for possible disease. Tap Take a Photo or choose from your gallery.";
    }

    setIsPlayingAudio(true);
    speechService.speak(speechText, {
      lang: lang,
      onEnd: () => setIsPlayingAudio(false),
      onError: () => setIsPlayingAudio(false)
    });
  };

  const handleSampleClick = (sampleUrl: string) => {
    if (onSelectSampleForDetection) {
      onSelectSampleForDetection(sampleUrl);
      setCurrentTab('detect');
    } else {
      setCurrentTab('detect');
    }
  };

  return (
    <div className="space-y-8 sm:space-y-12 py-4 sm:py-8 pb-20 sm:pb-8">
      {/* Top Banner / Welcome for Farmers */}
      <section className="bg-gradient-to-b from-emerald-600 via-emerald-700 to-teal-800 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 relative z-10">
          
          {/* Audio Speaker Pill & Language Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleAudioSpeak}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold transition shadow-md active:scale-95 ${
                isPlayingAudio 
                  ? 'bg-amber-400 text-slate-950 animate-pulse' 
                  : 'bg-white/20 hover:bg-white/30 text-white border border-white/30'
              }`}
              title="Listen to guidance"
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>{t.btn_stop_audio}</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-300" />
                  <span>{t.btn_read_aloud} 🔊</span>
                </>
              )}
            </button>

            {/* Quick Language Toggle */}
            <div className="inline-flex items-center rounded-xl bg-black/25 backdrop-blur-sm p-1 border border-white/20 text-xs font-bold">
              <button
                onClick={() => setLang('kn')}
                className={`px-3 py-1.5 rounded-lg transition ${lang === 'kn' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-white/80 hover:text-white'}`}
              >
                ಕನ್ನಡ
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 rounded-lg transition ${lang === 'en' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-white/80 hover:text-white'}`}
              >
                English
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-3 py-1.5 rounded-lg transition ${lang === 'hi' ? 'bg-amber-400 text-slate-950 shadow-sm' : 'text-white/80 hover:text-white'}`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          {/* Heading and Subtitle */}
          <div className="space-y-2 pt-2">
            <div className="inline-block px-3 py-1 rounded-full bg-white/15 text-emerald-100 text-xs font-semibold tracking-wide border border-white/20">
              🌾 {t.app_subtitle}
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow-sm">
              RiceCare AI
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-amber-300">
              {t.home_heading}
            </p>
            <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto leading-relaxed">
              {t.home_instruction}
            </p>
          </div>

          {/* Useful Photo Tip for Farmer */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm text-emerald-50 border border-white/20 max-w-lg mx-auto flex items-center space-x-2.5 text-left">
            <HelpCircle className="w-5 h-5 text-amber-300 shrink-0" />
            <span>💡 <strong>{lang === 'kn' ? 'ಸಲಹೆ:' : lang === 'hi' ? 'सुझाव:' : 'Tip:'}</strong> {t.home_tip}</span>
          </div>

          {/* Three Large Touch-Friendly Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-4 max-w-2xl mx-auto">
            {/* 1. Take a Photo Button */}
            <button
              onClick={() => setCurrentTab('detect')}
              className="flex sm:flex-col items-center justify-center space-x-3 sm:space-x-0 sm:space-y-2 p-4 sm:p-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-base sm:text-lg shadow-lg shadow-black/20 transition active:scale-95 border-2 border-amber-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-950/10 flex items-center justify-center group-hover:scale-110 transition">
                <Camera className="w-7 h-7 text-slate-950" />
              </div>
              <div className="text-left sm:text-center">
                <span className="block leading-tight">{t.btn_take_photo}</span>
                <span className="text-[11px] font-medium text-slate-800">
                  {lang === 'kn' ? 'ಕ್ಯಾಮೆರಾ ಬಳಸಿ' : lang === 'hi' ? 'कैमरा खोलें' : 'Use Camera'}
                </span>
              </div>
            </button>

            {/* 2. Choose from Gallery Button */}
            <button
              onClick={() => setCurrentTab('detect')}
              className="flex sm:flex-col items-center justify-center space-x-3 sm:space-x-0 sm:space-y-2 p-4 sm:p-5 rounded-2xl bg-white hover:bg-emerald-50 text-slate-950 font-black text-base sm:text-lg shadow-lg shadow-black/15 transition active:scale-95 border-2 border-white group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition">
                <ImageIcon className="w-7 h-7 text-emerald-800" />
              </div>
              <div className="text-left sm:text-center">
                <span className="block leading-tight text-emerald-950">{t.btn_choose_gallery}</span>
                <span className="text-[11px] font-medium text-emerald-800">
                  {lang === 'kn' ? 'ಫೋನ್ ಫೋಟೋಗಳು' : lang === 'hi' ? 'गैलरी फोटो' : 'Saved Photos'}
                </span>
              </div>
            </button>

            {/* 3. Learn About Rice Diseases Button */}
            <button
              onClick={() => setCurrentTab('library')}
              className="flex sm:flex-col items-center justify-center space-x-3 sm:space-x-0 sm:space-y-2 p-4 sm:p-5 rounded-2xl bg-emerald-900/80 hover:bg-emerald-900 text-white font-bold text-base sm:text-lg shadow-lg shadow-black/15 transition active:scale-95 border border-emerald-500/50 group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center group-hover:scale-110 transition">
                <BookOpen className="w-7 h-7 text-emerald-300" />
              </div>
              <div className="text-left sm:text-center">
                <span className="block leading-tight">{t.btn_learn_diseases}</span>
                <span className="text-[11px] font-medium text-emerald-300">
                  {lang === 'kn' ? '20 ರೋಗಗಳ ಮಾಹಿತಿ' : lang === 'hi' ? '20 रोगों की जानकारी' : '20 Conditions'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* 1-Click Sample Test Leaves */}
      <section className="bg-white rounded-3xl p-5 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-extrabold text-slate-900 text-base sm:text-lg flex items-center space-x-2">
              <span>🌾 {t.sample_leaves_title}</span>
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'kn'
                ? 'ಕ್ಯಾಮೆರಾ ಇಲ್ಲವೇ? ಪರೀಕ್ಷಿಸಲು ಈ ಕೆಳಗಿನ ಮಾದರಿ ಎಲೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ:'
                : lang === 'hi'
                ? 'कैमरा उपलब्ध नहीं है? परीक्षण के लिए नीचे दिए गए नमूने पर क्लिक करें:'
                : 'No camera right now? Tap any sample leaf below to test the AI instantly:'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {sampleLeaves.map((sample) => (
            <div
              key={sample.id}
              onClick={() => handleSampleClick(sample.path)}
              className="cursor-pointer group rounded-2xl border border-slate-200 hover:border-emerald-500 p-2.5 bg-slate-50 hover:bg-emerald-50/50 transition-all shadow-xs hover:shadow-md text-left flex flex-col justify-between"
            >
              <div className="aspect-square rounded-xl overflow-hidden bg-slate-200 relative mb-2">
                <img
                  src={sample.path}
                  alt={sample.nameEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  onError={(e) => {
                    // Fallback to placeholder if asset not ready
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/70 text-white text-[9px] font-bold">
                  {sample.badge}
                </span>
              </div>
              <div>
                <p className="font-black text-xs text-slate-900 group-hover:text-emerald-700 leading-tight">
                  {lang === 'kn' ? sample.nameKn : lang === 'hi' ? sample.nameHi : sample.nameEn}
                </p>
                <p className="text-[10px] text-slate-500">
                  {sample.nameEn}
                </p>
              </div>
              <div className="mt-2 text-[10px] font-bold text-emerald-700 flex items-center justify-between">
                <span>{lang === 'kn' ? 'ಪರೀಕ್ಷಿಸಿ' : lang === 'hi' ? 'जाँचें' : 'Test'}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Android App Download Banner */}
      <section className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-lg border border-emerald-700/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-xl text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <Smartphone className="w-3.5 h-3.5" />
              <span>
                {lang === 'kn' ? 'ರೈತರ ಮೊಬೈಲ್‌ಗಾಗಿ ಆಂಡ್ರಾಯ್ಡ್ ಆ್ಯಪ್' : lang === 'hi' ? 'किसानों के लिए एंड्रॉयड ऐप' : 'Android App for Farmers'}
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {lang === 'kn' 
                ? 'ನಿಮ್ಮ ಭತ್ತದ ಗದ್ದೆಯಲ್ಲೇ ನೇರವಾಗಿ ರೋಗ ಪತ್ತೆ ಮಾಡಿ' 
                : lang === 'hi' 
                ? 'सीधे अपने खेत में धान के रोगों की पहचान करें' 
                : 'Diagnose Rice Diseases In The Field'}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {lang === 'kn'
                ? 'ಇಂಟರ್ನೆಟ್ ನಿಧಾನವಾಗಿದ್ದರೂ ನಿಮ್ಮ ಮೊಬೈಲ್ ಕ್ಯಾಮೆರಾದಿಂದ ತಕ್ಷಣ ಭತ್ತದ ರೋಗ ಪರೀಕ್ಷಿಸಿ. ನಮ್ಮ ಹಗುರವಾದ ಉಚಿತ ಆಂಡ್ರಾಯ್ಡ್ ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿಕೊಳ್ಳಿ.'
                : lang === 'hi'
                ? 'अपने फोन कैमरे से सीधे धान की बीमारी की जांच करें। हल्का और आसान एंड्रॉयड ऐप अभी डाउनलोड करें।'
                : 'Take RiceCare AI to your paddy fields. Download our lightweight native Android app with instant camera capture and offline guidance.'}
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <a
                href="https://github.com/cherrycharan28352-debug/rice-leaf-disease-detection/releases/download/v2.0.0/RiceCare-AI-v2.0.0.apk"
                download="RiceCare-AI-v2.0.0.apk"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-md transition active:scale-95"
              >
                <Download className="w-4 h-4" />
                <span>{lang === 'kn' ? 'ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ (APK 8.28 MB)' : lang === 'hi' ? 'ऐप डाउनलोड करें (APK 8.28 MB)' : 'Download APK (8.28 MB)'}</span>
              </a>
              {onOpenDownload && (
                <button
                  onClick={onOpenDownload}
                  className="inline-flex items-center space-x-1.5 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition"
                >
                  <Info className="w-3.5 h-3.5 text-emerald-300" />
                  <span>{lang === 'kn' ? 'ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡುವ ವಿಧಾನ' : lang === 'hi' ? 'इंस्टॉल करने का तरीका' : 'Install Guide'}</span>
                </button>
              )}
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center space-y-2 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-md">
              <Smartphone className="w-8 h-8" />
            </div>
            <div className="text-xs font-black text-white">RiceCare AI</div>
            <div className="text-[11px] text-amber-300 font-semibold">ಕನ್ನಡ • English • हिन्दी</div>
            <div className="text-[10px] text-emerald-200">Android 8.0+</div>
          </div>
        </div>
      </section>

      {/* Advisory Disclaimer Banner */}
      <section className="bg-amber-50 rounded-2xl p-4 sm:p-5 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start space-x-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold text-amber-950">
            {lang === 'kn' ? 'ರೈತರಿಗೆ ಮುಖ್ಯ ಸೂಚನೆ:' : lang === 'hi' ? 'किसानों के लिए आवश्यक सूचना:' : 'Important Notice for Farmers:'}
          </p>
          <p className="leading-relaxed text-amber-900/90 text-xs">
            {t.disclaimer_text}
          </p>
        </div>
      </section>
    </div>
  );
};
