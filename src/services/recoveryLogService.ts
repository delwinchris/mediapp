import type { RecoveryEntry } from '@/types';
import type { RecoveryLogRow } from '@/types/database';
import { supabase } from '@/lib/supabase';

function rowToEntry(row: RecoveryLogRow): RecoveryEntry {
  return {
    id: row.id,
    date: row.date,
    pain: row.pain,
    mobility: row.mobility,
    strength: row.strength,
    sleep: row.sleep,
    energy: row.energy,
    swelling: row.swelling,
    mood: row.mood,
    medication: row.medication,
    notes: row.notes,
  };
}

export const recoveryLogService = {
  async getAll(): Promise<RecoveryEntry[]> {
    const { data, error } = await supabase
      .from('recovery_logs')
      .select('*')
      .order('date', { ascending: false });
    if (error) throw error;
    return (data as RecoveryLogRow[]).map(rowToEntry);
  },

  async getByDateRange(startDate: string, endDate: string): Promise<RecoveryEntry[]> {
    const { data, error } = await supabase
      .from('recovery_logs')
      .select('*')
      .gte('date', startDate)
      .lte('date', endDate)
      .order('date', { ascending: true });
    if (error) throw error;
    return (data as RecoveryLogRow[]).map(rowToEntry);
  },

  async create(data: Omit<RecoveryEntry, 'id'>): Promise<RecoveryEntry> {
    const { data: row, error } = await supabase
      .from('recovery_logs')
      .insert({
        date: data.date,
        pain: data.pain,
        mobility: data.mobility,
        strength: data.strength,
        sleep: data.sleep,
        energy: data.energy,
        swelling: data.swelling,
        mood: data.mood,
        medication: data.medication,
        notes: data.notes,
      })
      .select('*')
      .single();
    if (error) throw error;
    return rowToEntry(row);
  },

  async update(id: string, data: Partial<RecoveryEntry>): Promise<RecoveryEntry> {
    const updateData: Record<string, unknown> = {};
    if (data.date !== undefined) updateData.date = data.date;
    if (data.pain !== undefined) updateData.pain = data.pain;
    if (data.mobility !== undefined) updateData.mobility = data.mobility;
    if (data.strength !== undefined) updateData.strength = data.strength;
    if (data.sleep !== undefined) updateData.sleep = data.sleep;
    if (data.energy !== undefined) updateData.energy = data.energy;
    if (data.swelling !== undefined) updateData.swelling = data.swelling;
    if (data.mood !== undefined) updateData.mood = data.mood;
    if (data.medication !== undefined) updateData.medication = data.medication;
    if (data.notes !== undefined) updateData.notes = data.notes;

    const { data: row, error } = await supabase
      .from('recovery_logs')
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return rowToEntry(row);
  },
};
