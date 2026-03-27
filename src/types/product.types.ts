// src/types/product.types.ts
export interface ProductImage {
  url:      string;
  publicId: string;
}

export interface ProductCategory {
  _id:  string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Product {
  _id:            string;
  id?:            string; // virtual from toJSON transform
  name:           string;
  description?:   string;
  price:          number;
  originalPrice?: number;
  discountPercent?: number;
  images:         ProductImage[];
  image?:         string; // virtual — first image url
  category:       ProductCategory | string;
  subcategory?:   string;
  status:         'in_stock' | 'low_stock' | 'out_of_stock' | 'coming_soon';
  featured:       boolean;
  isFlashDeal:    boolean;
  isNewArrival:   boolean;
  rating:         number;
  reviews:        number;
  specifications?: { label: string; value: string }[];
  tags?:          string[];
  sku?:           string;
  viewCount?:     number;
  createdAt?:     string;
  updatedAt?:     string;
}

export interface ProductFormData {
  name:           string;
  description:    string;
  price:          number;
  originalPrice?: number;
  category:       string;
  status:         'in_stock' | 'out_of_stock' | 'coming_soon';
  featured?:      boolean;
  isFlashDeal?:   boolean;
  isNewArrival?:  boolean;
}
