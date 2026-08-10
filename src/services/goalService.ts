import type { Goal } from '@/types';
import type { GoalRow } from '@/types/database';
import { supabase } from '@/lib/supabase';

function rowToGoal(row: GoalRow): Goal {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category as Goal['category'],
    priority: row.priority as Goal['priority'],
    progress: row.progress,
    targetDate: row.target_date ?? '',
    status: row.status as Goal['status'],
    createdAt: row.created_at,
  };
}

export const goalService = {
  async getAll(): Promise<Goal[]> {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return (data as GoalRow[]).map(rowToGoal);
  },

  async create(data: Omit<Goal, 'id'>): Promise<Goal> {
    const { data: row, error } = await supabase
      .from('goals')
      .insert({
        title: data.title,
        description: data.description,
        category: data.category,
        priority: data.priority,
        progress: data.progress,
        target_date: data.targetDate || null,
        status: data.status,
      })
      .select('*')
      .single();
    if (error) throw error;
    return rowToGoal(row);
  },

  async update(id: string, data: Partial<Goal>): Promise<Goal> {
    const updateData: Record<string, unknown> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.priority !== undefined) updateData.priority = data.priority;
    if (data.progress !== undefined) updateData.progress = data.progress;
    if (data.targetDate !== undefined) updateData.target_date = data.targetDate || null;
    if (data.status !== undefined) updateData.status = data.status;

    const { data: row, error } = await supabase
      .from('goals')
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return rowToGoal(row);
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from('goals').delete().eq('id', id);
    if (error) throw error;
  },
};
