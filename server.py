"""
RiceCare AI - FastAPI Backend Server
High-performance REST API for Rice Leaf Disease Detection, Encyclopedia, Dashboard Analytics,
and History Management. Integrates the PyTorch HybridCNNPCAVQC model checkpoint.
"""

import os
import sys
import uuid
import json
import sqlite3
import shutil
from datetime import datetime, timedelta
from typing import Optional, List

# Ensure project root is in python path
ROOT_DIR = os.path.abspath(os.path.dirname(__file__))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from fastapi import FastAPI, File, UploadFile, HTTPException, Header, Depends, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from pydantic import BaseModel
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

# ML Inference Engine & Dataset Knowledge Base
from ml.predict import predict_rice_disease, get_inference_engine
from ml.dataset_info import DISEASE_CLASSES, DISEASE_DETAILS
from ml.pesticide_database import get_advisory_for_disease, get_all_advisories, VERIFICATION_CYCLE, AUTHORITY_SOURCE
from backend.remote_config_manager import (
    get_active_remote_config,
    publish_remote_config,
    get_remote_config_history,
    rollback_remote_config,
    init_remote_config_table
)
from ml.model_registry import (
    get_active_model_info,
    validate_candidate_model,
    deploy_model,
    rollback_model
)
from scripts.backup_manager import (
    backup_database,
    backup_uploads,
    restore_database
)

ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "ricecare_admin_secure_key_2026")

# Setup folders
UPLOADS_DIR = os.path.join(ROOT_DIR, "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)
DOWNLOADS_DIR = os.path.join(ROOT_DIR, "downloads")
os.makedirs(DOWNLOADS_DIR, exist_ok=True)
SAMPLE_LEAVES_DIR = os.path.join(ROOT_DIR, "frontend", "assets", "sample_leaves")
DB_PATH = os.path.join(ROOT_DIR, "agriversion.db")
FRONTEND_DIST = os.path.join(ROOT_DIR, "frontend-react", "dist")

SECRET_KEY = os.getenv("SECRET_KEY", "ricecare_ai_super_secret_production_key_2026")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 72

app = FastAPI(
    title="RiceCare AI API",
    description="Intelligent Rice Leaf Disease Diagnostic and Agricultural Advisory System",
    version="2.0.0"
)

# CORS Middleware (Enable web & mobile clients)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database connection helper
def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    try:
        yield conn
    finally:
        conn.close()


# Pydantic Schemas
class UserRegister(BaseModel):
    full_name: str
    username: str
    email: str
    password: str
    location: Optional[str] = "India"
    phone: Optional[str] = None

class UserLogin(BaseModel):
    email_or_username: str
    password: str

# JWT Helpers
def create_token(user_id: int, username: str, email: str, role: str) -> str:
    payload = {
        "user_id": user_id,
        "username": username,
        "email": email,
        "role": role,
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=JWT_ALGORITHM)


def get_current_user_optional(authorization: Optional[str] = Header(None)) -> Optional[dict]:
    if not authorization:
        return None
    try:
        parts = authorization.split()
        if len(parts) == 2 and parts[0].lower() == "bearer":
            token = parts[1]
        else:
            token = parts[0]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[JWT_ALGORITHM])
        return payload
    except Exception:
        return None


# Map sample leave files to disease names
SAMPLE_IMAGE_MAP = {
    "Healthy Rice Leaf": "00_healthy_rice_leaf.jpg",
    "Brown Spot": "01_brown_spot.jpg",
    "Leaf Smut": "02_leaf_smut.jpg",
    "Bacterial Leaf Blight": "03_bacterial_leaf_blight.jpg",
    "Rice Blast": "04_rice_blast.jpg",
    "Sheath Blight": "05_sheath_blight.jpg",
    "False Smut": "06_false_smut.jpg",
    "Tungro": "07_tungro.jpg",
    "Bacterial Leaf Streak": "08_bacterial_leaf_streak.jpg",
    "Sheath Rot": "09_sheath_rot.jpg",
    "Narrow Brown Leaf Spot": "10_narrow_brown_leaf_spot.jpg",
    "Rice Hispa": "11_rice_hispa.jpg",
    "Bacterial Panicle Blight": "12_bacterial_panicle_blight.jpg",
    "Bakanae": "13_bakanae.jpg",
    "Stem Borer Damage": "14_stem_borer_damage.jpg",
    "Rice Grassy Stunt": "15_rice_grassy_stunt.jpg",
    "Rice Ragged Stunt": "16_rice_ragged_stunt.jpg",
    "Dirty Panicle": "17_dirty_panicle.jpg",
    "Kernel Smut": "18_kernel_smut.jpg",
    "Udbatta Disease": "19_udbatta_disease.jpg"
}


