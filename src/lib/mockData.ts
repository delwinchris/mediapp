import type {
  UserProfile,
  DailyGoal,
  RecoveryEntry,
  MentalEntry,
  MindCheckIn,
  JournalEntry,
  TimelineMilestone,
  BreathingExercise,
  MotivationStory,
  DailyQuote,
  DailyWin,
  Exercise,
  Testimonial,
  FAQItem,
  Feature,
  InjuryCategory,
  RecoveryPlanItem,
  ActivityItem,
  OnboardingData,
  RecoveryStoryMilestone,
  Achievement,
  RecoveryLevel,
  CalendarEvent,
  RecoveryInsight,
  AnalyticsSeries,
  ReportSummary,
  NotificationItem,
  ExerciseDetail,
  SearchResult,
  AdvancedInsight,
} from './types';

export const mockUser: UserProfile = {
  id: 'u1',
  name: 'Alex Morgan',
  email: 'alex.morgan@example.com',
  age: 34,
  height: 178,
  weight: 76,
  injury: 'ACL Reconstruction Surgery',
  injuryDate: '2026-05-14',
  painLevel: 4,
  mobilityLevel: 6,
  recoveryGoal: 'Return to competitive running within 9 months',
  avatarUrl:
    'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
};

export const dailyGoals: DailyGoal[] = [
  { id: 'g1', title: 'Complete 3 prescribed exercises', done: true },
  { id: 'g2', title: 'Walk 2,000 steps', done: true },
  { id: 'g3', title: 'Ice knee for 15 minutes', done: false },
  { id: 'g4', title: 'Log recovery tracker entry', done: false },
  { id: 'g5', title: '10 minutes guided breathing', done: false },
];

export const recoveryHistory: RecoveryEntry[] = [
  { id: 'r1', date: '2026-07-21', pain: 6, mobility: 4, strength: 30, sleep: 6, energy: 5, swelling: 7, mood: 5, medication: true, notes: 'Stiffness in the morning, eased after warm-up.' },
  { id: 'r2', date: '2026-07-22', pain: 5, mobility: 5, strength: 35, sleep: 7, energy: 6, swelling: 6, mood: 6, medication: true, notes: 'Felt good after physio session.' },
  { id: 'r3', date: '2026-07-23', pain: 5, mobility: 5, strength: 38, sleep: 6, energy: 6, swelling: 5, mood: 6, medication: true, notes: 'Steady day, no major setbacks.' },
  { id: 'r4', date: '2026-07-24', pain: 4, mobility: 6, strength: 42, sleep: 7, energy: 7, swelling: 4, mood: 7, medication: false, notes: 'Managed a longer walk.' },
  { id: 'r5', date: '2026-07-25', pain: 4, mobility: 6, strength: 45, sleep: 8, energy: 7, swelling: 4, mood: 8, medication: true, notes: 'Best sleep in weeks.' },
  { id: 'r6', date: '2026-07-26', pain: 3, mobility: 7, strength: 50, sleep: 7, energy: 8, swelling: 3, mood: 8, medication: true, notes: 'Tried light cycling.' },
  { id: 'r7', date: '2026-07-27', pain: 3, mobility: 7, strength: 55, sleep: 7, energy: 8, swelling: 3, mood: 9, medication: true, notes: 'Feeling optimistic today.' },
];

export const mentalHistory: MentalEntry[] = [
  { id: 'm1', date: '2026-07-21', anxiety: 7, confidence: 4, fearOfReinjury: 8, motivation: 5, stress: 7, journal: 'Worried about twisting the knee again.' },
  { id: 'm2', date: '2026-07-22', anxiety: 6, confidence: 5, fearOfReinjury: 7, motivation: 6, stress: 6, journal: 'Physio reassured me about progress.' },
  { id: 'm3', date: '2026-07-23', anxiety: 5, confidence: 6, fearOfReinjury: 6, motivation: 7, stress: 5, journal: 'Started breathing exercises.' },
  { id: 'm4', date: '2026-07-24', anxiety: 5, confidence: 6, fearOfReinjury: 5, motivation: 7, stress: 5, journal: 'Walk felt more natural.' },
  { id: 'm5', date: '2026-07-25', anxiety: 4, confidence: 7, fearOfReinjury: 5, motivation: 8, stress: 4, journal: 'Slept well, woke up hopeful.' },
  { id: 'm6', date: '2026-07-26', anxiety: 4, confidence: 7, fearOfReinjury: 4, motivation: 8, stress: 4, journal: 'Cycling was fun, felt like me again.' },
  { id: 'm7', date: '2026-07-27', anxiety: 3, confidence: 8, fearOfReinjury: 4, motivation: 9, stress: 3, journal: 'Ready to push a little more this week.' },
];

