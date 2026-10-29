import os
import sys
import json

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__) + "/.."))
from ml.dataset_info import DISEASE_CLASSES, DISEASE_DETAILS
from ml.pesticide_database import PESTICIDE_ADVISORY_DATABASE, VERIFICATION_CYCLE, AUTHORITY_SOURCE

database = {
    "version": "2026.10.29",
    "verification_cycle": VERIFICATION_CYCLE,
    "authority_source": AUTHORITY_SOURCE,
    "classes": DISEASE_CLASSES,
    "disease_details": DISEASE_DETAILS,
    "pesticide_advisories": PESTICIDE_ADVISORY_DATABASE
}

out_dir = os.path.join(os.path.dirname(__file__), "..", "frontend-react", "src", "data")
os.makedirs(out_dir, exist_ok=True)
out_file = os.path.join(out_dir, "diseaseDatabase.json")

with open(out_file, "w", encoding="utf-8") as f:
    json.dump(database, f, indent=2, ensure_ascii=False)

print(f"Exported diseaseDatabase.json successfully ({os.path.getsize(out_file)} bytes).")
