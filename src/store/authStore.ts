import { useState, useCallback } from "react";

// Simple in-memory admin auth (will be replaced with real auth later)
const ADMIN_STORAGE_KEY = "mk_admin_auth";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(ADMIN_STORAGE_KEY) === "true";
    } catch {
      return false;
    }
  });

  const login = useCallback((email: string, password: string): boolean => {
    // Placeholder — will be replaced with server-side auth via Lovable Cloud
    if (email === "admin@manishkejani.com" && password === "admin123") {
      sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setIsAuthenticated(false);
  }, []);

  return { isAuthenticated, login, logout };
}
