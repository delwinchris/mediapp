import type { UserProfile, RecoveryEntry, MentalEntry, Exercise, JournalEntry, Achievement, NotificationItem, CalendarEvent, Goal, Appointment, AIConversation, ExerciseSession } from '@/types';

export const API_DELAY = 400;

export function delay(ms: number = API_DELAY): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateId(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export { userService } from './userService';
export { recoveryLogService } from './recoveryLogService';
export { mentalLogService } from './mentalLogService';
export { journalService } from './journalService';
export { goalService } from './goalService';
export { exerciseService } from './exerciseService';
export { notificationService } from './notificationService';
export { appointmentService } from './appointmentService';
export { aiChatService } from './aiChatService';

export type {
  UserProfile, RecoveryEntry, MentalEntry, Exercise, JournalEntry,
  Achievement, NotificationItem, CalendarEvent, Goal, Appointment,
  AIConversation, ExerciseSession,
};
