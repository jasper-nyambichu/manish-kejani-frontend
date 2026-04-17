// src/hooks/useRecentlyViewed.ts
import { useState, useCallback } from 'react';

const KEY = 'mk_recently_viewed';
const MAX = 10;

interface ViewedItem {
  id:       string;
  name:     string;
  price:    number;
  image:    string;
  category: string;
  rating:   number;
  discount?: number;
}

const load = (): ViewedItem[] => {
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); }
  catch { return []; }
};

export const useRecentlyViewed = () => {
  const [items, setItems] = useState<ViewedItem[]>(load);

  const track = useCallback((item: ViewedItem) => {
    if (!item.id) return;
    setItems(prev => {
      const next = [item, ...prev.filter(i => i.id !== item.id)].slice(0, MAX);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    localStorage.removeItem(KEY);
    setItems([]);
  }, []);

  return { items, track, clear };
};
