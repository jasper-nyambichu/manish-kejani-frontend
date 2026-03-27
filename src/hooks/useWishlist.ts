// src/hooks/useWishlist.ts
import { useWishlistStore } from '@/store/wishlistStore';
import type { Product } from '@/types/product.types';

export const useWishlist = () => {
  const { items, toggleItem, isInWishlist, removeItem, clearWishlist } = useWishlistStore();

  const toggle = (product: Product) => {
    const imageUrl = product.images?.[0]?.url ?? (product as any).image ?? '';
    const categoryName = typeof product.category === 'object'
      ? product.category.name
      : (product.category as string) ?? '';

    toggleItem({
      id:            product.id ?? product._id,
      name:          product.name,
      price:         product.price,
      originalPrice: product.originalPrice,
      image:         imageUrl,
      category:      categoryName,
      rating:        product.rating,
      reviews:       product.reviews,
      stock:         product.status,
      discount:      product.discountPercent,
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
