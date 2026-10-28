"""
RiceCare AI — Remote Content Publishing Tool
Allows instant zero-reinstall content, text, announcement, and pesticide updates
from Antigravity to all farmers' mobile phones and web clients.
"""

import os
import sys
import json
import argparse
import requests
from datetime import datetime, timezone

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from backend.remote_config_manager import (
    get_active_remote_config,
    publish_remote_config,
    validate_remote_config_schema
)

DEFAULT_SERVER = "http://127.0.0.1:8000"
DEFAULT_ADMIN_KEY = os.getenv("ADMIN_API_KEY", "ricecare_admin_secure_key_2026")


def add_announcement(title_kn: str, title_en: str, msg_kn: str, msg_en: str, target_server: str = None, admin_key: str = None):
    cfg = get_active_remote_config()
    
    ann_id = f"ann-{datetime.now(timezone.utc).strftime('%Y%m%d%H%M%S')}"
    new_ann = {
        "id": ann_id,
        "active": True,
        "type": "advisory",
        "priority": "high",
        "title_en": title_en,
        "title_kn": title_kn,
        "message_en": msg_en,
        "message_kn": msg_kn
    }

    # Prepend new announcement
    announcements = cfg.get("announcements", [])
    # Keep max 5 active announcements
    announcements = [new_ann] + [a for a in announcements if a.get("id") != ann_id][:4]
    cfg["announcements"] = announcements

    # Bump config version timestamp
    new_version = datetime.now(timezone.utc).strftime("%Y.%m.%d.%H%M")
    cfg["config_version"] = new_version

    if target_server and target_server != "local":
        # Push over HTTP API
        url = f"{target_server.rstrip('/')}/api/v1/admin/remote-config/publish"
        headers = {"X-Admin-Key": admin_key or DEFAULT_ADMIN_KEY, "Content-Type": "application/json"}
        resp = requests.post(url, json=cfg, headers=headers)
        if resp.status_code == 200:
            print(f"✅ Successfully published remote update to {target_server}: Version {new_version}")
        else:
            print(f"❌ Failed to publish to server: {resp.status_code} - {resp.text}")
    else:
        # Publish directly to local SQLite
        publish_remote_config(cfg, published_by="antigravity_cli")
        print(f"✅ Successfully published update locally: Version {new_version}")


def main():
    parser = argparse.ArgumentParser(description="Publish remote content updates to RiceCare AI")
    parser.add_argument("--title-kn", default="ಹೊಸ ಕೃಷಿ ಪ್ರಕಟಣೆ", help="Announcement title in Kannada")
    parser.add_argument("--title-en", default="New Agricultural Advisory", help="Announcement title in English")
    parser.add_argument("--msg-kn", required=True, help="Announcement message in Kannada")
    parser.add_argument("--msg-en", required=True, help="Announcement message in English")
    parser.add_argument("--server", default="local", help="Target server URL (or 'local')")
    parser.add_argument("--admin-key", default=DEFAULT_ADMIN_KEY, help="Admin API authentication key")

    args = parser.parse_args()
    add_announcement(
        title_kn=args.title_kn,
        title_en=args.title_en,
        msg_kn=args.msg_kn,
        msg_en=args.msg_en,
        target_server=args.server,
        admin_key=args.admin_key
    )


if __name__ == "__main__":
    main()
