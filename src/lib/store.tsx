import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { UserProfile, RecoveryEntry, MentalEntry, NotificationItem, Goal, AppSettings, RecoveryProfile } from '@/types';
import {
  mockUser, notifications as initialNotifications,
} from '@/lib/mockData';
import {
  mockRecoveryLogs, mockMentalLogs, mockGoals,
} from '@/lib/mockDatabase';
import { useAuth } from '@/lib/auth';

interface AppState {
  currentUser: UserProfile | null;
  recoveryProfile: RecoveryProfile | null;
  recoveryLogs: RecoveryEntry[];
  mentalLogs: MentalEntry[];
  notifications: NotificationItem[];
  goals: Goal[];
  settings: AppSettings;
  isAuthenticated: boolean;
}

interface AppStoreContextValue extends AppState {
  addRecoveryLog: (log: RecoveryEntry) => void;
  addMentalLog: (log: MentalEntry) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (id: string, data: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  updateSettings: (data: Partial<AppSettings>) => void;
  resetStore: () => void;
}

const defaultSettings: AppSettings = {
  theme: { mode: 'light', fontSize: 'medium', reducedMotion: false, highContrast: false },
  language: 'en',
  notifications: {
    exerciseReminders: true,
    painLoggingReminders: true,
    hydrationReminders: true,
    weeklyReports: true,
    appointmentReminders: true,
    achievementAlerts: true,
    aiInsights: true,
  },
  privacy: {
    shareDataWithProvider: true,
    analyticsOptIn: false,
    profileVisibility: 'provider',
  },
};

const AppStoreContext = createContext<AppStoreContextValue | undefined>(undefined);

const SETTINGS_KEY = 'medirecover-settings';

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [recoveryLogs, setRecoveryLogs] = useState<RecoveryEntry[]>([]);
  const [mentalLogs, setMentalLogs] = useState<MentalEntry[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);

  useEffect(() => {
    if (user) {
      setCurrentUser(user.profile ?? mockUser);
      setRecoveryLogs(mockRecoveryLogs);
      setMentalLogs(mockMentalLogs);
      setNotifications(initialNotifications);
      setGoals(mockGoals);
    } else {
      setCurrentUser(null);
      setRecoveryLogs([]);
      setMentalLogs([]);
      setNotifications([]);
      setGoals([]);
    }
  }, [user]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) setSettings(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  const recoveryProfile: RecoveryProfile | null = currentUser
    ? {
        injury: currentUser.injury,
        injuryDate: currentUser.injuryDate,
        surgeryDate: currentUser.surgeryDate,
        currentStage: 'Mid-Recovery (Week 10-12)',
        recoveryDay: Math.max(1, Math.floor((Date.now() - new Date(currentUser.injuryDate + 'T00:00:00').getTime()) / 86400000)),
        painLevel: currentUser.painLevel,
        mobilityLevel: currentUser.mobilityLevel,
        strengthLevel: 55,
        recoveryGoal: currentUser.recoveryGoal,
      }
    : null;

  const addRecoveryLog = useCallback((log: RecoveryEntry) => {
    setRecoveryLogs((prev) => [...prev, log]);
  }, []);

  const addMentalLog = useCallback((log: MentalEntry) => {
    setMentalLogs((prev) => [...prev, log]);
  }, []);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const addGoal = useCallback((goal: Goal) => {
    setGoals((prev) => [...prev, goal]);
  }, []);

  const updateGoal = useCallback((id: string, data: Partial<Goal>) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...data } : g)));
  }, []);

  const deleteGoal = useCallback((id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const updateSettings = useCallback((data: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...data }));
  }, []);

  const resetStore = useCallback(() => {
    setRecoveryLogs(mockRecoveryLogs);
    setMentalLogs(mockMentalLogs);
    setNotifications(initialNotifications);
    setGoals(mockGoals);
    setSettings(defaultSettings);
  }, []);

  const value: AppStoreContextValue = {
    currentUser,
    recoveryProfile,
    recoveryLogs,
    mentalLogs,
    notifications,
    goals,
    settings,
    isAuthenticated: !!user,
    addRecoveryLog,
    addMentalLog,
    markNotificationRead,
    markAllNotificationsRead,
    addGoal,
    updateGoal,
    deleteGoal,
    updateSettings,
    resetStore,
  };

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppStoreContext);
  if (!ctx) throw new Error('useAppStore must be used within AppStoreProvider');
  return ctx;
}
