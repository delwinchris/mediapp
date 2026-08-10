import type { UserProfile } from '@/types';
import type { ProfileRow } from '@/types/database';
import { supabase } from '@/lib/supabase';
import { getCurrentUserId } from './helpers';

function rowToProfile(row: ProfileRow): UserProfile {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    age: row.age ?? undefined,
    height: row.height ?? undefined,
    weight: row.weight ?? undefined,
    injury: row.injury,
    injuryDate: row.injury_date,
    surgeryDate: row.surgery_date ?? undefined,
    painLevel: row.pain_level,
    mobilityLevel: row.mobility_level,
    recoveryGoal: row.recovery_goal,
    myWhy: row.my_why ?? undefined,
    avatarUrl: row.avatar_url ?? undefined,
  };
}

export const userService = {
  async getCurrentUser(): Promise<UserProfile | null> {
    const userId = await getCurrentUserId();
    return this.getById(userId);
  },

  async getById(id: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? rowToProfile(data) : null;
  },

  async update(id: string, data: Partial<UserProfile>): Promise<UserProfile> {
    const updateData: Record<string, unknown> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.age !== undefined) updateData.age = data.age;
    if (data.height !== undefined) updateData.height = data.height;
    if (data.weight !== undefined) updateData.weight = data.weight;
    if (data.injury !== undefined) updateData.injury = data.injury;
    if (data.injuryDate !== undefined) updateData.injury_date = data.injuryDate;
    if (data.surgeryDate !== undefined) updateData.surgery_date = data.surgeryDate;
    if (data.painLevel !== undefined) updateData.pain_level = data.painLevel;
    if (data.mobilityLevel !== undefined) updateData.mobility_level = data.mobilityLevel;
    if (data.recoveryGoal !== undefined) updateData.recovery_goal = data.recoveryGoal;
    if (data.myWhy !== undefined) updateData.my_why = data.myWhy;
    if (data.avatarUrl !== undefined) updateData.avatar_url = data.avatarUrl;

    const { data: row, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', id)
      .select('*')
      .single();
    if (error) throw error;
    return rowToProfile(row);
  },
};
