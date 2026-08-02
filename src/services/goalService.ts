import type { Goal } from '@/types';
import { mockGoals } from '@/lib/mockDatabase';
import { delay, generateId } from './index';

/**
 * Goal Service — placeholder for future Supabase integration.
 *
 * When Supabase is connected:
 * - getAll → supabase.from('goals').select('*').eq('user_id', userId).order('priority', { ascending: false })
 * - create → supabase.from('goals').insert({ ...data, user_id: userId })
 *
 * RLS Policy: users can only CRUD their own goals.
 */

export const goalService = {
  async getAll(): Promise<Goal[]> {
    await delay();
    return mockGoals;
  },

  async create(data: Omit<Goal, 'id'>): Promise<Goal> {
    await delay();
    return { ...data, id: generateId('goal') };
  },

  async update(id: string, data: Partial<Goal>): Promise<Goal> {
    await delay();
    const existing = mockGoals.find((g) => g.id === id);
    return { ...(existing ?? mockGoals[0]), ...data, id };
  },

  async delete(id: string): Promise<void> {
    await delay();
  },
};
