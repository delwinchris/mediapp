import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { UserProfile, RecoveryEntry, MentalEntry, NotificationItem, Goal, AppSettings, RecoveryProfile } from '@/types';
import { useAuth } from '@/lib/auth';
import {
  recoveryLogService, mentalLogService, notificationService, goalService,
} from '@/services';

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
  addRecoveryLog: (log: RecoveryEntry) => Promise<void>;
  addMentalLog: (log: MentalEntry) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  clearNotifications: () => Promise<void>;
  addGoal: (goal: Goal) => Promise<void>;
  updateGoal: (id: string, data: Partial<Goal>) => Promise<void>;
  deleteGoal: (id: string) => Promise<void>;
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
    if (!user) {
      setCurrentUser(null);
      setRecoveryLogs([]);
      setMentalLogs([]);
      setNotifications([]);
      setGoals([]);
      return;
    }

    setCurrentUser(user.profile ?? null);

    (async () => {
      try {
        const [logs, mental, notifs, userGoals] = await Promise.all([
          recoveryLogService.getAll(),
          mentalLogService.getAll(),
          notificationService.getAll(),
          goalService.getAll(),
        ]);
        setRecoveryLogs(logs);
        setMentalLogs(mental);
        setNotifications(notifs);
        setGoals(userGoals);
      } catch (err) {
        console.error('Store data fetch failed:', err);
      }
    })();
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
        myWhy: currentUser.myWhy,
      }
    : null;

  const addRecoveryLog = useCallback(async (log: RecoveryEntry) => {
    const saved = await recoveryLogService.create(log);
    setRecoveryLogs((prev) => [saved, ...prev]);
  }, []);

  const addMentalLog = useCallback(async (log: MentalEntry) => {
    const saved = await mentalLogService.create(log);
    setMentalLogs((prev) => [saved, ...prev]);
  }, []);

  const markNotificationRead = useCallback(async (id: string) => {
    await notificationService.markRead(id);
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(async () => {
    await notificationService.markAllRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(async () => {
    await notificationService.deleteAll();
    setNotifications([]);
  }, []);

  const addGoal = useCallback(async (goal: Goal) => {
    const saved = await goalService.create(goal);
    setGoals((prev) => [saved, ...prev]);
  }, []);

  const updateGoal = useCallback(async (id: string, data: Partial<Goal>) => {
    const saved = await goalService.update(id, data);
    setGoals((prev) => prev.map((g) => (g.id === id ? saved : g)));
  }, []);

  const deleteGoal = useCallback(async (id: string) => {
    await goalService.delete(id);
    setGoals((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const updateSettings = useCallback((data: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...data }));
  }, []);

  const resetStore = useCallback(() => {
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
    clearNotifications,
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