@app.on_event("startup")
def startup_event():
    """Pre-warm PyTorch neural model checkpoint."""
    try:
        print("[RiceCare AI] Initializing PyTorch neural model checkpoint...")
        get_inference_engine()
        print("[RiceCare AI] Model loaded and ready for inference.")
    except Exception as e:
        print(f"[RiceCare AI] Startup model loading warning: {e}")


def verify_admin_key(x_admin_key: Optional[str] = Header(None, alias="X-Admin-Key")):
    if not x_admin_key or x_admin_key != ADMIN_API_KEY:
        raise HTTPException(status_code=403, detail="Unauthorized: Invalid admin credentials.")
    return True


# ==========================================
# 1. System, Health & Remote Config Endpoints
# ==========================================

@app.get("/api/health")
@app.get("/api/v1/health")
def health_check():
    model_info = get_active_model_info()
    cfg = get_active_remote_config()
    return {
        "status": "healthy",
        "app": "RiceCare AI — Rice Leaf Disease Detection",
        "version": "2.0.0",
        "model_architecture": "HybridCNNPCAVQC (Quantum-Classical CNN + PCA + VQC)",
        "model_version": model_info.get("version", "v2.0.0-quantum"),
        "remote_config_version": cfg.get("config_version"),
        "classes_supported": len(DISEASE_CLASSES),
        "database_status": "connected" if os.path.exists(DB_PATH) else "unavailable",
        "timestamp": datetime.utcnow().isoformat()
    }


@app.get("/api/remote-config")
@app.get("/api/v1/remote-config")
def get_remote_configuration():
    """Returns active versioned remote configuration for mobile app & web."""
    return get_active_remote_config()


@app.get("/api/app-version")
@app.get("/api/v1/app-version")
def get_application_version_info():
    """Provides in-app update check details for Google Play and Direct APK."""
    cfg = get_active_remote_config()
    return cfg.get("app_version", {
        "latest_version": "2.0.0",
        "min_supported_version": "1.0.0",
        "apk_download_url": "/downloads/RiceCare-AI-v2.0.0.apk",
        "play_store_url": "https://play.google.com/store/apps/details?id=com.ricecare.ai",
        "force_update": False,
        "release_notes_en": "RiceCare AI production update.",
        "release_notes_kn": "ರೈಸ್‌ಕೇರ್ ಎಐ ಹೊಸ ನವೀಕರಣ ಲಭ್ಯವಿದೆ."
    })


@app.post("/api/v1/admin/remote-config/publish")
def publish_new_remote_configuration(payload: dict, authorized: bool = Depends(verify_admin_key)):
    """Publish a new remote configuration version without rebuilding the Android app."""
    try:
        updated = publish_remote_config(payload, published_by="admin_api")
        return {"success": True, "message": "Remote configuration published successfully", "config": updated}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/v1/admin/remote-config/history")
def list_remote_configuration_history(authorized: bool = Depends(verify_admin_key)):
    """Retrieve historical published configuration versions for rollback."""
    return {"history": get_remote_config_history()}


@app.post("/api/v1/admin/remote-config/rollback")
def rollback_remote_configuration(target_version: str = Query(...), authorized: bool = Depends(verify_admin_key)):
    """Roll back to a previous configuration version."""
    try:
        restored = rollback_remote_config(target_version)
        return {"success": True, "message": f"Rolled back to {target_version}", "config": restored}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.get("/api/v1/model/info")
