import type { RecoveryEntry } from '@/types';
import { mockRecoveryLogs } from '@/lib/mockDatabase';
import { delay, generateId } from './index';

/**
 * Recovery Log Service — placeholder for future Supabase integration.
 *
 * When Supabase is connected:
 * - getAll → supabase.from('recovery_logs').select('*').eq('user_id', userId).order('date', { ascending: false })
 * - create → supabase.from('recovery_logs').insert({ ...data, user_id: userId })
 *
 * RLS Policy: users can only CRUD their own recovery logs.
 */

export const recoveryLogService = {
  async getAll(): Promise<RecoveryEntry[]> {
    await delay();
    return mockRecoveryLogs;
  },

  async getByDateRange(startDate: string, endDate: string): Promise<RecoveryEntry[]> {
    await delay();
    return mockRecoveryLogs.filter((log) => log.date >= startDate && log.date <= endDate);
  },

  async create(data: Omit<RecoveryEntry, 'id'>): Promise<RecoveryEntry> {
    await delay();
    return { ...data, id: generateId('r') };
  },

  async update(id: string, data: Partial<RecoveryEntry>): Promise<RecoveryEntry> {
    await delay();
    const existing = mockRecoveryLogs.find((l) => l.id === id);
    return { ...(existing ?? mockRecoveryLogs[0]), ...data, id };
  },
};
