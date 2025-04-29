"use client";           // if you ever migrate to the /app folder

import { useEffect, useState } from 'react';
import { database } from '../firebase-config';
import { ref, onValue, off } from 'firebase/database';

/** Realtime subscription. */
export function useRealtimeValue<T = unknown>(path: string) {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    // Runs **only in the browser**; useEffect never fires during SSR
    const dbRef = ref(database, path);
    onValue(dbRef, (snap) => setData(snap.val()));
    return () => off(dbRef);           // clean-up
  }, [path]);

  return data;
}
