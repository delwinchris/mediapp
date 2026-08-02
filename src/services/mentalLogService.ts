import type { MentalEntry } from '@/types';
import { mockMentalLogs } from '@/lib/mockDatabase';
import { delay, generateId } from './index';

/**
 * Mental Log Service — placeholder for future Supabase integration.
 *
 * When Supabase is connected:
 * - getAll → supabase.from('mental_logs').select('*').eq('user_id', userId).order('date', { ascending: false })
 * - create → supabase.from('mental_logs').insert({ ...data, user_id: userId })
 *
 * RLS Policy: users can only CRUD their own mental logs.
 */

export const mentalLogService = {
  async getAll(): Promise<MentalEntry[]> {
    await delay();
    return mockMentalLogs;
  },

  async create(data: Omit<MentalEntry, 'id'>): Promise<MentalEntry> {
    await delay();
    return { ...data, id: generateId('m') };
  },
};
