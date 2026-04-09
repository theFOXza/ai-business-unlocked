'use client';

import { useEffect } from 'react';
import { pushToDataLayer } from '@/lib/analytics';

type PurchaseTrackingProps = {
  value: number;
  currency: string;
  transactionId?: string;
};

export default function PurchaseTracking({ value, currency, transactionId }: PurchaseTrackingProps) {
  useEffect(() => {
    pushToDataLayer('purchase', {
      value,
      currency,
      ...(transactionId ? { transaction_id: transactionId } : {}),
    });
  }, [currency, transactionId, value]);

  return null;
}
