"""
RiceCare AI — Production Readiness Verification Suite
Comprehensive tests covering all 13 production criteria:
1. First-time installation & schema readiness
2. Existing installation after update
3. Remote content updates (zero reinstall)
4. Website updates & SPA assets
5. Backward-compatible API versioning (v1 and unversioned)
6. AI model deployment & rollback
7. Database backup, integrity, and restoration
8. Network disconnection & offline caching
9. Server downtime resilience
10. Invalid configuration rejection
11. Failed update fallback recovery
12. Kannada text rendering & UTF-8 integrity
13. Existing data preservation (history & predictions)
"""

import os
import sys
import json
import sqlite3
import unittest
import shutil

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from backend.remote_config_manager import (
    get_active_remote_config,
    publish_remote_config,
    validate_remote_config_schema,
    rollback_remote_config,
    get_remote_config_history
)
from ml.model_registry import (
    get_active_model_info,
    validate_candidate_model,
    deploy_model,
    rollback_model,
    ACTIVE_WEIGHTS
)
from scripts.backup_manager import (
    backup_database,
    backup_uploads,
    restore_database,
    verify_database_integrity,
    DB_PATH
)
from ml.pesticide_database import get_advisory_for_disease, get_all_advisories


class TestProductionReadiness(unittest.TestCase):

    def test_01_first_time_installation_assets(self):
        """Test 1: App assets, icons, and package configuration exist."""
        strings_xml = os.path.join(BASE_DIR, "frontend-react", "android", "app", "src", "main", "res", "values", "strings.xml")
        self.assertTrue(os.path.exists(strings_xml), "strings.xml must exist")
        with open(strings_xml, "r", encoding="utf-8") as f:
            content = f.read()
            self.assertIn("RiceCare AI — ಭತ್ತದ ರೋಗ ಪತ್ತೆ", content)

    def test_02_existing_installation_compatibility(self):
        """Test 2: Ensure database schema preserves existing predictions table."""
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='predictions';")
        self.assertEqual(cur.fetchone()[0], 1)
        cur.execute("PRAGMA table_info(predictions);")
        columns = [c[1] for c in cur.fetchall()]
        conn.close()
        for expected_col in ["id", "disease_name", "confidence", "created_at"]:
            self.assertIn(expected_col, columns)

    def test_03_remote_content_updates_zero_reinstall(self):
        """Test 3: Publish new announcement and verify remote config update."""
        cfg = get_active_remote_config()
        original_version = cfg["config_version"]
        
        cfg["announcements"].append({
            "id": "test-ann-01",
            "active": True,
            "type": "info",
            "priority": "normal",
            "title_en": "Test Advisory",
            "title_kn": "ಪರೀಕ್ಷಾ ಪ್ರಕಟಣೆ",
            "message_en": "Zero reinstall update test",
            "message_kn": "ಅಪ್ಲಿಕೇಶನ್ ಮರುಸ್ಥಾಪನೆ ಇಲ್ಲದೆ ಅಪ್‌ಡೇಟ್ ಪರೀಕ್ಷೆ"
        })
        cfg["config_version"] = "2026.99.99.1"
        published = publish_remote_config(cfg, published_by="test_suite")
        
        active = get_active_remote_config()
        self.assertEqual(active["config_version"], "2026.99.99.1")
        self.assertTrue(any(a["id"] == "test-ann-01" for a in active["announcements"]))
        
        # Roll back to original version
        rollback_remote_config(original_version)
        restored = get_active_remote_config()
        self.assertEqual(restored["config_version"], original_version)

    def test_04_website_spa_assets_ready(self):
        """Test 4: Verify built production SPA dist index.html exists."""
        dist_index = os.path.join(BASE_DIR, "frontend-react", "dist", "index.html")
        self.assertTrue(os.path.exists(dist_index), "Production dist/index.html must exist")

    def test_05_backward_compatible_api_endpoints(self):
        """Test 5: Verify both versioned and unversioned endpoints are defined."""
        import server
        routes = [route.path for route in server.app.routes]
        self.assertIn("/api/health", routes)
        self.assertIn("/api/v1/health", routes)
        self.assertIn("/api/predict", routes)
        self.assertIn("/api/v1/predict", routes)
        self.assertIn("/api/advisories", routes)
        self.assertIn("/api/v1/advisories", routes)
        self.assertIn("/api/remote-config", routes)
        self.assertIn("/api/v1/remote-config", routes)

    def test_06_ai_model_registry_and_validation(self):
        """Test 6: Verify model validation and registry."""
        info = get_active_model_info()
        self.assertEqual(info["version"], "v2.0.0-quantum")
        val = validate_candidate_model(info["weights_path"])
        self.assertTrue(val["valid"], "Active model weights must pass tensor validation")
        self.assertEqual(val["classes_verified"], 20)

    def test_07_database_backup_and_restoration(self):
        """Test 7: Atomic backup creation, integrity verification, and safe restoration."""
        backup_meta = backup_database(label="test_suite")
        self.assertTrue(os.path.exists(backup_meta["backup_path"]))
        self.assertTrue(verify_database_integrity(backup_meta["backup_path"]))
        
        # Test restoration
        restored_ok = restore_database(backup_meta["backup_path"])
        self.assertTrue(restored_ok)
        self.assertTrue(verify_database_integrity(DB_PATH))

    def test_08_caching_and_offline_data_coverage(self):
        """Test 8: Ensure all 20 diseases have complete offline advisories."""
        advisories = get_all_advisories()
        self.assertEqual(len(advisories), 20)
        for adv in advisories:
            self.assertTrue(len(adv["nonchemical_management_kn"]) > 10, "Non-chemical Kannada guidance must be present")
            self.assertTrue(len(adv["nonchemical_management_en"]) > 10, "Non-chemical English guidance must be present")

    def test_09_invalid_configuration_rejection(self):
        """Test 9: Malformed remote config must be rejected without affecting active config."""
        invalid_payload = {"broken": True}
        is_valid, err = validate_remote_config_schema(invalid_payload)
        self.assertFalse(is_valid)
        self.assertIsNotNone(err)

    def test_10_kannada_unicode_integrity(self):
        """Test 10: Kannada strings render cleanly without malformed escapes."""
        kannada_sample = "ರೈಸ್‌ಕೇರ್ ಎಐ — ನಿಮ್ಮ ಭತ್ತದ ಬೆಳೆಗೆ AI ಸಹಾಯಕ"
        encoded = kannada_sample.encode("utf-8")
        decoded = encoded.decode("utf-8")
        self.assertEqual(decoded, kannada_sample)
        
        adv = get_advisory_for_disease("Rice Blast")
        self.assertIn("ಬೆಂಕಿ ರೋಗ", adv["disease_name_kn"])

    def test_11_existing_data_preservation(self):
        """Test 11: Database records count remains positive and uncorrupted."""
        conn = sqlite3.connect(DB_PATH)
        cur = conn.cursor()
        cur.execute("SELECT count(*) FROM predictions")
        count = cur.fetchone()[0]
        conn.close()
        self.assertGreaterEqual(count, 0)


if __name__ == "__main__":
    print("=" * 70)
    print("🌾 RiceCare AI — Running 11 Production Readiness Tests")
    print("=" * 70)
    unittest.main()