export const exercises: Exercise[] = [
  {
    id: 'e1',
    name: 'Quad Sets',
    category: 'Strengthening',
    difficulty: 'Beginner',
    sets: 3,
    reps: 10,
    duration: '5 min',
    instructions:
      'Sit on the floor with legs straight. Tighten the muscle on top of your thigh by pressing the back of your knee down into the floor. Hold for 5 seconds, then relax.',
    targetArea: 'Quadriceps',
    image:
      'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg?auto=compress&cs=tinysrgb&w=600',
    completed: true,
  },
  {
    id: 'e2',
    name: 'Straight Leg Raises',
    category: 'Strengthening',
    difficulty: 'Beginner',
    sets: 3,
    reps: 12,
    duration: '6 min',
    instructions:
      'Lie on your back with one leg bent. Tighten the thigh muscle of the straight leg and lift it to the level of the bent knee. Slowly lower and repeat.',
    targetArea: 'Quadriceps / Hip Flexors',
    image:
      'https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg?auto=compress&cs=tinysrgb&w=600',
    completed: true,
  },
  {
    id: 'e3',
    name: 'Heel Slides',
    category: 'Mobility',
    difficulty: 'Beginner',
    sets: 3,
    reps: 15,
    duration: '5 min',
    instructions:
      'Lie on your back. Slowly slide your heel toward your buttocks, bending your knee as far as comfortable. Slide back down and repeat.',
    targetArea: 'Knee Flexion',
    image:
      'https://images.pexels.com/photos/4498294/pexels-photo-4498294.jpeg?auto=compress&cs=tinysrgb&w=600',
    completed: false,
  },
  {
    id: 'e4',
    name: 'Wall Sits',
    category: 'Strengthening',
    difficulty: 'Intermediate',
    sets: 3,
    reps: 1,
    duration: '30 sec hold',
    instructions:
      'Lean your back against a wall and slide down until your knees are at a 90-degree angle. Hold the position, keeping your core engaged.',
    targetArea: 'Quadriceps / Glutes',
    image:
      'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg?auto=compress&cs=tinysrgb&w=600',
    completed: false,
  },
  {
    id: 'e5',
    name: 'Single-Leg Balance',
    category: 'Balance',
    difficulty: 'Intermediate',
    sets: 3,
    reps: 1,
    duration: '30 sec each side',
    instructions:
      'Stand on one leg with a slight bend in the knee. Keep your hips level and hold for 30 seconds. Progress by closing your eyes or standing on an unstable surface.',
    targetArea: 'Proprioception',
    image:
      'https://images.pexels.com/photos/3820460/pexels-photo-3820460.jpeg?auto=compress&cs=tinysrgb&w=600',
    completed: false,
  },
  {
    id: 'e6',
    name: 'Resistance Band Walks',
    category: 'Strengthening',
    difficulty: 'Intermediate',
    sets: 3,
    reps: 10,
    duration: '4 min',
    instructions:
      'Place a resistance band around your ankles. Take small lateral steps, keeping tension on the band and knees slightly bent.',
    targetArea: 'Hip Abductors',
    image:
      'https://images.pexels.com/photos/4498294/pexels-photo-4498294.jpeg?auto=compress&cs=tinysrgb&w=600',
    completed: false,
  },
  {
    id: 'e7',
    name: 'Step-Ups',
    category: 'Functional',
    difficulty: 'Intermediate',
    sets: 3,
    reps: 10,
    duration: '6 min',
    instructions:
      'Step onto a low platform with one foot, drive through the heel to bring the other foot up, then step back down with control.',
    targetArea: 'Quads / Glutes',
    image:
      'https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg?auto=compress&cs=tinysrgb&w=600',
    completed: false,
  },
  {
    id: 'e8',
    name: 'Box Jumps (Low)',
    category: 'Plyometric',
    difficulty: 'Advanced',
    sets: 3,
    reps: 8,
    duration: '5 min',
    instructions:
      'Only attempt late in recovery. Jump onto a low, stable box, landing softly with knees aligned over toes. Step down between reps.',
    targetArea: 'Explosive Power',
    image:
      'https://images.pexels.com/photos/3820460/pexels-photo-3820460.jpeg?auto=compress&cs=tinysrgb&w=600',
    completed: false,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Chen',
    role: 'Marathon Runner, ACL Recovery',
    avatar:
      'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200',
    quote:
      'MediRecover kept me accountable every single day. Seeing my recovery score climb week over week was the motivation I needed to get back on the trail.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Marcus Reid',
    role: 'Weekend Warrior, Rotator Cuff Repair',
    avatar:
      'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=200',
    quote:
      'The mental recovery tracker surprised me. Tracking my fear of re-injury helped me talk about it with my physio instead of pretending it wasnt there.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Priya Nair',
    role: 'Dancer, Ankle Reconstruction',
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200',
    quote:
      'The AI coach feels like having a supportive teammate. It never replaces my surgeon, but it answers my 2am questions when anxiety spikes.',
    rating: 4,
  },
];

export const faqItems: FAQItem[] = [
  {
    id: 'f1',
    question: 'Is MediRecover a replacement for my doctor or physiotherapist?',
    answer:
      'No. MediRecover is a companion tool that helps you track and understand your recovery between clinical visits. Always follow the advice of your qualified medical professionals.',
  },
  {
    id: 'f2',
    question: 'How does the recovery score work?',
    answer:
      'Your recovery score combines the metrics you log daily — pain, mobility, sleep, energy, mood and adherence to your plan — into a single 0-100 trend so you can see your overall trajectory at a glance.',
  },
  {
    id: 'f3',
    question: 'Can I use MediRecover for any injury or surgery?',
    answer:
      'Yes. During onboarding you describe your specific injury or surgery, and your dashboard, exercises and goals adapt to your situation.',
  },
  {
    id: 'f4',
    question: 'Is my health data private?',
    answer:
      'Your data is encrypted in transit and at rest. You own your data and can export or delete it at any time from your profile settings.',
  },
  {
    id: 'f5',
    question: 'Does the AI coach give medical advice?',
    answer:
      'No. The AI coach offers encouragement, explains general recovery concepts, and helps you reflect. It explicitly does not diagnose or replace professional medical advice.',
  },
];

export const features: Feature[] = [
  { id: 'ft1', icon: 'Activity', title: 'Recovery Score', description: 'A single, easy-to-understand score that tracks your overall recovery trend day by day.' },
  { id: 'ft2', icon: 'Brain', title: 'Mental Recovery Tracking', description: 'Recovery is as much mental as physical. Log anxiety, confidence and fear of re-injury alongside your body.' },
  { id: 'ft3', icon: 'Dumbbell', title: 'Guided Exercise Library', description: 'Step-by-step exercises tailored to your stage of recovery, with sets, reps and clear instructions.' },
  { id: 'ft4', icon: 'Sparkles', title: 'AI Recovery Coach', description: 'A supportive AI companion that answers questions, reflects on your progress and keeps you motivated.' },
  { id: 'ft5', icon: 'LineChart', title: 'Progress Insights', description: 'Beautiful charts for pain, mood, sleep and mobility so you and your care team can see real trends.' },
  { id: 'ft6', icon: 'Flame', title: 'Streaks & Goals', description: 'Build healthy recovery habits with daily goals and a recovery streak that celebrates consistency.' },
];

export const upcomingExercises = exercises.filter((e) => !e.completed).slice(0, 3);

export const aiSampleResponses: string[] = [
  "That's a great question. A little soreness after a new exercise is normal, but sharp or swelling pain is a signal to ease off and check in with your physiotherapist.",
  "You're on a 7-day streak — that's real momentum. Consistency matters more than intensity, so keep showing up even on the tough days.",
  "It sounds like sleep has improved this week, which is fantastic. Sleep is when your body does most of its repair work, so protecting it will accelerate your recovery.",
  "Fear of re-injury is one of the hardest parts of recovery, and naming it the way you just did is exactly how you start to move past it. Consider sharing this with your care team.",
  "Remember: I'm here to support and inform, but I don't replace your doctor or physiotherapist. For anything that feels urgent or unusual, please contact your care team.",
];

export const mindCheckInMetrics: { key: keyof MindCheckIn; label: string; color: 'rose' | 'emerald' | 'amber' | 'blue' | 'violet' | 'sky' | 'orange'; invert: boolean }[] = [
  { key: 'anxiety', label: 'Anxiety', color: 'rose', invert: true },
  { key: 'confidence', label: 'Confidence', color: 'emerald', invert: false },
  { key: 'fearOfReinjury', label: 'Fear of Reinjury', color: 'amber', invert: true },
  { key: 'motivation', label: 'Motivation', color: 'blue', invert: false },
  { key: 'stress', label: 'Stress', color: 'violet', invert: true },
  { key: 'hopefulness', label: 'Hopefulness', color: 'sky', invert: false },
  { key: 'frustration', label: 'Frustration', color: 'orange', invert: true },
];

