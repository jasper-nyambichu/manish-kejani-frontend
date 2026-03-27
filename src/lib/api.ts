// src/lib/api.ts
import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosError, type InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL:         import.meta.env.VITE_API_URL ?? 'http://localhost:5000',
  withCredentials: true,
  timeout:         15000,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers['Content-Type'] = 'application/json';
  try {
    const raw = localStorage.getItem('mk_user_tokens');
    if (raw) {
      const { accessToken } = JSON.parse(raw);
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } catch {
    localStorage.removeItem('mk_user_tokens');
  }
  return config;
});

api.interceptors.response.use(
  (res: AxiosResponse) => res,
  async (error: AxiosError) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const raw = localStorage.getItem('mk_user_tokens');
        if (!raw) throw new Error('No tokens');
        const { refreshToken } = JSON.parse(raw);
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL ?? 'http://localhost:5000'}/api/v1/auth/refresh`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );
        const tokens = { accessToken: data.data.accessToken, refreshToken: data.data.refreshToken };
        localStorage.setItem('mk_user_tokens', JSON.stringify(tokens));
        if (original.headers) original.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
        return api(original);
      } catch {
        localStorage.removeItem('mk_user_tokens');
        localStorage.removeItem('mk_user');
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
