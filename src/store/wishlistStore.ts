import { useState, useCallback, useEffect } from "react";

const WISHLIST_KEY = "mk_wishlist";

function getStoredWishlist(): string[] {
  try {
    return JSON.parse(localStorage.getItem(WISHLIST_KEY) || "[]");
  } catch {
    return [];
  }
}

export function useWishlistStore() {
  const [items, setItems] = useState<string[]>(getStoredWishlist);

  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }, [items]);

  const add = useCallback((id: string) => {
    setItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i !== id));
  }, []);

  const toggle = useCallback((id: string) => {
    setItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const isWishlisted = useCallback(
    (id: string) => items.includes(id),
    [items]
  );

  return { items, add, remove, toggle, isWishlisted, count: items.length };
}
