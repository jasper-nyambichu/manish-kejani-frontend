// src/hooks/useCategories.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import type { Category } from '@/data/products';

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await api.get('/api/v1/categories');
  return data.data;
};

export const useCategories = () => {
  return useQuery({
    queryKey:  ['categories'],
    queryFn:   fetchCategories,
    staleTime: 10 * 60 * 1000,
  });
};