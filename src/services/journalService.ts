import type { JournalEntry } from '@/types';
import { mockJournalEntries } from '@/lib/mockDatabase';
import { delay, generateId } from './index';

/**
 * Journal Service — placeholder for future Supabase integration.
 *
 * When Supabase is connected:
 * - getAll → supabase.from('journal_entries').select('*').eq('user_id', userId).order('date', { ascending: false })
 * - search → supabase.from('journal_entries').select('*').eq('user_id', userId).ilike('content', `%${query}%`)
 *
 * RLS Policy: users can only CRUD their own journal entries.
 */

export const journalService = {
  async getAll(): Promise<JournalEntry[]> {
    await delay();
    return mockJournalEntries;
  },

  async search(query: string): Promise<JournalEntry[]> {
    await delay();
    const q = query.toLowerCase();
    return mockJournalEntries.filter(
      (j) =>
        j.feeling.toLowerCase().includes(q) ||
        j.win.toLowerCase().includes(q) ||
        j.challenge.toLowerCase().includes(q) ||
        j.grateful.toLowerCase().includes(q)
    );
  },

  async create(data: Omit<JournalEntry, 'id'>): Promise<JournalEntry> {
    await delay();
    return { ...data, id: generateId('j') };
  },
};
