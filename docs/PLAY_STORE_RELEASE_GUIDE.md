# RiceCare AI — Google Play Store Release & Publication Guide
**ಅಪ್ಲಿಕೇಶನ್ ಹೆಸರು:** RiceCare AI — ಭತ್ತದ ರೋಗ ಪತ್ತೆ  
**Package ID:** `com.ricecare.ai`  
**Version:** `2.0.0` (Version Code `2`)

---

## 1. Release Artifacts Generated

RiceCare AI build pipeline produces two release distribution packages:

| Package | Filename | Target Destination |
| :--- | :--- | :--- |
| **Android App Bundle (AAB)** | `RiceCare-AI-v2.0.0.aab` | **Google Play Console** (Production / Internal Testing) |
| **Direct APK** | `RiceCare-AI-v2.0.0.apk` | **Direct Farmer Sideloading** / WhatsApp / Website Download |

---

## 2. Google Play Console Setup Steps

### Step 1: Create Application Listing
1. Log in to [Google Play Console](https://play.google.com/console).
2. Click **Create app**:
   - **App name:** `RiceCare AI — ಭತ್ತದ ರೋಗ ಪತ್ತೆ`
   - **Default language:** `kn-IN` (Kannada) or `en-IN` (English)
   - **App or game:** `App`
   - **Free or paid:** `Free`

### Step 2: Store Listing Metadata

#### Kannada (Default / Primary)
- **ಸಣ್ಣ ವಿವರಣೆ (Short Description, 80 chars):**
  `ಭತ್ತದ ಬೆಳೆಯ ರೋಗಗಳನ್ನು AI ಮೂಲಕ ಪತ್ತೆ ಮಾಡಿ ಮತ್ತು ತಜ್ಞರ ಕೀಟನಾಶಕ ಸಲಹೆ ಪಡೆಯಿರಿ.`
- **ಸಂಪೂರ್ಣ ವಿವರಣೆ (Full Description, up to 4000 chars):**
  ```
  ರೈಸ್‌ಕೇರ್ ಎಐ (RiceCare AI) — ಕರ್ನಾಟಕದ ರೈತ ಬಾಂಧವರಿಗಾಗಿ ರೂಪಿಸಲಾದ ಭತ್ತದ ರೋಗ ಪತ್ತೆಹಚ್ಚುವ ಅತ್ಯಾಧುನಿಕ ಮೊಬೈಲ್ ಅಪ್ಲಿಕೇಶನ್.

  ಪ್ರಮುಖ ಸೌಲಭ್ಯಗಳು:
  • ಎಲೆಯ ಫೋಟೋ ತೆಗೆದು ತಕ್ಷಣವೇ ರೋಗದ ಲಕ್ಷಣ ಪತ್ತೆಹಚ್ಚಿ.
  • 20 ಬಗೆಯ ಭತ್ತದ ರೋಗಗಳನ್ನು ಗುರುತಿಸುವ ಶಕ್ತಿಶಾಲಿ AI ಮಾದರಿ.
  • ಅಧಿಕೃತ CIBRC ಮತ್ತು ಕೃಷಿ ವಿವಿ ಶಿಫಾರಸು ಮಾಡಿದ ಕೀಟನಾಶಕಗಳು ಹಾಗೂ ಪ್ರಮಾಣ (ಡೋಸ್).
  • ಮೊದಲ ಆದ್ಯತೆ: ಮಣ್ಣಿನ ನಿರ್ವಹಣೆ, ಪೊಟ್ಯಾಷ್ ಬಳಕೆ ಮತ್ತು ನೈಸರ್ಗಿಕ ಹತೋಟಿ ವಿಧಾನಗಳು.
  • ಆಫ್‌ಲೈನ್ ಸೌಲಭ್ಯ: ಇಂಟರ್ನೆಟ್ ಇಲ್ಲದಿದ್ದರೂ ರೋಗಗಳ ಮಾಹಿತಿ ಮತ್ತು ಹಿಂದಿನ ತಪಾಸಣೆಗಳು ಲಭ್ಯ.
  • ಕನ್ನಡ ಧ್ವನಿ ಸೌಲಭ್ಯ (Voice TTS): ರೈತರು ಸಲಹೆಗಳನ್ನು ಧ್ವನಿ ಮೂಲಕ ಆಲಿಸಬಹುದು.
  • ಉಚಿತ ಮತ್ತು ಸರಳ ಬಳಕೆ: ಯಾವುದೇ ಕ್ಲಿಷ್ಟ ನೋಂದಣಿ ಅಗತ್ಯವಿಲ್ಲ.

  ಗಮನಿಸಿ: ಈ ಅಪ್ಲಿಕೇಶನ್ ಕೃಷಿ ಸಲಹಾ ಉದ್ದೇಶಕ್ಕಾಗಿದ್ದು, ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗೆ ನಿಮ್ಮ ಹೋಬಳಿಯ ರೈತ ಸಂಪರ್ಕ ಕೇಂದ್ರ (RSK) ಅಥವಾ ಕೃಷಿ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.
  ```

#### English
- **Short Description (80 chars):**
  `Diagnose rice leaf diseases using AI with CIBRC verified pesticide guidance.`
- **Full Description:**
  ```
  RiceCare AI is a farmer-friendly agricultural diagnostic tool designed to detect diseases affecting paddy crops.

  Key Features:
  • Snap a photo or select an affected leaf from gallery for instant diagnosis.
  • Powered by Quantum-Classical CNN AI trained on 20 rice conditions.
  • Safe, CIBRC-registered disease-specific pesticide formulations with label rates, PHI, and REI.
  • Priority cultural, biological, and non-chemical management recommendations.
  • Audio speech read-aloud in Kannada, English, and Hindi.
  • Offline guide access for field inspections without network coverage.
  ```

---

## 3. Play Store Keystore Signing (Production)

For automated or local Google Play release signing:

```bash
# Generate release keystore (keep this file secure!)
keytool -genkey -v -keystore ricecare-release-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias ricecare

# Sign the AAB bundle
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore ricecare-release-key.jks release-output/RiceCare-AI-v2.0.0.aab ricecare
```

---

## 4. Zero-Reinstall Content Updates (Remote Config)

When you make changes in Antigravity to:
- Kannada/English text
- Seasonal announcements
- Disease guidance
- CIBRC pesticide dosages

**You do NOT need to submit a new AAB to Google Play!**  
Simply run:
```bash
python scripts/publish_content.py --msg-kn "ನಿಮ್ಮ ಸಂದೇಶ" --msg-en "Your message" --server https://your-production-url.com
```
All installed apps receive the updated content automatically on their next internet sync.
