// src/products.ts
// Static mock data removed — all products now come from the API
// Types re-exported for backward compatibility
export type { Product, ProductFormData } from '@/types/product.types';

export interface Category {
  id:           string;
  name:         string;
  slug:         string;
  icon:         string;
  productCount: number;
}

// Empty arrays — data now comes from API via useCategories() and useProducts()
export const categories: Category[] = [];
export const products: any[]        = [];
