"""
RiceCare AI — Cloud Database Connector & MongoDB Atlas Manager
Handles persistent cloud database connectivity, MongoDB Atlas integration,
and automatic seamless data synchronization from SQLite.
"""

import os
import sys
import sqlite3
from datetime import datetime, timezone
from typing import Dict, Any, Optional, List

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
SQLITE_DB_PATH = os.path.join(BASE_DIR, "agriversion.db")

MONGODB_URI = os.getenv("MONGODB_URI", "")
DATABASE_PATH = os.getenv("DATABASE_PATH", SQLITE_DB_PATH)

_mongo_client = None
_mongo_db = None


def get_db_type() -> str:
    """Returns 'mongodb_atlas' if MONGODB_URI is configured and active, otherwise 'sqlite'."""
    global _mongo_client
    if MONGODB_URI and MONGODB_URI.strip() != "":
        return "mongodb_atlas"
    return "sqlite"


def get_mongo_db():
    """Lazy initialize PyMongo connection."""
    global _mongo_client, _mongo_db
    if not MONGODB_URI:
        return None
    if _mongo_db is None:
        try:
            import pymongo
            _mongo_client = pymongo.MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
            # Trigger connection check
            _mongo_client.admin.command('ping')
            db_name = os.getenv("MONGODB_DB_NAME", "ricecare_ai")
            _mongo_db = _mongo_client[db_name]
            print(f"[RiceCare AI] Successfully connected to MongoDB Atlas database: {db_name}")
        except Exception as e:
            print(f"[RiceCare AI Warning] Failed to connect to MongoDB Atlas: {e}. Falling back to SQLite.")
            _mongo_db = None
    return _mongo_db


def test_database_connection() -> Dict[str, Any]:
    """Test connectivity to active database and return health metrics."""
    db_type = get_db_type()
    if db_type == "mongodb_atlas":
        try:
            mdb = get_mongo_db()
            if mdb is not None:
                coll_names = mdb.list_collection_names()
                return {
                    "connected": True,
                    "engine": "MongoDB Atlas",
                    "database": mdb.name,
                    "collections": coll_names,
                    "status": "online"
                }
        except Exception as e:
            return {
                "connected": False,
                "engine": "MongoDB Atlas",
                "error": str(e),
                "status": "degraded_fallback_sqlite"
            }

    # SQLite check
    if os.path.exists(DATABASE_PATH):
        try:
            conn = sqlite3.connect(DATABASE_PATH)
            cur = conn.cursor()
            cur.execute("PRAGMA integrity_check;")
            res = cur.fetchone()[0]
            cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
            tables = [t[0] for t in cur.fetchall()]
            conn.close()
            return {
                "connected": True,
                "engine": "SQLite (Local / Persistent Volume)",
                "path": DATABASE_PATH,
                "integrity": res,
                "tables": tables,
                "status": "online"
            }
        except Exception as e:
            return {
                "connected": False,
                "engine": "SQLite",
                "error": str(e),
                "status": "error"
            }

    return {
        "connected": False,
        "engine": "none",
        "status": "database_not_found"
    }


def sync_sqlite_to_mongodb():
    """
    Safely migrates or mirrors existing SQLite records into MongoDB Atlas
    without losing any user history, predictions, or pesticide advisories.
    """
    mdb = get_mongo_db()
    if mdb is None:
        return {"success": False, "message": "MongoDB Atlas not configured"}

    if not os.path.exists(SQLITE_DB_PATH):
        return {"success": False, "message": "Source SQLite DB not found"}

    try:
        conn = sqlite3.connect(SQLITE_DB_PATH)
        cur = conn.cursor()

        # 1. Sync predictions
        cur.execute("SELECT id, user_id, disease_name, confidence, severity_level, healthy_area_pct, affected_area_pct, lesion_count, created_at FROM predictions")
        pred_rows = cur.fetchall()
        for r in pred_rows:
            mdb.predictions.update_one(
                {"sqlite_id": r[0]},
                {"$set": {
                    "sqlite_id": r[0],
                    "user_id": r[1],
                    "disease_name": r[2],
                    "confidence": r[3],
                    "severity_level": r[4],
                    "healthy_area_pct": r[5],
                    "affected_area_pct": r[6],
                    "lesion_count": r[7],
                    "created_at": r[8],
                    "synced_at": datetime.now(timezone.utc).isoformat()
                }},
                upsert=True
            )

        # 2. Sync pesticide advisories
        cur.execute("SELECT disease_id, disease_name_en, disease_name_kn, active_ingredient, formulation, label_rate, advisory_status FROM pesticide_advisories")
        adv_rows = cur.fetchall()
        for a in adv_rows:
            mdb.pesticide_advisories.update_one(
                {"disease_id": a[0]},
                {"$set": {
                    "disease_id": a[0],
                    "disease_name_en": a[1],
                    "disease_name_kn": a[2],
                    "active_ingredient": a[3],
                    "formulation": a[4],
                    "label_rate": a[5],
                    "advisory_status": a[6],
                    "synced_at": datetime.now(timezone.utc).isoformat()
                }},
                upsert=True
            )

        conn.close()
        return {
            "success": True,
            "predictions_synced": len(pred_rows),
            "advisories_synced": len(adv_rows)
        }
    except Exception as e:
        return {"success": False, "error": str(e)}
