import { WasteRoute, AnalyticsData, AiAuditAnalysis, SampleImage } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const FALLBACK_SAMPLE_IMAGES: SampleImage[] = [
  {
    id: "clean_wet",
    name: "Clean Wet Waste (Kitchen/Vegetable Peels)",
    file: "clean_wet_waste.jpg",
    stream: "wet",
    description: "Doorstep segregated kitchen waste. No foreign plastic.",
    url: "/api/sample-images/clean_wet_waste.jpg"
  },
  {
    id: "contaminated_wet",
    name: "Contaminated Wet Waste (Plastic Bottles & Polybags)",
    file: "contaminated_wet_waste.jpg",
    stream: "wet",
    description: "Wet waste compartment contaminated with foreign PET bottles and blue plastic bags.",
    url: "/api/sample-images/contaminated_wet_waste.jpg"
  },
  {
    id: "clean_dry",
    name: "Clean Dry Recyclables (Cardboard & Cans)",
    file: "clean_dry_waste.jpg",
    stream: "dry",
    description: "Sorted dry recyclables ready for baling and recovery.",
    url: "/api/sample-images/clean_dry_waste.jpg"
  },
  {
    id: "contaminated_dry",
    name: "Contaminated Dry Waste (Grease & Organic Spills)",
    file: "contaminated_dry_waste.jpg",
    stream: "dry",
    description: "Paper recyclables ruined by wet organic leachate.",
    url: "/api/sample-images/contaminated_dry_waste.jpg"
  },
  {
    id: "hazardous",
    name: "Hazardous Waste (Batteries & Cans)",
    file: "hazardous_waste.jpg",
    stream: "hazardous",
    description: "Domestic hazardous items segregated in sealed compartments.",
    url: "/api/sample-images/hazardous_waste.jpg"
  }
];

