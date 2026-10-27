# 🌾 RiceCare AI — Rice Leaf Disease Detection

An intelligent, full-stack, mobile-friendly agricultural pathology application engineered to assist farmers, agricultural extension workers, students, and researchers in diagnosing and managing rice foliar diseases using computer vision and deep learning.

---

## 🌟 Key Features

- **Trained Neural Model Integration**: Powered by your PyTorch **`HybridCNNPCAVQC`** checkpoint (`models/ricenet_weights.pth`) combining Deep Residual Convolution with Squeeze-and-Excitation (SE) channel attention and a 4-qubit Variational Quantum Circuit (VQC).
- **20 Verified Rice Conditions**: High-accuracy classification across 20 distinct disease and foliar health states.
- **Explainable Grad-CAM**: Visual attention heatmaps displaying exact foliar lesion regions analyzed by the network.
- **Lesion Severity Profiler**: Automatic contour segmentation computing infected area percentage and lesion cluster counts.
- **Evidence-Based Botanical Dossiers**: Scientific pathogen taxonomy, favorable weather conditions, preventive cultural practices, and step-by-step crop management.
- **Mobile Camera & Gallery Support**: Rear camera preference for smartphone field use, live reticle viewfinder, and instant file drag-and-drop.
- **Interactive Analytics Dashboard**: Real-time statistical charts tracking detected disease frequency and severity spreads.
- **Prediction History & Audit Trail**: Full inspection and deletion controls for past diagnoses.
- **User Authentication**: Secure scrypt password hashing, session JWT tokens, and guest mode for immediate field scanning.

---

## 🧠 Neural Architecture & Model Specification

