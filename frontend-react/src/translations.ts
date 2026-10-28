export type SupportedLanguage = 'kn' | 'en' | 'hi';

export interface DiseaseTranslation {
  kannada_name: string;
  english_name: string;
  hindi_name: string;
  meaning: {
    kn: string;
    en: string;
    hi: string;
  };
  symptoms: {
    kn: string;
    en: string;
    hi: string;
  };
  next_steps: {
    kn: string;
    en: string;
    hi: string;
  };
  prevention: {
    kn: string;
    en: string;
    hi: string;
  };
  expert_advice: {
    kn: string;
    en: string;
    hi: string;
  };
}

export const UI_TEXT = {
  kn: {
    app_title: "RiceCare AI",
    app_subtitle: "ನಿಮ್ಮ ಭತ್ತದ ಬೆಳೆಗೆ AI ಸಹಾಯಕ",
    home_heading: "ನಿಮ್ಮ ಭತ್ತದ ಬೆಳೆಯ ಆರೋಗ್ಯ ತಿಳಿಯಿರಿ",
    home_instruction: "ಭತ್ತದ ಎಲೆಯ ಫೋಟೋ ತೆಗೆದು ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
    home_tip: "ಉತ್ತಮ ಬೆಳಕಿನಲ್ಲಿ ರೋಗದ ಲಕ್ಷಣವಿರುವ ಭತ್ತದ ಎಲೆಯ ಸ್ಪಷ್ಟ ಫೋಟೋ ತೆಗೆಯಿರಿ.",
    btn_take_photo: "ಫೋಟೋ ತೆಗೆಯಿರಿ",
    btn_choose_gallery: "ಗ್ಯಾಲರಿಯಿಂದ ಆಯ್ಕೆಮಾಡಿ",
    btn_learn_diseases: "ಭತ್ತದ ರೋಗಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ",
    btn_check_leaf: "ನನ್ನ ಭತ್ತದ ಎಲೆಯನ್ನು ಪರೀಕ್ಷಿಸಿ",
    btn_check_another: "ಇನ್ನೊಂದು ಎಲೆ ಪರೀಕ್ಷಿಸಿ",
    btn_read_aloud: "ಧ್ವನಿ ಮೂಲಕ ಆಲಿಸಿ",
    btn_stop_audio: "ಧ್ವನಿ ನಿಲ್ಲಿಸಿ",
    btn_share: "ಫಲಿತಾಂಶ ಹಂಚಿಕೊಳ್ಳಿ",
    btn_retake: "ಮತ್ತೊಮ್ಮೆ ತೆಗೆಯಿರಿ",
    btn_remove: "ತೆಗೆದುಹಾಕಿ",
    btn_download_apk: "ಆ್ಯಪ್ ಡೌನ್‌ಲೋಡ್ (APK)",
    btn_view_more: "ವೈಜ್ಞಾನಿಕ ವಿವರಗಳು",
    analyzing_text: "ಎಲೆಯ ಲಕ್ಷಣಗಳನ್ನು AI ಮೂಲಕ ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ... ದಯವಿಟ್ಟು ಕಾಯಿರಿ",
    result_heading: "ಗೊತ್ತಾಗಿರುವ ಸಾಧ್ಯತೆಯಿರುವ ರೋಗ",
    section_meaning: "ಇದರ ಅರ್ಥವೇನು?",
    section_symptoms: "ಗಿಡದಲ್ಲಿ ಏನು ಗಮನಿಸಬೇಕು?",
    section_next_steps: "ಈಗ ಏನು ಮಾಡಬೇಕು?",
    section_prevention: "ಇದನ್ನು ತಡೆಯುವುದು ಹೇಗೆ?",
    section_expert: "ಕೃಷಿ ತಜ್ಞರ ಸಲಹೆ",
    disclaimer_text: "ಸೂಚನೆ: ಈ ಫಲಿತಾಂಶವು ಕೇವಲ ಪ್ರಾಥಮಿಕ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (AI) ಅಂದಾಜು ಮಾತ್ರ. ಯಾವುದೇ ರಾಸಾಯನಿಕ ಅಥವಾ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸುವ ಮುನ್ನ ನಿಮ್ಮ ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ ಅಥವಾ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    offline_alert: "ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವಿಲ್ಲ. ಭತ್ತದ ಎಲೆ ವಿಶ್ಲೇಷಣೆಗೆ ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ ಅಗತ್ಯವಿದೆ. ದಯವಿಟ್ಟು ಇಂಟರ್ನೆಟ್ ಆನ್ ಮಾಡಿ ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
    sample_leaves_title: "ಪರೀಕ್ಷಿಸಲು ಮಾದರಿ ಎಲೆಗಳು (1-ಕ್ಲಿಕ್ ಪರೀಕ್ಷೆ)",
    nav_home: "ಮುಖಪುಟ",
    nav_check: "ಎಲೆ ಪರೀಕ್ಷೆ",
    nav_guide: "ರೋಗ ಮಾಹಿತಿ",
    nav_settings: "ಆಯ್ಕೆಗಳು",
    nav_history: "ಇತಿಹಾಸ",
    history_empty: "ಇನ್ನೂ ಯಾವುದೇ ಪರೀಕ್ಷೆಗಳ ದಾಖಲೆಯಿಲ್ಲ.",
    history_clear: "ಇತಿಹಾಸ ಅಳಿಸಿ",
    settings_language: "ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಿ",
    settings_audio: "ಸ್ವಯಂಚಾಲಿತ ಧ್ವನಿ ವಿವರಣೆ",
    settings_about: "ರೈಸ್ ಕೇರ್ ಎಐ ಬಗ್ಗೆ",
    badge_confidence: "AI ವಿಶ್ವಾಸಾರ್ಹತೆ",
    camera_guidance_title: "ಫೋಟೋ ತೆಗೆಯುವಾಗ ಗಮನಿಸಿ:",
    camera_tip_1: "ಎಲೆಯ ರೋಗದ ಮಚ್ಚೆಗಳು ಸ್ಪಷ್ಟವಾಗಿ ಕಾಣುವಂತೆ ಕ್ಯಾಮೆರಾ ಹಿಡಿಯಿರಿ.",
    camera_tip_2: "ಸೂರ್ಯನ ಬೆಳಕು ಅಥವಾ ಉತ್ತಮ ಬೆಳಕಿನಲ್ಲಿ ಫೋಟೋ ಕ್ಲಿಕ್ ಮಾಡಿ.",
    camera_tip_3: "ಹಿಂಭಾಗದ (Rear) ಕ್ಯಾಮೆರಾವನ್ನು ಬಳಸಿ.",
  },
  en: {
    app_title: "RiceCare AI",
    app_subtitle: "Smart AI Assistant for Rice Farmers",
    home_heading: "Check the health of your rice crop",
    home_instruction: "Take a photo of a rice leaf to check for possible disease.",
    home_tip: "Take a clear photo of the affected rice leaf in good lighting.",
    btn_take_photo: "Take a Photo",
    btn_choose_gallery: "Choose from Gallery",
    btn_learn_diseases: "Learn About Rice Diseases",
    btn_check_leaf: "Check My Rice Leaf",
    btn_check_another: "Check Another Leaf",
    btn_read_aloud: "Listen to Advice",
    btn_stop_audio: "Stop Audio",
    btn_share: "Share Result",
    btn_retake: "Retake Photo",
    btn_remove: "Remove",
    btn_download_apk: "Download App (APK)",
    btn_view_more: "Scientific Details",
    analyzing_text: "Checking leaf symptoms with AI... Please wait",
    result_heading: "Possible Disease Detected",
    section_meaning: "What does this mean?",
    section_symptoms: "What should I look for on my plant?",
    section_next_steps: "What should I do now?",
    section_prevention: "How can I help prevent this problem?",
    section_expert: "When to contact an agricultural expert",
    disclaimer_text: "Notice: This result is an initial AI advisory assessment. Always verify with your local agricultural extension officer (RSK / KVK) before applying chemical treatments.",
    offline_alert: "No internet connection. An active internet connection is required for AI leaf analysis. Please reconnect and retry.",
    sample_leaves_title: "Sample Leaves for Testing (1-Click)",
    nav_home: "Home",
    nav_check: "Check Leaf",
    nav_guide: "Disease Guide",
    nav_settings: "Settings",
    nav_history: "History",
    history_empty: "No previous diagnoses found.",
    history_clear: "Clear History",
    settings_language: "Change Language",
    settings_audio: "Automatic Audio Guidance",
    settings_about: "About RiceCare AI",
    badge_confidence: "AI Confidence",
    camera_guidance_title: "Tips for Best Results:",
    camera_tip_1: "Focus clearly on the leaf spots or diseased area.",
    camera_tip_2: "Ensure good daylight without harsh shadows.",
    camera_tip_3: "Use your phone's rear camera for high clarity.",
  },
  hi: {
    app_title: "RiceCare AI",
    app_subtitle: "आपकी धान की फसल का AI सहायक",
    home_heading: "अपनी धान की फसल का स्वास्थ्य जानें",
    home_instruction: "संभावित रोग की जांच के लिए धान की पत्ती का फोटो लें।",
    home_tip: "अच्छी रोशनी में प्रभावित धान की पत्ती का साफ फोटो लें।",
    btn_take_photo: "फोटो खींचें",
    btn_choose_gallery: "गैलरी से चुनें",
    btn_learn_diseases: "धान के रोगों के बारे में जानें",
    btn_check_leaf: "मेरी धान की पत्ती की जाँच करें",
    btn_check_another: "दूसरी पत्ती जाँचें",
    btn_read_aloud: "सलाह सुनें",
    btn_stop_audio: "आवाज बंद करें",
    btn_share: "परिणाम साझा करें",
    btn_retake: "फिर से फोटो लें",
    btn_remove: "हटाएं",
    btn_download_apk: "ऐप डाउनलोड करें (APK)",
    btn_view_more: "वैज्ञानिक विवरण",
    analyzing_text: "AI द्वारा पत्ती के लक्षणों की जांच की जा रही है... कृपया प्रतीक्षा करें",
    result_heading: "संभावित रोग की पहचान",
    section_meaning: "इसका क्या मतलब है?",
    section_symptoms: "पौधे में क्या देखना चाहिए?",
    section_next_steps: "अब क्या करना चाहिए?",
    section_prevention: "इसे रोकने के उपाय क्या हैं?",
    section_expert: "कृषि विशेषज्ञ से कब संपर्क करें",
    disclaimer_text: "सूचना: यह परिणाम केवल एक प्रारंभिक AI सलाह है। किसी भी रासायनिक छिड़काव से पहले अपने स्थानीय कृषि विस्तार अधिकारी या केवीके से सलाह अवश्य लें।",
    offline_alert: "इंटरनेट कनेक्शन उपलब्ध नहीं है। पत्ती रोग विश्लेषण के लिए इंटरनेट आवश्यक है। कृपया पुनः कनेक्ट करें।",
    sample_leaves_title: "परीक्षण के लिए नमूना पत्तियां (1-क्लिक)",
    nav_home: "होम",
    nav_check: "पत्ती जाँच",
    nav_guide: "रोग गाइड",
    nav_settings: "सेटिंग्स",
    nav_history: "इतिहास",
    history_empty: "अभी कोई पुराना रिकॉर्ड उपलब्ध नहीं है।",
    history_clear: "इतिहास हटाएं",
    settings_language: "भाषा बदलें",
    settings_audio: "ऑटो वॉयस गाइड",
    settings_about: "RiceCare AI के बारे में",
    badge_confidence: "AI सटीकता",
    camera_guidance_title: "फोटो लेते समय ध्यान दें:",
    camera_tip_1: "पत्ती के रोगग्रस्त धब्बों पर स्पष्ट फोकस करें।",
    camera_tip_2: "पर्याप्त धूप या अच्छी रोशनी में फोटो लें।",
    camera_tip_3: "साफ तस्वीर के लिए फोन के पीछे वाले कैमरे का उपयोग करें।",
  }
};