export const defaultMindCheckIn: MindCheckIn = {
  anxiety: 3, confidence: 8, fearOfReinjury: 4, motivation: 9, stress: 3, hopefulness: 8, frustration: 3,
};

export const mindHistory: MindCheckIn[] = [
  { anxiety: 7, confidence: 4, fearOfReinjury: 8, motivation: 5, stress: 7, hopefulness: 4, frustration: 6 },
  { anxiety: 6, confidence: 5, fearOfReinjury: 7, motivation: 6, stress: 6, hopefulness: 5, frustration: 5 },
  { anxiety: 5, confidence: 6, fearOfReinjury: 6, motivation: 7, stress: 5, hopefulness: 6, frustration: 4 },
  { anxiety: 5, confidence: 6, fearOfReinjury: 5, motivation: 7, stress: 5, hopefulness: 7, frustration: 4 },
  { anxiety: 4, confidence: 7, fearOfReinjury: 5, motivation: 8, stress: 4, hopefulness: 8, frustration: 3 },
  { anxiety: 4, confidence: 7, fearOfReinjury: 4, motivation: 8, stress: 4, hopefulness: 8, frustration: 3 },
  { anxiety: 3, confidence: 8, fearOfReinjury: 4, motivation: 9, stress: 3, hopefulness: 9, frustration: 3 },
];

export const mindChartDates = recoveryHistory.map((e) => e.date.slice(5));

export const journalEntries: JournalEntry[] = [
  { id: 'j1', date: '2026-07-25', feeling: 'Hopeful and rested', win: 'Walked 2km without pain', challenge: 'Stairs still feel scary', grateful: 'Grateful for my supportive partner.' },
  { id: 'j2', date: '2026-07-26', feeling: 'Proud and strong', win: 'First bike ride since surgery', challenge: 'Getting out of bed early', grateful: 'Grateful for the good weather.' },
  { id: 'j3', date: '2026-07-27', feeling: 'Calm and optimistic', win: 'Did all my exercises', challenge: 'Pushing through fear of jumping', grateful: 'Grateful for my physio team.' },
];

export const timelineMilestones: TimelineMilestone[] = [
  { id: 'tm1', date: '2026-05-14', title: 'Started recovery', description: 'ACL reconstruction surgery completed. The journey begins.', icon: 'Flag', achieved: true },
  { id: 'tm2', date: '2026-06-02', title: 'First pain-free day', description: 'Woke up without pain for the first time since surgery.', icon: 'HeartPulse', achieved: true },
  { id: 'tm3', date: '2026-06-18', title: 'First walk', description: 'Walked around the block unassisted — 800 meters.', icon: 'Footprints', achieved: true },
  { id: 'tm4', date: '2026-07-09', title: 'First gym session', description: 'Completed a full strength session with physio.', icon: 'Dumbbell', achieved: true },
  { id: 'tm5', date: '2026-07-26', title: 'First bike ride', description: '20 minutes of cycling — felt like freedom.', icon: 'Bike', achieved: true },
  { id: 'tm6', date: '2026-09-15', title: 'First sport session', description: 'Target: return to light running drills.', icon: 'Trophy', achieved: false },
  { id: 'tm7', date: '2026-12-01', title: 'Return to competition', description: 'Target: first competitive race post-recovery.', icon: 'Medal', achieved: false },
];

export const breathingExercises: BreathingExercise[] = [
  { id: 'b1', name: 'Box Breathing', duration: '4 min', pattern: '4-4-4-4', description: 'Used by Navy SEALs to stay calm under pressure. Inhale, hold, exhale, hold — each for 4 seconds.', color: 'from-blue-500 to-cyan-400' },
  { id: 'b2', name: 'Deep Breathing', duration: '5 min', pattern: '4-7-8', description: 'A longer exhale signals safety to your body, easing anxiety and quieting mental chatter.', color: 'from-emerald-500 to-teal-400' },
  { id: 'b3', name: 'Progressive Muscle Relaxation', duration: '8 min', pattern: 'Tense & Release', description: 'Guided body-scan that releases tension from head to toe, perfect before sleep.', color: 'from-violet-500 to-purple-400' },
  { id: 'b4', name: 'Mindfulness Session', duration: '10 min', pattern: 'Observe & Accept', description: 'A guided meditation to anchor you in the present moment without judgment.', color: 'from-amber-500 to-orange-400' },
];

export const motivationStories: MotivationStory[] = [
  { id: 'ms1', title: 'The Longest Comeback', athlete: 'Alex Smith', sport: 'NFL Quarterback', image: 'https://images.pexels.com/photos/366020/pexels-photo-366020.jpeg?auto=compress&cs=tinysrgb&w=600', excerpt: 'After a devastating leg injury, 17 surgeries, and two years away from the game, he returned to start in the NFL again.' },
  { id: 'ms2', title: 'Olympic Again', athlete: 'Kerri Strug', sport: 'Olympic Gymnast', image: 'https://images.pexels.com/photos/863920/pexels-photo-863920.jpeg?auto=compress&cs=tinysrgb&w=600', excerpt: 'Landed a gold-medal vault on an injured ankle — a defining moment of courage in sports history.' },
  { id: 'ms3', title: 'Back to the Track', athlete: 'Manteo Mitchell', sport: 'Olympic Sprinter', image: 'https://images.pexels.com/photos/2526878/pexels-photo-2526878.jpeg?auto=compress&cs=tinysrgb&w=600', excerpt: 'Ran through a broken fibula mid-race to help his relay team qualify for the Olympic final.' },
];

export const dailyQuotes: DailyQuote[] = [
  { id: 'q1', quote: 'The body achieves what the mind believes.', author: 'Napoleon Hill' },
  { id: 'q2', quote: 'Recovery is not a race. It is a return to yourself.', author: 'Unknown' },
  { id: 'q3', quote: 'You may have to fight a battle more than once to win it.', author: 'Margaret Thatcher' },
  { id: 'q4', quote: 'Healing takes courage, and we all have courage, even if we have to dig a little to find it.', author: 'Tori Amos' },
  { id: 'q5', quote: 'The wound is the place where the Light enters you.', author: 'Rumi' },
];

export const dailyWins: DailyWin[] = [
  { id: 'dw1', date: '2026-07-25', text: 'Walked 2km without any pain for the first time.' },
  { id: 'dw2', date: '2026-07-26', text: 'Got back on the bike and rode for 20 minutes.' },
  { id: 'dw3', date: '2026-07-27', text: 'Completed every single prescribed exercise today.' },
];

