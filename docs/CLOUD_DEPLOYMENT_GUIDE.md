# RiceCare AI — Permanent Cloud Deployment Guide
**ಭತ್ತದ ರೋಗ ಪತ್ತೆ — ಶಾಶ್ವತ ಕ್ಲೌಡ್ ನಿಯೋಜನಾ ಮಾರ್ಗದರ್ಶಿ**

---

## 1. Why Your Website Stopped When Antigravity Closed

During development, your application ran locally on your computer via **Uvicorn on port 8000**, exposed to the internet through a temporary **Cloudflare Quick Tunnel** (`trycloudflare.com`).

- **Quick tunnels run entirely inside your computer's RAM and process table.**
- When you closed Antigravity, exited VS Code, or turned off your computer, the local server process terminated and the tunnel was instantly destroyed.
- **The Solution:** We must host the application on **independent, permanent cloud servers** (like Render, Hugging Face Spaces, Firebase Hosting, or Railway) that run in secure data centers 24/7/365, completely independent of your laptop or phone.

---

## 2. Recommended Hosting Architectures

We have pre-configured two deployment architectures for your project:

### Architecture 1: Unified Cloud Container (Render or Hugging Face Spaces) — *Recommended*
Both your React Vite frontend and PyTorch FastAPI backend run together in a single production Docker container.
- **Advantage:** Single domain, zero CORS complications, zero maintenance, permanent 24/7 availability.
- **Cost:** Free.

### Architecture 2: Decoupled (Firebase Hosting for Frontend + Cloud Backend)
- **Frontend:** Hosted on Google Firebase Hosting global CDN (`https://ricecare-ai.web.app`).
- **Backend:** Hosted on Render / Hugging Face Spaces (`https://ricecare-ai.onrender.com`).
- **Advantage:** Lightning-fast static asset delivery across the globe.
- **Cost:** Free.

---

## 3. Step-by-Step Deployment Instructions

### Option A: Render.com (Unified Full-Stack Deployment) — Takes 3 Minutes

Render hosts your entire project (React SPA + PyTorch AI Model + SQLite / MongoDB) 24/7 for free.

1. Create a free account at **[render.com](https://render.com/)**.
2. Click **New +** $\to$ **Web Service**.
3. Select **Build and deploy from a Git repository**.
4. Connect your GitHub repository:
   `https://github.com/cherrycharan28352-debug/rice-leaf-disease-detection`
5. Render will automatically detect the **`render.yaml`** and **`Dockerfile`** already committed to your repository!
6. Configure:
   - **Name:** `ricecare-ai`
   - **Region:** Singapore / Oregon / Frankfurt (Choose the closest to India, e.g. Singapore)
   - **Instance Type:** Free (512 MB – 1 GB RAM) or Starter
   - **Environment Variables:**
     - `PORT`: `8000`
     - `ENVIRONMENT`: `production`
     - `SECRET_KEY`: `(click generate)`
     - `ADMIN_API_KEY`: `ricecare_admin_secure_key_2026`
     - *(Optional)* `MONGODB_URI`: Your MongoDB Atlas connection string (e.g. `mongodb+srv://...`)
7. Click **Create Web Service**.
8. **Done!** Render gives you a permanent HTTPS URL:
   `https://ricecare-ai.onrender.com`
   This URL will remain accessible to everyone on any phone, tablet, or PC worldwide, even when your laptop is completely turned off!

---

### Option B: Hugging Face Spaces (100% Free 16 GB RAM Container) — Best for AI

Hugging Face Spaces provides **2 vCPUs, 16 GB RAM, and 50 GB storage** with permanent 24/7 uptime without sleep!

1. Create a free account at **[huggingface.co](https://huggingface.co/)**.
2. Go to **Spaces** $\to$ **Create new Space**:
   - **Space name:** `ricecare-ai`
   - **License:** `apache-2.0` or `mit`
   - **SDK:** Select **Docker** (Blank)
   - **Space Hardware:** Free (2 vCPU, 16 GB RAM)
   - **Visibility:** Public
3. Click **Create Space**.
4. In your Space's Settings, connect it to your GitHub repository:
   `https://github.com/cherrycharan28352-debug/rice-leaf-disease-detection`
   *(Or push your repo to the Hugging Face Git remote).*
5. The `README.md` and `Dockerfile` are already configured for Hugging Face Spaces!
6. **Done!** You get a permanent free URL:
   `https://<your-username>-ricecare-ai.hf.space`

---

### Option C: Firebase Hosting (For Frontend)

If you prefer Google Firebase Hosting for the frontend:

1. Install Firebase CLI (if not already installed):
   ```powershell
   npm install -g firebase-tools
   ```
2. Log in to your Google / Firebase account:
   ```powershell
   firebase login
   ```
3. Initialize hosting (already pre-configured with `firebase.json` and `.firebaserc`):
   ```powershell
   firebase use --add
   ```
   Select your Firebase Project ID (e.g. `ricecare-ai`).
4. Build the production frontend and deploy:
   ```powershell
   cd frontend-react
   npm run build
   cd ..
   firebase deploy --only hosting
   ```
5. **Done!** Your frontend is live at `https://ricecare-ai.web.app` or `https://ricecare-ai.firebaseapp.com`!

---

## 4. Database & MongoDB Atlas Integration

RiceCare AI automatically handles data persistence:
- **Default:** SQLite (`agriversion.db`) stores user accounts, predictions, CIBRC pesticide advisories, and remote configs.
- **Persistent Disk on Render:** On Render, you can attach a persistent disk mounted at `/app/uploads` and `/app` to ensure uploaded photos and SQLite records survive container restarts.
- **MongoDB Atlas:** If you have a MongoDB Atlas cluster, simply add the environment variable in your cloud provider's dashboard:
  ```env
  MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/ricecare_ai?retryWrites=true&w=majority
  ```
  The backend will automatically connect to MongoDB Atlas, create collections, and sync all existing SQLite records so zero history is lost!

---

## 5. Automatic CI/CD When You Update the Project

Whenever you make improvements in Antigravity:
1. Run pre-flight checks:
   ```powershell
   .venv\Scripts\python.exe scripts/deploy_check.py
   ```
2. Push your changes:
   ```powershell
   git add -A
   git commit -m "feat: your new feature"
   git push origin main
   ```
3. **What happens automatically:**
   - **Render / Hugging Face:** Automatically rebuilds and redeploys the live cloud web service.
   - **GitHub Actions:** Runs unit tests, builds the production Android APK & AAB bundle, and attaches them to GitHub Releases.
   - **Firebase Hosting:** If GitHub Secret `FIREBASE_SERVICE_ACCOUNT_RICECARE_AI` is set, GitHub Actions deploys the frontend automatically.
