import { supabase } from '@/lib/supabase';

export async function getCurrentUserId(): Promise<string> {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) throw new Error('Not authenticated');
  return session.user.id;
}

export function parseError(error: unknown, fallback: string): string {
  if (error instanceof Error) return error.message;
  return fallback;
}
