import type { UserProfile } from '@/types';
import { mockUser } from '@/lib/mockData';
import { delay } from './index';

/**
 * User Service — placeholder for future Supabase integration.
 *
 * When Supabase is connected:
 * - getAll → supabase.from('profiles').select('*')
 * - getById → supabase.from('profiles').select('*').eq('id', id).single()
 * - update → supabase.from('profiles').update(data).eq('id', id)
 *
 * RLS Policy: users can only read/update their own profile row.
 */

export const userService = {
  async getCurrentUser(): Promise<UserProfile | null> {
    await delay();
    return mockUser;
  },

  async getById(id: string): Promise<UserProfile | null> {
    await delay();
    return id === mockUser.id ? mockUser : null;
  },

  async update(id: string, data: Partial<UserProfile>): Promise<UserProfile> {
    await delay();
    return { ...mockUser, ...data, id };
  },
};
