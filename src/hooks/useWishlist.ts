// src/hooks/useWishlist.ts
import { useWishlistStore } from '@/store/wishlistStore';
import type { Product } from '@/data/products';

export const useWishlist = () => {
  const { items, toggleItem, isInWishlist, removeItem, clearWishlist } = useWishlistStore();

  const toggle = (product: Product) => {
    toggleItem({
      id:            product.id,
      name:          product.name,
      price:         product.price,
      originalPrice: product.originalPrice,
      image:         product.image,
      category:      typeof product.category === 'string'
                       ? product.category
                       : (product.category as any)?.name ?? '',
      rating:        product.rating,
      reviews:       product.reviews,
      stock:         product.stock,
      discount:      product.discount,
    });
  };

  return {
    wishlist:     items,
    count:        items.length,
    toggleItem:   toggle,
    removeItem,
    isInWishlist,
    clearWishlist,
  };
};