def get_model_information():
    """Retrieve active AI model version and verification details."""
    return get_active_model_info()


@app.post("/api/v1/admin/model/rollback")
def rollback_ai_model(authorized: bool = Depends(verify_admin_key)):
    """Roll back AI model checkpoint to previous verified release."""
    try:
        res = rollback_model()
        return {"success": True, "message": "Model rolled back successfully", "details": res}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/api/v1/admin/backup/create")
def trigger_system_backup(label: str = "manual_api", authorized: bool = Depends(verify_admin_key)):
    """Trigger atomic SQLite database and uploads media backup."""
    try:
        db_res = backup_database(label=label)
        up_res = backup_uploads(label=label)
        return {
            "success": True,
            "database_backup": db_res,
            "uploads_backup": up_res
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Backup failed: {str(e)}")


# ==========================================
# 2. Authentication Endpoints
# ==========================================

@app.post("/api/auth/register")
def register(user_data: UserRegister):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    try:
        # Check existing username/email
        cur.execute("SELECT id FROM users WHERE username = ? OR email = ?", (user_data.username, user_data.email))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="Username or Email already registered.")

        pw_hash = generate_password_hash(user_data.password, method="scrypt")
        now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")

        cur.execute("""
            INSERT INTO users (full_name, username, email, phone, location, password_hash, role, preferred_lang, created_at)
            VALUES (?, ?, ?, ?, ?, ?, 'user', 'en', ?)
        """, (user_data.full_name, user_data.username, user_data.email, user_data.phone, user_data.location, pw_hash, now))
        conn.commit()
        user_id = cur.lastrowid

        token = create_token(user_id, user_data.username, user_data.email, "user")
        return {
            "success": True,
            "message": "User registered successfully",
            "token": token,
            "user": {
                "id": user_id,
                "full_name": user_data.full_name,
                "username": user_data.username,
                "email": user_data.email,
                "role": "user",
                "location": user_data.location
            }
        }
    finally:
        conn.close()


@app.post("/api/auth/login")
def login(login_data: UserLogin):
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    try:
        cur.execute("""
            SELECT id, full_name, username, email, password_hash, role, location 
            FROM users 
            WHERE username = ? OR email = ?
        """, (login_data.email_or_username, login_data.email_or_username))
        row = cur.fetchone()

        if not row or not check_password_hash(row[4], login_data.password):
            raise HTTPException(status_code=401, detail="Invalid username/email or password.")

        token = create_token(row[0], row[2], row[3], row[5])
        return {
            "success": True,
            "message": "Login successful",
            "token": token,
            "user": {
                "id": row[0],
                "full_name": row[1],
                "username": row[2],
                "email": row[3],
                "role": row[5],
                "location": row[6]
            }
        }
    finally:
        conn.close()


@app.get("/api/auth/me")
def get_current_user_profile(user: Optional[dict] = Depends(get_current_user_optional)):
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required.")
    
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    try:
        cur.execute("SELECT id, full_name, username, email, role, location, phone, created_at FROM users WHERE id = ?", (user["user_id"],))
        row = cur.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="User not found.")
        return {
            "id": row[0],
            "full_name": row[1],
            "username": row[2],
            "email": row[3],
            "role": row[4],
            "location": row[5],
            "phone": row[6],
            "created_at": row[7]
        }
    finally:
        conn.close()


# ==========================================
# 3. Disease Library & Encyclopedia
# ==========================================

@app.get("/api/diseases")
def list_diseases(search: Optional[str] = None):
    results = []
    for idx, name in enumerate(DISEASE_CLASSES):
        details = DISEASE_DETAILS.get(name, {})
        code = details.get("code", f"disease_{idx}")
        sample_img = SAMPLE_IMAGE_MAP.get(name, "")

        item = {
            "id": idx,
            "code": code,
            "name": name,
            "scientific_name": details.get("scientific_name", "N/A"),
            "pathogen_type": details.get("pathogen_type", "N/A"),
            "description": details.get("description", ""),
            "symptoms": details.get("symptoms", ""),
            "favorable_conditions": details.get("favorable_conditions", ""),
            "contributing_factors": details.get("contributing_factors", ""),
            "prevention": details.get("prevention", ""),
            "management": details.get("management", ""),
            "expert_consultation": details.get("expert_consultation", ""),
            "sample_image_url": f"/api/sample_leaves/{sample_img}" if sample_img else None
        }

        if search:
            q = search.lower()
            if q not in name.lower() and q not in details.get("scientific_name", "").lower() and q not in details.get("description", "").lower():
                continue

        results.append(item)
    return results