export const DISEASE_TRANSLATIONS: Record<string, DiseaseTranslation> = {
  "Healthy Rice Leaf": {
    kannada_name: "ಆರೋಗ್ಯಕರ ಭತ್ತದ ಎಲೆ",
    english_name: "Healthy Rice Leaf",
    hindi_name: "स्वस्थ धान की पत्ती",
    meaning: {
      kn: "ನಿಮ್ಮ ಭತ್ತದ ಗಿಡವು ಉತ್ತಮ ಆರೋಗ್ಯದಲ್ಲಿದೆ. ಎಲೆಯ ಮೇಲೆ ಯಾವುದೇ ರೋಗದ ಲಕ್ಷಣಗಳಾಗಲಿ ಅಥವಾ ಕೀಟಬಾಧೆಯಾಗಲಿ ಕಂಡುಬಂದಿಲ್ಲ.",
      en: "Your rice plant is completely healthy. No disease lesions, discoloration, or pest damage were detected on this leaf.",
      hi: "आपकी धान की फसल स्वस्थ है। पत्ती पर किसी भी रोग या कीट का लक्षण नहीं पाया गया है।"
    },
    symptoms: {
      kn: "ಎಲೆಯು ಏಕರೂಪದ ಹಸಿರು ಬಣ್ಣವನ್ನು ಹೊಂದಿದ್ದು, ಯಾವುದೇ ಕಂದು ಚುಕ್ಕೆಗಳು, ಒಣಗಿದ ಅಂಚುಗಳು ಅಥವಾ ಕಲೆಗಳಿರುವುದಿಲ್ಲ.",
      en: "Uniform deep green leaf blade, intact edges, no brown spots or water-soaked lesions.",
      hi: "पत्ती पूरी तरह से हरी है, कोई भूरा धब्बा या सूखा किनारा नहीं है।"
    },
    next_steps: {
      kn: "ಪ್ರಸ್ತುತ ಯಾವುದೇ ಔಷಧಿಯ ಅಗತ್ಯವಿಲ್ಲ. ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಮಾಣದಲ್ಲಿ ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ ಗೊಬ್ಬರ ಮತ್ತು ನೀರನ್ನು ನಿರ್ವಹಿಸಿ.",
      en: "No chemical intervention needed. Maintain balanced fertilization and timely irrigation.",
      hi: "किसी दवा की आवश्यकता नहीं है। संतुलित खाद और समय पर सिंचाई जारी रखें।"
    },
    prevention: {
      kn: "ಹೆಚ್ಚುವರಿ ಯೂರಿಯಾ ಹಾಕಬೇಡಿ. ಕಳೆಗಳನ್ನು ನಿಯಮಿತವಾಗಿ ಸ್ವಚ್ಛಗೊಳಿಸಿ ಮತ್ತು ಗದ್ದೆಯಲ್ಲಿ ಸರಿಯಾದ ಗಾಳಿ-ಬೆಳಕು ಇರುವಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
      en: "Avoid excessive nitrogen (urea). Maintain weed-free bunds and standard planting spacing.",
      hi: "अधिक यूरिया डालने से बचें। मेड़ों को साफ रखें और उचित दूरी पर रोपाई करें।"
    },
    expert_advice: {
      kn: "ಎಲೆಗಳು ಅತಿಯಾಗಿ ಹಳದಿಯಾಗುತ್ತಿದ್ದರೆ ಅಥವಾ ಸಾರಜನಕ/ಸತುವಿನ ಕೊರತೆ ಕಂಡುಬಂದರೆ ನಿಮ್ಮ ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರವನ್ನು (RSK) ಸಂಪರ್ಕಿಸಿ.",
      en: "Consult local agricultural extension officers if localized nutrient deficiencies (Zinc or Nitrogen) appear.",
      hi: "यदि पत्तियां पीली पड़ने लगें तो नजदीकी कृषि विज्ञान केंद्र से संपर्क करें।"
    }
  },

  "Brown Spot": {
    kannada_name: "ಕಂದು ಚುಕ್ಕೆ ರೋಗ",
    english_name: "Brown Spot",
    hindi_name: "भूरा धब्बा रोग",
    meaning: {
      kn: "ಇದು ಶಿಲೀಂಧ್ರದಿಂದ ಬರುವ ಸಾಮಾನ್ಯ ರೋಗ. ಮಣ್ಣಿನಲ್ಲಿ ಪೋಷಕಾಂಶಗಳ (ಮುಖ್ಯವಾಗಿ ಪೊಟ್ಯಾಷ್ ಅಥವಾ ಸತು) ಕೊರತೆಯಿದ್ದಾಗ ಅಥವಾ ನೀರಿನ ಕೊರತೆಯಿದ್ದಾಗ ಈ ರೋಗ ಬೇಗನೆ ಹರಡುತ್ತದೆ.",
      en: "A common fungal disease often associated with poor soil fertility, low potassium, or water-stressed fields.",
      hi: "यह फफूंद से फैलने वाला रोग है जो पोषक तत्वों (पोटाश/जिंक) की कमी या सूखे से बढ़ता है।"
    },
    symptoms: {
      kn: "ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಬಣ್ಣದ ಎಳ್ಳಿನ ಆಕಾರದ ಸಣ್ಣ ಕಲೆಗಳು ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತವೆ. ಕಲೆಯ ಮಧ್ಯಭಾಗ ಬೂದು ಬಣ್ಣಕ್ಕಿದ್ದು, ಅಂಚು ಗಾಢ ಕಂದು ಬಣ್ಣದಲ್ಲಿರುತ್ತದೆ.",
      en: "Sesame seed-shaped brown spots with grayish centers and dark reddish-brown borders on leaf blades.",
      hi: "पत्तियों पर तिल के आकार के भूरे धब्बे, जिनका केंद्र धूसर और किनारे गहरे भूरे होते हैं।"
    },
    next_steps: {
      kn: "ತಕ್ಷಣ ಗದ್ದೆಗೆ ಸಮರ್ಪಕ ನೀರು ಹರಿಸಿ. ಶಿಫಾರಸು ಮಾಡಿದ ಪೊಟ್ಯಾಷ್ ಗೊಬ್ಬರ ನೀಡಿ. ರೋಗ ತೀವ್ರವಾಗಿದ್ದರೆ ಕೃಷಿ ಅಧಿಕಾರಿಯ ಸಲಹೆಯಂತೆ ಶಿಲೀಂಧ್ರನಾಶಕ (ಮ್ಯಾಂಕೋಜೆಬ್ ಅಥವಾ ಪ್ರೊಪಿಕೊನಜೋಲ್) ಸಿಂಪಡಿಸಿ.",
      en: "Ensure adequate field irrigation. Apply recommended muriate of potash (MOP). In severe cases, apply Mancozeb or Propiconazole as advised by extension officer.",
      hi: "खेत में पर्याप्त पानी रखें। पोटाश खाद डालें और आवश्यकतानुसार मैंकोजेब का छिड़काव करें।"
    },
    prevention: {
      kn: "ಬಿತ್ತನೆಗೆ ಮುನ್ನ ಪ್ರಮಾಣೀಕೃತ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮಾಡಿಸಿ ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರ ಬಳಸಿ.",
      en: "Use certified disease-free seeds and treat seeds with Carbendazim before sowing. Practice balanced N-P-K fertilization.",
      hi: "बीज उपचार करें और मिट्टी की जांच के अनुसार संतुलित खाद का प्रयोग करें।"
    },
    expert_advice: {
      kn: "ಶೇಕಡಾ 15ಕ್ಕಿಂತ ಹೆಚ್ಚು ಎಲೆಗಳಲ್ಲಿ ಮಚ್ಚೆಗಳು ಕಂಡುಬಂದರೆ ತಕ್ಷಣ ನಿಮ್ಮ ಸಮೀಪದ ಕೃಷಿ ವಿಸ್ತರಣಾಧಿಕಾರಿ ಅಥವಾ ಕೆವಿಕೆ ವಿಜ್ಞಾನಿಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      en: "Contact your agricultural extension officer if spots cover more than 15% of the upper leaves during tillering.",
      hi: "यदि 15% से अधिक पत्तियों पर धब्बे हों तो तुरंत कृषि अधिकारी से संपर्क करें।"
    }
  },

  "Leaf Smut": {
    kannada_name: "ಎಲೆ ಕಾಡಿಗೆ ರೋಗ",
    english_name: "Leaf Smut",
    hindi_name: "पत्ती का कंडुआ रोग",
    meaning: {
      kn: "ಇದು ಎಲೆಗಳ ಮೇಲೆ ಕಪ್ಪು ಬಣ್ಣದ ಸಣ್ಣ ಗಂಟುಗಳನ್ನು ಉಂಟುಮಾಡುವ ಶಿಲೀಂಧ್ರ ರೋಗ. ಸಾಮಾನ್ಯವಾಗಿ ತೆನೆ ಬರುವ ಅಥವಾ ಕೊಯ್ಲಿನ ಹಂತದಲ್ಲಿ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತದೆ.",
      en: "A late-season fungal disease producing small, raised black pustules on mature foliage.",
      hi: "यह पत्तियों पर छोटे काले उभरे हुए धब्बे बनाने वाला फफूंद जनित रोग है।"
    },
    symptoms: {
      kn: "ಎಲೆಯ ಎರಡೂ ಬದಿಗಳಲ್ಲಿ ಸಣ್ಣದಾದ, ಕಪ್ಪು ಬಣ್ಣದ ಉಬ್ಬಿದ ಮಚ್ಚೆಗಳು ಕಾಣುತ್ತವೆ. ಬೆರಳಿನಿಂದ ಮುಟ್ಟಿದಾಗ ಕಪ್ಪು ಪುಡಿ ಅಂಟಬಹುದು.",
      en: "Small, slightly raised, lead-black angular spots scattered over the leaf surface.",
      hi: "पत्ती की दोनों सतहों पर छोटे, काले, उभरे हुए कोणीय धब्बे दिखाई देते हैं।"
    },
    next_steps: {
      kn: "ಇದು ಸಾಮಾನ್ಯವಾಗಿ ಬೆಳೆಗೆ ಹೆಚ್ಚಿನ ಹಾನಿ ಮಾಡುವುದಿಲ್ಲ. ಕೊನೆಯ ಹಂತದಲ್ಲಿ ಅತಿಯಾದ ಯೂರಿಯಾ ಹಾಕುವುದು ನಿಲ್ಲಿಸಿ.",
      en: "Usually does not cause heavy yield losses. Stop late-stage nitrogen applications.",
      hi: "आमतौर पर भारी नुकसान नहीं करता। यूरिया का अधिक प्रयोग तुरंत बंद करें।"
    },
    prevention: {
      kn: "ನಾಟಿ ಮಾಡುವಾಗ ಗಿಡಗಳ ನಡುವೆ ಸರಿಯಾದ ಅಂತರವಿರಲಿ. ಕೊಯ್ಲಿನ ನಂತರ ಕಸ-ಕಡ್ಡಿಗಳನ್ನು ಆಳವಾಗಿ ಉಳುಮೆ ಮಾಡಿ.",
      en: "Maintain recommended plant density to improve aeration. Deep plow crop residues after harvest.",
      hi: "रोपाई में उचित दूरी रखें। कटाई के बाद खेत की गहरी जुताई करें।"
    },
    expert_advice: {
      kn: "ಕಾಳು ಕಟ್ಟುವ ಮೊದಲೇ ಧ್ವಜ ಎಲೆಗಳು (Flag leaves) ಒಣಗುತ್ತಿದ್ದರೆ ಕೃಷಿ ಅಧಿಕಾರಿಯ ಸಲಹೆ ಪಡೆಯಿರಿ.",
      en: "Consult your extension worker if flag leaves are drying before grain-filling.",
      hi: "यदि झंडा पत्ती दाना भरने से पहले सूखने लगे तो कृषि अधिकारी से राय लें।"
    }
  },

  "Bacterial Leaf Blight": {
    kannada_name: "ದುಂಡಾಣು ಎಲೆ ಕವಚ / ರಕ್ತ ಸುರುಳಿ ರೋಗ",
    english_name: "Bacterial Leaf Blight (BLB)",
    hindi_name: "जीवाणु झुलसा रोग (BLB)",
    meaning: {
      kn: "ಇದು ಬ್ಯಾಕ್ಟೀರಿಯಾದಿಂದ ಬರುವ ಗಂಭೀರ ರೋಗ. ಮಳೆಗಾಲ ಮತ್ತು ಬಿರುಗಾಳಿಯ ನಂತರ ನೀರಿನ ಮೂಲಕ ಬಹಳ ವೇಗವಾಗಿ ಒಂದು ಗದ್ದೆಯಿಂದ ಇನ್ನೊಂದು ಗದ್ದೆಗೆ ಹರಡುತ್ತದೆ.",
      en: "A severe bacterial vascular disease that spreads rapidly in warm, rainy, and windy conditions.",
      hi: "यह जीवाणु से होने वाला गंभीर रोग है जो बारिश और तेज हवा में तेजी से फैलता है।"
    },
    symptoms: {
      kn: "ಎಲೆಯ ತುದಿಯಿಂದ ಮತ್ತು ಅಂಚಿನಿಂದ ಹಳದಿ-ಬಿಳಿ ಬಣ್ಣದ ಒಣಗುವಿಕೆ ಶುರುವಾಗುತ್ತದೆ. ಅಂಚುಗಳು ಅಲೆಯಾಕಾರದಲ್ಲಿ ಒಣಗಿ ಒಣಹುಲ್ಲಿನಂತೆ ಬಿಳಿಯಾಗುತ್ತದೆ.",
      en: "Water-soaked stripes starting from leaf tips and margins, turning yellow-white and drying like straw.",
      hi: "पत्ती के सिरे और किनारों से पीला-सफेद सूखना शुरू होता है और पत्ती भूसे जैसी सूख जाती है।"
    },
    next_steps: {
      kn: "ತಕ್ಷಣ ಸಾರಜನಕ (ಯೂರಿಯಾ) ಗೊಬ್ಬರ ನೀಡುವುದನ್ನು ನಿಲ್ಲಿಸಿ. ಗದ್ದೆಯಿಂದ ಹೆಚ್ಚುವರಿ ನೀರನ್ನು ಹೊರಹಾಕಿ. ರೋಗ ತೀವ್ರವಾಗಿದ್ದರೆ ಕೃಷಿ ತಜ್ಞರ ಶಿಫಾರಸಿನಂತೆ ಸ್ಟ್ರೆಪ್ಟೋಸೈಕ್ಲಿನ್ ಅಥವಾ ತಾಮ್ರದ ಆಕ್ಸಿಕ್ಲೋರೈಡ್ ಸಿಂಪಡಿಸಿ.",
      en: "Immediately stop nitrogen (urea) applications. Drain stagnant water from the field. Spray Streptocycline + Copper Oxychloride as per local RSK guidance.",
      hi: "यूरिया तुरंत बंद करें। खेत से अतिरिक्त पानी निकालें और कृषि विशेषज्ञ की सलाह से स्ट्रेप्टोसाइक्लिन का छिड़काव करें।"
    },
    prevention: {
      kn: "ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ. ಗದ್ದೆಗಳಲ್ಲಿ ಕಳೆಗಳಿಲ್ಲದಂತೆ ಸ್ವಚ್ಛವಾಗಿಡಿ. ನೀರಾವರಿ ನೀರನ್ನು ಒಂದು ಗದ್ದೆಯಿಂದ ಇನ್ನೊಂದು ಗದ್ದೆಗೆ ಹರಿಸಬೇಡಿ.",
      en: "Plant resistant rice varieties. Avoid clipping seedling tips during transplanting. Prevent runoff between adjacent fields.",
      hi: "रोग प्रतिरोधी किस्में लगाएं। रोपाई के समय पत्तियों के सिरे न काटें।"
    },
    expert_advice: {
      kn: "ಇದು ಅತ್ಯಂತ ವೇಗವಾಗಿ ಹರಡುವ ರೋಗವಾದ್ದರಿಂದ ಕೂಡಲೇ ನಿಮ್ಮ ಸ್ಥಳೀಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ ಅಥವಾ ಸಹಾಯಕ ಕೃಷಿ ನಿರ್ದೇಶಕರನ್ನು ಭೇಟಿ ಮಾಡಿ.",
      en: "Urgent: Bacterial blight can cause 20-50% yield loss; visit your nearest Raitha Samparka Kendra immediately.",
      hi: "यह तेजी से फैलने वाला रोग है, तुरंत नजदीकी कृषि अधिकारी या विशेषज्ञ से सलाह लें।"
    }
  },

  "Rice Blast": {
    kannada_name: "ಭತ್ತದ ಬೆಂಕಿ ರೋಗ / ಕಣೆ ರೋಗ",
    english_name: "Rice Blast",
    hindi_name: "धान का ब्लास्ट / झोंका रोग",
    meaning: {
      kn: "ಇದು ಭತ್ತದ ಅತ್ಯಂತ ಅಪಾಯಕಾರಿ ಶಿಲೀಂಧ್ರ ರೋಗ. ಎಲೆಗಳು, ಕುತ್ತಿಗೆ (ಕಣೆ) ಮತ್ತು ಕಾಂಡಕ್ಕೆ ಹಾನಿ ಮಾಡುತ್ತದೆ. ತಂಪಾದ ರಾತ್ರಿ, ಮಂಜು ಮತ್ತು ಅತಿಯಾದ ಯೂರಿಯಾ ಇದ್ದಾಗ ರೋಗ ಉಲ್ಬಣಿಸುತ್ತದೆ.",
      en: "One of the most destructive fungal diseases of rice, attacking leaves, nodes, and panicle necks (neck blast).",
      hi: "धान का सबसे विनाशकारी रोग, जो पत्तियों और बाली की गर्दन पर हमला करता है।"
    },
    symptoms: {
      kn: "ಎಲೆಗಳ ಮೇಲೆ ಕಣ್ಣಿನ ಆಕಾರದ (ಮಧ್ಯೆ ಬೂದು, ಸುತ್ತಲೂ ಕಂದು ಅಂಚುಳ್ಳ) ಮಚ್ಚೆಗಳು ಉಂಟಾಗುತ್ತವೆ. ನಂತರ ಮಚ್ಚೆಗಳು ಒಂದಾಗಿ ಎಲೆ ಸುಟ್ಟಂತೆ ಕಾಣುತ್ತದೆ.",
      en: "Spindle-shaped or eye-shaped lesions with gray centers and dark reddish-brown borders. Severe infections cause total leaf drying.",
      hi: "पत्तियों पर आंख या नाव के आकार के धब्बे जिनका केंद्र धूसर और किनारे गहरे भूरे होते हैं।"
    },
    next_steps: {
      kn: "ಯೂರಿಯಾ ಗೊಬ್ಬರ ನೀಡುವುದನ್ನು ತಕ್ಷಣ ನಿಲ್ಲಿಸಿ. ಟ್ರೈಸೈಕ್ಲೋಜೋಲ್ (Tricyclazole 75 WP) ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಲೀಟರ್ ನೀರಿಗೆ 0.6 ಗ್ರಾಂ ನಂತೆ ಬೆರೆಸಿ ಎಲೆಗಳ ಮೇಲೆ ಸರಿಯಾಗಿ ಸಿಂಪಡಿಸಿ.",
      en: "Withhold top-dressing of urea. Spray Tricyclazole 75% WP (0.6g/L) or Isoprothiolane immediately to protect foliage and panicles.",
      hi: "यूरिया तुरंत बंद करें। ट्राईसाइक्लाजोल 75 WP का 0.6 ग्राम प्रति लीटर पानी में मिलाकर छिड़काव करें।"
    },
    prevention: {
      kn: "ಬೀಜೋಪಚಾರ ಅತ್ಯಗತ್ಯ (ಟ್ರೈಸೈಕ್ಲೋಜೋಲ್ 2 ಗ್ರಾಂ/ಕಿ.ಗ್ರಾಂ ಬೀಜಕ್ಕೆ). ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಮಾಣದಲ್ಲಿ ಮಾತ್ರ ಸಾರಜನಕವನ್ನು 3-4 ಕಂತುಗಳಲ್ಲಿ ನೀಡಿ.",
      en: "Seed treatment with Tricyclazole before sowing. Split nitrogen fertilizer into 3-4 applications.",
      hi: "बीज उपचार अवश्य करें। यूरिया को 3-4 किस्तों में ही दें।"
    },
    expert_advice: {
      kn: "ತೆನೆ ಹೊರಬರುವ ಹಂತದಲ್ಲಿ ಕುತ್ತಿಗೆಗೆ ಬೆಂಕಿ ರೋಗ ಬಂದರೆ (Neck blast) ಭತ್ತ ಸಂಪೂರ್ಣ ಜಳ್ಳಾಗುತ್ತದೆ. ಕೂಡಲೇ ಕೃಷಿ ಅಧಿಕಾರಿಯಿಂದ ಮಾರ್ಗದರ್ಶನ ಪಡೆಯಿರಿ.",
      en: "Neck blast during flowering causes empty white panicles. Contact KVK agronomist immediately.",
      hi: "बाली निकलते समय गर्दन पर रोग आने से दाने नहीं भरते, तुरंत विशेषज्ञ की सलाह लें।"
    }
  },

  "Sheath Blight": {
    kannada_name: "ಹಾಳೆ ಕವಚ ಕೊಳೆ ರೋಗ",
    english_name: "Sheath Blight",
    hindi_name: "शीथ ब्लाइट / आवरण झुलसा",
    meaning: {
      kn: "ಗಿಡದ ಬುಡದ ಎಲೆ ಕವಚದ ಮೇಲೆ ಹಾನಿ ಮಾಡುವ ಶಿಲೀಂಧ್ರ ರೋಗ. ಗದ್ದೆಯಲ್ಲಿ ಹೆಚ್ಚು ನೀರು ನಿಂತಾಗ ಮತ್ತು ಗಿಡಗಳು ದಟ್ಟವಾಗಿದ್ದಾಗ ಬುಡದಿಂದ ಮೇಲಕ್ಕೆ ಹರಡುತ್ತದೆ.",
      en: "Soil-borne fungal disease that attacks leaf sheaths near water level and advances up the canopy in dense stands.",
      hi: "जमीन की सतह के पास तने के आवरण पर होने वाला फफूंद रोग जो घनी फसल में ऊपर बढ़ता है।"
    },
    symptoms: {
      kn: "ನೀರಿನ ಮಟ್ಟದ ಮೇಲಿರುವ ಹಾಳೆಗಳ ಮೇಲೆ ಹಾವಿನ ಚರ್ಮದಂತಹ ಅಥವಾ ಹಸಿರು-ಬೂದು ಬಣ್ಣದ ದೊಡ್ಡ ಅಂಡಾಕಾರದ ಮಚ್ಚೆಗಳು ಕಂಡುಬರುತ್ತವೆ.",
      en: "Oval or snake-skin pattern greenish-gray lesions on leaf sheaths, gradually turning bleached with dark borders.",
      hi: "पानी की सतह के ऊपर आवरण पर हरे-धूसर सांप की केंचुल जैसे धब्बे जो बाद में सफेद हो जाते हैं।"
    },
    next_steps: {
      kn: "ಗದ್ದೆಯಿಂದ ಹೆಚ್ಚುವರಿ ನೀರನ್ನು ಬಸಿದು ಹಾಕಿ. ಬುಡಕ್ಕೆ ಗಾಳಿ ಆಡುವಂತೆ ಮಾಡಿ. ವ್ಯಾಲಿಡಾಮೈಸಿನ್ (Validamycin 3L) 2 ಮಿ.ಲೀ ಅಥವಾ ಹೆಕ್ಸಾಕೊನಜೋಲ್ 2 ಮಿ.ಲೀ ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ ಬೆರೆಸಿ ಬುಡಕ್ಕೆ ತಾಗುವಂತೆ ಸಿಂಪಡಿಸಿ.",
      en: "Drain standing water to reduce humidity. Spray Validamycin 3L (2 ml/L) or Hexaconazole (2 ml/L) targeting plant base.",
      hi: "खेत से अतिरिक्त पानी निकालें। वैलिडामाइसिन या हेक्साकोनाजोल का पौधे के निचले हिस्से पर छिड़काव करें।"
    },
    prevention: {
      kn: "ನಾಟಿ ಮಾಡುವಾಗ ಸೂಕ್ತ ಅಂತರ (20×15 ಸೆಂ.ಮೀ) ಕಾಯ್ದುಕೊಳ್ಳಿ. ಅತಿಯಾದ ಸಾರಜನಕ ತಪ್ಪಿಸಿ.",
      en: "Avoid excessively dense planting. Balance nitrogen with adequate potash.",
      hi: "पौधों के बीच उचित दूरी रखें। अधिक यूरिया का प्रयोग न करें।"
    },
    expert_advice: {
      kn: "ಬುಡದಿಂದ ಧ್ವಜ ಎಲೆಗೆ ರೋಗ ಹರಡುತ್ತಿದ್ದರೆ ತಕ್ಷಣ ಕೃಷಿ ವಿಸ್ತರಣಾಧಿಕಾರಿಗಳನ್ನು ಭೇಟಿ ಮಾಡಿ ಸೂಕ್ತ ಶಿಲೀಂಧ್ರನಾಶಕ ಆಯ್ಕೆಮಾಡಿ.",
      en: "Consult RSK if lesions reach top two leaves during booting stage.",
      hi: "यदि धब्बे ऊपरी पत्तियों तक पहुंच रहे हों तो तुरंत कृषि अधिकारी से संपर्क करें।"
    }
  },

  "False Smut": {
    kannada_name: "ಸುಳ್ಳು ಕಾಡಿಗೆ ರೋಗ",
    english_name: "False Smut",
    hindi_name: "झूठा कंडुआ / लेड़ा रोग",
    meaning: {
      kn: "ತೆನೆಯ ಕಾಳುಗಳ ಮೇಲೆ ಬರುವ ರೋಗ. ಹೂವಾಡುವ ಸಮಯದಲ್ಲಿ ಮಳೆ ಮತ್ತು ತೇವಾಂಶ ಹೆಚ್ಚಿದ್ದಾಗ ಕಾಳುಗಳು ಉಬ್ಬಿ ಹಳದಿ-ಹಸಿರು ಉಂಡೆಗಳಾಗುತ್ತವೆ.",
      en: "A floral infection where individual grains are transformed into large, velvety greenish-yellow spore balls.",
      hi: "बाली के दानों पर लगने वाला रोग जिसमें दाने पीले-हरे मखमली गोलों में बदल जाते हैं।"
    },
    symptoms: {
      kn: "ತೆನೆಯ ಕೆಲವೇ ಕಾಳುಗಳು ಸಾಮಾನ್ಯಕ್ಕಿಂತ 2-3 ಪಟ್ಟು ದೊಡ್ಡದಾಗಿ ಹಳದಿ, ಕಿತ್ತಳೆ ಅಥವಾ ಹಸಿರು-ಕಪ್ಪು ಮೃದು ಉಂಡೆಗಳಾಗುತ್ತವೆ.",
      en: "Individual grains transformed into velvety yellow-orange or dark green/black masses.",
      hi: "बाली के कुछ दाने बड़े होकर पीले, नारंगी या काले मखमली पाउडर के गोलों में बदल जाते हैं।"
    },
    next_steps: {
      kn: "ರೋಗಪೀಡಿತ ತೆನೆಗಳನ್ನು ಜಾಗರೂಕತೆಯಿಂದ ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ. ಮುಂದಿನ ಬೆಳೆಗೆ ಕಾಪರ್ ಹೈಡ್ರಾಕ್ಸೈಡ್ ಅಥವಾ ಪ್ರೊಪಿಕೊನಜೋಲ್ ಸಿಂಪಡಣೆ ಮಾಡಿ.",
      en: "Carefully rogue and destroy infected panicles in plastic bags. Spray Propiconazole before 50% flowering in future seasons.",
      hi: "संक्रमित बालियों को थैली में सावधानी से तोड़कर नष्ट करें। बाली निकलने से पहले प्रोपिकोनाजोल का छिड़काव करें।"
    },
    prevention: {
      kn: "ಹೂಬಿಡುವ ಮುನ್ನ ಅತಿಯಾದ ಯೂರಿಯಾ ಹಾಕಬೇಡಿ. ರೋಗವಿಲ್ಲದ ಶುದ್ಧ ಬಿತ್ತನೆ ಬೀಜ ಬಳಸಿ.",
      en: "Avoid high nitrogen top-dressing at panicle emergence. Use certified clean seed.",
      hi: "बाली निकलने के समय अतिरिक्त यूरिया न दें। स्वस्थ बीजों का ही प्रयोग करें।"
    },
    expert_advice: {
      kn: "ಕಾಳುಗಳು ಒಡೆದು ಬೀಜದ ಗುಣಮಟ್ಟ ಕೆಡದಂತೆ ತಡೆಯಲು ಕೊಯ್ಲಿನ ಮುನ್ನ ಸ್ಥಳೀಯ ಕೃಷಿ ವಿಜ್ಞಾನಿಗಳಿಂದ ಸಲಹೆ ಪಡೆಯಿರಿ.",
      en: "Consult your district KVK scientist regarding seed certification and clean harvesting.",
      hi: "बीज उत्पादन के लिए केवीके वैज्ञानिक से सलाह लें।"
    }
  },

  "Tungro": {
    kannada_name: "ತುಂಗ್ರೊ ನಂಜು ರೋಗ",
    english_name: "Rice Tungro Virus",
    hindi_name: "टुंग्रो वायरस रोग",
    meaning: {
      kn: "ಇದು ಹಸಿರು ಜಿಗಿಹುಳುಗಳಿಂದ (Green Leafhopper) ಹರಡುವ ವೈರಸ್ ರೋಗ. ಗಿಡಗಳು ಕುಬ್ಜವಾಗಿ ಬೆಳೆಯದೆ ಇಳುವರಿ ಸಂಪೂರ್ಣ ಕುಸಿಯುತ್ತದೆ.",
      en: "A viral disease transmitted by the green leafhopper (Nephotettix virescens) causing severe stunting.",
      hi: "हरे फुदके द्वारा फैलने वाला विषाणु रोग जिससे पौधे बौने रह जाते हैं।"
    },
    symptoms: {
      kn: "ಎಲೆಗಳು ತುದಿಯಿಂದ ಕಿತ್ತಳೆ ಅಥವಾ ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತವೆ. ಗಿಡಗಳು ಕುಬ್ಜವಾಗುತ್ತವೆ ಮತ್ತು ಕವಲುಗಳು ಕಡಿಮೆಯಾಗುತ್ತವೆ.",
      en: "Yellow-orange leaf discoloration starting from leaf tips, stunted plant stature, reduced tillering.",
      hi: "पत्तियों के सिरे से पीला-नारंगी रंग होना, पौधों का बौनापन और कल्ले कम फूटना।"
    },
    next_steps: {
      kn: "ರೋಗ ತರುವ ಹಸಿರು ಜಿಗಿಹುಳುಗಳ ನಿಯಂತ್ರಣಕ್ಕಾಗಿ ಇಮಿಡಾಕ್ಲೋಪ್ರಿಡ್ (Imidacloprid 17.8 SL) 0.3 ಮಿ.ಲೀ/ಲೀ ಅಥವಾ ಥಯಾಮೆಥಾಕ್ಸಮ್ ಸಿಂಪಡಿಸಿ. ತೀವ್ರವಾಗಿ ಪೀಡಿತ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ಹಾಕಿ.",
      en: "Control vector green leafhoppers using Imidacloprid (0.3 ml/L) or Thiamethoxam. Rogue out severely infected stunted hills.",
      hi: "हरे फुदके की रोकथाम के लिए इमिडाक्लोप्रिड या थायमेथॉक्सम का छिड़काव करें। रोगी पौधों को उखाड़कर नष्ट करें।"
    },
    prevention: {
      kn: "ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ. ನಾಟಿ ಮಾಡುವ ಮೊದಲು ಜಮೀನಿನಲ್ಲಿ ಬೆಳಕು ಬಲೆ (Light trap) ಇರಿಸಿ ಜಿಗಿಹುಳುಗಳನ್ನು ಗಮನಿಸಿ.",
      en: "Plant Tungro-resistant varieties. Install light traps to monitor green leafhopper population.",
      hi: "रोग प्रतिरोधी किस्में लगाएं। प्रकाश प्रपंच (Light trap) से फुदकों की निगरानी करें।"
    },
    expert_advice: {
      kn: "ಜಿಗಿಹುಳುಗಳು ಹೆಚ್ಚಿದ್ದರೆ ಇಡೀ ಹಳ್ಳಿಯ ಗದ್ದೆಗಳಿಗೆ ಒಟ್ಟಾಗಿ ಕೀಟನಾಶಕ ಸಿಂಪಡಿಸಲು ಕೃಷಿ ಇಲಾಖೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      en: "Coordinate community vector spraying with the local Agriculture Department.",
      hi: "फुदकों के प्रकोप पर पूरे क्षेत्र में सामूहिक नियंत्रण हेतु कृषि विभाग से संपर्क करें।"
    }
  },

  "Bacterial Leaf Streak": {
    kannada_name: "ದುಂಡಾಣು ಎಲೆ ಗೆರೆ ರೋಗ",
    english_name: "Bacterial Leaf Streak",
    hindi_name: "जीवाणु धारी रोग",
    meaning: {
      kn: "ಬ್ಯಾಕ್ಟೀರಿಯಾದಿಂದ ಬರುವ ರೋಗ. ಎಲೆಯ ನರಗಳ ನಡುವೆ ಉದ್ದವಾದ ಕಂದು ಗೆರೆಗಳನ್ನು ಉಂಟುಮಾಡುತ್ತದೆ.",
      en: "Bacterial foliar disease causing narrow interveinal brown streaks on leaf blades.",
      hi: "जीवाणु से होने वाला रोग जो पत्तियों की नसों के बीच लंबी भूरी धारियां बनाता है।"
    },
    symptoms: {
      kn: "ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ, ನೀರಿನಂಶದ ಕಿರಿದಾದ ಕಂದು ಗೆರೆಗಳು ನರಗಳ ನಡುವೆ ಕಾಣಿಸುತ್ತವೆ. ಬೆಳಕಿಗೆ ಹಿಡಿದಾಗ ಗೆರೆಗಳು ಸ್ಪಷ್ಟವಾಗಿ ಹೊಳೆಯುತ್ತವೆ.",
      en: "Narrow, water-soaked, translucent brownish streaks strictly confined between leaf veins.",
      hi: "पत्तियों की नसों के बीच पतली, पारदर्शी पानी जैसी भूरी धारियां दिखाई देती हैं।"
    },
    next_steps: {
      kn: "ಸಾರಜನಕ (ಯೂರಿಯಾ) ನೀಡುವುದನ್ನು ಕಡಿಮೆ ಮಾಡಿ. ಗದ್ದೆಯಲ್ಲಿ ನೀರು ನಿಲ್ಲಿಸಬೇಡಿ.",
      en: "Reduce nitrogen application. Avoid continuous flooding and overhead sprinkler irrigation.",
      hi: "यूरिया कम करें और खेत में पानी का जमाव रोकें।"
    },
    prevention: {
      kn: "ಶುದ್ಧ ಪ್ರಮಾಣೀಕೃತ ಬೀಜ ಬಳಸಿ. ಬಿತ್ತನೆ ಬೀಜವನ್ನು ಬಿಸಿ ನೀರಿನಲ್ಲಿ ಅಥವಾ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕದಿಂದ ಉಪಚರಿಸಿ.",
      en: "Use certified clean seeds. Practice field sanitation and crop rotation.",
      hi: "प्रमाणित बीजों का प्रयोग करें और बीज शोधन अवश्य करें।"
    },
    expert_advice: {
      kn: "ಮಳೆಯ ನಂತರ ರೋಗ ತೀವ್ರವಾಗಿ ಹರಡುತ್ತಿದ್ದರೆ ಕೃಷಿ ಅಧಿಕಾರಿಯಿಂದ ಸಲಹೆ ಪಡೆದು ಸಿಂಪಡಣೆ ಮಾಡಿ.",
      en: "Consult local RSK extension officer if streaks cover upper leaves rapidly.",
      hi: "यदि धारियां तेजी से फैलें तो कृषि अधिकारी से संपर्क करें।"
    }
  },

  "Sheath Rot": {
    kannada_name: "ಕವಚ ಕೊಳೆ ರೋಗ",
    english_name: "Sheath Rot",
    hindi_name: "शीथ रॉट / आवरण सड़न",
    meaning: {
      kn: "ತೆನೆಯನ್ನು ಆವರಿಸಿರುವ ಮೇಲಿನ ಎಲೆ ಕವಚ ಕೊಳೆಯುವ ಶಿಲೀಂಧ್ರ ರೋಗ. ತೆನೆ ಹೊರಬರಲು ಅಡ್ಡಿಯಾಗುತ್ತದೆ.",
      en: "Fungal rot attacking the uppermost leaf sheath (flag leaf sheath) enclosing the young panicle.",
      hi: "बाली को ढकने वाले ऊपरी आवरण का सड़न रोग जिससे बाली बाहर नहीं निकल पाती।"
    },
    symptoms: {
      kn: "ಧ್ವಜ ಎಲೆಯ ಕವಚದ ಮೇಲೆ ಬೂದು ಮಧ್ಯಭಾಗವಿರುವ ಅಸಮವಾದ ಕಂದು ಮಚ್ಚೆಗಳು. ತೆನೆ ಸಂಪೂರ್ಣವಾಗಿ ಹೊರಬಾರದೆ ಅರ್ಧಂಬರ್ಧ ಸಿಲುಕಿ ಕೊಳೆಯುತ್ತದೆ.",
      en: "Irregular oblong reddish-brown lesions with gray centers on boot leaf sheath; panicles fail to fully emerge.",
      hi: "झंडा पत्ती के आवरण पर भूरे धब्बे, बाली पूरी तरह बाहर नहीं आ पाती और अंदर ही सड़ जाती है।"
    },
    next_steps: {
      kn: "ಕಾರ್ಬೆಂಡಾಜಿಮ್ ಅಥವಾ ಪ್ರೊಪಿಕೊನಜೋಲ್ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು (1 ಮಿ.ಲೀ/ಲೀ) ಧ್ವಜ ಎಲೆಯ ಕವಚಕ್ಕೆ ತಾಗುವಂತೆ ಸಿಂಪಡಿಸಿ.",
      en: "Spray Carbendazim (1g/L) or Propiconazole (1ml/L) focusing on the boot leaf sheath.",
      hi: "कार्बेंडाजिम या प्रोपिकोनाजोल का झंडा पत्ती के आवरण पर छिड़काव करें।"
    },
    prevention: {
      kn: "ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು ಮತ್ತು ಕೀಟಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ (ಕೀಟದ ಗಾಯಗಳಿಂದ ಈ ರೋಗ ಬೇಗ ಬರುತ್ತದೆ).",
      en: "Control stem borers and mites, as their feeding wounds facilitate fungal entry.",
      hi: "तने के कीड़ों की रोकथाम करें क्योंकि उनके घाव से यह रोग बढ़ता है।"
    },
    expert_advice: {
      kn: "ತೆನೆ ಕಟ್ಟುವ ಹಂತದಲ್ಲೇ ಕವಚ ಕೊಳೆಯುತ್ತಿದ್ದರೆ ತಕ್ಷಣ ಕೃಷಿ ಅಧಿಕಾರಿಯ ಸಲಹೆ ಪಡೆಯಿರಿ.",
      en: "Consult extension specialist during booting stage to protect panicle emergence.",
      hi: "बाली निकलने की अवस्था में रोग दिखने पर तुरंत कृषि विशेषज्ञ से संपर्क करें।"
    }
  },

  "Narrow Brown Leaf Spot": {
    kannada_name: "ಕಿರಿದಾದ ಕಂದು ಗೆರೆ ರೋಗ",
    english_name: "Narrow Brown Leaf Spot",
    hindi_name: "संकीर्ण भूरा धब्बा रोग",
    meaning: {
      kn: "ಬೆಳೆಯ ನಂತರದ ಹಂತದಲ್ಲಿ ಎಲೆಗಳ ಮೇಲೆ ಕಿರಿದಾದ ಉದ್ದನೆಯ ಕಂದು ಗೆರೆಗಳನ್ನು ಉಂಟುಮಾಡುವ ರೋಗ.",
      en: "Late-season foliar disease characterized by narrow, short, linear brown stripes.",
      hi: "फसल की पकी अवस्था में पत्तियों पर पतली लंबी भूरी धारियां बनाने वाला रोग।"
    },
    symptoms: {
      kn: "ಎಲೆಯ ನರಗಳಿಗೆ ಸಮಾನಾಂತರವಾಗಿ ಸಣ್ಣ, ಕಿರಿದಾದ ಕಂದು ಬಣ್ಣದ ರೇಖೆಗಳು (2-10 ಮಿ.ಮೀ ಉದ್ದ).",
      en: "Short, narrow, linear brown spots parallel to leaf veins.",
      hi: "पत्ती की नसों के समानांतर छोटी, पतली भूरी रेखाएं।"
    },
    next_steps: {
      kn: "ಪೊಟ್ಯಾಷ್ ಗೊಬ್ಬರ ನೀಡಿ. ಸಾಮಾನ್ಯವಾಗಿ ತೀವ್ರ ಹಾನಿ ಮಾಡುವುದಿಲ್ಲ.",
      en: "Maintain balanced potassium nutrition. Usually mild, does not require heavy chemicals.",
      hi: "पोटाश खाद दें। आमतौर पर गंभीर नुकसान नहीं होता।"
    },
    prevention: {
      kn: "ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬಳಸಿ. ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರ ನೀಡಿ.",
      en: "Use resistant cultivars and maintain balanced fertilizer application.",
      hi: "प्रतिरोधी किस्में लगाएं और संतुलित पोषण दें।"
    },
    expert_advice: {
      kn: "ಧ್ವಜ ಎಲೆಗಳು ಬೇಗನೆ ಒಣಗುತ್ತಿದ್ದರೆ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      en: "Consult RSK if premature senescence threatens grain weight.",
      hi: "यदि पत्तियां समय से पहले सूखने लगें तो कृषि अधिकारी से सलाह लें।"
    }
  },

  "Rice Hispa": {
    kannada_name: "ಮುಳ್ಳು ದುಂಬಿ ಬಾಧೆ",
    english_name: "Rice Hispa (Pest)",
    hindi_name: "धान का हिस्पा / कांटेदार भौंरा",
    meaning: {
      kn: "ಇದು ಸಣ್ಣ ಮುಳ್ಳುಗಳುಳ್ಳ ಕಪ್ಪು ದುಂಬಿ ಕೀಟದ ಬಾಧೆ. ಮರಿಗಳು ಮತ್ತು ದುಂಬಿಗಳು ಎಲೆಯ ಹಸಿರನ್ನು ಕೆರೆದು ತಿನ್ನುತ್ತವೆ.",
      en: "An insect pest (Dicladispa armigera). Adults and grubs scrape green chlorophyll, leaving white streaks.",
      hi: "कांटेदार छोटे काले भौंरे का कीट प्रकोप। इसके कीड़े पत्ती की हरियाली खुरच कर खाते हैं।"
    },
    symptoms: {
      kn: "ಎಲೆಗಳ ಮೇಲೆ ಬಿಳಿ ಬಣ್ಣದ ಸಮಾನಾಂತರ ಗೆರೆಗಳು ಕಾಣುತ್ತವೆ. ಗದ್ದೆಯು ದೂರದಿಂದ ಒಣಗಿದ ಬಿಳಿ ಹುಲ್ಲಿನಂತೆ ಭಾಸವಾಗುತ್ತದೆ.",
      en: "Parallel white feeding lines on leaf surface; leaves look bleached and blistered.",
      hi: "पत्तियों पर सफेद रंग की समानांतर लकीरें बन जाती हैं और पत्तियां सूखी दिखती हैं।"
    },
    next_steps: {
      kn: "ಕ್ಲೋರ್‌ಪೈರಿಫಾಸ್ (Chlorpyriphos 20 EC) 2 ಮಿ.ಲೀ/ಲೀ ಅಥವಾ ಕ್ವಿನಾಲ್‌ಫಾಸ್ ಸಿಂಪಡಿಸಿ. ಗದ್ದೆಯ ಬದುವಿನಲ್ಲಿರುವ ಕಳೆಗಳನ್ನು ತೆಗೆಯಿರಿ.",
      en: "Spray Chlorpyriphos 20% EC (2 ml/L) or Quinalphos. Clear grassy weeds on field bunds.",
      hi: "क्लोरपायरीफॉस 20 EC (2 मिली/लीटर) का छिड़काव करें। मेड़ों की घास साफ करें।"
    },
    prevention: {
      kn: "ನಾಟಿ ಮಾಡುವಾಗ ಎಲೆಯ ತುದಿಗಳನ್ನು ಕತ್ತರಿಸಿ (ಅಲ್ಲಿ ಮೊಟ್ಟೆಗಳಿರುತ್ತವೆ). ಗದ್ದೆಯಲ್ಲಿ ಬಾತುಕೋಳಿಗಳನ್ನು ಬಿಡುವುದು ಉಪಕಾರಿ.",
      en: "Clip seedling leaf tips before transplanting to remove hispa eggs.",
      hi: "रोपाई से पहले पत्तियों के ऊपरी सिरे काटकर अंडे नष्ट करें।"
    },
    expert_advice: {
      kn: "ದುಂಬಿಗಳ ಸಂಖ್ಯೆ ಹೆಚ್ಚಿದ್ದರೆ ಹಳ್ಳಿಯ ಎಲ್ಲ ಗದ್ದೆಗಳಲ್ಲಿ ಒಟ್ಟಾಗಿ ಕೀಟ ನಿರ್ವಹಣೆ ಮಾಡಲು ಕೃಷಿ ಇಲಾಖೆಯನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      en: "Contact the local agriculture office for community pest management.",
      hi: "कीट अधिक होने पर सामूहिक कीटनाशक छिड़काव के लिए कृषि विभाग से संपर्क करें।"
    }
  },

  "Bacterial Panicle Blight": {
    kannada_name: "ತೆನೆ ದುಂಡಾಣು ಕವಚ ರೋಗ",
    english_name: "Bacterial Panicle Blight",
    hindi_name: "बाली का जीवाणु झुलसा",
    meaning: {
      kn: "ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ಬರುವ ಬ್ಯಾಕ್ಟೀರಿಯಾ ರೋಗ. ಕಾಳುಗಳು ಜಳ್ಳಾಗುತ್ತವೆ.",
      en: "Bacterial infection causing discoloration and sterility of spikelets during flowering.",
      hi: "फूल आने के समय जीवाणु से होने वाला रोग जिससे दाने खोखले रह जाते हैं।"
    },
    symptoms: {
      kn: "ತೆನೆಯ ಕಾಳುಗಳು ಕೆಳಭಾಗದಿಂದ ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಹೂವು ಕಾಯಿ ಕಟ್ಟದೆ ಜಳ್ಳಾಗುತ್ತದೆ.",
      en: "Spikelets turn brownish-white at the base; high rate of empty or aborted grains.",
      hi: "बाली के दाने भूरे-सफेद होकर सूख जाते हैं और दाना नहीं बनता।"
    },
    next_steps: {
      kn: "ಹೆಚ್ಚು ಸಾರಜನಕ ಗೊಬ್ಬರ ಹಾಕಬೇಡಿ. ಕೃಷಿ ವಿಜ್ಞಾನಿಗಳ ಶಿಫಾರಸಿನಂತೆ ಸೂಕ್ತ ಬ್ಯಾಕ್ಟೀರಿಯಾನಾಶಕ ಬಳಸಿ.",
      en: "Avoid excessive nitrogen top-dressing at booting stage.",
      hi: "बाली बनते समय अतिरिक्त यूरिया न डालें।"
    },
    prevention: {
      kn: "ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರ ಮತ್ತು ನಿರೋಧಕ ತಳಿಗಳ ಬಳಕೆ.",
      en: "Use certified pathogen-free seed stock and balanced plant nutrition.",
      hi: "प्रमाणित बीजों का प्रयोग करें और संतुलित पोषण दें।"
    },
    expert_advice: {
      kn: "ಸ್ಥಳೀಯ ಕೆವಿಕೆ (KVK) ವಿಜ್ಞಾನಿಗಳನ್ನು ಸಂಪರ್ಕಿಸಿ ಮುಂದಿನ ಹಂಗಾಮಿಗೆ ಉತ್ತಮ ತಳಿಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      en: "Consult KVK scientists for varietal selection in affected areas.",
      hi: "केवीके के वैज्ञानिक से संपर्क कर सही किस्म का चयन करें।"
    }
  },

  "Bakanae": {
    kannada_name: "ಬಕಾನೆ / ಉದ್ದ ಕಾಲಿನ ರೋಗ",
    english_name: "Bakanae (Foot Rot)",
    hindi_name: "बकाने / फुट रॉट रोग",
    meaning: {
      kn: "ಇದು ಬೀಜದಿಂದ ಹರಡುವ ಶಿಲೀಂಧ್ರ ರೋಗ. ಗಿಡಗಳು ಅತಿಯಾಗಿ ಉದ್ದವಾಗಿ, ತೆಳುವಾಗಿ ಬೆಳೆದು ನಂತರ ಹಳದಿಯಾಗಿ ಸಾಯುತ್ತವೆ.",
      en: "Seed-borne fungal disease (Fusarium fujikuroi) causing infected seedlings to grow abnormally tall, slender, and pale.",
      hi: "बीज जनित फफूंद रोग जिसमें रोगी पौधे असामान्य रूप से लंबे, पतले और पीले होकर सूख जाते हैं।"
    },
    symptoms: {
      kn: "ಗದ್ದೆಯಲ್ಲಿ ಕೆಲವೇ ಗಿಡಗಳು ಉಳಿದ ಗಿಡಗಳಿಗಿಂತ ಹೆಚ್ಚು ಉದ್ದವಾಗಿ, ತೆಳುವಾಗಿ ಮತ್ತು ಹಳದಿ ಬಣ್ಣದಲ್ಲಿರುತ್ತವೆ. ಬುಡದಲ್ಲಿ ಕವಲು ಬೇರುಗಳು ಕಾಣಿಸಬಹುದು.",
      en: "Seedlings noticeably taller, thinner, and yellowish compared to healthy plants; adventitious roots on lower nodes.",
      hi: "खेत में कुछ पौधे बाकी पौधों से बहुत लंबे, पतले और हल्के पीले दिखते हैं।"
    },
    next_steps: {
      kn: "ಅತಿಯಾಗಿ ಉದ್ದವಾಗಿರುವ ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಬೇರು ಸಮೇತ ಕಿತ್ತು ನಾಶಪಡಿಸಿ. ಉಳಿದ ಗಿಡಗಳಿಗೆ ಕಾರ್ಬೆಂಡಾಜಿಮ್ ಅಥವಾ ಟ್ರೈಕೋಡರ್ಮಾ ನೀಡಿ.",
      en: "Carefully uproot and destroy abnormally elongated plants. Drench nursery with Carbendazim.",
      hi: "असामान्य रूप से लंबे रोगी पौधों को उखाड़कर नष्ट करें।"
    },
    prevention: {
      kn: "ಬಿತ್ತನೆಗೆ ಮುನ್ನ ಬೀಜೋಪಚಾರ ಕಡ್ಡಾಯ (ಕಾರ್ಬೆಂಡಾಜಿಮ್ 2 ಗ್ರಾಂ ಅಥವಾ ಟ್ರೈಕೋಡರ್ಮಾ 10 ಗ್ರಾಂ ಪ್ರತಿ ಕೆಜಿ ಬೀಜಕ್ಕೆ).",
      en: "Mandatory seed treatment with Carbendazim (2g/kg) or Trichoderma viride (10g/kg) before nursery sowing.",
      hi: "बुवाई से पहले कार्बेन्डाजिम या ट्राइकोडर्मा से बीज उपचार अनिवार्य रूप से करें।"
    },
    expert_advice: {
      kn: "ಮುಂದಿನ ಬೆಳೆಗೆ ಬೀಜವನ್ನು ಅದೇ ಗದ್ದೆಯಿಂದ ಇಟ್ಟುಕೊಳ್ಳಬೇಡಿ. ಪ್ರಮಾಣೀಕೃತ ಬೀಜಕ್ಕಾಗಿ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      en: "Do not save seeds from infected fields. Obtain certified seed from Raitha Samparka Kendra.",
      hi: "रोगी फसल से बीज न रखें, प्रमाणित बीज ही खरीदें।"
    }
  },

  "Stem Borer Damage": {
    kannada_name: "ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು ಬಾಧೆ",
    english_name: "Stem Borer Damage",
    hindi_name: "तना छेदक कीट प्रकोप",
    meaning: {
      kn: "ಕಾಂಡದ ಒಳಗೆ ಹುಳು ಸೇರಿಕೊಂಡು ತಿನ್ನುವುದರಿಂದ ಗಿಡ ಒಣಗುತ್ತದೆ. ಸಸಿ ಹಂತದಲ್ಲಿ 'ಸುಳಿ ಒಣಗುವುದು' (Dead Heart) ಮತ್ತು ತೆನೆ ಹಂತದಲ್ಲಿ 'ಬಿಳಿ ತೆನೆ' (White Ear) ಉಂಟಾಗುತ್ತದೆ.",
      en: "Insect damage caused by the yellow stem borer larva feeding inside the tiller stem.",
      hi: "तने के अंदर सुंडी द्वारा खाने से फसल सूखती है। पहले मृत तना और बाद में सफेद बाली आती है।"
    },
    symptoms: {
      kn: "ಮಧ್ಯದ ಸುಳಿ ಒಣಗಿ ಸುಲಭವಾಗಿ ಕೈಗೆ ಬರುತ್ತದೆ. ತೆನೆ ಹಂತದಲ್ಲಿ ಕಾಳುಗಳಿಲ್ಲದ ಬಿಳಿ ಬಣ್ಣದ ನೆಟ್ಟಗಿನ ತೆನೆಗಳು (ಬಿಳಿ ತೆನೆ) ಕಾಣಿಸುತ್ತವೆ.",
      en: "'Dead heart' (drying central shoot) during vegetative stage; erect, empty 'White ear' during flowering stage.",
      hi: "शुरुआत में बीच की गोभ सूख जाती है और बाद में सफेद दाना-रहित बालियां निकलती हैं।"
    },
    next_steps: {
      kn: "ಕಾರ್ಟಾಪ್ ಹೈಡ್ರೋಕ್ಲೋರೈಡ್ (Cartap Hydrochloride 4G) ಎಕರೆಗೆ 7-8 ಕೆಜಿ ಅಥವಾ ಕ್ಲೋರಾಂಟ್ರಾನಿಲಿಪ್ರೋಲ್ (Chlorantraniliprole 18.5 SC) 0.3 ಮಿ.ಲೀ/ಲೀ ಸಿಂಪಡಿಸಿ.",
      en: "Apply Cartap Hydrochloride 4G granules (7-8 kg/acre) or spray Chlorantraniliprole 18.5% SC (0.3 ml/L).",
      hi: "कार्टाप हाइड्रोक्लोराइड 4G दानेदार डालें या कोराजन (0.3 मिली/लीटर) का छिड़काव करें।"
    },
    prevention: {
      kn: "ನಾಟಿ ಮಾಡುವಾಗ ಎಲೆಯ ತುದಿಯ ಮೊಟ್ಟೆ ಗುಂಪುಗಳನ್ನು ತೆಗೆಯಿರಿ. ಗದ್ದೆಯಲ್ಲಿ ಫೆರಮೋನ್ ಬಲೆಗಳನ್ನು (Pheromone traps) ಎಕರೆಗೆ 5-8 ರಂತೆ ಇರಿಸಿ.",
      en: "Clip seedling leaf tips before planting. Install pheromone traps (5-8 traps/acre) to monitor and trap adult moths.",
      hi: "रोपाई से पहले पत्तियों के ऊपरी सिरे काटें। खेत में 5-8 फेरोमोन ट्रैप लगाएं।"
    },
    expert_advice: {
      kn: "ಬಿಳಿ ತೆನೆಗಳು ಶೇ. 5ಕ್ಕಿಂತ ಹೆಚ್ಚಿದ್ದರೆ ತಕ್ಷಣ ಸಮೀಪದ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಭೇಟಿ ಮಾಡಿ ಸೂಕ್ತ ಕೀಟನಾಶಕವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
      en: "Consult RSK agronomist if dead hearts exceed 5% during vegetative stage.",
      hi: "यदि 5% से अधिक सफेद बालियां दिखें तो तुरंत कृषि अधिकारी से संपर्क करें।"
    }
  },

  "Rice Grassy Stunt": {
    kannada_name: "ಹುಲ್ಲು ಕುಬ್ಜ ನಂಜು ರೋಗ",
    english_name: "Rice Grassy Stunt Virus",
    hindi_name: "धान का ग्रैसी स्टंट वायरस",
    meaning: {
      kn: "ಕಂದು ಜಿಗಿಹುಳುಗಳಿಂದ (BPH) ಹರಡುವ ವೈರಸ್ ರೋಗ. ಗಿಡಗಳು ಅತಿಯಾದ ಸಣ್ಣ ಸಣ್ಣ ಕವಲುಗಳನ್ನು ಬಿಟ್ಟು ಹುಲ್ಲಿನಂತೆ ಕುಬ್ಜವಾಗಿ ಬೆಳೆಯುತ್ತವೆ.",
      en: "Viral disease transmitted by brown planthoppers (BPH) causing excessive tillering and grassy dwarf appearance.",
      hi: "भूरे फुदके (BPH) द्वारा फैलने वाला विषाणु रोग, जिसमें पौधे घास जैसे बौने हो जाते हैं।"
    },
    symptoms: {
      kn: "ಗಿಡಗಳು ಹುಲ್ಲಿನ ಕುರ್ಚಿಯಂತೆ ಚಿಕ್ಕದಾಗುತ್ತವೆ. ಎಲೆಗಳು ಕಿರಿದಾಗಿ, ಸಣ್ಣದಾಗಿ ಹಳದಿ-ಹಸಿರು ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತವೆ. ತೆನೆಗಳು ಬರುವುದಿಲ್ಲ.",
      en: "Severe plant stunting, excessive narrow erect tillers giving a grassy look; failure to produce panicles.",
      hi: "पौधे छोटे और घास की तरह घने हो जाते हैं, बालियां नहीं निकलतीं।"
    },
    next_steps: {
      kn: "ಕಂದು ಜಿಗಿಹುಳುಗಳ (BPH) ನಿಯಂತ್ರಣಕ್ಕಾಗಿ ಪೈಮೆಟ್ರೋಜೈನ್ (Pymetrozine 50 WG) 0.6 ಗ್ರಾಂ/ಲೀ ಅಥವಾ ಟ್ರೈಫ್ಲೂಮೆಜೋಪೈರಿಮ್ ಸಿಂಪಡಿಸಿ.",
      en: "Control brown planthopper vectors with Pymetrozine (0.6g/L) or Triflumezopyrim. Remove infected stunted plants.",
      hi: "भूरे फुदके की रोकथाम हेतु पाइमेट्रोजिन का छिड़काव करें। रोगी पौधों को नष्ट करें।"
    },
    prevention: {
      kn: "ಗದ್ದೆಯಲ್ಲಿ 'ಅಡ್ಡ ಸಾಲು' (Alleyways/ಹಾದಿ) ಬಿಟ್ಟು ನಾಟಿ ಮಾಡಿ ಗಾಳಿ ಆಡುವಂತೆ ಮಾಡಿ. ಅತಿಯಾದ ಕೀಟನಾಶಕಗಳ ಅನಗತ್ಯ ಸಿಂಪಡಣೆ ಬೇಡ.",
      en: "Provide alleyways (every 2-3 meters) for aeration. Avoid indiscriminate pesticide use that kills natural BPH predators.",
      hi: "खेत में हवा के लिए हर 2-3 मीटर पर रास्ता छोड़ें। मित्र कीटों को बचाएं।"
    },
    expert_advice: {
      kn: "ಕಂದು ಜಿಗಿಹುಳುಗಳ ಸಂಖ್ಯೆ ಬುಡದಲ್ಲಿ ಹೆಚ್ಚಿದ್ದರೆ ತಕ್ಷಣ ಕೆವಿಕೆ ಕೀಟಶಾಸ್ತ್ರಜ್ಞರನ್ನು ಭೇಟಿ ಮಾಡಿ.",
      en: "Contact your local KVK entomologist if BPH counts exceed economic threshold.",
      hi: "भूरे फुदके का प्रकोप बढ़ने पर तुरंत केवीके कीट वैज्ञानिक से सलाह लें।"
    }
  },

  "Rice Ragged Stunt": {
    kannada_name: "ಸುರುಟು ಕುಬ್ಜ ನಂಜು ರೋಗ",
    english_name: "Rice Ragged Stunt Virus",
    hindi_name: "रैग्ड स्टंट वायरस",
    meaning: {
      kn: "ಕಂದು ಜಿಗಿಹುಳುಗಳಿಂದ ಹರಡುವ ವೈರಸ್ ರೋಗ. ಎಲೆಗಳ ಅಂಚುಗಳು ಹರಿದು ಸುರುಟಿಕೊಳ್ಳುತ್ತವೆ.",
      en: "Viral disease transmitted by brown planthopper causing ragged twisted leaf margins and vein galls.",
      hi: "भूरे फुदके से फैलने वाला विषाणु रोग जिससे पत्तियां मुड़कर फटने लगती हैं।"
    },
    symptoms: {
      kn: "ಎಲೆಯ ಅಂಚುಗಳು ಹರಿದು ಗರಗಸದಂತೆ ಕಾಣುತ್ತವೆ. ಎಲೆಗಳು ಸುರುಟಿಕೊಳ್ಳುತ್ತವೆ ಮತ್ತು ನರಗಳ ಮೇಲೆ ಸಣ್ಣ ಗಂಟುಗಳು (Galls) ಉಂಟಾಗುತ್ತವೆ.",
      en: "Twisted and ragged leaf blades with serrated edges; presence of small vein swellings (galls) on leaf under-surface.",
      hi: "पत्तियों के किनारे कटे-फटे और आरी जैसे दिखते हैं, नसों पर छोटी गांठें बन जाती हैं।"
    },
    next_steps: {
      kn: "ಕಂದು ಜಿಗಿಹುಳುಗಳ ನಿಯಂತ್ರಣಕ್ಕೆ ಆದ್ಯತೆ ನೀಡಿ. ಪೈಮೆಟ್ರೋಜೈನ್ ಅಥವಾ ಡೈನೋಟೆಫ್ಯುರಾನ್ ಸಿಂಪಡಿಸಿ.",
      en: "Focus on vector control (brown planthopper). Spray Pymetrozine or Dinotefuran targeting lower canopy.",
      hi: "फुदके की रोकथाम के लिए पाइमेट्रोजिन या डाइनोटेफ्यूरॉन का छिड़काव करें।"
    },
    prevention: {
      kn: "ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ. ಗದ್ದೆಯನ್ನು ಆಗಾಗ ಆರಿಸಿ ನೀರು ಹರಿಸಿ (Alternate wetting and drying).",
      en: "Practice alternate wetting and drying (AWD) irrigation to discourage planthopper proliferation.",
      hi: "एकांतर सूखा और गीला (AWD) सिंचाई करें ताकि फुदके न पनपें।"
    },
    expert_advice: {
      kn: "ಜಿಗಿಹುಳುಗಳ ತೀವ್ರ ಬಾಧೆಗೆ ಕೃಷಿ ವಿಸ್ತರಣಾಧಿಕಾರಿಗಳಿಂದ ಸಮಗ್ರ ಕೀಟ ನಿರ್ವಹಣಾ ಸಲಹೆ ಪಡೆಯಿರಿ.",
      en: "Consult RSK agronomist for Integrated Pest Management (IPM) guidelines.",
      hi: "समन्वित कीट प्रबंधन के लिए कृषि अधिकारी से सलाह लें।"
    }
  },

  "Dirty Panicle": {
    kannada_name: "ಕಲ್ಮಶ ತೆನೆ ರೋಗ",
    english_name: "Dirty Panicle Complex",
    hindi_name: "गंदी बाली / दाना धब्बा रोग",
    meaning: {
      kn: "ಹಲವು ಬಗೆಯ ಶಿಲೀಂಧ್ರಗಳಿಂದ ತೆನೆಯ ಕಾಳುಗಳು ಕಲೆಗಟ್ಟುವ ರೋಗ. ಕಾಳುಗಳು ಕಪ್ಪಾಗಿ ಅಕ್ಕಿಯ ಗುಣಮಟ್ಟ ಹಾಳಾಗುತ್ತದೆ.",
      en: "A grain discoloration complex caused by fungal pathogens affecting grain quality and seed germination.",
      hi: "अनेक फफूंदों द्वारा दानों पर बदरंग धब्बे बनाने वाला रोग जिससे चावल की गुणवत्ता खराब होती है।"
    },
    symptoms: {
      kn: "ತೆನೆಯ ಭತ್ತದ ಕಾಳುಗಳ ಮೇಲೆ ಕಂದು, ಕಪ್ಪು ಅಥವಾ ಬೂದು ಬಣ್ಣದ ಮಚ್ಚೆಗಳು. ಕಾಳುಗಳು ಸರಿಯಾಗಿ ತುಂಬುವುದಿಲ್ಲ.",
      en: "Discolored grains with black, brown, or pink spots; brittle grains with poor milling quality.",
      hi: "बालियों के दानों पर भूरे, काले या गुलाबी धब्बे। दाने कमजोर और टूटने वाले हो जाते हैं।"
    },
    next_steps: {
      kn: "ಹೂವಾಡುವ ನಂತರ ಟೆಬುಕೊನಜೋಲ್ + ಟ್ರಿಫ್ಲೋಕ್ಸಿಸ್ಟ್ರೋಬಿನ್ (Nativo) ಅಥವಾ ಪ್ರೊಪಿಕೊನಜೋಲ್ (1 ಮಿ.ಲೀ/ಲೀ) ಸಿಂಪಡಿಸಿ.",
      en: "Spray Tebuconazole + Trifloxystrobin (0.4g/L) or Propiconazole (1ml/L) at 50% flowering.",
      hi: "फूल आने के बाद प्रोपिकोनाजोल या नेटिवो का छिड़काव करें।"
    },
    prevention: {
      kn: "ತೆನೆ ಬರುವಾಗ ಸಾರಜನಕ ಅತಿಯಾಗಿ ಹಾಕಬೇಡಿ. ಕಾಳು ಕಟ್ಟುವ ಸಮಯದಲ್ಲಿ ನೀರು ಕೊರತೆಯಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.",
      en: "Avoid late nitrogen application. Maintain adequate soil moisture during grain development.",
      hi: "दाना बनते समय यूरिया न दें और खेत में नमी बनाए रखें।"
    },
    expert_advice: {
      kn: "ಬೀಜಕ್ಕಾಗಿ ಬೆಳೆಯುವ ರೈತರು ಕಡ್ಡಾಯವಾಗಿ ಕೃಷಿ ವಿಜ್ಞಾನಿಗಳಿಂದ ಶಿಲೀಂಧ್ರನಾಶಕ ಸಿಂಪಡಣೆಯ ಸಮಯವನ್ನು ತಿಳಿದುಕೊಳ್ಳಿ.",
      en: "Seed producers should consult local KVK for certification-compliant fungicide timing.",
      hi: "बीज उत्पादक किसान केवीके से सही समय पर दवा छिड़काव की सलाह लें।"
    }
  },

  "Kernel Smut": {
    kannada_name: "ಕಾಳು ಕಾಡಿಗೆ ರೋಗ",
    english_name: "Kernel Smut",
    hindi_name: "दाना कंडुआ रोग",
    meaning: {
      kn: "ಭತ್ತದ ಕಾಳಿನ ಒಳಭಾಗ ಕಪ್ಪು ಪುಡಿಯಾಗುವ ಶಿಲೀಂಧ್ರ ರೋಗ. ಕಾಳು ಒಡೆದು ಕಪ್ಪು ಪುಡಿ ಹೊರಬರುತ್ತದೆ.",
      en: "Fungal disease replacing the starchy rice kernel with a black powdery mass of spores.",
      hi: "फफूंद रोग जिसमें दाने का भीतरी भाग काले चूर्ण में बदल जाता है।"
    },
    symptoms: {
      kn: "ಕೆಲವೇ ಕಾಳುಗಳು ಊದಿಕೊಂಡು, ಕಾಳು ಒಡೆದು ಕಪ್ಪು ಬಣ್ಣದ ಮಸಿಯಂತಹ ಪುಡಿ ಹೊರಬರುತ್ತದೆ.",
      en: "Individual kernels burst open showing black powdery spore masses; panicles look soiled.",
      hi: "कुछ दाने फट जाते हैं और उनमें से काला कोयले जैसा पाउडर निकलता है।"
    },
    next_steps: {
      kn: "ರೋಗಪೀಡಿತ ತೆನೆಗಳನ್ನು ಜಾಗರೂಕತೆಯಿಂದ ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ. ಮುಂದಿನ ಹಂಗಾಮಿಗೆ ಬೀಜೋಪಚಾರ ಮಾಡಿ.",
      en: "Rogue out infected panicles. Apply Propiconazole at boot stage in disease-prone areas.",
      hi: "रोगी बालियों को काटकर नष्ट करें। अगली फसल में बीज उपचार जरूर करें।"
    },
    prevention: {
      kn: "ಹೆಚ್ಚು ಸಾರಜನಕ ಗೊಬ್ಬರ ಹಾಕಬೇಡಿ. ರೋಗವಿಲ್ಲದ ಪ್ರಮಾಣೀಕೃತ ಬೀಜ ಬಳಸಿ.",
      en: "Avoid excessive nitrogen fertilizers. Use certified disease-free seed.",
      hi: "संतुलित मात्रा में खाद दें और अधिक यूरिया से बचें।"
    },
    expert_advice: {
      kn: "ಬೀಜ ಮಾರಾಟ ಮಾಡುವ ಮುನ್ನ ಕೆವಿಕೆ ಅಧಿಕಾರಿಗಳಿಂದ ಬೀಜ ಪರೀಕ್ಷೆ ಮಾಡಿಸಿಕೊಳ್ಳಿ.",
      en: "Consult local RSK/KVK for clean seed production protocols.",
      hi: "बीज उत्पादन में केवीके से जांच कराएं।"
    }
  },

  "Udbatta Disease": {
    kannada_name: "ಉದ್ಬತ್ತಿ ರೋಗ / ಅಗರ್‌ಬತ್ತಿ ರೋಗ",
    english_name: "Udbatta Disease (Incense Stick)",
    hindi_name: "उदबत्ता रोग / अगरबत्ती रोग",
    meaning: {
      kn: "ತೆನೆಗಳು ಹೊರಬಾರದೆ ಅಗರ್‌ಬತ್ತಿಯ ಕಡ್ಡಿಯಂತೆ ನೇರವಾಗಿ, ಬಿಳಿ ಬೂದಿ ಮುಚ್ಚಿದಂತೆ ಆಗುವ ಅಪರೂಪದ ಆದರೆ ತೀವ್ರವಾದ ಶಿಲೀಂಧ್ರ ರೋಗ.",
      en: "Fungal disease (Ephelis oryzae) gluing the entire panicle into a straight, cylindrical, white chalky 'incense stick'.",
      hi: "फफूंद रोग जिसमें पूरी बाली अगरबत्ती की तरह सीधी, गोल और सफेद पाउडर से ढकी निकलती है।"
    },
    symptoms: {
      kn: "ತೆನೆಗಳು ಅರಳದೆ, ಅಗರ್‌ಬತ್ತಿಯ ಕಡ್ಡಿಯಂತೆ ಬಿಳಿ ಅಥವಾ ಬೂದು ಬಣ್ಣದ ಸಿಲಿಂಡರ್ ಆಕಾರದಲ್ಲಿ ಹೊರಬರುತ್ತವೆ. ಒಂದೂ ಕಾಳು ಕಟ್ಟುವುದಿಲ್ಲ.",
      en: "Panicles emerge as compact, cylindrical, hard, ash-white or grayish-black rods resembling an incense stick; 100% grain loss on affected tillers.",
      hi: "बालियां दानेदार न होकर अगरबत्ती जैसी गोल, सीधी और सफेद छड़ी जैसी निकलती हैं, कोई दाना नहीं बनता।"
    },
    next_steps: {
      kn: "ಉದ್ಬತ್ತಿ ಕಡ್ಡಿಯಂತಿರುವ ತೆನೆಗಳನ್ನು ತಕ್ಷಣ ಕಿತ್ತು ದೂರದಲ್ಲಿ ಸುಟ್ಟುಹಾಕಿ. ಗದ್ದೆಯಲ್ಲಿ ಬೀಜ ಉತ್ಪಾದನೆ ಮಾಡಬೇಡಿ.",
      en: "Immediately remove and burn affected panicles. Do not use seeds from this field for sowing.",
      hi: "अगरबत्ती जैसी बालियों को तुरंत तोड़कर जला दें। इस खेत का बीज कभी न बोएं।"
    },
    prevention: {
      kn: "ಬಿಸಿ ನೀರಿನ ಬೀಜೋಪಚಾರ (52-54 ಡಿಗ್ರಿ ಸೆಲ್ಸಿಯಸ್‌ನಲ್ಲಿ 10 ನಿಮಿಷ) ಅಥವಾ ಕಾರ್ಬೆಂಡಾಜಿಮ್ ಬೀಜೋಪಚಾರ (2 ಗ್ರಾಂ/ಕೆಜಿ) ಅತ್ಯಂತ ಪರಿಣಾಮಕಾರಿ.",
      en: "Hot water seed treatment (52–54°C for 10 min) or chemical seed treatment with Carbendazim (2g/kg).",
      hi: "गर्म पानी (52-54°C में 10 मिनट) से बीज उपचार करें या कार्बेन्डाजिम से शोधन करें।"
    },
    expert_advice: {
      kn: "ಇದು ಬೀಜದ ಮೂಲಕವೇ ಬರುವ ರೋಗವಾದ್ದರಿಂದ ಮುಂದಿನ ಬೆಳೆಗೆ ಸಂಪೂರ್ಣ ಹೊಸದಾದ ಪ್ರಮಾಣೀಕೃತ ಬೀಜಕ್ಕಾಗಿ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರವನ್ನು ಸಂಪರ್ಕಿಸಿ.",
      en: "Mandatory: Consult Raitha Samparka Kendra for certified clean seeds for your next crop.",
      hi: "यह बीज से फैलने वाला रोग है, अगली फसल के लिए सरकारी केंद्र से नया प्रमाणित बीज ही लें।"
    }
  }
};
