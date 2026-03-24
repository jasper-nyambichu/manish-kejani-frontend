// src/hooks/useAdminProducts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminApi from '@/lib/adminApi';

const fetchAdminProducts = async (params: Record<string, string> = {}) => {
  const query = new URLSearchParams(params).toString();
  const { data } = await adminApi.get(`/api/admin/products?${query}`);
  return data.data;
};

const fetchAdminCategories = async () => {
  const { data } = await adminApi.get('/api/admin/categories');
  return data.data;
};

const fetchDashboardStats = async () => {
  const { data } = await adminApi.get('/api/admin/dashboard/stats');
  return data.data;
};

export const useAdminProducts = (params: Record<string, string> = {}) => {
  return useQuery({
    queryKey: ['admin', 'products', params],
    queryFn:  () => fetchAdminProducts(params),
  });
};

export const useAdminCategories = () => {
  return useQuery({
    queryKey: ['admin', 'categories'],
    queryFn:  fetchAdminCategories,
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['admin', 'dashboard', 'stats'],
    queryFn:  fetchDashboardStats,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const { data } = await adminApi.post('/api/admin/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
      const { data } = await adminApi.put(`/api/admin/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await adminApi.delete(`/api/admin/products/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useAdminCustomers = (params: Record<string, string> = {}) => {
  return useQuery({
    queryKey: ['admin', 'customers', params],
    queryFn:  async () => {
      const query = new URLSearchParams(params).toString();
      const { data } = await adminApi.get(`/api/admin/dashboard/customers?${query}`);
      return data.data;
    },
  });
};