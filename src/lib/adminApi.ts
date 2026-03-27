// src/lib/adminApi.ts
import axios from 'axios';

const adminApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000',
  withCredentials: true,
  timeout: 30000, // 30s — enough for image uploads to Cloudinary
});

adminApi.interceptors.request.use((config) => {
  // Remove Content-Type for FormData — let browser set it with correct boundary
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

  const raw = sessionStorage.getItem('mk_admin_tokens');
  if (raw) {
    try {
      const { accessToken } = JSON.parse(raw);
      if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    } catch {
      sessionStorage.removeItem('mk_admin_tokens');
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
        if (!raw) throw new Error('No tokens');

        const { refreshToken } = JSON.parse(raw);

        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL ?? 'http://localhost:5000'}/api/admin/auth/refresh`,
          { refreshToken },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const tokens = {
          accessToken:  data.data.accessToken,
          refreshToken: data.data.refreshToken,
        };
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
