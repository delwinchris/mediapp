import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { UserProfile } from '@/lib/types';
import { mockUser } from '@/lib/mockData';

interface AuthUser {
  id: string;
  email: string;
  name: string;
  isNewUser: boolean;
  profile?: UserProfile;
}

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<AuthUser>;
  signUp: (name: string, email: string, password: string) => Promise<AuthUser>;
  signOut: () => void;
  completeOnboarding: (profile: Partial<UserProfile>) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'medirecover-auth';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch { /* ignore */ }
    setLoading(false);
  }, []);

  const persist = useCallback((u: AuthUser | null) => {
    setUser(u);
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
  }, []);

  const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

  const signIn = useCallback(async (email: string, _password: string): Promise<AuthUser> => {
    await delay(600);
    const u: AuthUser = {
      id: mockUser.id,
      email,
      name: mockUser.name,
      isNewUser: false,
      profile: mockUser,
    };
    persist(u);
    return u;
  }, [persist]);

  const signUp = useCallback(async (name: string, email: string, _password: string): Promise<AuthUser> => {
    await delay(600);
    const u: AuthUser = { id: `u_${Date.now()}`, email, name, isNewUser: true };
    persist(u);
    return u;
  }, [persist]);

  const signOut = useCallback(() => persist(null), [persist]);

  const completeOnboarding = useCallback((profile: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated: AuthUser = {
        ...prev,
        isNewUser: false,
        profile: { ...mockUser, ...profile, id: prev.id, email: prev.email, name: profile.name ?? prev.name } as UserProfile,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const updateProfile = useCallback((profile: Partial<UserProfile>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated: AuthUser = { ...prev, profile: { ...prev.profile, ...profile } as UserProfile };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, completeOnboarding, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
