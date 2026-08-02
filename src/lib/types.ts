export type PainLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  height?: number;
  weight?: number;
  injury: string;
  injuryDate: string;
  surgeryDate?: string;
  painLevel: number;
  mobilityLevel: number;
  recoveryGoal: string;
  avatarUrl?: string;
}

export interface DailyGoal {
  id: string;
  title: string;
  done: boolean;
}

export interface RecoveryEntry {
  id: string;
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
}

export interface MentalEntry {
  id: string;
  date: string;
  anxiety: number;
  confidence: number;
  fearOfReinjury: number;
  motivation: number;
  stress: number;
  journal: string;
}

export interface MindCheckIn {
  anxiety: number;
  confidence: number;
  fearOfReinjury: number;
  motivation: number;
  stress: number;
  hopefulness: number;
  frustration: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  feeling: string;
  win: string;
  challenge: string;
  grateful: string;
}

export interface RecoveryStoryMilestone {
  id: string;
  phase: string;
  date: string;
  title: string;
  description: string;
  achieved: boolean;
  icon: string;
}

export interface TimelineMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  icon: string;
  achieved: boolean;
}

export interface BreathingExercise {
  id: string;
  name: string;
  duration: string;
  pattern: string;
  description: string;
  color: string;
}

export interface MotivationStory {
  id: string;
  title: string;
  athlete: string;
  sport: string;
  image: string;
  excerpt: string;
}

export interface DailyQuote {
  id: string;
  quote: string;
  author: string;
}

export interface DailyWin {
  id: string;
  date: string;
  text: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sets: number;
  reps: number;
  duration?: string;
  instructions: string;
  targetArea: string;
  image: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'coach';
  text: string;
  timestamp: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface InjuryCategory {
  id: string;
  label: string;
  icon: string;
  conditions: string[];
}

export interface RecoveryPlanItem {
  id: string;
  title: string;
  detail: string;
  icon: string;
  progress: number;
  total: number;
  done: number;
  color: string;
}

export interface ActivityItem {
  id: string;
  type: 'exercise' | 'pain' | 'journal' | 'milestone';
  title: string;
  time: string;
  icon: string;
}

export interface OnboardingData {
  name: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
  injuryCategory: string;
  injuryType: string;
  injuryDate: string;
  surgeryDate: string;
  side: 'left' | 'right' | 'both' | '';
  pain: number;
  mobility: number;
  goal: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  date?: string;
  xp: number;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface RecoveryLevel {
  level: number;
  title: string;
  currentXp: number;
  nextLevelXp: number;
  totalXp: number;
}

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: 'exercise' | 'appointment' | 'medication' | 'milestone';
  time?: string;
  description?: string;
}

export interface RecoveryInsight {
  id: string;
  title: string;
  description: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  accent: 'blue' | 'emerald' | 'amber' | 'violet' | 'rose' | 'sky';
}

export interface AnalyticsSeries {
  key: string;
  label: string;
  color: string;
  icon: string;
  weekly: { date: string; value: number }[];
  monthly: { date: string; value: number }[];
  yearly: { date: string; value: number }[];
  domain: [number, number];
  invert?: boolean;
}

export interface ReportSummary {
  physicalScore: number;
  mentalScore: number;
  overallScore: number;
  painChange: number;
  mobilityChange: number;
  strengthChange: number;
  sleepAvg: number;
  anxietyChange: number;
  confidenceChange: number;
  exerciseConsistency: number;
  streak: number;
}

export interface NotificationItem {
  id: string;
  type: 'exercise' | 'pain' | 'hydration' | 'report' | 'appointment' | 'streak' | 'achievement' | 'ai';
  title: string;
  description: string;
  time: string;
  read: boolean;
  icon: string;
}

export interface ExerciseDetail {
  id: string;
  name: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sets: number;
  reps: number;
  duration: string;
  description: string;
  musclesTargeted: string[];
  equipment: string[];
  tips: string[];
  commonMistakes: string[];
  safetyNotes: string[];
  image: string;
}

export interface SearchResult {
  id: string;
  type: 'exercise' | 'log' | 'journal' | 'milestone' | 'ai';
  title: string;
  description: string;
  route: string;
  icon: string;
}

export interface AdvancedInsight {
  id: string;
  title: string;
  description: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  accent: 'blue' | 'emerald' | 'amber' | 'violet' | 'rose' | 'sky';
  metric: string;
  change: number;
}
