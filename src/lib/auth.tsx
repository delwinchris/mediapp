import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import type { UserProfile } from '@/lib/types';
import { supabase } from '@/lib/supabase';
import { mockUser } from '@/lib/mockData';

export interface AuthUser {
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
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  completeOnboarding: (profile: Partial<UserProfile>) => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function parseSupabaseError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes('Invalid login credentials')) return 'Invalid email or password. Please try again.';
  if (message.includes('User already registered')) return 'An account with this email already exists.';
  if (message.includes('Email not confirmed')) return 'Please check your inbox and confirm your email first.';
  if (message.includes('Password should be at least')) return 'Password must be at least 6 characters.';
  if (message.includes('rate limit')) return 'Too many attempts. Please wait a moment and try again.';
  return message;
}

async function fetchProfile(userId: string): Promise<{ profile: UserProfile | null; onboardingCompleted: boolean }> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .maybeSingle();

  if (error) throw error;
  if (!data) return { profile: null, onboardingCompleted: false };

  const profile: UserProfile = {
    id: data.id,
    name: data.name,
    email: data.email,
    age: data.age ?? undefined,
    height: data.height ?? undefined,
    weight: data.weight ?? undefined,
    injury: data.injury,
    injuryDate: data.injury_date,
    surgeryDate: data.surgery_date ?? undefined,
    painLevel: data.pain_level,
    mobilityLevel: data.mobility_level,
    recoveryGoal: data.recovery_goal,
    myWhy: data.my_why ?? undefined,
    avatarUrl: data.avatar_url ?? undefined,
  };

  return { profile, onboardingCompleted: data.onboarding_completed };
}

function buildAuthUser(supabaseUser: SupabaseUser, profile?: UserProfile | null, onboardingCompleted = false): AuthUser {
  const name = profile?.name ?? supabaseUser.user_metadata?.name ?? supabaseUser.email?.split('@')[0] ?? 'there';
  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? '',
    name,
    isNewUser: !onboardingCompleted,
    profile: profile ?? undefined,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const { profile, onboardingCompleted } = await fetchProfile(session.user.id);
          if (mounted) setUser(buildAuthUser(session.user, profile, onboardingCompleted));
        }
      } catch (err) {
        console.error('Session restore failed:', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        if (session?.user) {
          try {
            const { profile, onboardingCompleted } = await fetchProfile(session.user.id);
            if (mounted) setUser(buildAuthUser(session.user, profile, onboardingCompleted));
          } catch (err) {
            console.error('Profile fetch on auth change failed:', err);
            if (mounted) setUser(buildAuthUser(session.user, null, false));
          }
        } else {
          if (mounted) setUser(null);
        }
      })();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<AuthUser> => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(parseSupabaseError(error));

    const { profile, onboardingCompleted } = await fetchProfile(data.user.id);
    const authUser = buildAuthUser(data.user, profile, onboardingCompleted);
    setUser(authUser);
    return authUser;
  }, []);

  const signUp = useCallback(async (name: string, email: string, password: string): Promise<AuthUser> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) throw new Error(parseSupabaseError(error));
    if (!data.user) throw new Error('Sign-up failed. Please try again.');

    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id,
      email,
      name,
      onboarding_completed: false,
    });
    if (profileError) {
      console.error('Profile creation failed:', profileError);
    }

    const authUser: AuthUser = {
      id: data.user.id,
      email,
      name,
      isNewUser: true,
    };
    setUser(authUser);
    return authUser;
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Sign-out error:', error);
    setUser(null);
  }, []);

  const resetPassword = useCallback(async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
    if (error) throw new Error(parseSupabaseError(error));
  }, []);

  const completeOnboarding = useCallback(async (profile: Partial<UserProfile>): Promise<void> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const updateData = {
      name: profile.name ?? session.user.email?.split('@')[0] ?? 'there',
      age: profile.age ?? null,
      height: profile.height ?? null,
      weight: profile.weight ?? null,
      injury: profile.injury ?? '',
      injury_date: profile.injuryDate ?? new Date().toISOString().slice(0, 10),
      surgery_date: profile.surgeryDate ?? null,
      pain_level: profile.painLevel ?? 5,
      mobility_level: profile.mobilityLevel ?? 50,
      recovery_goal: profile.recoveryGoal ?? '',
      my_why: profile.myWhy ?? null,
      onboarding_completed: true,
    };

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', session.user.id);

    if (error) {
      console.error('Onboarding save failed:', error);
      throw new Error('Could not save your profile. Please try again.');
    }

    const { profile: fetchedProfile } = await fetchProfile(session.user.id);
    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        isNewUser: false,
        profile: fetchedProfile ?? undefined,
      };
    });
  }, []);

  const updateProfile = useCallback(async (profile: Partial<UserProfile>): Promise<void> => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    const updateData: Record<string, unknown> = {};
    if (profile.name !== undefined) updateData.name = profile.name;
    if (profile.age !== undefined) updateData.age = profile.age;
    if (profile.height !== undefined) updateData.height = profile.height;
    if (profile.weight !== undefined) updateData.weight = profile.weight;
    if (profile.injury !== undefined) updateData.injury = profile.injury;
    if (profile.injuryDate !== undefined) updateData.injury_date = profile.injuryDate;
    if (profile.surgeryDate !== undefined) updateData.surgery_date = profile.surgeryDate;
    if (profile.painLevel !== undefined) updateData.pain_level = profile.painLevel;
    if (profile.mobilityLevel !== undefined) updateData.mobility_level = profile.mobilityLevel;
    if (profile.recoveryGoal !== undefined) updateData.recovery_goal = profile.recoveryGoal;
    if (profile.myWhy !== undefined) updateData.my_why = profile.myWhy;
    if (profile.avatarUrl !== undefined) updateData.avatar_url = profile.avatarUrl;

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', session.user.id);

    if (error) {
      console.error('Profile update failed:', error);
      throw new Error('Could not update your profile. Please try again.');
    }

    setUser((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        profile: { ...(prev.profile ?? mockUser), ...profile } as UserProfile,
      };
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, resetPassword, completeOnboarding, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
