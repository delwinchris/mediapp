import type { JournalEntry } from '@/types';
import type { JournalEntryRow } from '@/types/database';
import { supabase } from '@/lib/supabase';

function rowToEntry(row: JournalEntryRow): JournalEntry {
  return {
    id: row.id,
    date: row.date,
    feeling: row.feeling,
    win: row.win,
    challenge: row.challenge,
    grateful: row.grateful,
  };
}

export const journalService = {
  async getAll(): Promise<JournalEntry[]> {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .order('date', { ascending: false });
    if (error) throw error;
    return (data as JournalEntryRow[]).map(rowToEntry);
  },

  async search(query: string): Promise<JournalEntry[]> {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .or(`feeling.ilike.%${query}%,win.ilike.%${query}%,challenge.ilike.%${query}%,grateful.ilike.%${query}%`)
      .order('date', { ascending: false });
    if (error) throw error;
    return (data as JournalEntryRow[]).map(rowToEntry);
  },

  async create(data: Omit<JournalEntry, 'id'>): Promise<JournalEntry> {
    const { data: row, error } = await supabase
      .from('journal_entries')
      .insert({
        date: data.date,
        feeling: data.feeling,
        win: data.win,
        challenge: data.challenge,
        grateful: data.grateful,
      })
      .select('*')
      .single();
    if (error) throw error;
    return rowToEntry(row);
  },
};
