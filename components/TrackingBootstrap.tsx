'use client';

import { useEffect } from 'react';
import { persistUtmParams } from '@/lib/analytics';

export default function TrackingBootstrap() {
  useEffect(() => {
    persistUtmParams();
  }, []);

  return null;
}
