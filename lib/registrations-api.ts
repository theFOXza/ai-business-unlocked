const API_URL = process.env.AIBU_REGISTRATIONS_API_URL!;
const API_KEY = process.env.AIBU_REGISTRATIONS_API_KEY!;

if (typeof window !== 'undefined') {
  throw new Error('registrations-api helper is server-only');
}

export interface CreateRegistrationData {
  stripe_session_id: string;
  stripe_customer_id?: string | null;
  name: string;
  email: string;
  phone?: string;
  business_name?: string;
  industry?: string;
  pain_point?: string;
  ai_familiarity?: string;
  amount_cents?: number;
  currency?: string;
  event_date?: string;
  metadata?: Record<string, unknown>;
}

export interface Registration {
  id: string;
  event_id: string;
  stripe_session_id: string;
  name: string;
  email: string;
  phone?: string | null;
  business_name?: string | null;
  industry?: string | null;
  pain_point?: string | null;
  ai_familiarity?: string | null;
  amount_cents?: number | null;
  event_date: string;
  sent_confirmation: boolean;
  sent_t7: boolean;
  sent_t1: boolean;
  sent_day_of: boolean;
}

export async function createRegistration(data: CreateRegistrationData) {
  const res = await fetch(`${API_URL}/registrations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Registrations API failed: ${res.status} ${body}`);
  }

  return res.json() as Promise<Registration>;
}

export async function fetchPendingRegistrations(stage: 't7' | 't1' | 'day_of') {
  const res = await fetch(`${API_URL}/registrations/pending?stage=${stage}`, {
    headers: { 'X-API-Key': API_KEY },
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Fetch pending failed: ${res.status} ${body}`);
  }

  return res.json() as Promise<{ stage: string; count: number; registrations: Registration[] }>;
}

export async function markSent(id: string, stage: 'confirmation' | 't7' | 't1' | 'day_of') {
  const res = await fetch(`${API_URL}/registrations/${id}/sent`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': API_KEY,
    },
    body: JSON.stringify({ stage }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Mark sent failed: ${res.status} ${body}`);
  }

  return res.json();
}
