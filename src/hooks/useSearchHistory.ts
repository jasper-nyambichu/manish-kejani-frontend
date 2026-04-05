// src/hooks/useSearchHistory.ts
import { useState, useCallback } from 'react';

const KEY     = 'mk_search_history';
const MAX     = 8;

const isBrowser = typeof localStorage !== 'undefined';

const load = (): string[] => {
  try {
    if (!isBrowser) return [];
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch { return []; }
};

export const useSearchHistory = () => {
  const [history, setHistory] = useState<string[]>(load);

  const save = useCallback((query: string) => {
    const q = query.trim();
    if (!q) return;
    setHistory(prev => {
      const next = [q, ...prev.filter(h => h.toLowerCase() !== q.toLowerCase())].slice(0, MAX);
      if (isBrowser) localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const remove = useCallback((query: string) => {
    setHistory(prev => {
      const next = prev.filter(h => h !== query);
      if (isBrowser) localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    if (isBrowser) localStorage.removeItem(KEY);
    setHistory([]);
  }, []);

  return { history, save, remove, clear };
};
