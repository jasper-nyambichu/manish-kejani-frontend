// src/hooks/useAuth.ts
import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '@/lib/api';

interface RegisterData {
  username: string;
  email:    string;
  phone?:   string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

const USER_KEY   = 'mk_user';
const TOKENS_KEY = 'mk_user_tokens';

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const useAuth = () => {
  const [user, setUser] = useState(getStoredUser);

  const saveSession = (userData: any, accessToken: string, refreshToken: string) => {
    localStorage.setItem(USER_KEY,   JSON.stringify(userData));
    localStorage.setItem(TOKENS_KEY, JSON.stringify({ accessToken, refreshToken }));
    setUser(userData);
  };

  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterData) => {
      const { data } = await api.post('/api/v1/auth/register', payload);
      return data;
    },
    onSuccess: (data) => {
      saveSession(data.data.user, data.data.accessToken, data.data.refreshToken);
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginData) => {
      const { data } = await api.post('/api/v1/auth/login', payload);
      return data;
    },
    onSuccess: (data) => {
      saveSession(data.data.user, data.data.accessToken, data.data.refreshToken);
    },
  });

  const logout = useCallback(async () => {
    try { await api.post('/api/v1/auth/logout'); } catch { /* proceed */ }
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKENS_KEY);
    setUser(null);
  }, []);

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post('/api/v1/auth/forgot-password', { email });
      return data;
    },
  });

  const verifyResetCodeMutation = useMutation({
    mutationFn: async ({ email, code }: { email: string; code: string }) => {
      const { data } = await api.post('/api/v1/auth/verify-reset-code', { email, code });
      return data;
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async ({ email, resetSessionToken, newPassword }: {
      email: string; resetSessionToken: string; newPassword: string;
    }) => {
      const { data } = await api.post('/api/v1/auth/reset-password', { email, resetSessionToken, newPassword });
      return data;
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: async ({ currentPassword, newPassword }: { currentPassword: string; newPassword: string }) => {
      const { data } = await api.post('/api/v1/auth/change-password', { currentPassword, newPassword });
      return data;
    },
  });

  return {
    user,
    setUser,
    saveSession,
    isAuthenticated:   !!user,
    isGoogleUser:      user?.authProvider === 'google',
    register:          registerMutation,
    login:             loginMutation,
    logout,
    forgotPassword:    forgotPasswordMutation,
    verifyResetCode:   verifyResetCodeMutation,
    resetPassword:     resetPasswordMutation,
    changePassword:    changePasswordMutation,
  };
};
