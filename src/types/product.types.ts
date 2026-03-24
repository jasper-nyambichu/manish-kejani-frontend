export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  categorySlug?: string;
  description?: string;
  specs?: Record<string, string>;
  rating: number;
  reviews: number;
  stock: "in-stock" | "low-stock" | "out-of-stock";
  discount?: number;
  isFlashDeal?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  category: string;
  description?: string;
  specs?: Record<string, string>;
  stock: "in-stock" | "low-stock" | "out-of-stock";
  discount?: number;
  isFlashDeal?: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
}