export const FALLBACK_ROUTES: WasteRoute[] = [
  {
    id: "ROUTE-A",
    name: "Route A (Ward 102 - Indiranagar)",
    zone: "East Zone",
    vehicle: "KA-01-A-1088",
    vehicle_type: "Compactor Unit #1",
    driver: "Ramesh Kumar (ID: OP-882)",
    expected_stream: "wet",
    status: "HIGH_INTEGRITY",
    route_score: 96.7,
    coordinates: {
      collection: [12.9784, 77.6408],
      transfer: [12.9642, 77.6480],
      plant: [12.9352, 77.6245]
    },
    audits: [
      {
        id: "AUD-A1",
        stage: "Collection Vehicle",
        stage_code: "COLLECTION",
        timestamp: "2026-11-22T06:30:00Z",
        location: "Indiranagar 100ft Rd Collection Hub",
        stream: "wet",
        score: 100,
        status: "VERIFIED",
        contamination_percentage: 0.0,
        foreign_materials: [],
        detected_materials: ["organic_food", "vegetable_peels"],
        operator_notes: "Door-to-door segregated wet waste loaded from residential bins. Pristine organic compliance.",
        image_url: "/api/sample-images/clean_wet_waste.jpg"
      },
      {
        id: "AUD-A2",
        stage: "Transfer Station",
        stage_code: "TRANSFER",
        timestamp: "2026-11-22T07:45:00Z",
        location: "Domlur Transfer Station TS-01",
        stream: "wet",
        score: 95,
        status: "VERIFIED",
        contamination_percentage: 2.1,
        foreign_materials: ["trace paper scrap"],
        detected_materials: ["organic_food", "vegetable_peels"],
        operator_notes: "Compartment inspected prior to bulk transfer. Minimal leaf wrapper detected, within tolerable threshold.",
        image_url: "/api/sample-images/clean_wet_waste.jpg"
      },
      {
        id: "AUD-A3",
        stage: "Processing Plant Gate",
        stage_code: "PLANT_GATE",
        timestamp: "2026-11-22T09:15:00Z",
        location: "KCDC Biomethanation Facility Gate 1",
        stream: "wet",
        score: 95,
        status: "VERIFIED",
        contamination_percentage: 2.5,
        foreign_materials: [],
        detected_materials: ["organic_food"],
        operator_notes: "Weighbridge verification passed. Direct hopper feed approved.",
        image_url: "/api/sample-images/clean_wet_waste.jpg"
      }
    ]
  },
  {
    id: "ROUTE-B",
    name: "Route B (Ward 150 - Bellandur South)",
    zone: "South-East Zone",
    vehicle: "KA-04-E-2041",
    vehicle_type: "Tipper Truck #4",
    driver: "Suresh Gowda (ID: OP-419)",
    expected_stream: "wet",
    status: "FLAGGED",
    route_score: 66.7,
    flag_reason: "Segregation breakdown detected at Transfer Station TS-04: High plastic bottle and polybag mixing.",
    coordinates: {
      collection: [12.9260, 77.6762],
      transfer: [12.9150, 77.6620],
      plant: [12.8870, 77.6430]
    },
    audits: [
      {
        id: "AUD-B1",
        stage: "Collection Vehicle",
        stage_code: "COLLECTION",
        timestamp: "2026-11-22T06:15:00Z",
        location: "Green Glen Layout Collection Point",
        stream: "wet",
        score: 100,
        status: "VERIFIED",
        contamination_percentage: 0.0,
        foreign_materials: [],
        detected_materials: ["organic_food", "vegetable_peels"],
        operator_notes: "Residential pickup fully compliant. Citizens segregated properly at doorstep.",
        image_url: "/api/sample-images/clean_wet_waste.jpg"
      },
      {
        id: "AUD-B2",
        stage: "Transfer Station",
        stage_code: "TRANSFER",
        timestamp: "2026-11-22T08:00:00Z",
        location: "Bellandur Transfer Station TS-04",
        stream: "wet",
        score: 60,
        status: "FLAGGED",
        contamination_percentage: 22.8,
        foreign_materials: ["plastic_bottle", "polythene_bag", "plastic_wrapper"],
        detected_materials: ["organic_food", "plastic_bottle", "polythene_bag"],
        operator_notes: "AI FLAGGED: Multiple uncompressed PET plastic bottles and blue polybags dumped into wet compartment during mechanical transfer.",
        image_url: "/api/sample-images/contaminated_wet_waste.jpg"
      },
      {
        id: "AUD-B3",
        stage: "Processing Plant Gate",
        stage_code: "PLANT_GATE",
        timestamp: "2026-11-22T09:40:00Z",
        location: "Chikka Nagamangala Waste Plant Gate 3",
        stream: "wet",
        score: 40,
        status: "FLAGGED",
        contamination_percentage: 34.0,
        foreign_materials: ["plastic_bottle", "polythene_bag"],
        detected_materials: ["organic_food", "plastic_bottle", "polythene_bag"],
        operator_notes: "Severe foreign plastic mixing confirmed at gate scanner. Compost batch rejected for refinement.",
        image_url: "/api/sample-images/contaminated_wet_waste.jpg"
      }
    ]
  },
  {
    id: "ROUTE-C",
    name: "Route C (Ward 084 - Koramangala 4th Block)",
    zone: "South Zone",
    vehicle: "KA-03-F-7712",
    vehicle_type: "E-Cart Fleet #2",
    driver: "M. Manjunath (ID: OP-712)",
    expected_stream: "dry",
    status: "NEEDS_ATTENTION",
    route_score: 88.3,
    coordinates: {
      collection: [12.9340, 77.6280],
      transfer: [12.9390, 77.6180],
      plant: [12.9510, 77.5940]
    },
    audits: [
      {
        id: "AUD-C1",
        stage: "Collection Vehicle",
        stage_code: "COLLECTION",
        timestamp: "2026-11-22T07:00:00Z",
        location: "Koramangala 4th Block Hub",
        stream: "dry",
        score: 90,
        status: "VERIFIED",
        contamination_percentage: 4.5,
        foreign_materials: [],
        detected_materials: ["cardboard", "paper"],
        operator_notes: "Dry recyclables collected from commercial and residential complexes.",
        image_url: "/api/sample-images/clean_dry_waste.jpg"
      },
      {
        id: "AUD-C2",
        stage: "Transfer Station",
        stage_code: "TRANSFER",
        timestamp: "2026-11-22T08:20:00Z",
        location: "Ejipura Secondary Transfer TS-02",
        stream: "dry",
        score: 90,
        status: "VERIFIED",
        contamination_percentage: 5.0,
        foreign_materials: [],
        detected_materials: ["cardboard", "metal_can"],
        operator_notes: "Baled cardboard and PET sorted properly.",
        image_url: "/api/sample-images/clean_dry_waste.jpg"
      },
      {
        id: "AUD-C3",
        stage: "Processing Plant Gate",
        stage_code: "PLANT_GATE",
        timestamp: "2026-11-22T10:10:00Z",
        location: "Materials Recovery Facility (MRF) Koramangala",
        stream: "dry",
        score: 85,
        status: "NEEDS_ATTENTION",
        contamination_percentage: 8.5,
        foreign_materials: ["moisture_stains"],
        detected_materials: ["cardboard", "paper"],
        operator_notes: "Minor organic leachate dampness observed on bottom layer cartons.",
        image_url: "/api/sample-images/clean_dry_waste.jpg"
      }
    ]
  },
  {
    id: "ROUTE-D",
    name: "Route D (Ward 174 - HSR Sector 2)",
    zone: "South Zone",
    vehicle: "KA-05-H-3390",
    vehicle_type: "Hazardous Shield Van",
    driver: "Anand V. (ID: OP-339)",
    expected_stream: "hazardous",
    status: "HIGH_INTEGRITY",
    route_score: 98.3,
    coordinates: {
      collection: [12.9120, 77.6440],
      transfer: [12.9050, 77.6320],
      plant: [12.8710, 77.6010]
    },
    audits: [
      {
        id: "AUD-D1",
        stage: "Collection Vehicle",
        stage_code: "COLLECTION",
        timestamp: "2026-11-22T06:50:00Z",
        location: "HSR Club Road Collection Point",
        stream: "hazardous",
        score: 100,
        status: "VERIFIED",
        contamination_percentage: 0.0,
        foreign_materials: [],
        detected_materials: ["hazardous_battery", "e_waste"],
        operator_notes: "Special collection van with sealed red bins.",
        image_url: "/api/sample-images/hazardous_waste.jpg"
      },
      {
        id: "AUD-D2",
        stage: "Transfer Station",
        stage_code: "TRANSFER",
        timestamp: "2026-11-22T08:10:00Z",
        location: "HSR Transfer Station TS-05",
        stream: "hazardous",
        score: 100,
        status: "VERIFIED",
        contamination_percentage: 0.0,
        foreign_materials: [],
        detected_materials: ["hazardous_battery"],
        operator_notes: "Barcoded containers transferred with seal intact.",
        image_url: "/api/sample-images/hazardous_waste.jpg"
      },
      {
        id: "AUD-D3",
        stage: "Processing Plant Gate",
        stage_code: "PLANT_GATE",
        timestamp: "2026-11-22T10:00:00Z",
        location: "Hazardous Waste Treatment Centre Gate 1",
        stream: "hazardous",
        score: 95,
        status: "VERIFIED",
        contamination_percentage: 2.0,
        foreign_materials: [],
        detected_materials: ["hazardous_battery"],
        operator_notes: "Hazmat custody verified.",
        image_url: "/api/sample-images/hazardous_waste.jpg"
      }
    ]
  }
];

