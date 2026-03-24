// src/store/wishlistStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
  id:            string;
  name:          string;
  price:         number;
  originalPrice?: number;
  image:         string;
  category:      string;
  rating:        number;
  reviews:       number;
  stock:         string;
  discount?:     number;
}

interface WishlistStore {
  items:        WishlistItem[];
  addItem:      (item: WishlistItem) => void;
  removeItem:   (id: string) => void;
  toggleItem:   (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          if (state.items.find((i) => i.id === item.id)) return state;
          return { items: [...state.items, item] };
        });
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },

      toggleItem: (item) => {
        const { isInWishlist, addItem, removeItem } = get();
        if (isInWishlist(item.id)) {
          removeItem(item.id);
        } else {
          addItem(item);
        }
      },

      isInWishlist: (id) => {
        return get().items.some((i) => i.id === id);
      },

      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'mk_wishlist',
    }
  )
);