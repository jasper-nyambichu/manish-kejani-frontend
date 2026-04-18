import {
  createContext,
  useCallback,
  useState,
  type ReactNode,
} from "react";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import api from "@/lib/api";
import {
  getStoredUser,
  persistSession,
  clearStoredSession,
} from "@/auth/authStorage";
import type { AuthUser, SessionUser } from "@/auth/types";

interface RegisterData {
  username: string;
  email: string;
  phone?: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

interface ApiEnvelope<T> {
  success?: boolean;
  message?: string;
  data?: T;
}

interface AuthContextValue {
  user: AuthUser;
  setUser: (u: AuthUser) => void;
  saveSession: (userData: SessionUser, accessToken: string, refreshToken: string) => void;
  isAuthenticated: boolean;
  isGoogleUser: boolean;
  register: UseMutationResult<
    ApiEnvelope<{ user: SessionUser; accessToken: string; refreshToken: string }>,
    Error,
    RegisterData,
    unknown
  >;
  login: UseMutationResult<
    ApiEnvelope<{ user: SessionUser; accessToken: string; refreshToken: string }>,
    Error,
    LoginData,
    unknown
  >;
  logout: () => Promise<void>;
  forgotPassword: UseMutationResult<unknown, Error, string, unknown>;
  verifyResetCode: UseMutationResult<unknown, Error, { email: string; code: string }, unknown>;
  resetPassword: UseMutationResult<
    unknown,
    Error,
    { email: string; resetSessionToken: string; newPassword: string },
    unknown
  >;
  changePassword: UseMutationResult<
    unknown,
    Error,
    { currentPassword: string; newPassword: string },
    unknown
  >;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser>(() => getStoredUser());

  const saveSession = useCallback((userData: SessionUser, accessToken: string, refreshToken: string) => {
    persistSession(userData, accessToken, refreshToken);
    setUser(userData);
  }, []);

  const registerMutation = useMutation({
    mutationFn: async (payload: RegisterData) => {
      const { data } = await api.post<
        ApiEnvelope<{ user: SessionUser; accessToken: string; refreshToken: string }>
      >("/api/v1/auth/register", payload);
      return data;
    },
    onSuccess: (resBody) => {
      const inner = resBody.data;
      if (inner?.user && inner.accessToken && inner.refreshToken) {
        saveSession(inner.user, inner.accessToken, inner.refreshToken);
      }
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (payload: LoginData) => {
      const { data } = await api.post<
        ApiEnvelope<{ user: SessionUser; accessToken: string; refreshToken: string }>
      >("/api/v1/auth/login", payload);
      return data;
    },
    onSuccess: (resBody) => {
      const inner = resBody.data;
      if (inner?.user && inner.accessToken && inner.refreshToken) {
        saveSession(inner.user, inner.accessToken, inner.refreshToken);
      }
    },
  });

  const logout = useCallback(async () => {
    try {
      await api.post("/api/v1/auth/logout");
    } catch {
      /* still clear locally */
    }
    clearStoredSession();
    setUser(null);
  }, []);

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: string) => {
      const { data } = await api.post("/api/v1/auth/forgot-password", { email });
      return data;
    },
  });

  const verifyResetCodeMutation = useMutation({
    mutationFn: async ({ email, code }: { email: string; code: string }) => {
      const { data } = await api.post("/api/v1/auth/verify-reset-code", { email, code });
      return data;
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (payload: {
      email: string;
      resetSessionToken: string;
      newPassword: string;
    }) => {
      const { data } = await api.post("/api/v1/auth/reset-password", payload);
      return data;
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: async (payload: { currentPassword: string; newPassword: string }) => {
      const { data } = await api.post("/api/v1/auth/change-password", payload);
      return data;
    },
  });

  const authProv = user?.authProvider ?? user?.auth_provider ?? "";

  const value: AuthContextValue = {
    user,
    setUser,
    saveSession,
    isAuthenticated: !!user,
    isGoogleUser: authProv === "google",
    register: registerMutation,
    login: loginMutation,
    logout,
    forgotPassword: forgotPasswordMutation,
    verifyResetCode: verifyResetCodeMutation,
    resetPassword: resetPasswordMutation,
    changePassword: changePasswordMutation,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