export const injuryCategories: InjuryCategory[] = [
  {
    id: 'shoulder', label: 'Shoulder', icon: 'Shoulder',
    conditions: ['Shoulder Dislocation', 'Bankart Repair', 'SLAP Repair', 'Rotator Cuff Repair', 'Biceps Tenodesis', 'Labrum Tear', 'Frozen Shoulder'],
  },
  {
    id: 'knee', label: 'Knee', icon: 'Knee',
    conditions: ['ACL Reconstruction', 'Meniscus Repair', 'Patellar Dislocation', 'MCL Injury'],
  },
  {
    id: 'hip', label: 'Hip', icon: 'Hip',
    conditions: ['Hip Replacement', 'Hip Labral Tear'],
  },
  {
    id: 'foot-ankle', label: 'Foot & Ankle', icon: 'Foot',
    conditions: ['Achilles Repair', 'Ankle Sprain'],
  },
  {
    id: 'general', label: 'General', icon: 'Bone',
    conditions: ['Fracture', 'Tendon Injury', 'Chronic Pain'],
  },
];

export const goalOptions = [
  'Return to competitive sport',
  'Return to running',
  'Walk without pain',
  'Regain full range of motion',
  'Return to work duties',
  'Return to daily activities',
];

export const defaultOnboardingData: OnboardingData = {
  name: '', age: '', height: '', weight: '', gender: '',
  injuryCategory: '', injuryType: '', injuryDate: '', surgeryDate: '',
  side: '', pain: 5, mobility: 50, goal: '',
};

export const recoveryPlan: RecoveryPlanItem[] = [
  { id: 'rp1', title: 'Exercises', detail: '3 prescribed · 2 done', icon: 'Dumbbell', progress: 67, total: 3, done: 2, color: 'from-blue-500 to-blue-600' },
  { id: 'rp2', title: 'Hydration', detail: '1.5L of 2.5L', icon: 'Droplets', progress: 60, total: 2500, done: 1500, color: 'from-cyan-400 to-blue-500' },
  { id: 'rp3', title: 'Medication', detail: '2 of 3 doses', icon: 'Pill', progress: 67, total: 3, done: 2, color: 'from-emerald-500 to-teal-500' },
  { id: 'rp4', title: 'Walking Goal', detail: '1,840 of 2,000 steps', icon: 'Footprints', progress: 92, total: 2000, done: 1840, color: 'from-amber-400 to-orange-500' },
];

export const recentActivity: ActivityItem[] = [
  { id: 'a1', type: 'exercise', title: 'Completed Straight Leg Raises', time: '2 hours ago', icon: 'Dumbbell' },
  { id: 'a2', type: 'pain', title: 'Logged pain level: 3/10', time: '3 hours ago', icon: 'HeartPulse' },
  { id: 'a3', type: 'journal', title: 'Added journal entry: "Feeling optimistic"', time: '5 hours ago', icon: 'BookHeart' },
  { id: 'a4', type: 'milestone', title: 'Reached milestone: First bike ride', time: 'Yesterday', icon: 'Trophy' },
];

export const dailyMotivation = 'You don\'t have to be perfect. You just have to keep showing up. Today is another step forward.';

export const aiCoachMessage = 'Your recovery has been consistent this week. Continue your exercises and maintain good sleep habits. If symptoms worsen, consult your healthcare professional.';

export const aiMentalReflection = "You've remained consistent with your recovery this week. Your confidence has increased while stress has decreased. Continue focusing on your recovery routine.";

export const swellingLevels = [
  { value: 0, label: 'None' },
  { value: 3, label: 'Mild' },
  { value: 6, label: 'Moderate' },
  { value: 9, label: 'Severe' },
];

export const recoveryStory: RecoveryStoryMilestone[] = [
  { id: 'rs1', phase: 'Day 1', date: '2026-05-14', title: 'Surgery Completed', description: 'ACL reconstruction surgery completed successfully. The journey begins.', achieved: true, icon: 'Flag' },
  { id: 'rs2', phase: 'Week 2', date: '2026-05-28', title: 'First Pain-Free Day', description: 'Woke up without pain for the first time since surgery.', achieved: true, icon: 'HeartPulse' },
  { id: 'rs3', phase: 'Month 1', date: '2026-06-14', title: 'First Walk', description: 'Walked around the block unassisted — 800 meters.', achieved: true, icon: 'Footprints' },
  { id: 'rs4', phase: 'Month 3', date: '2026-08-14', title: 'First Full Range of Motion', description: 'Regained full knee flexion matching the uninjured leg.', achieved: false, icon: 'Activity' },
  { id: 'rs5', phase: 'Month 6', date: '2026-11-14', title: 'First Gym Session', description: 'Completed a full strength and conditioning session with physio.', achieved: false, icon: 'Dumbbell' },
  { id: 'rs6', phase: 'Return to Sport', date: '2027-02-14', title: 'Return to Sport', description: 'Target: first competitive race post-recovery.', achieved: false, icon: 'Trophy' },
];

export const aiCoachResponses: Record<string, string> = {
  'Why is my pain worse today?': "Pain fluctuations are completely normal during recovery. Several factors could be contributing: increased activity intensity, weather changes, reduced sleep quality, or your body's natural inflammatory cycle. Try logging your pain level at the same time each day to identify patterns. If pain persists above 6/10 for more than 2 days, contact your physiotherapist.",
  'When can I return to sports?': "Based on your current trajectory — pain at 3/10, mobility at 70%, and steady strength gains — you're on track for a return to sport around month 9-12 post-surgery. This timeline depends on maintaining consistency with your exercises, hitting strength benchmarks (90% of uninjured leg), and passing a functional movement assessment with your physiotherapist.",
  'How can I improve my recovery?': "Three high-impact areas to focus on: 1) Sleep — aim for 8+ hours, as tissue repair accelerates during deep sleep. 2) Exercise consistency — completing all prescribed exercises daily is the #1 predictor of faster recovery. 3) Nutrition — protein intake supports tissue rebuilding. Your current 7-day streak is excellent; maintaining it will compound your gains.",
  'What should I discuss with my physiotherapist?': "Great question. Here are key topics for your next appointment: 1) Your pain trend (down from 6 to 3 — share this data). 2) Whether you're ready to progress to the next exercise phase. 3) Any movements that still feel unstable or painful. 4) A timeline for return to sport. 5) Whether to add or reduce any exercises. Bringing your recovery data makes these conversations much more productive.",
};

export const defaultAiResponse = "That's a great question. Based on your recovery data, you're progressing well — pain is trending down, mobility is improving, and your consistency is strong. I'd recommend continuing your current routine and discussing any specific concerns with your physiotherapist at your next visit. Remember, I provide educational information only and am not a substitute for professional medical advice.";

