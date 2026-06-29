// src/store/authStore.ts
import { useState, useCallback } from 'react';
import { toast } from 'sonner';
import adminApi from '@/lib/adminApi';

const TOKENS_KEY    = 'mk_admin_tokens';
const AUTH_KEY      = 'mk_admin_auth';
const ADMIN_USER_KEY = 'mk_admin_user';

interface AdminTokens {
  accessToken:  string;
  refreshToken: string;
}

interface AdminUser {
  id:        string;
  username:  string;
  email:     string;
  lastLogin: string | null;
}

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [admin, setAdmin] = useState<AdminUser | null>(() => {
    try {
      const raw = localStorage.getItem(ADMIN_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const login = useCallback(async (username: string, password: string): Promise<boolean> => {
    try {
      const { data } = await adminApi.post('/api/admin/auth/login', { username, password });

      const tokens: AdminTokens = {
        accessToken:  data.data.accessToken,
        refreshToken: data.data.refreshToken,
      };

      localStorage.setItem(TOKENS_KEY,     JSON.stringify(tokens));
      localStorage.setItem(AUTH_KEY,        'true');
      localStorage.setItem(ADMIN_USER_KEY,  JSON.stringify(data.data.admin));

      setAdmin(data.data.admin);
      setIsAuthenticated(true);

      toast.success(`Welcome back, ${data.data.admin.username}`);
      return true;
    } catch (err: any) {
      const message = err?.response?.data?.message ?? 'Login failed. Please try again.';
      toast.error(message);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await adminApi.post('/api/admin/auth/logout');
    } catch {
      // proceed regardless
    }

    localStorage.removeItem(TOKENS_KEY);
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);

    setIsAuthenticated(false);
    setAdmin(null);

    toast.success('Logged out successfully');
  }, []);

  return { isAuthenticated, admin, login, logout };
}
