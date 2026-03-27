// src/hooks/useCategories.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

const fetchCategories = async () => {
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
