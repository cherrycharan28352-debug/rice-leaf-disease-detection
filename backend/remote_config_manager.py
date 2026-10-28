"""
RiceCare AI — Remote Configuration & Content Update Engine
Provides zero-reinstall remote updates for farmer text, announcements,
disease advisories, pesticide updates, and feature flags.
"""

import os
import sys
import json
import sqlite3
import hashlib
from datetime import datetime, timezone
from typing import Dict, Any, Optional, List

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DB_PATH = os.path.join(BASE_DIR, "agriversion.db")
DEFAULT_CONFIG_PATH = os.path.join(BASE_DIR, "translations", "default_remote_config.json")


def init_remote_config_table():
    """Create remote_configs table if not exists."""
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        CREATE TABLE IF NOT EXISTS remote_configs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            version TEXT UNIQUE NOT NULL,
            schema_version TEXT NOT NULL,
            config_json TEXT NOT NULL,
            checksum TEXT NOT NULL,
            is_active INTEGER DEFAULT 0,
            published_by TEXT DEFAULT 'admin',
            published_at TEXT NOT NULL
        )
    """)
    cur.execute("CREATE INDEX IF NOT EXISTS idx_remote_config_active ON remote_configs(is_active);")
    conn.commit()
    conn.close()


def compute_json_checksum(data: dict) -> str:
    """Compute deterministic SHA-256 hash of configuration dictionary."""
    serialized = json.dumps(data, sort_keys=True, separators=(',', ':'))
    return hashlib.sha256(serialized.encode('utf-8')).hexdigest()


def get_default_remote_config() -> dict:
    """Generate default comprehensive remote configuration."""
    now = datetime.now(timezone.utc).isoformat()
    config_body = {
        "schema_version": "1.0.0",
        "config_version": "2026.10.29.1",
        "published_at": now,
        "app_version": {
            "latest_version": "2.0.0",
            "min_supported_version": "1.0.0",
            "apk_download_url": "https://github.com/cherrycharan28352-debug/rice-leaf-disease-detection/releases/download/v2.0.0/RiceCare-AI-v2.0.0.apk",
            "play_store_url": "https://play.google.com/store/apps/details?id=com.ricecare.ai",
            "force_update": False,
            "release_notes_en": "Major release: CIBRC pesticide safety database, Kannada audio TTS, and offline guides.",
            "release_notes_kn": "ಪ್ರಮುಖ ನವೀಕರಣ: CIBRC ಕೀಟನಾಶಕ ಮಾರ್ಗದರ್ಶಿ, ಕನ್ನಡ ಧ್ವನಿ ಓದುವಿಕೆ, ಮತ್ತು ಆಫ್‌ಲೈನ್ ಮಾಹಿತಿ."
        },
        "announcements": [
            {
                "id": "ann-2026-01",
                "active": True,
                "type": "advisory",
                "priority": "high",
                "title_en": "Kharif & Rabi Season Care",
                "title_kn": "ಖಾರೀಫ್ ಮತ್ತು ಹಿಂಗಾರು ಬೆಳೆ ಜಾಗರೂಕತೆ",
                "title_hi": "खरीफ और रबी फसल सावधानी",
                "message_en": "Continuous cloudy weather increases Rice Blast risk. Inspect upper leaf surfaces regularly.",
                "message_kn": "ಮೋಡ ಕವಿದ ವಾತಾವರಣದಲ್ಲಿ ಭತ್ತದ ಬೆಂಕಿ ರೋಗ (Rice Blast) ಹರಡುವ ಸಾಧ್ಯತೆ ಹೆಚ್ಚು. ಮೇಲಿನ ಎಲೆಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ.",
                "message_hi": "बादल छाए रहने से ब्लास्ट रोग का खतरा बढ़ जाता है। ऊपरी पत्तियों की नियमित जांच करें।"
            }
        ],
        "home_messages": {
            "title_kn": "RiceCare AI",
            "subtitle_kn": "ನಿಮ್ಮ ಭತ್ತದ ಬೆಳೆಯ ಆರೋಗ್ಯ ತಿಳಿಯಿರಿ",
            "tagline_kn": "ಭತ್ತದ ಎಲೆಯ ಫೋಟೋ ತೆಗೆದು ರೋಗದ ಲಕ್ಷಣಗಳನ್ನು ತಕ್ಷಣವೇ ಪರಿಶೀಲಿಸಿ.",
            "title_en": "RiceCare AI",
            "subtitle_en": "Check the health of your rice crop",
            "tagline_en": "Take a photo of a rice leaf to check for possible disease.",
            "title_hi": "RiceCare AI",
            "subtitle_hi": "अपनी धान की फसल का स्वास्थ्य जानें",
            "tagline_hi": "संभावित रोग की जांच के लिए धान की पत्ती का फोटो लें।"
        },
        "feature_flags": {
            "enable_offline_queue": True,
            "enable_audio_tts": True,
            "enable_sample_picker": True,
            "enable_pesticide_safety_warnings": True,
            "max_upload_size_mb": 16
        },
        "support_contacts": {
            "kisan_call_center": "1800-180-1551",
            "karnataka_agri_helpdesk": "080-22212804",
            "raitha_samparka_kendra": "Visit your local Hobli Raitha Samparka Kendra (RSK)"
        },
        "content_overrides": {},
        "disease_overrides": {},
        "pesticide_overrides": {}
    }
    config_body["checksum"] = compute_json_checksum(config_body)
    return config_body


def validate_remote_config_schema(payload: dict) -> tuple[bool, Optional[str]]:
    """Strict schema validation to prevent malformed or unsafe updates."""
    if not isinstance(payload, dict):
        return False, "Payload must be a JSON object"

    required_keys = ["schema_version", "config_version", "app_version", "home_messages", "feature_flags"]
    for k in required_keys:
        if k not in payload:
            return False, f"Missing required top-level key: '{k}'"

    if not isinstance(payload.get("app_version"), dict):
        return False, "'app_version' must be an object"

    if not isinstance(payload.get("home_messages"), dict):
        return False, "'home_messages' must be an object"

    if not isinstance(payload.get("feature_flags"), dict):
        return False, "'feature_flags' must be an object"

    return True, None


def get_active_remote_config() -> dict:
    """Retrieve currently active configuration from SQLite, or fallback to default."""
    init_remote_config_table()
    try:
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute("""
            SELECT config_json, checksum, version, published_at 
            FROM remote_configs 
            WHERE is_active = 1 
            ORDER BY id DESC LIMIT 1
        """)
        row = cur.fetchone()
        conn.close()

        if row:
            config = json.loads(row[0])
            config["checksum"] = row[1]
            return config
    except Exception as e:
        print(f"[Remote Config Warning] Failed to query DB: {e}")

    # Fallback to default
    default_cfg = get_default_remote_config()
    # Save default to DB so it is officially active
    try:
        publish_remote_config(default_cfg, published_by="system_default")
    except Exception:
        pass
    return default_cfg


def publish_remote_config(new_config: dict, published_by: str = "admin") -> dict:
    """
    Validate, save, and activate a new remote configuration version.
    """
    is_valid, error = validate_remote_config_schema(new_config)
    if not is_valid:
        raise ValueError(f"Invalid remote configuration schema: {error}")

    init_remote_config_table()

    version = new_config.get("config_version")
    schema_version = new_config.get("schema_version", "1.0.0")
    published_at = datetime.now(timezone.utc).isoformat()
    new_config["published_at"] = published_at

    # Calculate checksum excluding checksum key
    temp_dict = {k: v for k, v in new_config.items() if k != "checksum"}
    checksum = compute_json_checksum(temp_dict)
    new_config["checksum"] = checksum
    config_json = json.dumps(new_config, ensure_ascii=False)

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    # Deactivate existing configurations
    cur.execute("UPDATE remote_configs SET is_active = 0 WHERE is_active = 1")

    # Insert or update
    cur.execute("""
        INSERT INTO remote_configs (version, schema_version, config_json, checksum, is_active, published_by, published_at)
        VALUES (?, ?, ?, ?, 1, ?, ?)
    """, (version, schema_version, config_json, checksum, published_by, published_at))

    conn.commit()
    conn.close()

    print(f"[RiceCare AI Remote Config] Published new version {version} ({checksum[:8]}...) by {published_by}")
    return new_config


def get_remote_config_history() -> List[dict]:
    """Retrieve list of previous published versions."""
    init_remote_config_table()
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    cur.execute("""
        SELECT id, version, schema_version, checksum, is_active, published_by, published_at 
        FROM remote_configs 
        ORDER BY id DESC LIMIT 20
    """)
    rows = cur.fetchall()
    conn.close()

    return [
        {
            "id": r[0],
            "version": r[1],
            "schema_version": r[2],
            "checksum": r[3],
            "is_active": bool(r[4]),
            "published_by": r[5],
            "published_at": r[6]
        }
        for r in rows
    ]


def rollback_remote_config(target_version: str) -> dict:
    """Rollback to a previously published configuration version."""
    init_remote_config_table()
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("SELECT config_json FROM remote_configs WHERE version = ?", (target_version,))
    row = cur.fetchone()
    if not row:
        conn.close()
        raise ValueError(f"Configuration version '{target_version}' not found in history.")

    target_config = json.loads(row[0])

    cur.execute("UPDATE remote_configs SET is_active = 0 WHERE is_active = 1")
    cur.execute("UPDATE remote_configs SET is_active = 1 WHERE version = ?", (target_version,))
    conn.commit()
    conn.close()

    print(f"[RiceCare AI Remote Config] Rolled back to version {target_version}")
    return target_config


if __name__ == "__main__":
    print("=" * 60)
    print("🌾 RiceCare AI — Remote Config Initialization")
    print("=" * 60)
    init_remote_config_table()
    cfg = get_active_remote_config()
    print("Active Config Version:", cfg.get("config_version"))
    print("Active Checksum:", cfg.get("checksum"))
    print("History count:", len(get_remote_config_history()))
