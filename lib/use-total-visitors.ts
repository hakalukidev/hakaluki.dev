'use client';

import { useEffect, useState } from 'react';
import { onValue, ref, runTransaction } from 'firebase/database';

import { realtimeDb } from '@/lib/firebase';

const TOTAL_VISITORS_PATH = 'stats/total_visitors';
const SESSION_FLAG = 'hakaluki-visit-counted';

export function useTotalVisitors() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const totalRef = ref(realtimeDb, TOTAL_VISITORS_PATH);

    if (!sessionStorage.getItem(SESSION_FLAG)) {
      sessionStorage.setItem(SESSION_FLAG, '1');
      runTransaction(totalRef, (current: number | null) => (current ?? 0) + 1).catch(() => {});
    }

    const unsubscribe = onValue(
      totalRef,
      (snapshot) => setCount(snapshot.val() ?? 0),
      () => setCount(null)
    );

    return () => unsubscribe();
  }, []);

  return count;
}