export const recoveryInsights: RecoveryInsight[] = [
  { id: 'i1', title: 'Pain reduced by 32%', description: 'Your average pain dropped from 6.2 to 4.2 this month — the biggest monthly improvement yet.', icon: 'HeartPulse', trend: 'down', trendValue: '32%', accent: 'rose' },
  { id: 'i2', title: 'Confidence climbing steadily', description: 'Confidence scores rose from 4 to 8 over the past 3 weeks as you hit mobility milestones.', icon: 'Smile', trend: 'up', trendValue: '+4 pts', accent: 'emerald' },
  { id: 'i3', title: 'Sleep below target', description: 'You averaged 6.2 hours of sleep over the last 5 days — below your 8-hour goal. Sleep drives tissue repair.', icon: 'Moon', trend: 'down', trendValue: '-1.8h', accent: 'amber' },
  { id: 'i4', title: 'Excellent exercise consistency', description: 'You completed 94% of prescribed exercises this week. Consistency is the strongest predictor of recovery speed.', icon: 'Dumbbell', trend: 'up', trendValue: '94%', accent: 'blue' },
  { id: 'i5', title: 'Recovery readiness +11%', description: 'Your overall readiness score jumped from 67 to 78, driven by reduced pain and improved mobility.', icon: 'TrendingUp', trend: 'up', trendValue: '+11%', accent: 'violet' },
  { id: 'i6', title: 'Anxiety trending down', description: 'Anxiety scores decreased from 6 to 3 as confidence in your knee returned.', icon: 'Brain', trend: 'down', trendValue: '-3 pts', accent: 'sky' },
];

export const achievements: Achievement[] = [
  { id: 'a1', title: '7-Day Streak', description: 'Logged your recovery for 7 consecutive days', icon: 'Flame', earned: true, date: '2026-07-20', xp: 100, tier: 'bronze' },
  { id: 'a2', title: 'Pain Reduced', description: 'Reduced your pain level by 50% or more', icon: 'HeartPulse', earned: true, date: '2026-07-15', xp: 200, tier: 'silver' },
  { id: 'a3', title: 'First Month', description: 'Completed your first month of recovery tracking', icon: 'Calendar', earned: true, date: '2026-06-14', xp: 300, tier: 'silver' },
  { id: 'a4', title: 'Recovery Warrior', description: 'Maintained a 30-day logging streak', icon: 'Shield', earned: true, date: '2026-07-10', xp: 500, tier: 'gold' },
  { id: 'a5', title: 'Consistency Champion', description: 'Completed 95% of exercises for 2 weeks', icon: 'Trophy', earned: true, date: '2026-07-25', xp: 400, tier: 'gold' },
  { id: 'a6', title: 'Return to Sport', description: 'Completed your return-to-sport assessment', icon: 'Medal', earned: false, xp: 1000, tier: 'platinum' },
  { id: 'a7', title: 'Mindful Recovery', description: 'Completed 10 mindfulness sessions', icon: 'Brain', earned: false, xp: 250, tier: 'silver' },
  { id: 'a8', title: 'Full Range of Motion', description: 'Regained 100% range of motion', icon: 'Activity', earned: false, xp: 600, tier: 'gold' },
];

export const recoveryLevel: RecoveryLevel = {
  level: 8,
  title: 'Recovery Warrior',
  currentXp: 1850,
  nextLevelXp: 2500,
  totalXp: 6850,
};

export const calendarEvents: CalendarEvent[] = [
  { id: 'e1', date: '2026-07-29', title: 'Morning Mobility Exercises', type: 'exercise', time: '08:00', description: '5 mobility drills · 20 min' },
  { id: 'e2', date: '2026-07-29', title: 'Ibuprofen (400mg)', type: 'medication', time: '09:00', description: 'With breakfast' },
  { id: 'e3', date: '2026-07-29', title: 'Strength Training', type: 'exercise', time: '17:00', description: '3 sets × 12 reps · 45 min' },
  { id: 'e4', date: '2026-07-30', title: 'Physiotherapy Appointment', type: 'appointment', time: '10:30', description: 'Dr. Sarah Chen · Sports Rehab Clinic' },
  { id: 'e5', date: '2026-07-30', title: 'Ibuprofen (400mg)', type: 'medication', time: '09:00' },
  { id: 'e6', date: '2026-08-01', title: 'Mindfulness Session', type: 'exercise', time: '07:30', description: '10 min guided meditation' },
  { id: 'e7', date: '2026-08-03', title: 'Range of Motion Assessment', type: 'milestone', time: '14:00', description: 'Target: full knee flexion' },
  { id: 'e8', date: '2026-08-14', title: 'Month 3 Milestone', type: 'milestone', description: 'First full range of motion target' },
  { id: 'e9', date: '2026-07-31', title: 'Evening Walk', type: 'exercise', time: '18:00', description: 'Target: 2km' },
  { id: 'e10', date: '2026-08-02', title: 'Follow-up with Surgeon', type: 'appointment', time: '11:00', description: 'Dr. James Miller · 3-month check-up' },
];

const gen30 = (base: number, variance: number, trend: number) =>
  Array.from({ length: 30 }, (_, i) => ({
    date: `07/${(i + 1).toString().padStart(2, '0')}`,
    value: Math.round(Math.max(0, Math.min(10, base + Math.sin(i / 3) * variance + trend * i / 30)) * 10) / 10,
  }));

const gen12 = (base: number, variance: number, trend: number) =>
  Array.from({ length: 12 }, (_, i) => ({
    date: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i],
    value: Math.round(Math.max(0, Math.min(10, base + Math.sin(i / 2) * variance + trend * i / 12)) * 10) / 10,
  }));

const gen7 = (vals: number[]) => vals.map((v, i) => ({ date: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i], value: v }));

