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
