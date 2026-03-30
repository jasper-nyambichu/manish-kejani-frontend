// src/hooks/useCart.ts
import { useCartStore } from '@/store/cartStore';
import type { Product } from '@/types/product.types';

export const useCart = () => {
  const { items, addItem, removeItem, updateQty, isInCart, clearCart, totalItems, totalPrice } = useCartStore();

  const add = (product: Product) => {
    const imageUrl     = product.images?.[0]?.url ?? (product as any).image ?? '';
    const categoryName = typeof product.category === 'object'
      ? product.category.name
      : (product.category as string) ?? '';

    addItem({
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
    cart:        items,
    count:       totalItems(),
    totalPrice:  totalPrice(),
    addToCart:   add,
    removeItem,
    updateQty,
    isInCart,
    clearCart,
  };
};
