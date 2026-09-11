import type { Achievement, ExerciseSession, Goal, JournalEntry, MentalEntry, RecoveryEntry } from '@/types';

export interface DerivedAchievement extends Achievement {
    requirement: string;
    progress: number;
    goal: number;
    unlocked: boolean;
}

export function buildAchievementSet({
    recoveryLogs,
    mentalLogs,
    journalEntries,
    exerciseSessions,
    goals,
}: {
    recoveryLogs: RecoveryEntry[];
    mentalLogs: MentalEntry[];
    journalEntries: JournalEntry[];
    exerciseSessions: ExerciseSession[];
    goals: Goal[];
}): DerivedAchievement[] {
    const recoveryDates = new Set(recoveryLogs.map((entry) => entry.date));
    const mentalDates = new Set(mentalLogs.map((entry) => entry.date));
    const completedGoals = goals.filter((goal) => goal.status === 'completed').length;

    const entries: DerivedAchievement[] = [
        {
            id: 'first-check-in',
            title: 'First Check-In',
            description: 'Log your first recovery check-in.',
            icon: 'HeartPulse',
            earned: recoveryLogs.length >= 1,
            unlocked: recoveryLogs.length >= 1,
            requirement: '1 recovery check-in',
            progress: Math.min(recoveryLogs.length, 1),
            goal: 1,
            xp: 50,
            tier: 'bronze',
        },
        {
            id: 'recovery-routine',
            title: 'Recovery Routine',
            description: 'Build a consistent recovery routine across multiple check-in dates.',
            icon: 'Calendar',
            earned: recoveryDates.size >= 3,
            unlocked: recoveryDates.size >= 3,
            requirement: '3 recovery days',
            progress: Math.min(recoveryDates.size, 3),
            goal: 3,
            xp: 100,
            tier: 'silver',
        },
        {
            id: 'mental-check-in',
            title: 'Mental Check-In',
            description: 'Complete your first mental health check-in.',
            icon: 'Brain',
            earned: mentalLogs.length >= 1,
            unlocked: mentalLogs.length >= 1,
            requirement: '1 mental check-in',
            progress: Math.min(mentalLogs.length, 1),
            goal: 1,
            xp: 75,
            tier: 'bronze',
        },
        {
            id: 'journal-starter',
            title: 'Journal Starter',
            description: 'Write your first journal entry.',
            icon: 'BookHeart',
            earned: journalEntries.length >= 1,
            unlocked: journalEntries.length >= 1,
            requirement: '1 journal entry',
            progress: Math.min(journalEntries.length, 1),
            goal: 1,
            xp: 75,
            tier: 'bronze',
        },
        {
            id: 'exercise-starter',
            title: 'Exercise Starter',
            description: 'Complete at least one exercise session.',
            icon: 'Dumbbell',
            earned: exerciseSessions.length >= 1,
            unlocked: exerciseSessions.length >= 1,
            requirement: '1 completed exercise session',
            progress: Math.min(exerciseSessions.length, 1),
            goal: 1,
            xp: 100,
            tier: 'silver',
        },
        {
            id: 'goal-setter',
            title: 'Goal Setter',
            description: 'Create your first recovery goal.',
            icon: 'Target',
            earned: goals.length >= 1,
            unlocked: goals.length >= 1,
            requirement: '1 goal created',
            progress: Math.min(goals.length, 1),
            goal: 1,
            xp: 100,
            tier: 'silver',
        },
        {
            id: 'goal-achieved',
            title: 'Goal Achieved',
            description: 'Complete at least one recovery goal.',
            icon: 'Trophy',
            earned: completedGoals >= 1,
            unlocked: completedGoals >= 1,
            requirement: '1 completed goal',
            progress: Math.min(completedGoals, 1),
            goal: 1,
            xp: 150,
            tier: 'gold',
        },
        {
            id: 'consistent-recovery',
            title: 'Consistent Recovery',
            description: 'Maintain a steady recovery routine across at least seven check-in days.',
            icon: 'TrendingUp',
            earned: recoveryDates.size >= 7,
            unlocked: recoveryDates.size >= 7,
            requirement: '7 recovery days',
            progress: Math.min(recoveryDates.size, 7),
            goal: 7,
            xp: 200,
            tier: 'gold',
        },
        {
            id: 'mental-stability',
            title: 'Mental Stability',
            description: 'Complete at least three mental check-ins.',
            icon: 'Brain',
            earned: mentalDates.size >= 3,
            unlocked: mentalDates.size >= 3,
            requirement: '3 mental check-ins',
            progress: Math.min(mentalDates.size, 3),
            goal: 3,
            xp: 125,
            tier: 'silver',
        },
    ];

    return entries.map((achievement) => ({
        ...achievement,
        earned: achievement.unlocked,
        progress: achievement.progress,
        goal: achievement.goal,
        unlocked: achievement.unlocked,
        requirement: achievement.requirement,
    }));
}