export const analyticsSeries: AnalyticsSeries[] = [
  {
    key: 'pain', label: 'Pain (30 Days)', color: '#f43f5e', icon: 'HeartPulse', domain: [0, 10], invert: true,
    weekly: gen7([4, 3, 5, 4, 3, 3, 3]),
    monthly: gen30(5, 1.5, -2),
    yearly: gen12(6, 1.5, -3),
  },
  {
    key: 'mobility', label: 'Mobility', color: '#10b981', icon: 'Footprints', domain: [0, 100],
    weekly: gen7([65, 68, 67, 70, 72, 71, 70]),
    monthly: gen30(50, 8, 20),
    yearly: gen12(30, 10, 40),
  },
  {
    key: 'strength', label: 'Strength', color: '#2563eb', icon: 'Dumbbell', domain: [0, 100],
    weekly: gen7([50, 52, 55, 53, 55, 56, 55]),
    monthly: gen30(30, 5, 25),
    yearly: gen12(15, 5, 40),
  },
  {
    key: 'sleep', label: 'Sleep (hours)', color: '#8b5cf6', icon: 'Moon', domain: [0, 12],
    weekly: gen7([7, 6, 7, 8, 7, 6, 7]),
    monthly: gen30(7, 1.5, 0.5),
    yearly: gen12(6, 1.5, 1.5),
  },
  {
    key: 'anxiety', label: 'Anxiety', color: '#f43f5e', icon: 'Brain', domain: [0, 10], invert: true,
    weekly: gen7([4, 3, 4, 3, 3, 2, 3]),
    monthly: gen30(6, 1.5, -3),
    yearly: gen12(7, 1.5, -4),
  },
  {
    key: 'confidence', label: 'Confidence', color: '#10b981', icon: 'Smile', domain: [0, 10],
    weekly: gen7([7, 8, 7, 8, 8, 9, 8]),
    monthly: gen30(4, 1.5, 4),
    yearly: gen12(3, 1.5, 5),
  },
  {
    key: 'recoveryScore', label: 'Recovery Score', color: '#2563eb', icon: 'TrendingUp', domain: [0, 100],
    weekly: gen7([72, 75, 73, 78, 80, 78, 78]),
    monthly: gen30(50, 8, 28),
    yearly: gen12(30, 10, 48),
  },
  {
    key: 'exerciseConsistency', label: 'Exercise Consistency', color: '#f59e0b', icon: 'CheckCircle', domain: [0, 100],
    weekly: gen7([90, 100, 85, 95, 100, 90, 100]),
    monthly: gen30(80, 10, 15),
    yearly: gen12(60, 15, 35),
  },
];

export const reportSummary: ReportSummary = {
  physicalScore: 78,
  mentalScore: 82,
  overallScore: 80,
  painChange: -50,
  mobilityChange: 40,
  strengthChange: 25,
  sleepAvg: 7.1,
  anxietyChange: -50,
  confidenceChange: 100,
  exerciseConsistency: 94,
  streak: 30,
};

export const aiReportSummary = "Over the past 30 days, Alex has shown remarkable progress across all recovery domains. Pain has decreased by 50%, mobility improved by 40%, and strength gains are accelerating. Exercise consistency at 94% is excellent and is the primary driver of these gains. Mental wellbeing has improved in parallel — confidence has doubled while anxiety has halved. The key focus areas for the next month should be: maintaining exercise consistency, improving sleep quality (currently averaging 7.1h, target 8h), and preparing for the Month 3 range-of-motion assessment.";

export const doctorNotesPlaceholder = "Doctor's notes will appear here once your healthcare provider reviews and signs off on this report. This section is reserved for clinical observations, recommendations, and next steps from your physiotherapist or surgeon.";

export const notifications: NotificationItem[] = [
  { id: 'n1', type: 'exercise', title: "Time for today's exercises", description: 'You have 3 prescribed exercises remaining. Complete them to maintain your streak.', time: '10 min ago', read: false, icon: 'Dumbbell' },
  { id: 'n2', type: 'pain', title: "Don't forget to log your pain", description: 'A daily pain log helps your physiotherapist track your progress.', time: '1 hour ago', read: false, icon: 'HeartPulse' },
  { id: 'n3', type: 'hydration', title: 'Hydration reminder', description: "You've had 1.5L of water today. Aim for 2.5L to support tissue repair.", time: '2 hours ago', read: false, icon: 'Droplets' },
  { id: 'n4', type: 'report', title: 'Weekly recovery report ready', description: 'Your Week 11 recovery report is available to review and share.', time: '5 hours ago', read: true, icon: 'FileText' },
  { id: 'n5', type: 'appointment', title: 'Upcoming appointment tomorrow', description: 'Physiotherapy with Dr. Sarah Chen at 10:30 AM.', time: 'Yesterday', read: true, icon: 'Stethoscope' },
  { id: 'n6', type: 'streak', title: 'Recovery streak reminder', description: "You're on a 30-day streak! Log today to keep it going.", time: 'Yesterday', read: true, icon: 'Flame' },
  { id: 'n7', type: 'achievement', title: 'New achievement unlocked!', description: 'You earned the Consistency Champion badge. Well done!', time: '2 days ago', read: true, icon: 'Trophy' },
  { id: 'n8', type: 'ai', title: 'AI Coach insight available', description: 'Your AI coach noticed a positive trend in your recovery this week.', time: '3 days ago', read: true, icon: 'Sparkles' },
];

