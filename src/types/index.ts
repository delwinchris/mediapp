import type {
  UserProfile, RecoveryEntry, MentalEntry, Exercise, JournalEntry,
  Achievement, NotificationItem, CalendarEvent,
} from '@/lib/types';

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'physical' | 'mental' | 'lifestyle' | 'sport';
  priority: 'low' | 'medium' | 'high';
  progress: number;
  targetDate: string;
  status: 'active' | 'completed' | 'paused';
  createdAt: string;
}

export interface Appointment {
  id: string;
  title: string;
  provider: string;
  location: string;
  date: string;
  time: string;
  type: 'physiotherapy' | 'surgeon' | 'gp' | 'imaging' | 'assessment';
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

export interface AIConversation {
  id: string;
  title: string;
  messages: { id: string; role: 'user' | 'coach'; text: string; timestamp: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseSession {
  id: string;
  exerciseId: string;
  exerciseName: string;
  date: string;
  setsCompleted: number;
  repsCompleted: number;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
}

export interface RecoveryProfile {
  injury: string;
  injuryDate: string;
  surgeryDate?: string;
  currentStage: string;
  recoveryDay: number;
  painLevel: number;
  mobilityLevel: number;
  strengthLevel: number;
  recoveryGoal: string;
}

export interface ThemeSettings {
  mode: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  reducedMotion: boolean;
  highContrast: boolean;
}

export interface AppSettings {
  theme: ThemeSettings;
  language: 'en' | 'es' | 'fr' | 'de' | 'pt';
  notifications: {
    exerciseReminders: boolean;
    painLoggingReminders: boolean;
    hydrationReminders: boolean;
    weeklyReports: boolean;
    appointmentReminders: boolean;
    achievementAlerts: boolean;
    aiInsights: boolean;
  };
  privacy: {
    shareDataWithProvider: boolean;
    analyticsOptIn: boolean;
    profileVisibility: 'private' | 'provider' | 'public';
  };
}

export interface DashboardMetrics {
  recoveryScore: number;
  recoveryReadiness: number;
  exerciseCompletion: number;
  mentalWellnessScore: number;
  consistencyScore: number;
  streak: number;
  painTrend: number;
  mobilityTrend: number;
}

export type { UserProfile, RecoveryEntry, MentalEntry, Exercise, JournalEntry, Achievement, NotificationItem, CalendarEvent };
