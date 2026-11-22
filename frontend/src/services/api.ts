import { WasteRoute, AnalyticsData, AiAuditAnalysis, SampleImage } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export async function checkBackendHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/health`);
    const data = await res.json();
    return data.status === 'online';
  } catch {
    return false;
  }
}

export async function fetchRoutes(): Promise<WasteRoute[]> {
  const res = await fetch(`${API_BASE}/routes`);
  if (!res.ok) throw new Error('Failed to fetch routes');
  return res.json();
}

export async function fetchRouteById(id: string): Promise<WasteRoute> {
  const res = await fetch(`${API_BASE}/routes/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch route ${id}`);
  return res.json();
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
  const res = await fetch(`${API_BASE}/analytics`);
  if (!res.ok) throw new Error('Failed to fetch analytics');
  return res.json();
}

export async function fetchSampleImages(): Promise<SampleImage[]> {
  const res = await fetch(`${API_BASE}/sample-images`);
  if (!res.ok) throw new Error('Failed to fetch sample images');
  return res.json();
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
  const res = await fetch(`${API_BASE}/routes/${routeId}/audits`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(auditData),
  });
  if (!res.ok) throw new Error('Failed to record handoff audit');
  return res.json();
}

export async function resetDemoData(): Promise<WasteRoute[]> {
  const res = await fetch(`${API_BASE}/demo/reset`, { method: 'POST' });
  const data = await res.json();
  return data.routes;
}

export async function simulateRouteBreakdown(): Promise<WasteRoute> {
  const res = await fetch(`${API_BASE}/demo/simulate-breakdown`, { method: 'POST' });
  const data = await res.json();
  return data.route;
}
