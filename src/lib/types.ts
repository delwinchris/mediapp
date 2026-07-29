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
  sleep: number;
  energy: number;
  swelling: number;
  mood: number;
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
