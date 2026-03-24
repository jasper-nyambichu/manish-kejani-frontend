// src/hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Product } from '@/data/products';

interface ProductsResponse {
  products:   Product[];
  pagination: {
    total: number;
    page:  number;
    limit: number;
    pages: number;
  };
}

interface ProductFilters {
  page?:        number;
  limit?:       number;
  sort?:        string;
  category?:    string;
  minPrice?:    number;
  maxPrice?:    number;
  status?:      string;
  featured?:    boolean;
  isFlashDeal?: boolean;
  isNew?:       boolean;
}

const fetchProducts = async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      params.append(key, String(val));
    }
  });
  const { data } = await api.get(`/api/v1/products?${params.toString()}`);
  return data.data;
};

const fetchProductById = async (id: string): Promise<Product> => {
  const { data } = await api.get(`/api/v1/products/${id}`);
  return data.data;
};

const fetchFeaturedProducts = async (limit = 8): Promise<Product[]> => {
  const { data } = await api.get(`/api/v1/products/featured?limit=${limit}`);
  return data.data;
};

const fetchRelatedProducts = async (id: string, limit = 4): Promise<Product[]> => {
  const { data } = await api.get(`/api/v1/products/${id}/related?limit=${limit}`);
  return data.data;
};

const fetchProductsByCategory = async (slug: string, filters: ProductFilters = {}): Promise<ProductsResponse> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, val]) => {
    if (val !== undefined && val !== null) params.append(key, String(val));
  });
  const { data } = await api.get(`/api/v1/products/category/${slug}?${params.toString()}`);
  return data.data;
};

const searchProducts = async (query: string, filters: ProductFilters = {}): Promise<ProductsResponse> => {
  const params = new URLSearchParams({ q: query });
  Object.entries(filters).forEach(([key, val]) => {
    if (val !== undefined && val !== null) params.append(key, String(val));
  });
  const { data } = await api.get(`/api/v1/products/search?${params.toString()}`);
  return data.data;
};

export const useProducts = (filters: ProductFilters = {}) => {
  return useQuery({
    queryKey:  ['products', filters],
    queryFn:   () => fetchProducts(filters),
    staleTime: 2 * 60 * 1000,
  });
};

export const useFlashDeals = (limit = 6) => {
  return useQuery({
    queryKey:  ['products', 'flash-deals'],
    queryFn:   () => fetchProducts({ isFlashDeal: true, limit }),
    staleTime: 2 * 60 * 1000,
  });
};

export const useNewArrivals = (limit = 8) => {
  return useQuery({
    queryKey:  ['products', 'new-arrivals'],
    queryFn:   () => fetchProducts({ isNew: true, limit }),
    staleTime: 2 * 60 * 1000,
  });
};

export const useFeaturedProducts = (limit = 8) => {
  return useQuery({
    queryKey:  ['products', 'featured', limit],
    queryFn:   () => fetchFeaturedProducts(limit),
    staleTime: 2 * 60 * 1000,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey:  ['product', id],
    queryFn:   () => fetchProductById(id),
    enabled:   !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useRelatedProducts = (id: string, limit = 4) => {
  return useQuery({
    queryKey:  ['products', 'related', id],
    queryFn:   () => fetchRelatedProducts(id, limit),
    enabled:   !!id,
    staleTime: 5 * 60 * 1000,
  });
};

export const useProductsByCategory = (slug: string, filters: ProductFilters = {}) => {
  return useQuery({
    queryKey:  ['products', 'category', slug, filters],
    queryFn:   () => fetchProductsByCategory(slug, filters),
    enabled:   !!slug,
    staleTime: 2 * 60 * 1000,
  });
};

export const useSearchProducts = (query: string, filters: ProductFilters = {}) => {
  return useQuery({
    queryKey:  ['products', 'search', query, filters],
    queryFn:   () => searchProducts(query, filters),
    enabled:   !!query?.trim(),
    staleTime: 1 * 60 * 1000,
  });
};