export const exerciseDetails: Record<string, ExerciseDetail> = {
  e1: {
    id: 'e1', name: 'Quad Sets', category: 'Strengthening', difficulty: 'Beginner', sets: 3, reps: 10, duration: '5 min',
    description: 'Sit on the floor with legs straight. Tighten the muscle on top of your thigh by pressing the back of your knee down into the floor. Hold for 5 seconds, then relax.',
    musclesTargeted: ['Quadriceps', 'VMO'], equipment: ['None'], image: 'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg?auto=compress&cs=tinysrgb&w=600',
    tips: ['Focus on the inner thigh (VMO) contracting', 'Keep your toes pointed toward the ceiling', 'Breathe normally — do not hold your breath'],
    commonMistakes: ['Arching the lower back', 'Holding breath during contraction', 'Rushing the hold — aim for a full 5 seconds'],
    safetyNotes: ['Stop if you feel sharp pain behind the kneecap', 'Acceptable to feel a stretch or mild burn in the quad'],
  },
  e2: {
    id: 'e2', name: 'Straight Leg Raises', category: 'Strengthening', difficulty: 'Beginner', sets: 3, reps: 12, duration: '6 min',
    description: 'Lie on your back with one leg bent. Tighten the thigh muscle of the straight leg and lift it to the level of the bent knee. Slowly lower and repeat.',
    musclesTargeted: ['Quadriceps', 'Hip Flexors', 'Core'], equipment: ['None'], image: 'https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg?auto=compress&cs=tinysrgb&w=600',
    tips: ['Keep the lifted leg completely straight', 'Engage your core to prevent back arching', 'Lower slowly over 3 seconds'],
    commonMistakes: ['Bending the knee of the working leg', 'Lifting too high past the bent knee', 'Using momentum to swing the leg up'],
    safetyNotes: ['Stop if you feel lower back pain', 'Ensure no twisting in the torso'],
  },
  e3: {
    id: 'e3', name: 'Heel Slides', category: 'Mobility', difficulty: 'Beginner', sets: 3, reps: 15, duration: '5 min',
    description: 'Lie on your back. Slowly slide your heel toward your buttocks, bending your knee as far as comfortable. Slide back down and repeat.',
    musclesTargeted: ['Hamstrings', 'Knee Flexion'], equipment: ['None', 'Optional: sliding surface'], image: 'https://images.pexels.com/photos/4498294/pexels-photo-4498294.jpeg?auto=compress&cs=tinysrgb&w=600',
    tips: ['Use a smooth surface or sock for easier sliding', 'Go only as far as pain allows', 'Pause briefly at maximum flexion'],
    commonMistakes: ['Forcing the bend beyond pain threshold', 'Lifting the hips to compensate', 'Rushing the movement'],
    safetyNotes: ['Stop if you feel pinching at the front of the knee', 'Progress should be gradual day over day'],
  },
  e4: {
    id: 'e4', name: 'Wall Sits', category: 'Strengthening', difficulty: 'Intermediate', sets: 3, reps: 1, duration: '30 sec hold',
    description: 'Lean your back against a wall and slide down until your knees are at a 90-degree angle. Hold the position, keeping your core engaged.',
    musclesTargeted: ['Quadriceps', 'Glutes', 'Hamstrings'], equipment: ['Wall'], image: 'https://images.pexels.com/photos/4761352/pexels-photo-4761352.jpeg?auto=compress&cs=tinysrgb&w=600',
    tips: ['Keep knees aligned over ankles, not past toes', 'Press your lower back flat against the wall', 'Breathe steadily throughout the hold'],
    commonMistakes: ['Letting knees cave inward', 'Sliding too low past 90 degrees', 'Holding breath'],
    safetyNotes: ['Stop if you feel knee pain (not muscle fatigue)', 'Avoid if you have patellofemoral pain syndrome'],
  },
  e5: {
    id: 'e5', name: 'Single-Leg Balance', category: 'Balance', difficulty: 'Intermediate', sets: 3, reps: 1, duration: '30 sec each side',
    description: 'Stand on one leg with a slight bend in the knee. Keep your hips level and hold for 30 seconds. Progress by closing your eyes or standing on an unstable surface.',
    musclesTargeted: ['Proprioception', 'Glute Medius', 'Ankle Stabilizers'], equipment: ['Optional: cushion or balance pad'], image: 'https://images.pexels.com/photos/3820460/pexels-photo-3820460.jpeg?auto=compress&cs=tinysrgb&w=600',
    tips: ['Use a chair or wall for support initially', 'Focus on a fixed point to help balance', 'Keep the standing knee slightly bent — never locked'],
    commonMistakes: ['Locking the standing knee', 'Letting the pelvis drop on one side', 'Looking down at the floor'],
    safetyNotes: ['Always have a support surface nearby', 'Do not close eyes without supervision initially'],
  },
  e6: {
    id: 'e6', name: 'Resistance Band Walks', category: 'Strengthening', difficulty: 'Intermediate', sets: 3, reps: 10, duration: '4 min',
    description: 'Place a resistance band around your ankles. Take small lateral steps, keeping tension on the band and knees slightly bent.',
    musclesTargeted: ['Hip Abductors', 'Glute Medius', 'IT Band'], equipment: ['Resistance band'], image: 'https://images.pexels.com/photos/4498294/pexels-photo-4498294.jpeg?auto=compress&cs=tinysrgb&w=600',
    tips: ['Keep toes pointed forward, not turned out', 'Maintain a slight squat throughout', 'Take small, controlled steps'],
    commonMistakes: ['Letting the knees cave inward', 'Taking steps that are too large', 'Standing too upright'],
    safetyNotes: ['Start with a light resistance band', 'Stop if you feel hip or knee pain'],
  },
  e7: {
    id: 'e7', name: 'Step-Ups', category: 'Functional', difficulty: 'Intermediate', sets: 3, reps: 10, duration: '6 min',
    description: 'Step onto a low platform with one foot, drive through the heel to bring the other foot up, then step back down with control.',
    musclesTargeted: ['Quadriceps', 'Glutes', 'Hamstrings', 'Calves'], equipment: ['Step or platform'], image: 'https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg?auto=compress&cs=tinysrgb&w=600',
    tips: ['Drive through the heel, not the toes', 'Keep the knee aligned over the ankle', 'Lower slowly with control'],
    commonMistakes: ['Pushing off the bottom foot', 'Letting the knee collapse inward', 'Using momentum'],
    safetyNotes: ['Start with a very low step (10-15cm)', 'Use a railing for balance if needed'],
  },
  e8: {
    id: 'e8', name: 'Box Jumps (Low)', category: 'Plyometric', difficulty: 'Advanced', sets: 3, reps: 8, duration: '5 min',
    description: 'Only attempt late in recovery. Jump onto a low, stable box, landing softly with knees aligned over toes. Step down between reps.',
    musclesTargeted: ['Quadriceps', 'Glutes', 'Calves', 'Explosive Power'], equipment: ['Plyo box'], image: 'https://images.pexels.com/photos/3820460/pexels-photo-3820460.jpeg?auto=compress&cs=tinysrgb&w=600',
    tips: ['Land softly — absorb the impact with bent knees', 'Step down — never jump down', 'Start with the lowest possible box'],
    commonMistakes: ['Jumping down instead of stepping', 'Landing with locked knees', 'Using a box that is too high'],
    safetyNotes: ['Only attempt after clearance from your physiotherapist', 'Ensure the box is stable and on a non-slip surface', 'Stop immediately on any knee pain'],
  },
};

export const advancedInsights: AdvancedInsight[] = [
  { id: 'ai1', title: 'Pain has reduced 42%', description: 'Your average pain dropped from 6.2 to 3.6 over the past 30 days — your best monthly improvement yet.', icon: 'HeartPulse', trend: 'down', trendValue: '42%', accent: 'rose', metric: 'Pain Level', change: -42 },
  { id: 'ai2', title: 'Mobility has improved 18%', description: 'Knee flexion increased from 110° to 130° this month, bringing you closer to full range of motion.', icon: 'Footprints', trend: 'up', trendValue: '+18%', accent: 'emerald', metric: 'Mobility', change: 18 },
  { id: 'ai3', title: 'Sleep has been inconsistent', description: 'Your sleep averaged 6.2h over 5 days — below your 8h target. Poor sleep slows tissue repair.', icon: 'Moon', trend: 'down', trendValue: '-1.8h', accent: 'amber', metric: 'Sleep', change: -18 },
  { id: 'ai4', title: '11-day exercise streak', description: 'You have completed your prescribed exercises 11 days in a row. Consistency is the #1 recovery driver.', icon: 'Flame', trend: 'up', trendValue: '11 days', accent: 'blue', metric: 'Streak', change: 11 },
  { id: 'ai5', title: 'Recovery readiness increased by 8%', description: 'Your overall readiness score rose from 70 to 78, driven by reduced pain and improved mobility.', icon: 'TrendingUp', trend: 'up', trendValue: '+8%', accent: 'violet', metric: 'Readiness', change: 8 },
  { id: 'ai6', title: 'Confidence doubled', description: 'Confidence scores rose from 4 to 8 as you hit mobility milestones and returned to cycling.', icon: 'Smile', trend: 'up', trendValue: '+100%', accent: 'emerald', metric: 'Confidence', change: 100 },
];

