"""
RiceCare AI - Scientifically Verified Pesticide & Non-Chemical Disease Management Database
Based on Central Insecticides Board & Registration Committee (CIBRC), ICAR-NRRI, 
and University of Agricultural Sciences (UAS Bangalore & Dharwad) Rice Package of Practices.

Safety Rules Enforced:
1. Insecticides are NEVER recommended for fungal diseases.
2. Fungicides are NEVER recommended for bacterial diseases unless explicitly labeled (e.g. Copper Oxychloride + Streptocycline).
3. Non-chemical and cultural management are ALWAYS prioritized first.
4. Active ingredients, formulations, dosages, and Pre-Harvest Intervals (PHI) are strictly verified.
"""

from typing import Dict, Any, List, Optional
import datetime

VERIFICATION_CYCLE = "2026-04-15"
AUTHORITY_SOURCE = "CIBRC Government of India Registered Formulations & UAS Rice Package of Practices 2026"

PESTICIDE_ADVISORY_DATABASE: Dict[str, Dict[str, Any]] = {
    "Healthy Rice Leaf": {
        "disease_id": 0,
        "disease_name_en": "Healthy Rice Leaf",
        "disease_name_kn": "ಆರೋಗ್ಯಕರ ಭತ್ತದ ಎಲೆ",
        "pathogen_type": "None (Healthy Foliage)",
        "symptoms_en": "Deep green leaf blade with intact margins, uniform chlorophyll distribution, and no necrotic lesions.",
        "symptoms_kn": "ಏಕರೂಪದ ಹಸಿರು ಬಣ್ಣ, ಯಾವುದೇ ಒಣಗಿದ ಕಲೆಗಳು ಅಥವಾ ರೋಗದ ಮಚ್ಚೆಗಳಿಲ್ಲದ ಆರೋಗ್ಯಕರ ಎಲೆ.",
        "has_chemical_option": False,
        "nonchemical_management_en": (
            "Maintain balanced N-P-K fertilizer split applications (avoid excess urea). "
            "Ensure standard spacing (20 × 15 cm) for optimal ventilation. "
            "Clean field bunds and maintain proper water depth (2–5 cm)."
        ),
        "nonchemical_management_kn": (
            "ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಮಾಣದಲ್ಲಿ ಸಾರಜನಕ, ರಂಜಕ ಮತ್ತು ಪೊಟ್ಯಾಷ್ ಗೊಬ್ಬರಗಳನ್ನು ಹಂತ-ಹಂತವಾಗಿ ನೀಡಿ (ಅತಿಯಾದ ಯೂರಿಯಾ ಬೇಡ). "
            "ಸಾಲುಗಳ ನಡುವೆ ಸೂಕ್ತ ಅಂತರ ಕಾಪಾಡಿ. ಗದ್ದೆಯ ಬದುಗಳನ್ನು ಸ್ವಚ್ಛವಾಗಿಡಿ."
        ),
        "prevention_en": "Crop rotation with pulses, use of certified healthy seeds, and regular monitoring.",
        "prevention_kn": "ದ್ವಿದಳ ಧಾನ್ಯಗಳೊಂದಿಗೆ ಬೆಳೆ ಪರಿವರ್ತನೆ, ಪ್ರಮಾಣೀಕೃತ ಬೀಜಗಳ ಬಳಕೆ ಮತ್ತು ನಿಯಮಿತ ಕಣ್ಗಾವಲು.",
        "active_ingredient": "None required (Crop is healthy)",
        "formulation": "N/A",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "None",
        "label_rate": "Do not apply chemical pesticides to healthy crops.",
        "application_method": "None",
        "safety_precautions": "Avoid unnecessary chemical applications to conserve beneficial natural predators (spiders, dragonflies).",
        "pre_harvest_interval_days": 0,
        "re_entry_interval_hours": 0,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Rice Blast": {
        "disease_id": 1,
        "disease_name_en": "Rice Blast",
        "disease_name_kn": "ಭತ್ತದ ಬೆಂಕಿ ರೋಗ / ಕಣೆ ರೋಗ",
        "pathogen_type": "Fungal (Magnaporthe oryzae)",
        "symptoms_en": "Spindle-shaped or eye-shaped lesions with gray-white centers and reddish-brown borders; node blast and neck blast causing complete grain sterility.",
        "symptoms_kn": "ಎಲೆಗಳ ಮೇಲೆ ಕಣ್ಣಿನ ಆಕಾರದ (ಮಧ್ಯೆ ಬೂದು, ಸುತ್ತಲೂ ಕಂದು ಅಂಚುಳ್ಳ) ಮಚ್ಚೆಗಳು. ಕುತ್ತಿಗೆ ರೋಗ ಬಂದರೆ ತೆನೆ ಸಂಪೂರ್ಣ ಜಳ್ಳಾಗುತ್ತದೆ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Immediately stop all nitrogen (urea) top-dressing while active blast lesions are present.\n"
            "2. Burn or deeply plow infected straw stubble after harvest.\n"
            "3. Seed treatment before sowing: Hot water soak (52–54°C for 10 min) or Trichoderma viride bio-fungicide (10 g/kg seed)."
        ),
        "nonchemical_management_kn": (
            "1. ಬೆಂಕಿ ರೋಗದ ಮಚ್ಚೆಗಳು ಕಂಡ ತಕ್ಷಣ ಯೂರಿಯಾ (ಸಾರಜನಕ) ಗೊಬ್ಬರ ನೀಡುವುದನ್ನು ನಿಲ್ಲಿಸಿ.\n"
            "2. ಕೊಯ್ಲಿನ ನಂತರ ರೋಗಪೀಡಿತ ಕೊಳೆ-ಕಸವನ್ನು ಸುಟ್ಟು ಅಥವಾ ಆಳವಾಗಿ ಉಳುಮೆ ಮಾಡಿ.\n"
            "3. ಬಿತ್ತನೆಗೆ ಮುನ್ನ ಟ್ರೈಕೋಡರ್ಮಾ (10 ಗ್ರಾಂ/ಕೆಜಿ) ಜೈವಿಕ ಶಿಲೀಂಧ್ರನಾಶಕದಿಂದ ಬೀಜೋಪಚಾರ ಮಾಡಿ."
        ),
        "prevention_en": "Plant blast-resistant varieties (such as Jaya, Intan, Rasi, MTU-1010). Apply silica/potassium to harden leaf cuticle.",
        "prevention_kn": "ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ. ಎಲೆ ಕವಚ ಗಟ್ಟಿಯಾಗಲು ಪೊಟ್ಯಾಷ್ ಗೊಬ್ಬರವನ್ನು ಸಮರ್ಪಕವಾಗಿ ನೀಡಿ.",
        "active_ingredient": "Tricyclazole 75% WP",
        "formulation": "75% WP (Wettable Powder)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Leaf Blast, Node Blast, Neck Blast",
        "label_rate": "0.6 g per Litre of water (120 g in 200 Litres of water per acre)",
        "application_method": "High-volume foliar spray using knapsack sprayer with hollow-cone nozzle. Spray at first appearance of leaf blast, repeated at late boot/heading if cloudy/rainy.",
        "safety_precautions": "Wear rubber gloves, protective face mask, and eye goggles. Do not spray against the wind. Keep away from water bodies.",
        "pre_harvest_interval_days": 30,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Brown Spot": {
        "disease_id": 2,
        "disease_name_en": "Brown Spot",
        "disease_name_kn": "ಕಂದು ಚುಕ್ಕೆ ರೋಗ",
        "pathogen_type": "Fungal (Bipolaris oryzae / Cochliobolus miyabeanus)",
        "symptoms_en": "Circular to oval sesame seed-shaped brown spots with dark reddish-brown margins and grayish centers across leaf blades and glumes.",
        "symptoms_kn": "ಎಲೆಗಳ ಮೇಲೆ ಕಂದು ಬಣ್ಣದ ಎಳ್ಳಿನ ಆಕಾರದ ಸಣ್ಣ ಕಲೆಗಳು. ಕಲೆಯ ಮಧ್ಯ ಬೂದು ಬಣ್ಣ ಮತ್ತು ಅಂಚು ಗಾಢ ಕಂದು ಬಣ್ಣದಲ್ಲಿದೆ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Correct soil nutrient imbalances: Apply recommended Potash (MOP) and Zinc sulphate (10 kg/acre in deficient soils).\n"
            "2. Prevent intermittent drought stress: Keep soil continuously moist; brown spot thrives in drought-stressed, nutrient-deficient soils.\n"
            "3. Seed treatment: Soak seeds in Carbendazim 2g/kg or hot water before nursery sowing."
        ),
        "nonchemical_management_kn": (
            "1. ಮಣ್ಣಿನಲ್ಲಿ ಪೊಟ್ಯಾಷ್ ಮತ್ತು ಸತುವಿನ (Zinc) ಕೊರತೆಯನ್ನು ಸರಿಪಡಿಸಿ. ಎಕರೆಗೆ 10 ಕೆಜಿ ಸತುವಿನ ಸಲ್ಫೇಟ್ ಬಳಸಿ.\n"
            "2. ಗದ್ದೆಯನ್ನು ಒಣಗಲು ಬಿಡಬೇಡಿ; ಸಮರ್ಪಕವಾಗಿ ನೀರು ಹರಿಸಿ.\n"
            "3. ಬಿತ್ತನೆಗೆ ಮುನ್ನ ಬೀಜೋಪಚಾರ ಕಡ್ಡಾಯವಾಗಿ ಮಾಡಿ."
        ),
        "prevention_en": "Soil testing, application of well-decomposed FYM (farmyard manure), and balanced N-P-K nutrition.",
        "prevention_kn": "ಮಣ್ಣು ಪರೀಕ್ಷೆ ಮಾಡಿಸಿ ಚೆನ್ನಾಗಿ ಕಳಿತ ಕೊಟ್ಟಿಗೆ ಗೊಬ್ಬರ ಮತ್ತು ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರಗಳನ್ನು ಬಳಸಿ.",
        "active_ingredient": "Mancozeb 75% WP",
        "formulation": "75% WP (Wettable Powder)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Brown Spot (Leaf & Glume Spot)",
        "label_rate": "2.0 to 2.5 g per Litre of water (400–500 g in 200 Litres of water per acre)",
        "application_method": "Foliar spray targeting upper and middle canopy as soon as spots exceed 5-10% of leaf area.",
        "safety_precautions": "Toxic to fish and aquatic fauna. Wear personal protective clothing. Wash hands and exposed skin thoroughly after handling.",
        "pre_harvest_interval_days": 21,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Bacterial Leaf Blight": {
        "disease_id": 3,
        "disease_name_en": "Bacterial Leaf Blight",
        "disease_name_kn": "ದುಂಡಾಣು ಎಲೆ ಕವಚ / ರಕ್ತ ಸುರುಳಿ ರೋಗ",
        "pathogen_type": "Bacterial (Xanthomonas oryzae pv. oryzae)",
        "symptoms_en": "Water-soaked lesions on leaf margins turning yellow-white with wavy edges, rapidly drying into bleached straw-colored blight.",
        "symptoms_kn": "ಎಲೆಯ ತುದಿಯಿಂದ ಮತ್ತು ಅಂಚಿನಿಂದ ಹಳದಿ-ಬಿಳಿ ಬಣ್ಣದ ಒಣಗುವಿಕೆ. ಅಂಚುಗಳು ಅಲೆಯಾಕಾರದಲ್ಲಿ ಒಣಗಿ ಒಣಹುಲ್ಲಿನಂತೆ ಬಿಳಿಯಾಗುತ್ತದೆ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Strictly STOP nitrogen top-dressing; excess urea accelerates bacterial spread dramatically.\n"
            "2. Drain stagnant floodwater from affected fields to dry out root zones.\n"
            "3. Do not clip seedling leaves during transplanting as open wounds allow bacterial entry.\n"
            "4. Avoid field-to-field irrigation flow from contaminated fields."
        ),
        "nonchemical_management_kn": (
            "1. ತಕ್ಷಣ ಯೂರಿಯಾ (ಸಾರಜನಕ) ಗೊಬ್ಬರ ನೀಡುವುದನ್ನು ನಿಲ್ಲಿಸಿ; ಯೂರಿಯಾ ಈ ರೋಗವನ್ನು ಉಲ್ಬಣಗೊಳಿಸುತ್ತದೆ.\n"
            "2. ಗದ್ದೆಯಲ್ಲಿ ನಿಂತ ನೀರನ್ನು ತಕ್ಷಣ ಬಸಿದು ಹಾಕಿ.\n"
            "3. ನಾಟಿ ಮಾಡುವಾಗ ಎಲೆಯ ತುದಿಗಳನ್ನು ಕತ್ತರಿಸಬೇಡಿ.\n"
            "4. ರೋಗಪೀಡಿತ ಗದ್ದೆಯ ನೀರನ್ನು ಬೇರೆ ಗದ್ದೆಗಳಿಗೆ ಹರಿಸಬೇಡಿ."
        ),
        "prevention_en": "Plant resistant hybrids (e.g. Improved Samba Mahsuri, RP Bio-226). Disinfect seed stock.",
        "prevention_kn": "ರೋಗ ನಿರೋಧಕ ತಳಿಗಳನ್ನು (ಇಂಪ್ರೂವ್ಡ್ ಸಾಂಬಾ ಮಸೂರಿ) ಬೆಳೆಯಿರಿ. ಗದ್ದೆಗಳನ್ನು ಕಳೆಮುಕ್ತವಾಗಿಡಿ.",
        "active_ingredient": "Streptomycin Sulphate 90% + Tetracycline Hydrochloride 10% SP tank-mixed with Copper Oxychloride 50% WP",
        "formulation": "Soluble Powder (Streptocycline 6g pouch) + 50% WP",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Bacterial Leaf Blight (BLB), Bacterial Leaf Streak",
        "label_rate": "Streptocycline 6 g + Copper Oxychloride 100 g in 50 Litres of water (12 g Streptocycline + 200 g Copper Oxychloride in 100 L/acre)",
        "application_method": "Foliar spray during early morning or late afternoon. Spray within 24 hours of mixing.",
        "safety_precautions": "Do not mix with acidic chemicals. Wear protective eyewear and respiratory mask during mixing and spraying.",
        "pre_harvest_interval_days": 21,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Sheath Blight": {
        "disease_id": 4,
        "disease_name_en": "Sheath Blight",
        "disease_name_kn": "ಹಾಳೆ ಕವಚ ಕೊಳೆ ರೋಗ",
        "pathogen_type": "Fungal (Rhizoctonia solani)",
        "symptoms_en": "Greenish-gray oval snake-skin patterned lesions with dark borders on leaf sheaths near water surface, spreading up into the leaf canopy.",
        "symptoms_kn": "ನೀರಿನ ಮಟ್ಟದ ಮೇಲಿರುವ ಹಾಳೆಗಳ ಮೇಲೆ ಹಾವಿನ ಚರ್ಮದಂತಹ ಅಥವಾ ಹಸಿರು-ಬೂದು ಬಣ್ಣದ ದೊಡ್ಡ ಅಂಡಾಕಾರದ ಮಚ್ಚೆಗಳು.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Drain stagnant field water for 3–5 days to let canopy dry out.\n"
            "2. Remove lower diseased sheaths in isolated patches.\n"
            "3. Avoid excessive planting density (maintain 20 × 15 cm spacing)."
        ),
        "nonchemical_management_kn": (
            "1. ಗದ್ದೆಯಿಂದ ನೀರನ್ನು 3-4 ದಿನ ಬಸಿದು ಬುಡಕ್ಕೆ ಗಾಳಿ ಆಡುವಂತೆ ಮಾಡಿ.\n"
            "2. ಗಿಡಗಳು ಅತಿಯಾಗಿ ದಟ್ಟವಾಗಿರದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.\n"
            "3. ಕಳೆಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಿಯಂತ್ರಿಸಿ."
        ),
        "prevention_en": "Apply balanced potassium. Deep plowing in summer to bury sclerotial fungal bodies.",
        "prevention_kn": "ಬೇಸಿಗೆಯಲ್ಲಿ ಆಳವಾದ ಉಳುಮೆ ಮಾಡಿ. ಸಮತೋಲಿತ ಪೊಟ್ಯಾಷ್ ಗೊಬ್ಬರ ನೀಡಿ.",
        "active_ingredient": "Validamycin 3% L",
        "formulation": "3% Liquid (Aqueous Solution)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Sheath Blight",
        "label_rate": "2.0 to 2.5 mL per Litre of water (400–500 mL in 200 Litres water per acre)",
        "application_method": "Directed spray thoroughly wetting the lower leaf sheaths and base of tillers near water line.",
        "safety_precautions": "Bio-antibiotic fungicide with low mammalian toxicity. Use PPE. Wash equipment thoroughly after use.",
        "pre_harvest_interval_days": 14,
        "re_entry_interval_hours": 12,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "False Smut": {
        "disease_id": 5,
        "disease_name_en": "False Smut",
        "disease_name_kn": "ಸುಳ್ಳು ಕಾಡಿಗೆ ರೋಗ",
        "pathogen_type": "Fungal (Ustilaginoidea virens)",
        "symptoms_en": "Individual grains converted into large, velvety greenish-yellow or orange-black spore balls with powdery texture.",
        "symptoms_kn": "ತೆನೆಯ ಕೆಲವೇ ಕಾಳುಗಳು ಉಬ್ಬಿ ಹಳದಿ, ಕಿತ್ತಳೆ ಅಥವಾ ಹಸಿರು-ಕಪ್ಪು ಮೃದು ಉಂಡೆಗಳಾಗಿ ಮಾರ್ಪಡುತ್ತವೆ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Hand-pick and destroy false smut spore balls into plastic bags before spores burst.\n"
            "2. Avoid late-season nitrogen top-dressing at booting/flowering stage.\n"
            "3. Rogue out heavily infected panicles immediately."
        ),
        "nonchemical_management_kn": (
            "1. ರೋಗಪೀಡಿತ ತೆನೆಗಳನ್ನು ಜಾಗರೂಕತೆಯಿಂದ ಪ್ಲಾಸ್ಟಿಕ್ ಚೀಲದಲ್ಲಿ ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ.\n"
            "2. ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ಅತಿಯಾದ ಯೂರಿಯಾ ಹಾಕಬೇಡಿ."
        ),
        "prevention_en": "Seed treatment with Carbendazim (2g/kg). Adjust sowing date to avoid flowering during rainy/cloudy weeks.",
        "prevention_kn": "ಪ್ರಮಾಣೀಕೃತ ಬೀಜೋಪಚಾರ ಮಾಡಿ. ಹೂವಾಡುವ ಸಮಯ ಮಳೆಗಾಲಕ್ಕೆ ಸಿಗದಂತೆ ಬಿತ್ತನೆ ಹೊಂದಿಸಿ.",
        "active_ingredient": "Propiconazole 25% EC",
        "formulation": "25% EC (Emulsifiable Concentrate)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "False Smut, Sheath Blight, Dirty Panicle",
        "label_rate": "1.0 mL per Litre of water (200 mL in 200 Litres of water per acre)",
        "application_method": "Preventive foliar spray at boot leaf stage (just prior to panicle emergence) and repeated at 50% flowering.",
        "safety_precautions": "Do not apply during windy conditions. Do not contaminate irrigation canals or fish ponds. Wear protective mask.",
        "pre_harvest_interval_days": 30,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Tungro": {
        "disease_id": 6,
        "disease_name_en": "Tungro",
        "disease_name_kn": "ತುಂಗ್ರೊ ನಂಜು ರೋಗ",
        "pathogen_type": "Viral (Rice Tungro Virus transmitted by Green Leafhopper)",
        "symptoms_en": "Yellow-orange leaf discoloration from tips downwards, severe plant stunting, reduced tillering, delayed flowering.",
        "symptoms_kn": "ಎಲೆಗಳು ತುದಿಯಿಂದ ಕಿತ್ತಳೆ-ಹಳದಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಗಿಡಗಳು ಕುಬ್ಜವಾಗುತ್ತವೆ ಮತ್ತು ಕವಲುಗಳು ಕಡಿಮೆಯಾಗುತ್ತವೆ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Immediately rogue out and bury stunted virus-infected hills to eliminate inoculum source.\n"
            "2. Install light traps in field (1 trap per acre) to monitor and attract vector green leafhoppers.\n"
            "3. Synchronize planting with neighboring farmers to avoid continuous vector breeding."
        ),
        "nonchemical_management_kn": (
            "1. ರೋಗಪೀಡಿತ ಕುಬ್ಜ ಗಿಡಗಳನ್ನು ಬೇರು ಸಹಿತ ಕಿತ್ತು ಮಣ್ಣಿನಲ್ಲಿ ಹೂತುಹಾಕಿ.\n"
            "2. ಗದ್ದೆಯಲ್ಲಿ ಬೆಳಕು ಬಲೆಗಳನ್ನು (Light traps) ಇರಿಸಿ ಜಿಗಿಹುಳುಗಳನ್ನು ನಾಶಪಡಿಸಿ.\n"
            "3. ಹಳ್ಳಿಯ ಎಲ್ಲಾ ರೈತರು ಒಟ್ಟಾಗಿ ನಿಗದಿತ ಸಮಯದಲ್ಲಿ ನಾಟಿ ಮಾಡಿ."
        ),
        "prevention_en": "Plant resistant cultivars (Vikramarya, Lalat). Control nursery leafhoppers before transplanting.",
        "prevention_kn": "ತುಂಗ್ರೊ ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ. ಮಡಿ ಹಂತದಲ್ಲೇ ಜಿಗಿಹುಳುಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ.",
        "active_ingredient": "Imidacloprid 17.8% SL (Vector Control - Kills Green Leafhopper)",
        "formulation": "17.8% SL (Soluble Liquid)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Green Leafhopper (Nephotettix virescens) - Vector of Tungro Virus",
        "label_rate": "0.3 mL per Litre of water (60 mL in 200 Litres of water per acre)",
        "application_method": "Foliar spray targeting both foliage and canopy base where leafhoppers feed.",
        "safety_precautions": "Highly toxic to honeybees. Do not apply when rice is flowering and bees are foraging.",
        "pre_harvest_interval_days": 40,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Stem Borer Damage": {
        "disease_id": 7,
        "disease_name_en": "Stem Borer Damage",
        "disease_name_kn": "ಕಾಂಡ ಕೊರೆಯುವ ಹುಳು ಬಾಧೆ",
        "pathogen_type": "Insect Pest (Scirpophaga incertulas)",
        "symptoms_en": "'Dead hearts' (central drying shoot) in vegetative phase; erect, empty white panicles ('White heads') in reproductive phase.",
        "symptoms_kn": "ಸಸಿ ಹಂತದಲ್ಲಿ ಮಧ್ಯದ ಸುಳಿ ಒಣಗುವುದು (ಡೆಡ್ ಹಾರ್ಟ್), ತೆನೆ ಹಂತದಲ್ಲಿ ಕಾಳುಗಳಿಲ್ಲದ ಬಿಳಿ ತೆನೆ (White Ear).",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Clip seedling leaf tips before transplanting to destroy egg masses.\n"
            "2. Install pheromone traps (5–8 traps/acre) with Scirpophaga lures for monitoring.\n"
            "3. Release egg parasitoid Trichogramma japonicum (100,000/ha) at weekly intervals."
        ),
        "nonchemical_management_kn": (
            "1. ನಾಟಿ ಮಾಡುವ ಮುನ್ನ ಸಸಿಗಳ ಎಲೆ ತುದಿಗಳನ್ನು ಕತ್ತರಿಸಿ ಮೊಟ್ಟೆಗಳನ್ನು ನಾಶಪಡಿಸಿ.\n"
            "2. ಎಕರೆಗೆ 5-8 ಫೆರಮೋನ್ ಬಲೆಗಳನ್ನು (Lure traps) ಇರಿಸಿ.\n"
            "3. ಟ್ರೈಕೋಗ್ರಾಮ ಪರಾವಲಂಬಿ ಜೈವಿಕ ಕಾರ್ಡ್‌ಗಳನ್ನು ಬಳಸಿ."
        ),
        "prevention_en": "Deep summer plowing to destroy overwintering larvae in rice stubble.",
        "prevention_kn": "ಕೊಯ್ಲಿನ ನಂತರ ಆಳವಾಗಿ ಉಳುಮೆ ಮಾಡಿ ಬತ್ತದ ಬುಡದಲ್ಲಿರುವ ಹುಳುಗಳನ್ನು ನಾಶಪಡಿಸಿ.",
        "active_ingredient": "Chlorantraniliprole 18.5% SC",
        "formulation": "18.5% SC (Suspension Concentrate)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Yellow Stem Borer, Leaf Folder",
        "label_rate": "0.3 mL per Litre of water (60 mL in 200 Litres of water per acre)",
        "application_method": "Foliar spray at economic threshold (ETL: 1 egg mass/m² or 5% dead hearts).",
        "safety_precautions": "Wear overalls, rubber boots, and face protection. Keep out of reach of children and domestic animals.",
        "pre_harvest_interval_days": 47,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Rice Hispa": {
        "disease_id": 8,
        "disease_name_en": "Rice Hispa",
        "disease_name_kn": "ಮುಳ್ಳು ದುಂಬಿ ಬಾಧೆ",
        "pathogen_type": "Insect Pest (Dicladispa armigera)",
        "symptoms_en": "Parallel white lines on leaf blades from larval and adult chlorophyll scraping; affected leaves wither and appear bleached like dried straw.",
        "symptoms_kn": "ಎಲೆಗಳ ಮೇಲೆ ಬಿಳಿ ಬಣ್ಣದ ಸಮಾನಾಂತರ ರೇಖೆಗಳು; ದುಂಬಿಗಳು ಹಸಿರನ್ನು ಕೆರೆದು ತಿನ್ನುವುದರಿಂದ ಎಲೆ ಒಣಗಿ ಬಿಳಿಯಾಗುತ್ತದೆ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Clip top 5 cm of seedling leaves before transplanting (removes 80% of eggs).\n"
            "2. Pass a sweep net or rope across flooded canopy to dislodge adult beetles.\n"
            "3. Clear alternate host grasses on field bunds."
        ),
        "nonchemical_management_kn": (
            "1. ನಾಟಿ ಮಾಡುವಾಗ ಎಲೆಯ ತುದಿಯ 5 ಸೆಂ.ಮೀ ಕತ್ತರಿಸಿ ಮೊಟ್ಟೆಗಳನ್ನು ತೆಗೆಯಿರಿ.\n"
            "2. ಗದ್ದೆಯ ಬದುವಿನಲ್ಲಿರುವ ಕಳೆ ಹುಲ್ಲನ್ನು ತೆಗೆದುಹಾಕಿ.\n"
            "3. ನೀರಿನ ಮೇಲೆ ಹಗ್ಗ ಅಥವಾ ಬಲೆಯನ್ನು ಎಳೆದು ದುಂಬಿಗಳನ್ನು ಸಂಗ್ರಹಿಸಿ ನಾಶಪಡಿಸಿ."
        ),
        "prevention_en": "Avoid staggered planting in hispa-endemic areas.",
        "prevention_kn": "ಒಂದೇ ಪ್ರದೇಶದಲ್ಲಿ ಎಲ್ಲ ರೈತರು ಒಟ್ಟಾಗಿ ನಾಟಿ ಮಾಡಿ.",
        "active_ingredient": "Chlorpyriphos 20% EC",
        "formulation": "20% EC (Emulsifiable Concentrate)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Rice Hispa, Stem Borer, Gall Midge",
        "label_rate": "2.0 mL per Litre of water (400 mL in 200 Litres water per acre)",
        "application_method": "Foliar spray when hispa damage exceeds 2 damaged leaves/hill or 1 adult beetle/hill.",
        "safety_precautions": "Organophosphate pesticide. Highly toxic. Wear complete chemical apron, face shield, and chemical-resistant gloves. Avoid inhalation.",
        "pre_harvest_interval_days": 30,
        "re_entry_interval_hours": 48,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Bakanae": {
        "disease_id": 9,
        "disease_name_en": "Bakanae",
        "disease_name_kn": "ಬಕಾನೆ / ಉದ್ದ ಕಾಲಿನ ರೋಗ",
        "pathogen_type": "Fungal (Fusarium fujikuroi)",
        "symptoms_en": "Abnormally tall, slender, pale yellowish seedlings with adventitious roots emerging from lower stem nodes, ultimately wilting.",
        "symptoms_kn": "ಕೆಲವೇ ಗಿಡಗಳು ಉಳಿದ ಗಿಡಗಳಿಗಿಂತ ಅತಿಯಾಗಿ ಉದ್ದವಾಗಿ, ತೆಳುವಾಗಿ ಮತ್ತು ಹಳದಿಯಾಗಿ ಬೆಳೆದು ನಂತರ ಸಾಯುತ್ತವೆ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Carefully uproot and burn elongated infected plants before fungal sporulation.\n"
            "2. Mandatory seed inspection: Do NOT use seeds from bakanae-infected fields.\n"
            "3. Hot water seed treatment (52–54°C for 10 min) kills internal fungal mycelium."
        ),
        "nonchemical_management_kn": (
            "1. ಅತಿಯಾಗಿ ಉದ್ದವಾಗಿರುವ ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಬೇರು ಸಮೇತ ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ.\n"
            "2. ಈ ಗದ್ದೆಯ ಭತ್ತವನ್ನು ಮುಂದಿನ ಬಿತ್ತನೆ ಬೀಜವಾಗಿ ಬಳಸಬೇಡಿ.\n"
            "3. ಬಿಸಿ ನೀರಿನ ಬೀಜೋಪಚಾರ ಮಾಡಿ."
        ),
        "prevention_en": "Certified pathogen-free seed stock. Bio-seed treatment with Trichoderma viride.",
        "prevention_kn": "ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರದಿಂದ ಪ್ರಮಾಣೀಕೃತ ಬೀಜ ಪಡೆಯಿರಿ.",
        "active_ingredient": "Carbendazim 50% WP (Seed Treatment & Drench)",
        "formulation": "50% WP (Wettable Powder)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Bakanae (Foot Rot), Blast, Seed-borne Pathogens",
        "label_rate": "2.0 g per kg of seed (dry or wet seed dressing) or 1.0 g / L water as nursery drench",
        "application_method": "Seed treatment prior to nursery sowing. Soak seeds in Carbendazim solution for 24 hours.",
        "safety_precautions": "Wash hands and utensils immediately after seed dressing. Do not feed treated seeds to birds or cattle.",
        "pre_harvest_interval_days": 21,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Bacterial Leaf Streak": {
        "disease_id": 10,
        "disease_name_en": "Bacterial Leaf Streak",
        "disease_name_kn": "ದುಂಡಾಣು ಎಲೆ ಗೆರೆ ರೋಗ",
        "pathogen_type": "Bacterial (Xanthomonas oryzae pv. oryzicola)",
        "symptoms_en": "Fine, translucent, water-soaked brownish streaks strictly confined between leaf veins, producing small bacterial exudate droplets in moist weather.",
        "symptoms_kn": "ಎಲೆ ನರಗಳ ನಡುವೆ ಕಿರಿದಾದ, ನೀರಿನಂಶದ ಕಂದು ಗೆರೆಗಳು. ತೇವಾಂಶವಿದ್ದಾಗ ಸಣ್ಣ ಬಿಳಿ ಬ್ಯಾಕ್ಟೀರಿಯಾ ಹನಿಗಳು ಕಾಣುತ್ತವೆ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Stop top-dressing with nitrogenous fertilizers.\n"
            "2. Drain stagnant water and let field surface aerate.\n"
            "3. Prevent injury to leaves during intercultural operations."
        ),
        "nonchemical_management_kn": (
            "1. ಸಾರಜನಕ (ಯೂರಿಯಾ) ಗೊಬ್ಬರ ಹಾಕುವುದು ನಿಲ್ಲಿಸಿ.\n"
            "2. ಗದ್ದೆಯಲ್ಲಿ ನೀರು ನಿಲ್ಲಿಸದೆ ಒಣಗಲು ಬಿಡಿ."
        ),
        "prevention_en": "Crop sanitation, removal of grassy weeds, and balanced potassium.",
        "prevention_kn": "ಕಳೆ ನಿರ್ವಹಣೆ ಮತ್ತು ಪೊಟ್ಯಾಷ್ ಸಮರ್ಪಕ ಬಳಕೆ.",
        "active_ingredient": "Copper Oxychloride 50% WP",
        "formulation": "50% WP (Wettable Powder)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Bacterial Leaf Streak, Bacterial Blight",
        "label_rate": "2.5 g per Litre of water (500 g in 200 Litres water per acre)",
        "application_method": "Foliar spray wetting both sides of leaf canopy.",
        "safety_precautions": "Wear mask and goggles. Avoid spraying during strong winds.",
        "pre_harvest_interval_days": 21,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Sheath Rot": {
        "disease_id": 11,
        "disease_name_en": "Sheath Rot",
        "disease_name_kn": "ಕವಚ ಕೊಳೆ ರೋಗ",
        "pathogen_type": "Fungal (Sarocladium oryzae)",
        "symptoms_en": "Oblong or irregular reddish-brown lesions with gray centers on boot leaf sheath; incomplete panicle emergence with chaffy grains.",
        "symptoms_kn": "ಧ್ವಜ ಎಲೆಯ ಕವಚದ ಮೇಲೆ ಬೂದು ಮಧ್ಯಭಾಗವಿರುವ ಅಸಮವಾದ ಕಂದು ಮಚ್ಚೆಗಳು; ತೆನೆ ಹೊರಬಾರದೆ ಅರ್ಧಂಬರ್ಧ ಸಿಲುಕಿ ಕೊಳೆಯುತ್ತದೆ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Manage stem borers and mites, whose feeding wounds allow fungal entry.\n"
            "2. Maintain optimal plant spacing (20 × 15 cm) to avoid canopy humidity."
        ),
        "nonchemical_management_kn": (
            "1. ಕಾಂಡ ಕೊರೆಯುವ ಹುಳುಗಳನ್ನು ನಿಯಂತ್ರಿಸಿ.\n"
            "2. ಗಿಡಗಳು ದಟ್ಟವಾಗಿರದಂತೆ ನೋಡಿಕೊಳ್ಳಿ."
        ),
        "prevention_en": "Use clean certified seeds. Avoid excess nitrogen at booting.",
        "prevention_kn": "ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ಹೆಚ್ಚು ಯೂರಿಯಾ ಹಾಕಬೇಡಿ.",
        "active_ingredient": "Hexaconazole 5% EC",
        "formulation": "5% EC (Emulsifiable Concentrate)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Sheath Rot, Sheath Blight",
        "label_rate": "2.0 mL per Litre of water (400 mL in 200 Litres of water per acre)",
        "application_method": "Directed spray thoroughly covering boot leaf sheaths at booting stage.",
        "safety_precautions": "Wear rubber gloves. Do not contaminate irrigation canals or ponds.",
        "pre_harvest_interval_days": 30,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Narrow Brown Leaf Spot": {
        "disease_id": 12,
        "disease_name_en": "Narrow Brown Leaf Spot",
        "disease_name_kn": "ಕಿರಿದಾದ ಕಂದು ಗೆರೆ ರೋಗ",
        "pathogen_type": "Fungal (Cercospora janseana)",
        "symptoms_en": "Short, narrow, linear brown streaks (2 to 10 mm long) running parallel to leaf veins.",
        "symptoms_kn": "ಎಲೆಯ ನರಗಳಿಗೆ ಸಮಾನಾಂತರವಾಗಿ ಸಣ್ಣ, ಕಿರಿದಾದ ಕಂದು ಬಣ್ಣದ ರೇಖೆಗಳು.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Apply recommended potassium fertilizer (MOP) to improve foliar resistance.\n"
            "2. In most fields this is a late-season minor disease; chemical treatment is rarely necessary."
        ),
        "nonchemical_management_kn": (
            "1. ಪೊಟ್ಯಾಷ್ ಗೊಬ್ಬರವನ್ನು ಸಮರ್ಪಕವಾಗಿ ನೀಡಿ.\n"
            "2. ಇದು ಸಾಮಾನ್ಯವಾಗಿ ಕೊನೆಯ ಹಂತದಲ್ಲಿ ಬರುವುದರಿಂದ ರಾಸಾಯನಿಕ ಸಿಂಪಡಣೆ ಅಗತ್ಯವಿರುವುದಿಲ್ಲ."
        ),
        "prevention_en": "Balanced fertilizer application and resistant cultivars.",
        "prevention_kn": "ಸಮತೋಲಿತ ರಸಗೊಬ್ಬರ ಮತ್ತು ನಿರೋಧಕ ತಳಿಗಳ ಬಳಕೆ.",
        "active_ingredient": "Mancozeb 75% WP",
        "formulation": "75% WP",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Narrow Brown Leaf Spot, Brown Spot",
        "label_rate": "2.0 g per Litre of water (only if more than 20% foliage is affected before heading)",
        "application_method": "Foliar spray.",
        "safety_precautions": "Standard PPE required. Avoid spraying on hot sunny afternoons.",
        "pre_harvest_interval_days": 21,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Bacterial Panicle Blight": {
        "disease_id": 13,
        "disease_name_en": "Bacterial Panicle Blight",
        "disease_name_kn": "ತೆನೆ ದುಂಡಾಣು ಕವಚ ರೋಗ",
        "pathogen_type": "Bacterial (Burkholderia glumae)",
        "symptoms_en": "Brownish discoloration of florets and panicles during flowering; grains fail to fill, resulting in upright empty panicles.",
        "symptoms_kn": "ಹೂವಾಡುವ ಹಂತದಲ್ಲಿ ತೆನೆಯ ಕಾಳುಗಳು ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿ ಜಳ್ಳಾಗುತ್ತವೆ; ತೆನೆ ನೆಟ್ಟಗೆ ನಿಂತಿರುತ್ತದೆ.",
        "has_chemical_option": False,
        "nonchemical_management_en": (
            "1. No synthetic chemical is registered by CIBRC specifically for Burkholderia glumae panicle blight.\n"
            "2. Do NOT apply fungicides, as this is a bacterial infection and fungicides have zero effect.\n"
            "3. Do not apply late nitrogen fertilizer.\n"
            "4. Obtain disease-free certified seed from government extension stations."
        ),
        "nonchemical_management_kn": (
            "1. ಈ ರೋಗಕ್ಕೆ ಯಾವುದೇ ರಾಸಾಯನಿಕ ಶಿಲೀಂಧ್ರನಾಶಕವನ್ನು ಬಳಸಬೇಡಿ (ಇದು ಬ್ಯಾಕ್ಟೀರಿಯಾ ರೋಗ).\n"
            "2. ಹೂಬಿಡುವಾಗ ಅತಿಯಾದ ಯೂರಿಯಾ ಹಾಕಬೇಡಿ.\n"
            "3. ಮುಂದಿನ ಬೆಳೆಗೆ ಶುದ್ಧ ಪ್ರಮಾಣೀಕೃತ ಬೀಜವನ್ನು ಬಳಸಿ."
        ),
        "prevention_en": "Seed sanitation and adjusting planting dates away from excessive heat/humidity at flowering.",
        "prevention_kn": "ಬೀಜೋಪಚಾರ ಮತ್ತು ಸರಿಯಾದ ಸಮಯದಲ್ಲಿ ಬಿತ್ತನೆ.",
        "active_ingredient": "None registered specifically for this pathogen in India",
        "formulation": "N/A",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Consult Agricultural Officer",
        "label_rate": "Please consult your local agricultural officer for a verified treatment recommendation.",
        "application_method": "N/A",
        "safety_precautions": "Do not spray unauthorized or unregistered chemicals.",
        "pre_harvest_interval_days": 0,
        "re_entry_interval_hours": 0,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "advisory_only"
    },

    "Leaf Smut": {
        "disease_id": 14,
        "disease_name_en": "Leaf Smut",
        "disease_name_kn": "ಎಲೆ ಕಾಡಿಗೆ ರೋಗ",
        "pathogen_type": "Fungal (Entyloma oryzae)",
        "symptoms_en": "Small, angular, lead-black to dark brown slightly raised spots (0.5 to 2 mm) scattered across mature leaves.",
        "symptoms_kn": "ಎಲೆಗಳ ಮೇಲೆ ಸಣ್ಣ, ಕಪ್ಪು ಬಣ್ಣದ ಉಬ್ಬಿದ ಮಚ್ಚೆಗಳು. ಎಲೆಯ ಎರಡೂ ಬದಿಗಳಲ್ಲಿ ಕಂಡುಬರುತ್ತವೆ.",
        "has_chemical_option": False,
        "nonchemical_management_en": (
            "1. Leaf smut occurs late in the season and rarely causes economic yield loss in commercial rice fields.\n"
            "2. Chemical pesticide application is generally NOT recommended or economically justified.\n"
            "3. Plow crop residues deeply after harvest to bury fungal spores."
        ),
        "nonchemical_management_kn": (
            "1. ಇದು ಕೊಯ್ಲಿನ ಕೊನೆಯ ಹಂತದಲ್ಲಿ ಬರುವುದರಿಂದ ಬೆಳೆಗೆ ಹೆಚ್ಚಿನ ನಷ್ಟ ಮಾಡುವುದಿಲ್ಲ.\n"
            "2. ಇದಕ್ಕೆ ಯಾವುದೇ ಕೀಟನಾಶಕ ಅಥವಾ ಔಷಧಿಯ ಅಗತ್ಯವಿಲ್ಲ.\n"
            "3. ಕೊಯ್ಲಿನ ನಂತರ ಗದ್ದೆಯನ್ನು ಆಳವಾಗಿ ಉಳುಮೆ ಮಾಡಿ."
        ),
        "prevention_en": "Avoid excessive late-season nitrogen top-dressing. Maintain normal planting density.",
        "prevention_kn": "ಕೊನೆಯ ಹಂತದಲ್ಲಿ ಅತಿಯಾದ ಯೂರಿಯಾ ಹಾಕಬೇಡಿ.",
        "active_ingredient": "None required (Economically insignificant in general production)",
        "formulation": "N/A",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "None",
        "label_rate": "Chemical spray not economically warranted. Please consult local RSK officer if severe.",
        "application_method": "N/A",
        "safety_precautions": "Avoid unnecessary chemical exposure.",
        "pre_harvest_interval_days": 0,
        "re_entry_interval_hours": 0,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "advisory_only"
    },

    "Rice Grassy Stunt": {
        "disease_id": 15,
        "disease_name_en": "Rice Grassy Stunt",
        "disease_name_kn": "ಹುಲ್ಲು ಕುಬ್ಜ ನಂಜು ರೋಗ",
        "pathogen_type": "Viral (Rice Grassy Stunt Virus transmitted by Brown Planthopper)",
        "symptoms_en": "Severe plant stunting, excessive erect narrow tillers giving a grassy clump appearance, leaves pale green or mottled.",
        "symptoms_kn": "ಗಿಡಗಳು ಹುಲ್ಲಿನ ಕುರ್ಚಿಯಂತೆ ಚಿಕ್ಕದಾಗುತ್ತವೆ. ಅತಿಯಾದ ಸಣ್ಣ ಸಣ್ಣ ಕವಲುಗಳು, ತೆನೆಗಳು ಬರುವುದಿಲ್ಲ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Rogue out and bury severely stunted virus-infected plants.\n"
            "2. Practice Alternate Wetting and Drying (AWD) irrigation to break planthopper reproduction.\n"
            "3. Leave 30 cm alleyways every 2–3 meters in field to increase aeration and sunlight."
        ),
        "nonchemical_management_kn": (
            "1. ರೋಗಪೀಡಿತ ಕುಬ್ಜ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ನಾಶಪಡಿಸಿ.\n"
            "2. ಗದ್ದೆಯಲ್ಲಿ ನೀರು ನಿರಂತರವಾಗಿ ನಿಲ್ಲಿಸದೆ ಆಗಾಗ ಆರಿಸಿ ನೀರು ಹರಿಸಿ.\n"
            "3. ಗದ್ದೆಯಲ್ಲಿ ಪ್ರತಿ 2-3 ಮೀಟರ್‌ಗೆ ಗಾಳಿ ಆಡಲು ಹಾದಿ ಬಿಡಿ."
        ),
        "prevention_en": "Grow BPH-resistant varieties. Conserve mirid bugs and spiders that eat planthoppers.",
        "prevention_kn": "ಕಂದು ಜಿಗಿಹುಳು ನಿರೋಧಕ ತಳಿಗಳನ್ನು ಬೆಳೆಯಿರಿ. ಉಪಕಾರಿ ಕೀಟಗಳನ್ನು ರಕ್ಷಿಸಿ.",
        "active_ingredient": "Pymetrozine 50% WG (Vector Control - Kills Brown Planthopper)",
        "formulation": "50% WG (Water Dispersible Granules)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Brown Planthopper (Nilaparvata lugens) - Vector of Grassy Stunt",
        "label_rate": "0.6 g per Litre of water (120 g in 200 Litres water per acre)",
        "application_method": "Directed spray to the base of tillers near water level where planthoppers congregate.",
        "safety_precautions": "Specialized planthopper insecticide. Low toxicity to predatory spiders. Wear PPE.",
        "pre_harvest_interval_days": 19,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Rice Ragged Stunt": {
        "disease_id": 16,
        "disease_name_en": "Rice Ragged Stunt",
        "disease_name_kn": "ಸುರುಟು ಕುಬ್ಜ ನಂಜು ರೋಗ",
        "pathogen_type": "Viral (Rice Ragged Stunt Virus transmitted by Brown Planthopper)",
        "symptoms_en": "Stunted plants, twisted and ragged leaf margins with serrated appearance, presence of small vein swellings (galls) on leaf undersides.",
        "symptoms_kn": "ಎಲೆಯ ಅಂಚುಗಳು ಹರಿದು ಗರಗಸದಂತೆ ಕಾಣುತ್ತವೆ. ಎಲೆಗಳು ಸುರುಟಿಕೊಳ್ಳುತ್ತವೆ ಮತ್ತು ನರಗಳ ಮೇಲೆ ಸಣ್ಣ ಗಂಟುಗಳು ಉಂಟಾಗುತ್ತವೆ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Destroy infected volunteer rice plants and weeds.\n"
            "2. Vector management (Brown Planthopper) is the only control method for virus spread.\n"
            "3. Alternate wetting and drying (AWD) water management."
        ),
        "nonchemical_management_kn": (
            "1. ರೋಗಪೀಡಿತ ಗಿಡಗಳನ್ನು ಕಿತ್ತು ನಾಶಪಡಿಸಿ.\n"
            "2. ಕಂದು ಜಿಗಿಹುಳುಗಳ ನಿಯಂತ್ರಣಕ್ಕೆ ಆದ್ಯತೆ ನೀಡಿ."
        ),
        "prevention_en": "Plant resistant cultivars. Avoid excessive urea.",
        "prevention_kn": "ನಿರೋಧಕ ತಳಿಗಳ ಬಳಕೆ ಮತ್ತು ಸಮತೋಲಿತ ಗೊಬ್ಬರ.",
        "active_ingredient": "Triflumezopyrim 10% SC (Vector Control)",
        "formulation": "10% SC (Suspension Concentrate)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Brown Planthopper, Whitebacked Planthopper",
        "label_rate": "0.48 mL per Litre of water (94 mL in 200 Litres of water per acre)",
        "application_method": "Foliar spray directed to base of plant canopy.",
        "safety_precautions": "Follow label instructions strictly. Wear protective mask and gloves.",
        "pre_harvest_interval_days": 21,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Dirty Panicle": {
        "disease_id": 17,
        "disease_name_en": "Dirty Panicle",
        "disease_name_kn": "ಕಲ್ಮಶ ತೆನೆ ರೋಗ",
        "pathogen_type": "Fungal Complex (Curvularia, Fusarium, Bipolaris, Sarocladium)",
        "symptoms_en": "Dark brown, black, or reddish spots on glumes; discolored kernel, high chaffiness and broken grains during milling.",
        "symptoms_kn": "ತೆನೆಯ ಭತ್ತದ ಕಾಳುಗಳ ಮೇಲೆ ಕಂದು, ಕಪ್ಪು ಅಥವಾ ಬೂದು ಬಣ್ಣದ ಮಚ್ಚೆಗಳು. ಕಾಳುಗಳು ಜಳ್ಳಾಗುತ್ತವೆ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Avoid late nitrogen top-dressing at booting/panicle emergence.\n"
            "2. Keep fields properly drained during maturity; do not allow late stagnant water.\n"
            "3. Harvest on time when 80-85% grains turn straw-golden."
        ),
        "nonchemical_management_kn": (
            "1. ತೆನೆ ಬರುವಾಗ ಸಾರಜನಕ ಅತಿಯಾಗಿ ಹಾಕಬೇಡಿ.\n"
            "2. ಕಾಳು ಕಟ್ಟುವ ಸಮಯದಲ್ಲಿ ನೀರು ಕೊರತೆಯಾಗದಂತೆ ನೋಡಿಕೊಳ್ಳಿ.\n"
            "3. ಸರಿಯಾದ ಸಮಯಕ್ಕೆ (ಶೇ. 80-85 ಕಾಳುಗಳು ಬಂಗಾರದ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿದಾಗ) ಕೊಯ್ಲು ಮಾಡಿ."
        ),
        "prevention_en": "Seed treatment and clean threshing yards.",
        "prevention_kn": "ಬೀಜೋಪಚಾರ ಮತ್ತು ಕಣವನ್ನು ಸ್ವಚ್ಛವಾಗಿಡುವುದು.",
        "active_ingredient": "Tebuconazole 50% + Trifloxystrobin 25% WG",
        "formulation": "75% WG (Water Dispersible Granules)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Grain Discoloration (Dirty Panicle), Sheath Blight, Blast",
        "label_rate": "0.4 g per Litre of water (80 g in 200 Litres of water per acre)",
        "application_method": "Foliar spray at 50% flowering/panicle emergence.",
        "safety_precautions": "Combination fungicide. Wear full protective gear. Do not spray within 3 weeks of expected harvest.",
        "pre_harvest_interval_days": 21,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Kernel Smut": {
        "disease_id": 18,
        "disease_name_en": "Kernel Smut",
        "disease_name_kn": "ಕಾಳು ಕಾಡಿಗೆ ರೋಗ",
        "pathogen_type": "Fungal (Tilletia horrida / Neovossia horrida)",
        "symptoms_en": "Individual grains burst open at maturity releasing black powdery sooty spores, soiling the entire panicle during threshing.",
        "symptoms_kn": "ಭತ್ತದ ಕಾಳುಗಳು ಒಡೆದು ಒಳಭಾಗದಿಂದ ಕಪ್ಪು ಮಸಿಯಂತಹ ಪುಡಿ ಹೊರಬರುತ್ತದೆ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Do NOT use seeds from infected fields for future crops.\n"
            "2. Rogue out and destroy affected panicles before spores contaminate soil.\n"
            "3. Avoid excessive nitrogen fertilizer."
        ),
        "nonchemical_management_kn": (
            "1. ಈ ಗದ್ದೆಯ ಬೀಜವನ್ನು ಬಿತ್ತನೆಗೆ ಬಳಸಬೇಡಿ.\n"
            "2. ರೋಗಪೀಡಿತ ತೆನೆಗಳನ್ನು ಕಿತ್ತು ಸುಟ್ಟುಹಾಕಿ.\n"
            "3. ಹೆಚ್ಚು ಸಾರಜನಕ ಗೊಬ್ಬರ ಹಾಕಬೇಡಿ."
        ),
        "prevention_en": "Crop rotation and certified seed dressing.",
        "prevention_kn": "ಬೆಳೆ ಪರಿವರ್ತನೆ ಮತ್ತು ಪ್ರಮಾಣೀಕೃತ ಬೀಜೋಪಚಾರ.",
        "active_ingredient": "Propiconazole 25% EC",
        "formulation": "25% EC",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Kernel Smut, False Smut",
        "label_rate": "1.0 mL per Litre of water (200 mL in 200 Litres water per acre)",
        "application_method": "Foliar spray at boot stage prior to heading.",
        "safety_precautions": "Wear PPE. Do not contaminate ponds or water sources.",
        "pre_harvest_interval_days": 30,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    },

    "Udbatta Disease": {
        "disease_id": 19,
        "disease_name_en": "Udbatta Disease",
        "disease_name_kn": "ಉದ್ಬತ್ತಿ ರೋಗ / ಅಗರ್‌ಬತ್ತಿ ರೋಗ",
        "pathogen_type": "Fungal (Ephelis oryzae / Balansia oryzae-sativae)",
        "symptoms_en": "Entire panicle glued into an erect, cylindrical, hard, ash-white or grayish-black rod resembling an incense stick; 100% loss of grain on affected tillers.",
        "symptoms_kn": "ತೆನೆಗಳು ಅರಳದೆ, ಅಗರ್‌ಬತ್ತಿಯ ಕಡ್ಡಿಯಂತೆ ನೇರವಾಗಿ, ಬಿಳಿ-ಬೂದು ಬಣ್ಣದ ಸಿಲಿಂಡರ್ ಆಕಾರದಲ್ಲಿ ಹೊರಬರುತ್ತವೆ. ಒಂದೂ ಕಾಳು ಕಟ್ಟುವುದಿಲ್ಲ.",
        "has_chemical_option": True,
        "nonchemical_management_en": (
            "1. Immediately cut and burn all 'incense stick' panicles in plastic bags.\n"
            "2. NEVER harvest seeds from udbatta-infected fields (the fungus is internally seed-borne).\n"
            "3. Hot water seed treatment: Soak seeds in water at 52–54°C for 10 minutes."
        ),
        "nonchemical_management_kn": (
            "1. ಉದ್ಬತ್ತಿ ಕಡ್ಡಿಯಂತಿರುವ ತೆನೆಗಳನ್ನು ತಕ್ಷಣ ಕಿತ್ತು ಚೀಲದಲ್ಲಿ ಹಾಕಿ ಸುಟ್ಟುಹಾಕಿ.\n"
            "2. ಈ ಗದ್ದೆಯ ಭತ್ತವನ್ನು ಮುಂದಿನ ಬಿತ್ತನೆ ಬೀಜವಾಗಿ ಬಳಸಬೇಡಿ.\n"
            "3. ಬಿಸಿ ನೀರಿನ ಬೀಜೋಪಚಾರ (52-54 ಡಿಗ್ರಿ ಸೆಲ್ಸಿಯಸ್‌ನಲ್ಲಿ 10 ನಿಮಿಷ) ಮಾಡಿ."
        ),
        "prevention_en": "Hot water seed soak followed by chemical seed dressing with Carbendazim.",
        "prevention_kn": "ಬಿಸಿ ನೀರಿನ ಬೀಜೋಪಚಾರ ಮತ್ತು ಕಾರ್ಬೆಂಡಾಜಿಮ್ ಬೀಜೋಪಚಾರ.",
        "active_ingredient": "Carbendazim 50% WP (Seed Treatment)",
        "formulation": "50% WP (Wettable Powder)",
        "registered_crop": "Paddy / Rice (Oryza sativa)",
        "approved_target_disease": "Udbatta Disease (Seed-borne), Blast",
        "label_rate": "2.0 g per kg seed (wet seed soak for 24 hours prior to nursery incubation)",
        "application_method": "Pre-sowing seed soak. Note: Foliar sprays after udbatta symptoms emerge are INEFFECTIVE because infection occurs through seed embryo.",
        "safety_precautions": "Foliar chemical sprays cannot cure emerged udbatta panicles. Focus strictly on clean certified seed stock and seed treatment.",
        "pre_harvest_interval_days": 21,
        "re_entry_interval_hours": 24,
        "source_url": AUTHORITY_SOURCE,
        "verification_date": VERIFICATION_CYCLE,
        "advisory_status": "verified"
    }
}


def get_advisory_for_disease(disease_name: str) -> Optional[Dict[str, Any]]:
    """Retrieve structured disease and pesticide advisory."""
    return PESTICIDE_ADVISORY_DATABASE.get(disease_name)


def get_all_advisories() -> List[Dict[str, Any]]:
    """Retrieve all structured advisories."""
    return list(PESTICIDE_ADVISORY_DATABASE.values())
