import { useAuth } from '@/lib/auth';

/**
 * Re-export useAuth from the auth context for cleaner imports.
 * When Supabase is connected, this hook will wrap the Supabase auth state.
 */
export { useAuth };

export function useCurrentUser() {
  const { user } = useAuth();
  return user;
}