export const searchResults: SearchResult[] = [
  { id: 's1', type: 'exercise', title: 'Quad Sets', description: 'Strengthening · Beginner · 3 sets × 10 reps', route: '/app/exercises/e1', icon: 'Dumbbell' },
  { id: 's2', type: 'exercise', title: 'Straight Leg Raises', description: 'Strengthening · Beginner · 3 sets × 12 reps', route: '/app/exercises/e2', icon: 'Dumbbell' },
  { id: 's3', type: 'exercise', title: 'Heel Slides', description: 'Mobility · Beginner · 3 sets × 15 reps', route: '/app/exercises/e3', icon: 'Footprints' },
  { id: 's4', type: 'exercise', title: 'Wall Sits', description: 'Strengthening · Intermediate · 30 sec hold', route: '/app/exercises/e4', icon: 'Dumbbell' },
  { id: 's5', type: 'exercise', title: 'Single-Leg Balance', description: 'Balance · Intermediate · 30 sec each side', route: '/app/exercises/e5', icon: 'Activity' },
  { id: 's6', type: 'exercise', title: 'Step-Ups', description: 'Functional · Intermediate · 3 sets × 10 reps', route: '/app/exercises/e6', icon: 'Dumbbell' },
  { id: 's7', type: 'log', title: 'Recovery Log — Jul 27', description: 'Pain: 3/10 · Mobility: 7/10 · Mood: 9/10', route: '/app/tracker', icon: 'HeartPulse' },
  { id: 's8', type: 'log', title: 'Recovery Log — Jul 26', description: 'Pain: 3/10 · Mobility: 7/10 · Mood: 8/10', route: '/app/tracker', icon: 'HeartPulse' },
  { id: 's9', type: 'journal', title: 'Journal — Jul 27', description: 'Calm and optimistic · Did all my exercises', route: '/app/mental', icon: 'BookHeart' },
  { id: 's10', type: 'journal', title: 'Journal — Jul 26', description: 'Proud and strong · First bike ride since surgery', route: '/app/mental', icon: 'BookHeart' },
  { id: 's11', type: 'milestone', title: 'First bike ride', description: 'Milestone achieved on Jul 26, 2026', route: '/app/progress', icon: 'Trophy' },
  { id: 's12', type: 'milestone', title: 'First gym session', description: 'Milestone achieved on Jul 9, 2026', route: '/app/progress', icon: 'Dumbbell' },
  { id: 's13', type: 'ai', title: 'AI Conversation — Pain question', description: 'Why is my pain worse today?', route: '/app/coach', icon: 'Sparkles' },
  { id: 's14', type: 'ai', title: 'AI Conversation — Return to sport', description: 'When can I return to sports?', route: '/app/coach', icon: 'Sparkles' },
];

export const personalizedPlan = {
  injury: 'ACL Reconstruction Surgery',
  stage: 'Mid-Recovery (Week 10-12)',
  painLevel: 3,
  mobilityLevel: 70,
  todayGoals: [
    { id: 'pg1', title: 'Complete 3 strengthening exercises', detail: 'Quad Sets, Straight Leg Raises, Wall Sits', done: false },
    { id: 'pg2', title: 'Walk 2,000 steps', detail: 'Outdoor walk, comfortable pace', done: true },
    { id: 'pg3', title: 'Ice knee for 15 minutes post-exercise', detail: 'After your strength session', done: false },
    { id: 'pg4', title: 'Log recovery tracker entry', detail: 'Pain, mobility, sleep, mood', done: false },
  ],
  weeklyGoals: [
    { id: 'wg1', title: 'Complete 5 exercise sessions', detail: 'At least 3 strengthening + 2 mobility', progress: 80 },
    { id: 'wg2', title: 'Increase knee flexion to 130°', detail: 'Currently at 125° — 5° to go', progress: 90 },
    { id: 'wg3', title: 'Walk 14,000 total steps', detail: 'Daily average of 2,000 steps', progress: 75 },
    { id: 'wg4', title: 'Sleep 7+ hours each night', detail: 'Target 8h for optimal tissue repair', progress: 60 },
  ],
  milestones: [
    { id: 'pm1', phase: 'Week 12', date: '2026-08-14', title: 'Full Range of Motion', description: 'Regain 135° knee flexion matching the uninjured leg.', achieved: false, icon: 'Activity' },
    { id: 'pm2', phase: 'Month 4', date: '2026-09-15', title: 'First Light Jog', description: 'Begin return-to-running progression with physio supervision.', achieved: false, icon: 'Footprints' },
    { id: 'pm3', phase: 'Month 6', date: '2026-11-14', title: 'Full Gym Sessions', description: 'Complete strength and conditioning sessions independently.', achieved: false, icon: 'Dumbbell' },
    { id: 'pm4', phase: 'Month 9', date: '2027-02-14', title: 'Return to Sport Assessment', description: 'Pass functional movement and strength symmetry tests.', achieved: false, icon: 'Trophy' },
  ],
  timeline: [
    { id: 'pt1', phase: 'Weeks 0-2', title: 'Protection Phase', description: 'Brace, crutches, pain management, gentle quad activation.', status: 'completed' as const },
    { id: 'pt2', phase: 'Weeks 2-6', title: 'Early Mobility', description: 'Range of motion exercises, progressive weight-bearing, gait training.', status: 'completed' as const },
    { id: 'pt3', phase: 'Weeks 6-12', title: 'Strength Building', description: 'Progressive loading, balance training, stationary cycling. You are here.', status: 'current' as const },
    { id: 'pt4', phase: 'Months 3-6', title: 'Return to Activity', description: 'Jogging progression, sport-specific drills, advanced strengthening.', status: 'upcoming' as const },
    { id: 'pt5', phase: 'Months 6-9', title: 'Return to Sport', description: 'Plyometrics, agility training, functional movement assessment.', status: 'upcoming' as const },
    { id: 'pt6', phase: 'Months 9-12', title: 'Full Recovery', description: 'Competitive sport, maintenance program, long-term joint health.', status: 'upcoming' as const },
  ],
};

export const weeklySummary = {
  scoreChange: 12,
  painChange: -2,
  mobilityChange: 10,
  exerciseCompletion: 94,
  sleepAverage: 7.1,
  streak: 30,
  highlights: [
    'Pain dropped from 5 to 3 — your best week yet',
    'Completed 94% of prescribed exercises',
    'Reached 70% mobility, up 10% from last week',
    'First bike ride since surgery on Jul 26',
  ],
};