export const FALLBACK_ANALYTICS: AnalyticsData = {
  fleet_integrity_score: 84.8,
  total_routes: 4,
  flagged_routes: 1,
  attention_routes: 1,
  high_integrity_routes: 2,
  stage_breakdown: {
    "Collection Vehicle": { total: 4, flagged: 0, avg_score: 97.5 },
    "Transfer Station": { total: 4, flagged: 1, avg_score: 86.2 },
    "Processing Plant Gate": { total: 4, flagged: 1, avg_score: 78.8 }
  },
  foreign_material_frequency: [
    { name: "Plastic Bottles", count: 6 },
    { name: "Polythene Bags", count: 4 },
    { name: "Plastic Wrappers", count: 3 },
    { name: "Organic Leachate", count: 2 }
  ],
  compliance_thresholds: {
    high: "90 - 100",
    attention: "70 - 89",
    flagged: "Below 70"
  }
};

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(3000) });
    const data = await res.json();
    return data.status === 'online';
  } catch {
    return false;
  }
}

export async function fetchRoutes(): Promise<WasteRoute[]> {
  try {
    const res = await fetch(`${API_BASE}/routes`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return FALLBACK_ROUTES;
  }
}

export async function fetchRouteById(id: string): Promise<WasteRoute> {
  try {
    const res = await fetch(`${API_BASE}/routes/${id}`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return FALLBACK_ROUTES.find(r => r.id === id) || FALLBACK_ROUTES[0];
  }
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
  try {
    const res = await fetch(`${API_BASE}/analytics`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return FALLBACK_ANALYTICS;
  }
}

export async function fetchSampleImages(): Promise<SampleImage[]> {
  try {
    const res = await fetch(`${API_BASE}/sample-images`, { signal: AbortSignal.timeout(3000) });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return FALLBACK_SAMPLE_IMAGES;
  }
}

export async function analyzeAuditImage(payload: {
  sample_filename?: string;
  image_base64?: string;
  image_file?: File;
  expected_stream: string;
  route_id?: string;
  stage?: string;
}): Promise<AiAuditAnalysis> {
  if (payload.image_file) {
    const formData = new FormData();
    formData.append('image', payload.image_file);
    formData.append('expected_stream', payload.expected_stream);
    if (payload.route_id) formData.append('route_id', payload.route_id);
    if (payload.stage) formData.append('stage', payload.stage);

    const res = await fetch(`${API_BASE}/audit/analyze`, {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) throw new Error('Image analysis failed');
    return res.json();
  }

  const res = await fetch(`${API_BASE}/audit/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sample_filename: payload.sample_filename,
      image_base64: payload.image_base64,
      expected_stream: payload.expected_stream,
      route_id: payload.route_id,
      stage: payload.stage,
    }),
  });
  if (!res.ok) throw new Error('Image analysis failed');
  return res.json();
}

export async function recordHandoffAudit(
  routeId: string,
  auditData: {
    stage: string;
    location: string;
    score: number;
    contamination_percentage: number;
    status: string;
    foreign_materials: string[];
    detected_materials: string[];
    operator_notes: string;
    image_url: string;
  }
): Promise<{ message: string; updated_route: WasteRoute }> {
  try {
    const res = await fetch(`${API_BASE}/routes/${routeId}/audits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(auditData),
    });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    // Local mock update
    const route = FALLBACK_ROUTES.find(r => r.id === routeId) || FALLBACK_ROUTES[1];
    return {
      message: "Handoff audit recorded locally",
      updated_route: route
    };
  }
}

export async function resetDemoData(): Promise<WasteRoute[]> {
  try {
    const res = await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
    const data = await res.json();
    return data.routes;
  } catch {
    return FALLBACK_ROUTES;
  }
}

export async function simulateRouteBreakdown(): Promise<WasteRoute> {
  try {
    const res = await fetch(`${API_BASE}/demo/simulate-breakdown`, { method: 'POST' });
    const data = await res.json();
    return data.route;
  } catch {
    return FALLBACK_ROUTES[1];
  }
}
