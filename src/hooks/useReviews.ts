// src/hooks/useReviews.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';

const fetchReviews = async (productId: string, page = 1) => {
  const { data } = await api.get(`/api/v1/reviews/${productId}?page=${page}&limit=10`);
  return data.data;
};

export const useReviews = (productId: string, page = 1) =>
  useQuery({
    queryKey:  ['reviews', productId, page],
    queryFn:   () => fetchReviews(productId, page),
    enabled:   !!productId,
    staleTime: 60 * 1000,
  });

export const useSubmitReview = (productId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: { rating: number; comment: string }) =>
      api.post(`/api/v1/reviews/${productId}`, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reviews', productId] });
      qc.invalidateQueries({ queryKey: ['product', productId] });
    },
  });
};

export const useDeleteReview = (productId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (reviewId: string) => api.delete(`/api/v1/reviews/${reviewId}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reviews', productId] });
      qc.invalidateQueries({ queryKey: ['product', productId] });
    },
  });
};
