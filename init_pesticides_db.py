import sqlite3
import os
import sys

# Ensure ml package is discoverable
ROOT_DIR = r"C:\Users\DELL\.gemini\antigravity\scratch\rice-leaf-disease-detection"
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from ml.pesticide_database import PESTICIDE_ADVISORY_DATABASE

db_path = os.path.join(ROOT_DIR, "agriversion.db")
conn = sqlite3.connect(db_path)
cur = conn.cursor()

# Create table pesticide_advisories
cur.execute("""
CREATE TABLE IF NOT EXISTS pesticide_advisories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    disease_id INTEGER UNIQUE,
    disease_name_en TEXT NOT NULL,
    disease_name_kn TEXT NOT NULL,
    pathogen_type TEXT NOT NULL,
    symptoms_en TEXT,
    symptoms_kn TEXT,
    has_chemical_option BOOLEAN,
    nonchemical_management_en TEXT,
    nonchemical_management_kn TEXT,
    prevention_en TEXT,
    prevention_kn TEXT,
    active_ingredient TEXT,
    formulation TEXT,
    registered_crop TEXT,
    approved_target_disease TEXT,
    label_rate TEXT,
    application_method TEXT,
    safety_precautions TEXT,
    pre_harvest_interval_days INTEGER,
    re_entry_interval_hours INTEGER,
    source_url TEXT,
    verification_date TEXT,
    advisory_status TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
""")

for name, item in PESTICIDE_ADVISORY_DATABASE.items():
    cur.execute("""
        INSERT INTO pesticide_advisories (
            disease_id, disease_name_en, disease_name_kn, pathogen_type,
            symptoms_en, symptoms_kn, has_chemical_option,
            nonchemical_management_en, nonchemical_management_kn,
            prevention_en, prevention_kn, active_ingredient, formulation,
            registered_crop, approved_target_disease, label_rate,
            application_method, safety_precautions, pre_harvest_interval_days,
            re_entry_interval_hours, source_url, verification_date, advisory_status
        ) VALUES (
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
        ON CONFLICT(disease_id) DO UPDATE SET
            disease_name_en=excluded.disease_name_en,
            disease_name_kn=excluded.disease_name_kn,
            pathogen_type=excluded.pathogen_type,
            symptoms_en=excluded.symptoms_en,
            symptoms_kn=excluded.symptoms_kn,
            has_chemical_option=excluded.has_chemical_option,
            nonchemical_management_en=excluded.nonchemical_management_en,
            nonchemical_management_kn=excluded.nonchemical_management_kn,
            prevention_en=excluded.prevention_en,
            prevention_kn=excluded.prevention_kn,
            active_ingredient=excluded.active_ingredient,
            formulation=excluded.formulation,
            registered_crop=excluded.registered_crop,
            approved_target_disease=excluded.approved_target_disease,
            label_rate=excluded.label_rate,
            application_method=excluded.application_method,
            safety_precautions=excluded.safety_precautions,
            pre_harvest_interval_days=excluded.pre_harvest_interval_days,
            re_entry_interval_hours=excluded.re_entry_interval_hours,
            source_url=excluded.source_url,
            verification_date=excluded.verification_date,
            advisory_status=excluded.advisory_status;
    """, (
        item["disease_id"], item["disease_name_en"], item["disease_name_kn"], item["pathogen_type"],
        item["symptoms_en"], item["symptoms_kn"], item["has_chemical_option"],
        item["nonchemical_management_en"], item["nonchemical_management_kn"],
        item["prevention_en"], item["prevention_kn"], item["active_ingredient"], item["formulation"],
        item["registered_crop"], item["approved_target_disease"], item["label_rate"],
        item["application_method"], item["safety_precautions"], item["pre_harvest_interval_days"],
        item["re_entry_interval_hours"], item["source_url"], item["verification_date"], item["advisory_status"]
    ))

conn.commit()
print("Populated pesticide_advisories table successfully with 20 records!")
cur.execute("SELECT COUNT(*) FROM pesticide_advisories")
print("Total rows:", cur.fetchone()[0])
conn.close()
