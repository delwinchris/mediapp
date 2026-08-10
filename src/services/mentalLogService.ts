import type { MentalEntry } from '@/types';
import type { MentalLogRow } from '@/types/database';
import { supabase } from '@/lib/supabase';

function rowToEntry(row: MentalLogRow): MentalEntry {
  return {
    id: row.id,
    date: row.date,
    anxiety: row.anxiety,
    confidence: row.confidence,
    fearOfReinjury: row.fear_of_reinjury,
    motivation: row.motivation,
    stress: row.stress,
    journal: row.journal,
  };
}

export const mentalLogService = {
  async getAll(): Promise<MentalEntry[]> {
    const { data, error } = await supabase
      .from('mental_logs')
      .select('*')
      .order('date', { ascending: false });
    if (error) throw error;
    return (data as MentalLogRow[]).map(rowToEntry);
  },

  async create(data: Omit<MentalEntry, 'id'>): Promise<MentalEntry> {
    const { data: row, error } = await supabase
      .from('mental_logs')
      .insert({
        date: data.date,
        anxiety: data.anxiety,
        confidence: data.confidence,
        fear_of_reinjury: data.fearOfReinjury,
        motivation: data.motivation,
        stress: data.stress,
        journal: data.journal,
      })
      .select('*')
      .single();
    if (error) throw error;
    return rowToEntry(row);
  },
};
