import type { SessionUser } from "./types";

/** Keys shared with axios interceptors in `src/lib/api.ts` */
export const USER_KEY = "mk_user";
export const TOKENS_KEY = "mk_user_tokens";

export const getStoredUser = (): SessionUser | null => {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as SessionUser) : null;
  } catch {
    return null;
  }
};

export const clearStoredSession = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKENS_KEY);
};

export const persistSession = (userData: SessionUser, accessToken: string, refreshToken: string) => {
  localStorage.setItem(USER_KEY, JSON.stringify(userData));
  localStorage.setItem(TOKENS_KEY, JSON.stringify({ accessToken, refreshToken }));
};
