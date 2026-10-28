import requests
import json
import sys

# Ensure UTF-8 output encoding
sys.stdout.reconfigure(encoding='utf-8')

url = "http://127.0.0.1:8000/api/predict"
sample_file = "frontend/assets/sample_leaves/01_brown_spot.jpg"

with open(sample_file, "rb") as f:
    resp = requests.post(url, files={"file": f})

print("Status Code:", resp.status_code)
data = resp.json()
print("Keys:", list(data.keys()))
print("Success:", data.get("success"))
print("Disease:", data.get("disease") or data.get("primary_disease"))
print("Confidence:", data.get("confidence"))
print("Confidence Level:", data.get("confidence_level"))
print("Unreliable:", data.get("unreliable"))
advisory = data.get("pesticide_advisory")
if advisory:
    print("--- PESTICIDE ADVISORY ATTACHED ---")
    print("Disease (KN):", advisory.get("disease_name_kn"))
    print("Disease (EN):", advisory.get("disease_name_en"))
    print("Active Ingredient:", advisory.get("active_ingredient"))
    print("Formulation:", advisory.get("formulation"))
    print("Label Rate:", advisory.get("label_rate"))
    print("PHI (Days):", advisory.get("pre_harvest_interval_days"))
    print("REI (Hours):", advisory.get("re_entry_interval_hours"))
    print("Source:", advisory.get("source_url"))
    print("Status:", advisory.get("advisory_status"))
    print("Non-Chemical (EN):", advisory.get("nonchemical_management_en")[:80], "...")
    print("Non-Chemical (KN):", advisory.get("nonchemical_management_kn")[:80], "...")
else:
    print("No pesticide advisory attached!")