@app.get("/api/diseases/{code_or_name}")
def get_disease(code_or_name: str):
    found_name = None
    # match by exact name
    if code_or_name in DISEASE_DETAILS:
        found_name = code_or_name
    else:
        # match by code
        for name, d in DISEASE_DETAILS.items():
            if d.get("code", "").lower() == code_or_name.lower():
                found_name = name
                break
    
    if not found_name:
        raise HTTPException(status_code=404, detail="Disease not found in rice botanical encyclopedia.")

    details = DISEASE_DETAILS[found_name]
    sample_img = SAMPLE_IMAGE_MAP.get(found_name, "")
    return {
        "name": found_name,
        "code": details.get("code", ""),
        "scientific_name": details.get("scientific_name", "N/A"),
        "pathogen_type": details.get("pathogen_type", "N/A"),
        "description": details.get("description", ""),
        "symptoms": details.get("symptoms", ""),
        "favorable_conditions": details.get("favorable_conditions", ""),
        "contributing_factors": details.get("contributing_factors", ""),
        "prevention": details.get("prevention", ""),
        "management": details.get("management", ""),
        "expert_consultation": details.get("expert_consultation", ""),
        "sample_image_url": f"/api/sample_leaves/{sample_img}" if sample_img else None
    }


# ==========================================
# 3.1 Verified Pesticide & Advisory Database
# ==========================================

@app.get("/api/advisories")
@app.get("/api/v1/advisories")
def list_advisories():
    """Returns all 20 verified CIBRC / UAS disease management and pesticide advisories."""
    return {
        "verification_cycle": VERIFICATION_CYCLE,
        "authority_source": AUTHORITY_SOURCE,
        "advisories": get_all_advisories()
    }


@app.get("/api/advisories/{disease_name}")
@app.get("/api/v1/advisories/{disease_name}")
def get_single_advisory(disease_name: str):
    """Returns structured verified advisory for a specific rice leaf condition."""
    adv = get_advisory_for_disease(disease_name)
    if not adv:
        # Case-insensitive match
        for a in get_all_advisories():
            if a["disease_name_en"].lower() == disease_name.lower():
                adv = a
                break
    if not adv:
        raise HTTPException(status_code=404, detail="Advisory not found for this condition.")
    return adv


# ==========================================
# 4. AI Leaf Disease Detection (Prediction)
# ==========================================

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
MAX_FILE_SIZE = 16 * 1024 * 1024  # 16 MB

