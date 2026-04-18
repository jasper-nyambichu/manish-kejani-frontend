// src/hooks/useAdminPromotions.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminApi from '@/lib/adminApi';

export const ADMIN_PROMOTIONS_KEY = ['admin', 'promotions'] as const;

export interface AdminPromotionRow {
  id: string;
  _id?: string;
  title: string;
  description?: string | null;
  discountPercent: number;
  products?: string[];
  categories?: string[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  bannerImage?: { url: string; publicId?: string } | null;
}

const fetchPromotions = async (): Promise<AdminPromotionRow[]> => {
  const { data } = await adminApi.get('/api/admin/promotions');
  const payload = data?.data;
  return Array.isArray(payload) ? payload : [];
};

export const useAdminPromotions = () =>
  useQuery({
    queryKey: ADMIN_PROMOTIONS_KEY,
    queryFn: fetchPromotions,
  });

export const useCreatePromotion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await adminApi.post('/api/admin/promotions', formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PROMOTIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ['promotions', 'active'] });
    },
  });
};

export const useUpdatePromotion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const { data } = await adminApi.put(`/api/admin/promotions/${id}`, formData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PROMOTIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ['promotions', 'active'] });
    },
  });
};

export const useDeletePromotion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await adminApi.delete(`/api/admin/promotions/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PROMOTIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ['promotions', 'active'] });
    },
  });
};

export const useTogglePromotionStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await adminApi.patch(`/api/admin/promotions/${id}/toggle`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ADMIN_PROMOTIONS_KEY });
      queryClient.invalidateQueries({ queryKey: ['promotions', 'active'] });
    },
  });
};
