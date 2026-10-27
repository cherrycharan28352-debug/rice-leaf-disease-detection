export interface SeverityInfo {
  severity_level: string;
  healthy_area_pct: number;
  affected_area_pct: number;
  lesion_count: number;
}

export interface PredictionResult {
  success: boolean;
  disease: string;
  confidence: number;
  confidence_percentage: number;
  confidence_level: 'High' | 'Moderate' | 'Low';
  advisory: string;
  scientific_name: string;
  pathogen_type: string;
  symptoms: string;
  causes: string;
  contributing_factors?: string;
  prevention: string;
  management: string;
  next_steps: string[];
  severity: SeverityInfo;
  top_predictions?: { disease: string; confidence: number }[];
  image_url: string;
  gradcam_url?: string | null;
  prediction_id?: number;
  timestamp: string;
  disclaimer?: string;
}

export interface DiseaseItem {
  id: number;
  code: string;
  name: string;
  scientific_name: string;
  pathogen_type: string;
  description: string;
  symptoms: string;
  favorable_conditions: string;
  contributing_factors: string;
  prevention: string;
  management: string;
  expert_consultation: string;
  sample_image_url?: string | null;
}

export interface DashboardStats {
  total_analyses: number;
  most_common_disease: string;
  average_confidence: number;
  disease_distribution: { disease_name: string; count: number; avg_conf: number }[];
  severity_distribution: { severity_level: string; count: number }[];
  recent_scans: {
    id: number;
    disease_name: string;
    confidence: number;
    severity_level: string;
    image_url: string;
    gradcam_url?: string | null;
    created_at: string;
  }[];
}

export interface HistoryRecord {
  id: number;
  user_id: number;
  disease_name: string;
  confidence: number;
  severity_level: string;
  healthy_area_pct: number;
  affected_area_pct: number;
  lesion_count: number;
  image_url: string;
  gradcam_url?: string | null;
  created_at: string;
  scientific_name?: string;
}

export interface UserProfile {
  id: number;
  full_name: string;
  username: string;
  email: string;
  role: string;
  location?: string;
  phone?: string;
  created_at?: string;
}
