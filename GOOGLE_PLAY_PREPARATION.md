# 📱 Google Play Store Submission Package & Release Guide

**Application Title:** `RiceCare AI: Rice Leaf Disease`  
**Package Name:** `com.ricecare.ai`  
**Category:** Agriculture & Plant Pathology / Tools  
**Content Rating:** Everyone (PEGI 3 / ESRB Everyone)  
**Target Android Version:** Android 16 (API Level 36) — *Complies with latest Google Play Target API 35+ requirements*

---

## 1. Store Listing Metadata

### A. App Name (Max 30 characters)
`RiceCare AI: Rice Leaf Disease`

### B. Short Description (Max 80 characters)
`Identify 20 rice leaf diseases instantly with AI, severity scores & care steps.`

### C. Full Description (Max 4000 characters)
```
Protect your paddy fields and rice harvest with RiceCare AI — an intelligent, scientifically validated botanical pathology companion engineered for farmers, agronomists, extension officers, and agricultural students.

Powered by a hybrid deep residual neural network and quantum-classical feature classifier trained on verified foliar pathologies, RiceCare AI identifies 20 major rice diseases and crop conditions from a single leaf photograph.

🌾 KEY FEATURES:

1. INSTANT FIELD DIAGNOSIS:
• Snap a photograph directly in the paddy field using your phone's rear camera or upload from your gallery.
• Fast, on-demand AI inference powered by deep neural networks.

2. 20 VERIFIED RICE DISEASES & CONDITIONS:
• Rice Blast (Magnaporthe oryzae)
• Bacterial Leaf Blight (Xanthomonas oryzae)
• Brown Spot (Bipolaris oryzae)
• Sheath Blight (Rhizoctonia solani)
• False Smut (Ustilaginoidea virens)
• Tungro Virus Complex
• Bacterial Leaf Streak
• Sheath Rot
• Narrow Brown Leaf Spot
• Rice Hispa Foliar Damage
• Bacterial Panicle Blight
• Bakanae (Fusarium fujikuroi)
• Stem Borer Damage
• Rice Grassy Stunt Virus
• Rice Ragged Stunt Virus
• Dirty Panicle Complex
• Kernel Smut
• Udbatta Disease
• Leaf Smut
• Healthy Rice Leaf

3. LESION SEVERITY & AREA SEGMENTATION:
• Automated contour segmentation calculating healthy vs. affected leaf tissue area.
• Lesion spot count and severity classification (Mild, Moderate, Severe).

4. EVIDENCE-BASED BOTANICAL CARE:
• Detailed foliar symptoms and pathogen taxonomy.
• Favorable environmental and climatic conditions encouraging disease spread.
• Preventive cultural agronomic practices.
• Step-by-step crop management and treatment steps.

5. FIELD AUDIT TRAIL & HISTORY:
• Review previous scans with date, severity, and confidence score.
• Manage and delete records anytime.

6. PRIVACY FIRST:
• Use instantly as a guest without creating an account.
• End-to-end encrypted HTTPS data transmission.

⚠️ AGRICULTURAL ADVISORY NOTICE:
RiceCare AI is a computational advisory diagnostic system designed to support agricultural crop scouting. Always verify uncertain diagnoses with a local agricultural university extension officer or certified agronomist prior to applying commercial agrochemicals.
```

---

## 2. Graphic Asset Specifications

| Asset | Dimensions | Format | Notes |
| :--- | :--- | :--- | :--- |
| **App Icon** | 512 × 512 px | 32-bit PNG, max 1024 KB | Square icon; Google Play rounds corners automatically. |
| **Feature Graphic** | 1024 × 500 px | JPEG or 24-bit PNG, max 15MB | Prominent branding, no alpha transparency. |
| **Phone Screenshots** | Min 2 screenshots (Recommended: 4 to 8) | JPEG or 24-bit PNG (e.g. 1080 × 1920 or 1080 × 2400) | Capture: 1. Home Screen, 2. Camera Viewfinder, 3. Detection Result with Grad-CAM, 4. Disease Library. |

---

## 3. Data Safety Form Answers (Google Play Console)

| Question | Answer | Details |
| :--- | :--- | :--- |
| **Does your app collect or share user data?** | **Yes** | Images (Photos) and optional Account Details. |
| **Is all user data encrypted in transit?** | **Yes** | Transmitted over secure HTTPS/TLS. |
| **Do you provide a way for users to request data deletion?** | **Yes** | Users can delete history records directly in the app. |
| **Data Types Collected:** | | |
| • Photos and Videos | **Yes** | Collected for app functionality (disease diagnosis). Not shared with third parties. |
| • Name & Email (Optional) | **Yes** | Only if user chooses to create an account for persistent history. |

---

## 4. Release Build & Signing Instructions

### Step 1: Generate Release Keystore
Run in PowerShell / Terminal:
```bash
keytool -genkey -v -keystore ricecare-release.keystore -alias ricecare -keyalg RSA -keysize 2048 -validity 10000
```
*(Store `ricecare-release.keystore` safely and keep your password confidential).*

### Step 2: Configure Signing in `frontend-react/android/app/build.gradle`
Add under `android { ... }`:
```groovy
signingConfigs {
    release {
        storeFile file("path/to/ricecare-release.keystore")
        storePassword "YOUR_STORE_PASSWORD"
        keyAlias "ricecare"
        keyPassword "YOUR_KEY_PASSWORD"
    }
}
buildTypes {
    release {
        signingConfig signingConfigs.release
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

### Step 3: Build Android App Bundle (AAB for Google Play)
```bash
cd frontend-react/android
./gradlew bundleRelease
```
The generated `.aab` file will be at:
`frontend-react/android/app/build/outputs/bundle/release/app-release.aab`

### Step 4: Build Release APK (for Direct Sideloading)
```bash
./gradlew assembleRelease
```
The generated `.apk` file will be at:
`frontend-react/android/app/build/outputs/apk/release/app-release.apk`

---

## 5. Testing on a Real Physical Phone

1. Enable **Developer Options** and **USB Debugging** on your Android phone.
2. Connect your phone via USB or build the APK and transfer it via Google Drive / WhatsApp.
3. Open the APK on your phone and tap **Install**.
4. Launch **RiceCare AI**, tap **Detect Disease**, and select **Take Photo** to verify camera integration.
