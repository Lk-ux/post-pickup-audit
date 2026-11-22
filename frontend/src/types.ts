export type WasteStream = 'wet' | 'dry' | 'hazardous';
export type AuditStatus = 'VERIFIED' | 'NEEDS_ATTENTION' | 'FLAGGED';

export interface BoundingBox {
  label: string;
  class_name: string;
  confidence: number;
  is_foreign: boolean;
  box: [number, number, number, number]; // [ymin, xmin, ymax, xmax] normalized 0..1
}

export interface AiAuditAnalysis {
  expected_stream: WasteStream;
  detected_materials: string[];
  foreign_materials: string[];
  foreign_material_detected: boolean;
  contamination_estimate: number;
  confidence: number;
  status: AuditStatus;
  audit_score: number;
  bounding_boxes: BoundingBox[];
  annotated_image?: string;
}

export interface HandoffAudit {
  id: string;
  stage: string;
  stage_code: 'COLLECTION' | 'TRANSFER' | 'PLANT_GATE';
  timestamp: string;
  location: string;
  stream: WasteStream;
  score: number;
  status: AuditStatus;
  contamination_percentage: number;
  foreign_materials: string[];
  detected_materials: string[];
  operator_notes: string;
  image_url: string;
}

export interface WasteRoute {
  id: string;
  name: string;
  zone: string;
  vehicle: string;
  vehicle_type: string;
  driver: string;
  expected_stream: WasteStream;
  status: 'HIGH_INTEGRITY' | 'NEEDS_ATTENTION' | 'FLAGGED';
  route_score: number;
  flag_reason?: string;
  coordinates: {
    collection: [number, number];
    transfer: [number, number];
    plant: [number, number];
  };
  audits: HandoffAudit[];
}

export interface AnalyticsData {
  fleet_integrity_score: number;
  total_routes: number;
  flagged_routes: number;
  attention_routes: number;
  high_integrity_routes: number;
  stage_breakdown: Record<string, { total: number; flagged: number; avg_score: number }>;
  foreign_material_frequency: { name: string; count: number }[];
  compliance_thresholds: {
    high: string;
    attention: string;
    flagged: string;
  };
}

export interface SampleImage {
  id: string;
  name: string;
  file: string;
  stream: WasteStream;
  description: string;
  url: string;
}
