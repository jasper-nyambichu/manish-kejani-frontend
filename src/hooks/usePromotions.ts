// src/hooks/usePromotions.ts
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';

const fetchActivePromotions = async () => {
  const { data } = await api.get('/api/v1/promotions/active');
  return data.data;
};

export const useActivePromotions = () => {
  return useQuery({
    queryKey:  ['promotions', 'active'],
    queryFn:   fetchActivePromotions,
    staleTime: 5 * 60 * 1000,
  });
};