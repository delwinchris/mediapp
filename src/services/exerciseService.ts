import type { Exercise, ExerciseSession } from '@/types';
import type { ExerciseRow, ExerciseHistoryRow } from '@/types/database';
import { supabase } from '@/lib/supabase';

function rowToExercise(row: ExerciseRow): Exercise {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    difficulty: row.difficulty as Exercise['difficulty'],
    sets: row.sets,
    reps: row.reps,
    duration: row.duration ?? undefined,
    instructions: row.instructions,
    targetArea: row.target_area,
    image: row.image ?? '',
    completed: row.completed,
  };
}

function rowToSession(row: ExerciseHistoryRow): ExerciseSession {
  return {
    id: row.id,
    exerciseId: row.exercise_id ?? '',
    exerciseName: row.exercise_name,
    date: row.date,
    setsCompleted: row.sets_completed,
    repsCompleted: row.reps_completed,
    duration: row.duration,
    difficulty: row.difficulty as ExerciseSession['difficulty'],
    completed: row.completed,
  };
}

export const exerciseService = {
  async getAll(): Promise<Exercise[]> {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .order('name', { ascending: true });
    if (error) throw error;
    return (data as ExerciseRow[]).map(rowToExercise);
  },

  async getById(id: string): Promise<Exercise | null> {
    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data ? rowToExercise(data) : null;
  },

  async getHistory(): Promise<ExerciseSession[]> {
    const { data, error } = await supabase
      .from('exercise_history')
      .select('*')
      .order('date', { ascending: false });
    if (error) throw error;
    return (data as ExerciseHistoryRow[]).map(rowToSession);
  },

  async logSession(data: Omit<ExerciseSession, 'id'>): Promise<ExerciseSession> {
    const { data: row, error } = await supabase
      .from('exercise_history')
      .insert({
        exercise_id: data.exerciseId || null,
        exercise_name: data.exerciseName,
        date: data.date,
        sets_completed: data.setsCompleted,
        reps_completed: data.repsCompleted,
        duration: data.duration,
        difficulty: data.difficulty,
        completed: data.completed,
      })
      .select('*')
      .single();
    if (error) throw error;
    return rowToSession(row);
  },
};
