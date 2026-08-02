import type { RecoveryEntry, MentalEntry, JournalEntry, AIConversation, ExerciseSession, Goal, Appointment } from '@/types';
import { achievements } from './mockData';

/**
 * Mock Database — 90 days of realistic recovery data.
 * When Supabase is connected, this file will be replaced with
 * actual database queries via the service layer.
 */

const TODAY = new Date();
function dateStr(daysAgo: number): string {
  const d = new Date(TODAY);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

// Deterministic pseudo-random for reproducible data
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// Generate 90 days of recovery logs with realistic trends
export const mockRecoveryLogs: RecoveryEntry[] = Array.from({ length: 90 }, (_, i) => {
  const day = 89 - i;
  const progress = (89 - day) / 89;
  const noise = (seededRandom(day + 1) - 0.5) * 2;

  const pain = Math.max(1, Math.min(9, Math.round(8 - progress * 5 + noise)));
  const mobility = Math.max(2, Math.min(10, Math.round(3 + progress * 5 + noise * 0.5)));
  const strength = Math.round(15 + progress * 45 + noise * 5);
  const sleep = Math.max(4, Math.min(10, Math.round(5 + progress * 2.5 + noise)));
  const energy = Math.max(3, Math.min(10, Math.round(4 + progress * 4 + noise * 0.8)));
  const swelling = Math.max(0, Math.min(9, Math.round(7 - progress * 5 + noise)));
  const mood = Math.max(3, Math.min(10, Math.round(4 + progress * 5 + noise * 0.6)));
  const medication = day > 60 || (day % 3 === 0);

  const noteOptions = [
    'Stiffness in the morning, eased after warm-up.',
    'Felt good after physio session.',
    'Steady day, no major setbacks.',
    'Managed a longer walk today.',
    'Best sleep in weeks.',
    'Tried light cycling — felt great.',
    'Feeling optimistic today.',
    'Tough morning but improved by evening.',
    'Pushed through exercises despite fatigue.',
    'Pain spiked briefly but settled with ice.',
    'Good progress on range of motion.',
    'Feeling stronger each day.',
  ];

  return {
    id: `r${day}`,
    date: dateStr(day),
    pain,
    mobility,
    strength,
    sleep,
    energy,
    swelling,
    mood,
    medication,
    notes: noteOptions[day % noteOptions.length],
  };
});

// Generate 90 days of mental logs
export const mockMentalLogs: MentalEntry[] = Array.from({ length: 90 }, (_, i) => {
  const day = 89 - i;
  const progress = (89 - day) / 89;
  const noise = (seededRandom(day + 100) - 0.5) * 1.5;

  const anxiety = Math.max(1, Math.min(9, Math.round(8 - progress * 5 + noise)));
  const confidence = Math.max(1, Math.min(10, Math.round(3 + progress * 5 + noise * 0.5)));
  const fearOfReinjury = Math.max(1, Math.min(9, Math.round(8 - progress * 4 + noise)));
  const motivation = Math.max(3, Math.min(10, Math.round(5 + progress * 4 + noise * 0.4)));
  const stress = Math.max(1, Math.min(9, Math.round(7 - progress * 4 + noise)));

  const journalOptions = [
    'Worried about twisting the knee again.',
    'Physio reassured me about progress.',
    'Started breathing exercises — feeling calmer.',
    'Walk felt more natural today.',
    'Slept well, woke up hopeful.',
    'Cycling was fun, felt like me again.',
    'Ready to push a little more this week.',
    'Frustrated with slow progress, but staying patient.',
    'Grateful for the support of family and friends.',
    'Feeling more confident about the future.',
  ];

  return {
    id: `m${day}`,
    date: dateStr(day),
    anxiety,
    confidence,
    fearOfReinjury,
    motivation,
    stress,
    journal: journalOptions[day % journalOptions.length],
  };
});

// Generate journal entries (every 2-3 days)
export const mockJournalEntries: JournalEntry[] = Array.from({ length: 30 }, (_, i) => {
  const day = 88 - i * 3;
  const feelings = [
    'Hopeful and rested', 'Proud and strong', 'Calm and optimistic', 'Determined and focused',
    'Grateful and peaceful', 'Energized and motivated', 'Reflective and patient',
    'Confident and ready', 'Tired but positive', 'Encouraged by progress',
  ];
  const wins = [
    'Walked 2km without pain', 'First bike ride since surgery', 'Did all my exercises',
    'Completed a full strength session', 'Slept 8 hours straight', 'Managed stairs confidently',
    'Reduced pain medication', 'Hit a new mobility milestone', 'Felt no fear during exercises',
    'Completed my first outdoor walk',
  ];
  const challenges = [
    'Stairs still feel scary', 'Getting out of bed early', 'Pushing through fear of jumping',
    'Managing pain spikes', 'Staying motivated on tough days', 'Balancing rest and activity',
    'Dealing with weather sensitivity', 'Maintaining sleep schedule',
  ];
  const gratitude = [
    'Grateful for my supportive partner.',
    'Grateful for the good weather.',
    'Grateful for my physio team.',
    'Grateful for my body\'s resilience.',
    'Grateful for each small win.',
    'Grateful for the recovery community.',
  ];

  return {
    id: `j${i}`,
    date: dateStr(day),
    feeling: feelings[i % feelings.length],
    win: wins[i % wins.length],
    challenge: challenges[i % challenges.length],
    grateful: gratitude[i % gratitude.length],
  };
});

// Generate AI conversations
export const mockAIConversations: AIConversation[] = [
  {
    id: 'ai1',
    title: 'Pain question',
    createdAt: dateStr(5),
    updatedAt: dateStr(5),
    messages: [
      { id: 'msg1', role: 'user', text: 'Why is my pain worse today?', timestamp: dateStr(5) + 'T09:00:00' },
      { id: 'msg2', role: 'coach', text: 'Pain fluctuations are completely normal during recovery. Several factors could be contributing: increased activity intensity, weather changes, reduced sleep quality, or your body\'s natural inflammatory cycle. Try logging your pain level at the same time each day to identify patterns. If pain persists above 6/10 for more than 2 days, contact your physiotherapist.', timestamp: dateStr(5) + 'T09:00:30' },
    ],
  },
  {
    id: 'ai2',
    title: 'Return to sport',
    createdAt: dateStr(3),
    updatedAt: dateStr(3),
    messages: [
      { id: 'msg3', role: 'user', text: 'When can I return to sports?', timestamp: dateStr(3) + 'T14:00:00' },
      { id: 'msg4', role: 'coach', text: 'Based on your current trajectory — pain at 3/10, mobility at 70%, and steady strength gains — you\'re on track for a return to sport around month 9-12 post-surgery. This timeline depends on maintaining consistency with your exercises, hitting strength benchmarks (90% of uninjured leg), and passing a functional movement assessment with your physiotherapist.', timestamp: dateStr(3) + 'T14:00:30' },
    ],
  },
  {
    id: 'ai3',
    title: 'Sleep and recovery',
    createdAt: dateStr(1),
    updatedAt: dateStr(1),
    messages: [
      { id: 'msg5', role: 'user', text: 'How does sleep affect my recovery?', timestamp: dateStr(1) + 'T20:00:00' },
      { id: 'msg6', role: 'coach', text: 'Sleep is critical for recovery. During deep sleep, your body releases growth hormone, which is essential for tissue repair and muscle recovery. Aim for 8+ hours of quality sleep. Your data shows you average 7.1 hours — improving this could accelerate your recovery significantly.', timestamp: dateStr(1) + 'T20:00:30' },
    ],
  },
];

// Generate exercise session history (90 days)
export const mockExerciseHistory: ExerciseSession[] = Array.from({ length: 90 }, (_, i) => {
  const day = 89 - i;
  const progress = (89 - day) / 89;
  const completed = seededRandom(day + 50) > 0.06;

  const exerciseNames = [
    { id: 'e1', name: 'Quad Sets', difficulty: 'Beginner' as const, sets: 3, reps: 10, duration: '5 min' },
    { id: 'e2', name: 'Straight Leg Raises', difficulty: 'Beginner' as const, sets: 3, reps: 12, duration: '6 min' },
    { id: 'e3', name: 'Heel Slides', difficulty: 'Beginner' as const, sets: 3, reps: 15, duration: '5 min' },
    { id: 'e4', name: 'Wall Sits', difficulty: 'Intermediate' as const, sets: 3, reps: 1, duration: '30 sec hold' },
    { id: 'e5', name: 'Single-Leg Balance', difficulty: 'Intermediate' as const, sets: 3, reps: 1, duration: '30 sec each side' },
    { id: 'e6', name: 'Resistance Band Walks', difficulty: 'Intermediate' as const, sets: 3, reps: 10, duration: '4 min' },
    { id: 'e7', name: 'Step-Ups', difficulty: 'Intermediate' as const, sets: 3, reps: 10, duration: '6 min' },
  ];

  const exerciseIdx = day % exerciseNames.length;
  const ex = exerciseNames[exerciseIdx];
  const progression = Math.round(progress * 3);

  return {
    id: `es${day}`,
    exerciseId: ex.id,
    exerciseName: ex.name,
    date: dateStr(day),
    setsCompleted: completed ? ex.sets : Math.max(0, ex.sets - 1),
    repsCompleted: completed ? ex.reps : Math.round(ex.reps * 0.5),
    duration: ex.duration,
    difficulty: ex.difficulty,
    completed,
  };
});

// Goals
export const mockGoals: Goal[] = [
  { id: 'g1', title: 'Return to badminton', description: 'Return to playing competitive badminton matches', category: 'sport', priority: 'high', progress: 65, targetDate: '2027-02-14', status: 'active', createdAt: dateStr(80) },
  { id: 'g2', title: 'Pain below 2', description: 'Reduce daily pain level to below 2 out of 10', category: 'physical', priority: 'high', progress: 75, targetDate: '2026-09-01', status: 'active', createdAt: dateStr(60) },
  { id: 'g3', title: 'Sleep 8 hours', description: 'Consistently sleep 8 hours per night', category: 'lifestyle', priority: 'medium', progress: 60, targetDate: '2026-08-15', status: 'active', createdAt: dateStr(45) },
  { id: 'g4', title: 'Complete rehab daily', description: 'Complete all prescribed exercises every day', category: 'physical', priority: 'high', progress: 94, targetDate: '2026-12-01', status: 'active', createdAt: dateStr(85) },
  { id: 'g5', title: 'Walk 5 km', description: 'Walk 5km continuously without pain', category: 'physical', priority: 'medium', progress: 80, targetDate: '2026-09-15', status: 'active', createdAt: dateStr(50) },
  { id: 'g6', title: 'Increase mobility to 95%', description: 'Regain 95% of full knee range of motion', category: 'physical', priority: 'high', progress: 74, targetDate: '2026-08-14', status: 'active', createdAt: dateStr(70) },
  { id: 'g7', title: 'Meditate 3x per week', description: 'Complete 3 mindfulness sessions per week', category: 'mental', priority: 'low', progress: 45, targetDate: '2026-10-01', status: 'active', createdAt: dateStr(30) },
  { id: 'g8', title: 'First gym session', description: 'Complete a full strength and conditioning session', category: 'physical', priority: 'medium', progress: 100, targetDate: '2026-07-09', status: 'completed', createdAt: dateStr(85) },
];

// Appointments
export const mockAppointments: Appointment[] = [
  { id: 'appt1', title: 'Physiotherapy Session', provider: 'Dr. Sarah Chen', location: 'Sports Rehab Clinic', date: dateStr(-2), time: '10:30', type: 'physiotherapy', status: 'upcoming', notes: 'Focus on strength progression and mobility assessment' },
  { id: 'appt2', title: '3-Month Surgeon Follow-up', provider: 'Dr. James Miller', location: 'Orthopedic Center', date: dateStr(-5), time: '11:00', type: 'surgeon', status: 'upcoming', notes: '3-month post-op check-up and X-ray review' },
  { id: 'appt3', title: 'Range of Motion Assessment', provider: 'Dr. Sarah Chen', location: 'Sports Rehab Clinic', date: dateStr(-12), time: '14:00', type: 'assessment', status: 'upcoming', notes: 'Target: full knee flexion assessment' },
  { id: 'appt4', title: 'Physiotherapy Session', provider: 'Dr. Sarah Chen', location: 'Sports Rehab Clinic', date: dateStr(7), time: '10:30', type: 'physiotherapy', status: 'completed' },
  { id: 'appt5', title: 'GP Check-up', provider: 'Dr. Lisa Park', location: 'City Medical Center', date: dateStr(14), time: '09:00', type: 'gp', status: 'completed' },
];

export { achievements };
