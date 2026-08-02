import type { Exercise, ExerciseSession } from '@/types';
import { exercises } from '@/lib/mockData';
import { mockExerciseHistory } from '@/lib/mockDatabase';
import { delay, generateId } from './index';

/**
 * Exercise Service — placeholder for future Supabase integration.
 *
 * When Supabase is connected:
 * - getAll → supabase.from('exercises').select('*').eq('user_id', userId)
 * - logSession → supabase.from('exercise_sessions').insert({ ...session, user_id: userId })
 *
 * RLS Policy: exercises are shared (readable by all authenticated users).
 * Exercise sessions are user-owned (CRUD only own sessions).
 */

export const exerciseService = {
  async getAll(): Promise<Exercise[]> {
    await delay();
    return exercises;
  },

  async getById(id: string): Promise<Exercise | null> {
    await delay();
    return exercises.find((e) => e.id === id) ?? null;
  },

  async getHistory(): Promise<ExerciseSession[]> {
    await delay();
    return mockExerciseHistory;
  },

  async logSession(data: Omit<ExerciseSession, 'id'>): Promise<ExerciseSession> {
    await delay();
    return { ...data, id: generateId('es') };
  },
};