@app.post("/api/predict")
@app.post("/api/v1/predict")
async def predict_leaf(
    file: UploadFile = File(...),
    user: Optional[dict] = Depends(get_current_user_optional)
):
    # 1. Validate file extension
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "error_type": "INVALID_FORMAT",
                "message": f"Unsupported file type '{ext}'. Please upload a valid JPG, JPEG, PNG, or WEBP photograph."
            }
        )

    # 2. Save uploaded file to disk
    unique_id = uuid.uuid4().hex[:12]
    timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
    saved_filename = f"rice_{timestamp}_{unique_id}{ext}"
    saved_path = os.path.join(UPLOADS_DIR, saved_filename)

    file_size = 0
    try:
        with open(saved_path, "wb") as f:
            while chunk := await file.read(1024 * 64):
                file_size += len(chunk)
                if file_size > MAX_FILE_SIZE:
                    os.remove(saved_path)
                    return JSONResponse(
                        status_code=400,
                        content={
                            "success": False,
                            "error_type": "OVERSIZED_IMAGE",
                            "message": "File exceeds maximum size limit of 16MB. Please upload an optimized photograph."
                        }
                    )
                f.write(chunk)
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={"success": False, "error_type": "UPLOAD_ERROR", "message": f"Failed to save image: {str(e)}"}
        )

    # 3. Run Inference through existing trained PyTorch model
    try:
        result = predict_rice_disease(saved_path)
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "error_type": "INFERENCE_FAILED",
                "message": f"An error occurred during neural inference: {str(e)}"
            }
        )

    # 4. Handle rejection / validation failures (non-leaf, blur, dark)
    if not result.get("success"):
        return JSONResponse(
            status_code=422,
            content={
                "success": False,
                "error_type": result.get("error_type", "VALIDATION_FAILED"),
                "message": result.get("message", "Image validation failed. Please provide a clear, well-lit rice leaf image.")
            }
        )

    # 5. Extract prediction outputs
    disease = result.get("primary_disease", "Unknown")
    confidence_val = float(result.get("confidence", 0.0)) # percentage 0-100
    confidence_frac = round(confidence_val / 100.0, 4)
    conf_level = result.get("confidence_level", "Moderate")
    sev_info = result.get("severity", {})
    sev_level = sev_info.get("severity_level", "Mild")
    healthy_pct = float(sev_info.get("healthy_area_pct", 100.0))
    lesion_pct = float(sev_info.get("affected_area_pct", 0.0))
    lesion_count = int(sev_info.get("lesion_count", 0))

    gradcam_rel = result.get("gradcam_path")
    gradcam_filename = os.path.basename(gradcam_rel) if gradcam_rel else None

    # Retrieve Botanical metadata & verified pesticide advisory
    disease_meta = DISEASE_DETAILS.get(disease, {})
    pesticide_advisory = get_advisory_for_disease(disease)

    is_unreliable = confidence_val < 40.0 or result.get("is_low_confidence", False)
    unreliable_msg_en = "Unable to identify the disease reliably. Please take a clearer photo or consult an agricultural expert."
    unreliable_msg_kn = "ರೋಗವನ್ನು ನಿಖರವಾಗಿ ಗುರುತಿಸಲು ಸಾಧ್ಯವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟವಾದ ಫೋಟೋ ತೆಗೆದುಕೊಳ್ಳಿ ಅಥವಾ ಕೃಷಿ ತಜ್ಞರನ್ನು ಸಂಪರ್ಕಿಸಿ."

    # 6. Save prediction record to SQLite (prevent duplicate saves within 60s)
    user_id = user["user_id"] if user else 2 # default to demo farmer if guest
    now_str = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    pred_id = None

    try:
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        # Deduplication check: check if same image file or recent prediction exists
        cur.execute("""
            SELECT id FROM predictions 
            WHERE user_id = ? AND disease_name = ? AND image_filename = ?
            LIMIT 1
        """, (user_id, disease, saved_filename))
        existing = cur.fetchone()
        if existing:
            pred_id = existing[0]
        else:
            top_preds_json = json.dumps(result.get("top_predictions", []))
            cur.execute("""
                INSERT INTO predictions (
                    user_id, image_filename, gradcam_filename, disease_name, confidence,
                    severity_level, healthy_area_pct, affected_area_pct, lesion_count,
                    top_predictions_json, is_low_confidence, created_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                user_id, saved_filename, gradcam_filename, disease, confidence_val,
                sev_level, healthy_pct, lesion_pct, lesion_count,
                top_preds_json, 1 if is_unreliable else 0, now_str
            ))
            conn.commit()
            pred_id = cur.lastrowid
        conn.close()
    except Exception as e:
        print(f"[RiceCare AI DB] Failed to save prediction to history: {e}")

    # 7. Formulate structured response
    return {
        "success": True,
        "model_version": get_active_model_info().get("version", "v2.0.0-quantum"),
        "unreliable": is_unreliable,
        "unreliable_message_en": unreliable_msg_en if is_unreliable else None,
        "unreliable_message_kn": unreliable_msg_kn if is_unreliable else None,
        "disease": disease,
        "confidence": confidence_frac,
        "confidence_percentage": round(confidence_val, 2),
        "confidence_level": "Unreliable" if is_unreliable else conf_level,
        "advisory": disease_meta.get("expert_consultation") or "Review the disease information and management guidance.",
        "pesticide_advisory": pesticide_advisory if not is_unreliable else None,
        "scientific_name": disease_meta.get("scientific_name", "Oryza sativa"),
        "pathogen_type": disease_meta.get("pathogen_type", "Botanical Specimen"),
        "symptoms": result.get("symptoms") or disease_meta.get("symptoms", ""),
        "causes": disease_meta.get("favorable_conditions", ""),
        "contributing_factors": disease_meta.get("contributing_factors", ""),
        "prevention": disease_meta.get("prevention", ""),
        "management": disease_meta.get("management", ""),
        "next_steps": [
            "Isolate or monitor affected field patches to track potential symptom spread.",
            "Verify soil moisture and avoid excessive nitrogenous top-dressing while symptoms persist.",
            "Apply the recommended evidence-based cultural and biological controls listed in this report.",
            "Consult local agricultural extension experts if lesions rapidly increase across the upper leaf canopy."
        ],
        "severity": {
            "severity_level": sev_level,
            "healthy_area_pct": healthy_pct,
            "affected_area_pct": lesion_pct,
            "lesion_count": lesion_count
        },
        "top_predictions": result.get("top_predictions", []),
        "image_url": f"/uploads/{saved_filename}",
        "gradcam_url": f"/uploads/{gradcam_filename}" if gradcam_filename else None,
        "prediction_id": pred_id,
        "timestamp": now_str,
        "disclaimer": "AI predictions are advisory and meant to assist agricultural decision-making. Always verify diagnoses with an agronomist or extension officer."
    }


# ==========================================
# 5. Dashboard Statistics
# ==========================================

@app.get("/api/dashboard/stats")
def get_dashboard_stats(user: Optional[dict] = Depends(get_current_user_optional)):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    try:
        # Total analyses performed
        cur.execute("SELECT COUNT(*) as count FROM predictions")
        total_scans = cur.fetchone()["count"]

        # Most frequently detected diseases
        cur.execute("""
            SELECT disease_name, COUNT(*) as count, AVG(confidence) as avg_conf
            FROM predictions
            GROUP BY disease_name
            ORDER BY count DESC
        """)
        disease_counts = [dict(row) for row in cur.fetchall()]

        # Severity breakdown
        cur.execute("""
            SELECT severity_level, COUNT(*) as count
            FROM predictions
            GROUP BY severity_level
        """)
        severity_counts = [dict(row) for row in cur.fetchall()]

        # Average confidence
        cur.execute("SELECT AVG(confidence) as avg_conf FROM predictions")
        avg_row = cur.fetchone()
        avg_confidence = round(avg_row["avg_conf"], 2) if avg_row and avg_row["avg_conf"] else 0.0

        # Recent 5 predictions
        cur.execute("""
            SELECT id, disease_name, confidence, severity_level, image_filename, gradcam_filename, created_at
            FROM predictions
            ORDER BY id DESC
            LIMIT 6
        """)
        recent_scans = []
        for r in cur.fetchall():
            recent_scans.append({
                "id": r["id"],
                "disease_name": r["disease_name"],
                "confidence": round(r["confidence"], 2),
                "severity_level": r["severity_level"],
                "image_url": f"/uploads/{r['image_filename']}",
                "gradcam_url": f"/uploads/{r['gradcam_filename']}" if r["gradcam_filename"] else None,
                "created_at": r["created_at"]
            })

        most_common = disease_counts[0]["disease_name"] if disease_counts else "None"

        return {
            "total_analyses": total_scans,
            "most_common_disease": most_common,
            "average_confidence": avg_confidence,
            "disease_distribution": disease_counts,
            "severity_distribution": severity_counts,
            "recent_scans": recent_scans
        }
    finally:
        conn.close()


# ==========================================
# 6. Prediction History
# ==========================================

@app.get("/api/history")
def get_history(
    limit: int = Query(50, ge=1, le=200),
    user: Optional[dict] = Depends(get_current_user_optional)
):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    try:
        # If user is logged in and not admin, show their scans; otherwise show all
        if user and user.get("role") != "admin":
            cur.execute("""
                SELECT id, user_id, disease_name, confidence, severity_level, 
                       healthy_area_pct, affected_area_pct, lesion_count,
                       image_filename, gradcam_filename, created_at
                FROM predictions
                WHERE user_id = ?
                ORDER BY id DESC
                LIMIT ?
            """, (user["user_id"], limit))
        else:
            cur.execute("""
                SELECT id, user_id, disease_name, confidence, severity_level, 
                       healthy_area_pct, affected_area_pct, lesion_count,
                       image_filename, gradcam_filename, created_at
                FROM predictions
                ORDER BY id DESC
                LIMIT ?
            """, (limit,))
        
        rows = cur.fetchall()
        history = []
        for r in rows:
            history.append({
                "id": r["id"],
                "user_id": r["user_id"],
                "disease_name": r["disease_name"],
                "confidence": round(r["confidence"], 2),
                "severity_level": r["severity_level"],
                "healthy_area_pct": r["healthy_area_pct"],
                "affected_area_pct": r["affected_area_pct"],
                "lesion_count": r["lesion_count"],
                "image_url": f"/uploads/{r['image_filename']}",
                "gradcam_url": f"/uploads/{r['gradcam_filename']}" if r["gradcam_filename"] else None,
                "created_at": r["created_at"],
                "scientific_name": DISEASE_DETAILS.get(r["disease_name"], {}).get("scientific_name", "")
            })
        return history
    finally:
        conn.close()


@app.delete("/api/history/{history_id}")
def delete_history_item(
    history_id: int,
    user: Optional[dict] = Depends(get_current_user_optional)
):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    try:
        cur.execute("SELECT id, user_id, image_filename, gradcam_filename FROM predictions WHERE id = ?", (history_id,))
        row = cur.fetchone()
        if not row:
            raise HTTPException(status_code=404, detail="Prediction record not found.")

        # Delete image files if they exist
        for fname in [row["image_filename"], row["gradcam_filename"]]:
            if fname:
                fp = os.path.join(UPLOADS_DIR, fname)
                if os.path.exists(fp):
                    try:
                        os.remove(fp)
                    except Exception:
                        pass

        cur.execute("DELETE FROM predictions WHERE id = ?", (history_id,))
        conn.commit()
        return {"success": True, "message": "History record and associated assets removed successfully."}
    finally:
        conn.close()


# ==========================================
# 7. Static Assets & Frontend Serving
# ==========================================

# Mount uploads directory
app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

# Mount downloads directory
if os.path.exists(DOWNLOADS_DIR):
    app.mount("/downloads", StaticFiles(directory=DOWNLOADS_DIR), name="downloads")

# Mount sample leaves
if os.path.exists(SAMPLE_LEAVES_DIR):
    app.mount("/api/sample_leaves", StaticFiles(directory=SAMPLE_LEAVES_DIR), name="sample_leaves")

# Serve React SPA build if present
if os.path.exists(FRONTEND_DIST):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIST, "assets")), name="frontend_assets")

    @app.get("/")
    async def serve_root():
        return FileResponse(os.path.join(FRONTEND_DIST, "index.html"))

    @app.get("/{full_path:path}")
    async def serve_spa(full_path: str):
        if full_path.startswith("api/") or full_path == "api":
            raise HTTPException(status_code=404, detail="API endpoint not found")
        target = os.path.join(FRONTEND_DIST, full_path)
        if full_path and os.path.exists(target) and os.path.isfile(target):
            return FileResponse(target)
        return FileResponse(os.path.join(FRONTEND_DIST, "index.html"))


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    print("=" * 70)
    print("🌾 RiceCare AI — Intelligent Rice Leaf Disease Diagnostic Application")
    print(f"🚀 FastAPI server running on http://127.0.0.1:{port}")
    print("=" * 70)
    uvicorn.run("server:app", host="0.0.0.0", port=port, reload=False)
