declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type UtmAttribution = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
};

export const UTM_STORAGE_KEY = 'utm-attribution';
export const LEGACY_QUIZ_UTM_STORAGE_KEY = 'quiz-utm';

export function pushToDataLayer(event: string, payload: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

export function persistUtmParams() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  const utm: UtmAttribution = {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
    utmContent: params.get('utm_content') || undefined,
  };

  const hasAny = Object.values(utm).some(Boolean);
  if (!hasAny) return;

  const serialized = JSON.stringify(utm);
  sessionStorage.setItem(UTM_STORAGE_KEY, serialized);
  sessionStorage.setItem(LEGACY_QUIZ_UTM_STORAGE_KEY, serialized);
}

export function getStoredUtmParams(): UtmAttribution {
  if (typeof window === 'undefined') return {};

  const keys = [UTM_STORAGE_KEY, LEGACY_QUIZ_UTM_STORAGE_KEY];

  for (const key of keys) {
    try {
      const raw = sessionStorage.getItem(key);
      if (!raw) continue;

      const parsed = JSON.parse(raw) as UtmAttribution;
      if (Object.values(parsed).some(Boolean)) {
        return parsed;
      }
    } catch {
      // ignore invalid session storage data
    }
  }

  return {};
}
