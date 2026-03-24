// src/lib/adminApi.ts
import axios from 'axios';

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

adminApi.interceptors.request.use((config) => {
  const raw = sessionStorage.getItem('mk_admin_tokens');
  if (raw) {
    const { accessToken } = JSON.parse(raw);
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});

adminApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const raw = sessionStorage.getItem('mk_admin_tokens');
        if (!raw) return Promise.reject(error);

        const { refreshToken } = JSON.parse(raw);

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL ?? 'http://localhost:5000'}/api/admin/auth/refresh`,
          { refreshToken }
        );

        const tokens = { accessToken: data.data.accessToken, refreshToken: data.data.refreshToken };
        sessionStorage.setItem('mk_admin_tokens', JSON.stringify(tokens));

        original.headers.Authorization = `Bearer ${tokens.accessToken}`;
        return adminApi(original);
      } catch {
        sessionStorage.removeItem('mk_admin_tokens');
        sessionStorage.removeItem('mk_admin_auth');
        window.location.href = '/admin/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default adminApi;