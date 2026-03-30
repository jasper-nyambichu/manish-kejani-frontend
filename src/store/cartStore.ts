// src/store/cartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id:             string;
  name:           string;
  price:          number;
  originalPrice?: number;
  image:          string;
  category:       string;
  rating:         number;
  reviews:        number;
  stock:          string;
  discount?:      number;
  quantity:       number;
}

interface CartStore {
  items:       CartItem[];
  addItem:     (item: Omit<CartItem, 'quantity'>) => void;
  removeItem:  (id: string) => void;
  updateQty:   (id: string, quantity: number) => void;
  isInCart:    (id: string) => boolean;
  clearCart:   () => void;
  totalItems:  () => number;
  totalPrice:  () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(i => i.id === item.id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        });
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter(i => i.id !== id) }));
      },

      updateQty: (id, quantity) => {
        if (quantity < 1) {
          get().removeItem(id);
          return;
        }
        set((state) => ({
          items: state.items.map(i => i.id === id ? { ...i, quantity } : i),
        }));
      },

      isInCart: (id) => get().items.some(i => i.id === id),

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'mk_cart' }
  )
);
