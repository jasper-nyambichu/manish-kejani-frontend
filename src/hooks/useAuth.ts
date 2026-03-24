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

const USER_KEY = 'mk_user';

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterData) => {
      const { data } = await api.post('/api/v1/auth/register', payload);
      return data;
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginData) => {
      const { data } = await api.post('/api/v1/auth/login', payload);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem(USER_KEY, JSON.stringify(data.data.user));
      localStorage.setItem('mk_user_tokens', JSON.stringify({
        accessToken:  data.data.accessToken,
        refreshToken: data.data.refreshToken,
      }));
      setUser(data.data.user);
    },
  });

  const logout = useCallback(async () => {
    try {
      await api.post('/api/v1/auth/logout');
    } catch {
      // proceed anyway
    }
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('mk_user_tokens');
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
      email:              string;
      resetSessionToken:  string;
      newPassword:        string;
    }) => {
      const { data } = await api.post('/api/v1/auth/reset-password', {
        email,
        resetSessionToken,
        newPassword,
      });
      return data;
    },
  });

  return {
    user,
    isAuthenticated:       !!user,
    register:              registerMutation,
    login:                 loginMutation,
    logout,
    forgotPassword:        forgotPasswordMutation,
    verifyResetCode:       verifyResetCodeMutation,
    resetPassword:         resetPasswordMutation,
  };
};