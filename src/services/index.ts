import type { UserProfile, RecoveryEntry, MentalEntry, Exercise, JournalEntry, Achievement, NotificationItem, CalendarEvent, Goal, Appointment, AIConversation, ExerciseSession } from '@/types';

/**
 * Base service interface. All service files follow this pattern.
 * When Supabase is connected, replace the mock implementations
 * with Supabase client calls. The interfaces stay the same.
 */

export interface BaseService<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T | null>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export const API_DELAY = 400;

export function delay(ms: number = API_DELAY): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

// Re-export types for convenience
export type {
  UserProfile, RecoveryEntry, MentalEntry, Exercise, JournalEntry,
  Achievement, NotificationItem, CalendarEvent, Goal, Appointment,
  AIConversation, ExerciseSession,
};
