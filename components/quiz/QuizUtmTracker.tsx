'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function QuizUtmTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const utmSource = searchParams.get('utm_source');
    const utmCampaign = searchParams.get('utm_campaign');
    const utmMedium = searchParams.get('utm_medium');

    if (utmSource || utmCampaign || utmMedium) {
      const payload = {
        utmSource: utmSource || '',
        utmCampaign: utmCampaign || '',
        utmMedium: utmMedium || '',
      };
      sessionStorage.setItem('quiz-utm', JSON.stringify(payload));
    }
  }, [searchParams]);

  return null;
}
