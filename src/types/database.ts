/**
 * Database row types — mirror the Supabase schema columns (snake_case).
 * These are the raw shapes returned by Supabase queries.
 * The service layer maps between these and the camelCase app types.
 */

export interface RecoveryLogRow {
  id: string;
  user_id: string;
  date: string;
  pain: number;
  mobility: number;
  strength: number;
  sleep: number;
  energy: number;
  swelling: number;
  mood: number;
  medication: boolean;
  notes: string;
  created_at: string;
}

export interface MentalLogRow {
  id: string;
  user_id: string;
  date: string;
  anxiety: number;
  confidence: number;
  fear_of_reinjury: number;
  motivation: number;
  stress: number;
  journal: string;
  created_at: string;
}

export interface JournalEntryRow {
  id: string;
  user_id: string;
  date: string;
  feeling: string;
  win: string;
  challenge: string;
  grateful: string;
  created_at: string;
}

export interface GoalRow {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  progress: number;
  target_date: string | null;
  status: string;
  created_at: string;
}

export interface ExerciseRow {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  sets: number;
  reps: number;
  duration: string | null;
  instructions: string;
  target_area: string;
  image: string | null;
  completed: boolean;
  created_at: string;
}

export interface ExerciseHistoryRow {
  id: string;
  user_id: string;
  exercise_id: string | null;
  exercise_name: string;
  date: string;
  sets_completed: number;
  reps_completed: number;
  duration: string;
  difficulty: string;
  completed: boolean;
  created_at: string;
}

export interface NotificationRow {
  id: string;
  user_id: string;
  type: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: string;
  created_at: string;
}

export interface AchievementRow {
  id: string;
  user_id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date: string | null;
  xp: number;
  tier: string;
  created_at: string;
}

export interface AppointmentRow {
  id: string;
  user_id: string;
  title: string;
  provider: string;
  location: string;
  date: string;
  time: string;
  type: string;
  status: string;
  notes: string | null;
  created_at: string;
}

export interface AIConversationRow {
  id: string;
  user_id: string;
  title: string;
  messages: { id: string; role: 'user' | 'coach'; text: string; timestamp: string }[];
  created_at: string;
  updated_at: string;
}

export interface ProfileRow {
  id: string;
  email: string;
  name: string;
  age: number | null;
  height: number | null;
  weight: number | null;
  injury: string;
  injury_date: string;
  surgery_date: string | null;
  pain_level: number;
  mobility_level: number;
  recovery_goal: string;
  my_why: string | null;
  avatar_url: string | null;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}