| Component | Technical Implementation |
| :--- | :--- |
| **Framework** | **PyTorch** (`torch` 2.14.0+cpu, `torchvision`, `torch.nn`) |
| **Model Class** | `HybridCNNPCAVQC` in [`ml/quantum_vqc.py`](file:///C:/Users/DELL/.gemini/antigravity/scratch/rice-leaf-disease-detection/ml/quantum_vqc.py) |
| **Weights Checkpoint** | [`models/ricenet_weights.pth`](file:///C:/Users/DELL/.gemini/antigravity/scratch/rice-leaf-disease-detection/models/ricenet_weights.pth) (78.4 MB, 187 layers) |
| **Input Dimensions** | 224 × 224 RGB, normalized with ImageNet mean `[0.485, 0.456, 0.406]` & std `[0.229, 0.224, 0.225]` |
| **Feature Extraction** | CNN Stem + 3 Residual Stages (64 $\to$ 128 $\to$ 256 $\to$ 512 channels) + Squeeze-and-Excitation attention |
| **Quantum Layer** | Classical PCA compression to 4 angles $[-\pi, \pi]$ $\to$ 4-qubit Parameterized Rotation ($R_y, R_z$) $\to$ CNOT Entanglement $\to$ Pauli-Z Measurement |
| **Class Mapping** | 20 Classes in [`models/class_indices.json`](file:///C:/Users/DELL/.gemini/antigravity/scratch/rice-leaf-disease-detection/models/class_indices.json) |

### Supported Conditions:
1. Healthy Rice Leaf
2. Brown Spot (*Bipolaris oryzae*)
3. Leaf Smut (*Entyloma oryzae*)
4. Bacterial Leaf Blight (*Xanthomonas oryzae*)
5. Rice Blast (*Magnaporthe oryzae*)
6. Sheath Blight (*Rhizoctonia solani*)
7. False Smut (*Ustilaginoidea virens*)
8. Tungro Virus (*RTBV / RTSV*)
9. Bacterial Leaf Streak (*Xanthomonas translucens*)
10. Sheath Rot (*Sarocladium oryzae*)
11. Narrow Brown Leaf Spot (*Cercospora janseana*)
12. Rice Hispa (*Dicladispa armigera*)
13. Bacterial Panicle Blight (*Burkholderia glumae*)
14. Bakanae (*Fusarium fujikuroi*)
15. Stem Borer Damage (*Scirpophaga incertulas*)
16. Rice Grassy Stunt (*RGSV*)
17. Rice Ragged Stunt (*RRSV*)
18. Dirty Panicle (Grain Discoloration Complex)
19. Kernel Smut (*Tilletia barclayana*)
20. Udbatta Disease (*Ephelis oryzae*)

---

## 🛠️ Technology Stack

- **Backend**: Python 3.12/3.13, FastAPI, Uvicorn, PyTorch, TorchVision, OpenCV (`cv2`), Pillow, NumPy, SciPy, PyJWT, Werkzeug.
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons.
- **Database**: SQLite (`agriversion.db`) with SQLAlchemy models.

---

## 🚀 Step-by-Step Setup & Running Locally

### 1. Prerequisites
- Python 3.12 or 3.13 installed
- Node.js (v18+) and npm installed

### 2. Backend Setup
```bash
# Navigate to the project root directory
cd C:\Users\DELL\.gemini\antigravity\scratch\rice-leaf-disease-detection

# Create virtual environment (using uv or standard python venv)
python -m venv .venv

# Activate virtual environment
# Windows PowerShell:
.venv\Scripts\Activate.ps1
# Windows CMD:
.venv\Scripts\activate.bat

# Install backend dependencies
pip install -r requirements.txt
```

### 3. Launch the Application Server
The FastAPI backend serves both the REST API and the production React frontend:
```bash
# Start FastAPI with Uvicorn
python server.py
# Or directly via uvicorn:
uvicorn server:app --host 0.0.0.0 --port 8000
```
Open **[http://127.0.0.1:8000](http://127.0.0.1:8000)** in your browser!

---

### 4. Frontend Development (Optional)
If you wish to run the React development server with hot-module reloading:
```bash
cd frontend-react
npm install
npm run dev
```
The Vite development server will run at **http://localhost:3000** and proxy all `/api` and `/uploads` requests directly to FastAPI on port 8000.

To build a fresh production bundle:
```bash
cd frontend-react
npm run build
```
The built files are placed in `frontend-react/dist/` and automatically served by FastAPI at `http://127.0.0.1:8000/`.

---

## 👥 Demo Login Credentials

You can test user authentication using the built-in demo accounts (or use 1-Click Demo Fill in the UI):

| Account Role | Username / Email | Password |
| :--- | :--- | :--- |
| **System Administrator** | `admin@agriversion.com` | `Admin@123` |
| **Farmer Account** | `farmer@agriversion.com` | `Farmer@123` |

*Note: Authentication is optional for immediate disease diagnosis; guests can analyze leaves without signing in.*

---

## 🧪 Testing Real Predictions

### Method A: Using 1-Click Test Samples in the UI
1. Navigate to **Detect Disease** in the top navigation.
2. Select the **Test Samples (1-Click)** tab.
3. Click on any verified specimen (e.g. *Rice Blast*, *Brown Spot*, or *Healthy Rice Leaf*).
4. Click **Analyze Leaf Specimen** to execute inference.

### Method B: Automated Python Test
You can run automated inference on test specimens directly via the CLI:
```bash
python -c "
import sys; sys.path.insert(0, '.')
from ml.predict import predict_rice_disease
res = predict_rice_disease('frontend/assets/sample_leaves/04_rice_blast.jpg')
print('Predicted:', res['primary_disease'], 'Confidence:', res['confidence'])
"
```

### Method C: Quantum VQC Unit Tests
```bash
python -m unittest verification_tests.test_quantum_vqc
```

---

## 📡 API Reference & Health Check

### Health Check:
`GET /api/health`
```json
{
  "status": "healthy",
  "app": "RiceCare AI — Rice Leaf Disease Detection",
  "version": "2.0.0",
  "model_architecture": "HybridCNNPCAVQC (Quantum-Classical CNN + PCA + VQC)",
  "classes_supported": 20
}
```

### Disease Prediction:
`POST /api/predict`
- **Body**: `multipart/form-data` with `file: <image>`
- **Returns**: Structured prediction JSON with disease label, calibrated confidence, severity metrics, symptoms, and agronomic management.

### Disease Encyclopedia:
`GET /api/diseases` or `GET /api/diseases/{code_or_name}`

### Dashboard Statistics:
`GET /api/dashboard/stats`

### History Log:
`GET /api/history` and `DELETE /api/history/{id}`

---

## ☁️ Production Deployment Guide

### Deploying to Linux Server / VPS (Ubuntu / Debian / AWS EC2 / DigitalOcean)

1. Clone or copy the project to your server:
   ```bash
   git clone <your-repository-url> /opt/ricecare-ai
   cd /opt/ricecare-ai
   ```

2. Set up Python 3.12+ environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

3. Build the frontend:
   ```bash
   cd frontend-react
   npm install
   npm run build
   cd ..
   ```

4. Configure a systemd service (`/etc/systemd/system/ricecare.service`):
   ```ini
   [Unit]
   Description=RiceCare AI FastAPI Server
   After=network.target

   [Service]
   User=www-data
   WorkingDirectory=/opt/ricecare-ai
   ExecStart=/opt/ricecare-ai/venv/bin/uvicorn server:app --host 0.0.0.0 --port 8000 --workers 2
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```

5. Enable and start:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable --now ricecare
   ```

6. Configure Nginx reverse proxy with HTTPS (Let's Encrypt Certbot) forwarding to `http://127.0.0.1:8000`.

---

## 📜 Agricultural Advisory Disclaimer

*RiceCare AI is a computational advisory diagnostic system designed to assist agricultural scouting. Predictions and treatment guidance should be verified by local agricultural extension officers or certified agronomists prior to chemical interventions.*
