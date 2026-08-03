import type {
  RecoveryDNACategory, ComebackMilestone, FutureSelfLetter,
  MountainStage, ReplayChapter, SmallVictory, MyWhyOption,
} from './types';

export const myWhyOptions: { value: MyWhyOption; emoji: string; icon: string }[] = [
  { value: 'Return to Sport', emoji: '🏆', icon: 'Trophy' },
  { value: 'Return to Work', emoji: '💼', icon: 'Briefcase' },
  { value: 'Play with Family', emoji: '👨‍👩‍👧', icon: 'Users' },
  { value: 'Daily Life', emoji: '☀️', icon: 'Sun' },
  { value: 'Fitness', emoji: '💪', icon: 'Dumbbell' },
  { value: 'Running', emoji: '🏃', icon: 'Footprints' },
  { value: 'Badminton', emoji: '🏸', icon: 'Activity' },
  { value: 'Football', emoji: '⚽', icon: 'Circle' },
  { value: 'Gym', emoji: '🏋️', icon: 'Dumbbell' },
  { value: 'Other', emoji: '✨', icon: 'Sparkles' },
];

export const dailyEncouragements: string[] = [
  "You showed up today. That's a win.",
  "Recovery isn't linear. Small setbacks happen.",
  "Today's effort is an investment in tomorrow.",
  "You are building consistency, one day at a time.",
  "Every rep, every step, every log — it all adds up.",
  "Progress isn't always visible, but it's always happening.",
  "You don't have to be perfect. You just have to keep going.",
  "Your body is healing, even on the days it doesn't feel like it.",
  "Consistency matters more than intensity. Keep showing up.",
  "Be patient with your body. It's working hard for you.",
  "Today's challenge is tomorrow's strength.",
  "You're further along than you were a week ago. That matters.",
  "Rest is part of recovery too. Be kind to yourself.",
  "Every small step forward is a step toward your why.",
  "You're not just recovering. You're rebuilding stronger.",
];

export function getDailyEncouragement(dayIndex: number = 0): string {
  return dailyEncouragements[dayIndex % dailyEncouragements.length];
}

export const aiEncouragements: string[] = [
  "You completed your rehabilitation exercises for seven consecutive days. That kind of consistency is exactly what drives long-term recovery.",
  "Pain has gradually improved over the past two weeks. Your commitment to logging and tracking is helping you see the progress you might otherwise miss.",
  "Your mobility has increased by 15% this month. Each session is building on the last, and your body is responding.",
  "Recovery takes time. Consistency matters more than perfection. You're showing up, and that's what counts.",
  "Your sleep has improved, and that's directly supporting your tissue repair. Small habits are creating real change.",
  "You've gone from fear of movement to confident cycling. That emotional shift is just as important as the physical one.",
];

export function getAiEncouragement(dayIndex: number = 0): string {
  return aiEncouragements[dayIndex % aiEncouragements.length];
}

export const todaysMissions: { title: string; detail: string; icon: string }[] = [
  { title: 'Complete 3 prescribed exercises', detail: 'Quad Sets, Straight Leg Raises, Wall Sits', icon: 'Dumbbell' },
  { title: 'Walk 2,000 steps', detail: 'Outdoor walk at a comfortable pace', icon: 'Footprints' },
  { title: 'Log your recovery entry', detail: 'Pain, mobility, sleep, and mood', icon: 'HeartPulse' },
  { title: '5 minutes of breathing', detail: 'Box breathing to calm your nervous system', icon: 'Wind' },
];

export const recoveryDNA: RecoveryDNACategory[] = [
  {
    key: 'consistency', label: 'Consistency', score: 94, icon: 'Flame', color: 'from-amber-400 to-orange-500',
    explanation: 'You\'ve logged your recovery 94% of days over the past 90 days. This level of consistency is the strongest predictor of a full recovery.',
    aiInsight: 'Your 30-day logging streak is remarkable. Studies show that consistent self-tracking doubles recovery adherence rates.',
  },
  {
    key: 'confidence', label: 'Confidence', score: 80, icon: 'Smile', color: 'from-emerald-400 to-teal-500',
    explanation: 'Your confidence has grown from 3/10 to 8/10 over 90 days. As you hit mobility milestones, your belief in your body is returning.',
    aiInsight: 'Confidence gains often precede physical breakthroughs. Your mental progress suggests you\'re ready for the next exercise phase.',
  },
  {
    key: 'mobility', label: 'Mobility', score: 72, icon: 'Footprints', color: 'from-blue-400 to-blue-600',
    explanation: 'Knee flexion has improved from 90° to 130°. You\'re 72% of the way to your target of 135° — full range of motion.',
    aiInsight: 'You\'re 5° away from full range of motion. This last stretch is often the slowest — be patient. Your trajectory is excellent.',
  },
  {
    key: 'pain', label: 'Pain Management', score: 78, icon: 'HeartPulse', color: 'from-rose-400 to-rose-500',
    explanation: 'Pain has dropped from 8/10 to 3/10. Your pain management strategy — ice, medication, and progressive loading — is working.',
    aiInsight: 'Pain reduction of 62% is significant. The remaining pain is typical at this stage and should continue to decrease with consistent rehab.',
  },
  {
    key: 'sleep', label: 'Sleep', score: 65, icon: 'Moon', color: 'from-violet-400 to-purple-500',
    explanation: 'You\'re averaging 7.1 hours, up from 5.5 hours early in recovery. Sleep is when your body does most of its repair work.',
    aiInsight: 'Improving sleep to 8 hours could accelerate tissue repair by up to 25%. Consider a wind-down routine before bed.',
  },
  {
    key: 'mental', label: 'Mental Recovery', score: 76, icon: 'Brain', color: 'from-sky-400 to-cyan-500',
    explanation: 'Anxiety has decreased from 7/10 to 3/10. Fear of re-injury has dropped from 8/10 to 4/10. You\'re rebuilding trust in your body.',
    aiInsight: 'The drop in fear of re-injury is one of your most important gains. This mental shift often unlocks physical progress.',
  },
  {
    key: 'exercise', label: 'Exercise Commitment', score: 91, icon: 'Dumbbell', color: 'from-blue-500 to-indigo-600',
    explanation: 'You\'ve completed 91% of prescribed exercise sessions. This is the #1 driver of your physical recovery.',
    aiInsight: 'Your exercise adherence is in the top 5% of recovery patients. This consistency is the foundation of everything else.',
  },
];

export const comebackTimeline: ComebackMilestone[] = [
  { id: 'ct1', emoji: '🏥', title: 'Surgery', date: '2026-05-14', description: 'ACL reconstruction surgery completed. The journey began.', achieved: true, phase: 'Day 1' },
  { id: 'ct2', emoji: '🚶', title: 'First Walk', date: '2026-06-02', description: 'Walked around the block unassisted for the first time.', achieved: true, phase: 'Week 3' },
  { id: 'ct3', emoji: '🙂', title: 'Pain Improved', date: '2026-06-18', description: 'Pain dropped below 4/10 for the first time since surgery.', achieved: true, phase: 'Week 5' },
  { id: 'ct4', emoji: '💪', title: 'Full Range of Motion', date: '2026-08-14', description: 'Target: regain 135° knee flexion matching the uninjured leg.', achieved: false, phase: 'Month 3' },
  { id: 'ct5', emoji: '🏋️', title: 'First Gym Session', date: '2026-09-15', description: 'Complete a full strength and conditioning session.', achieved: false, phase: 'Month 4' },
  { id: 'ct6', emoji: '🏃', title: 'First Run', date: '2026-11-01', description: 'Begin return-to-running progression with physio supervision.', achieved: false, phase: 'Month 6' },
  { id: 'ct7', emoji: '🏸', title: 'Return to Sport', date: '2027-02-14', description: 'Pass functional movement assessment and return to badminton.', achieved: false, phase: 'Month 9' },
  { id: 'ct8', emoji: '🎉', title: 'Recovery Anniversary', date: '2027-05-14', description: 'One year since surgery. Celebrate how far you\'ve come.', achieved: false, phase: 'Year 1' },
];

export const futureSelfLetters: FutureSelfLetter[] = [
  {
    id: 'fsl1', daysAgo: 90, date: new Date().toISOString().slice(0, 10),
    title: 'Letter from your future self',
    body: "Ninety days ago, you were struggling to complete your exercises. The pain was high, sleep was poor, and the idea of running again felt impossibly far away. Today, you've built consistency that you didn't know you had in you. Your pain has dropped from 8 to 3. Your confidence has more than doubled. You're cycling again — something that felt unthinkable just two months ago. Keep believing in your progress. The person you're becoming is worth the work.",
  },
  {
    id: 'fsl2', daysAgo: 60, date: new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10),
    title: 'A note from who you\'re becoming',
    body: "Two months ago, you were afraid to put full weight on your knee. You logged that fear honestly, and that honesty helped you work through it. Today, you walk without thinking about it. That's the thing about recovery — the fears that feel permanent in the moment become milestones you barely remember. You're braver than you give yourself credit for.",
  },
  {
    id: 'fsl3', daysAgo: 30, date: new Date(Date.now() - 14 * 86400000).toISOString().slice(0, 10),
    title: 'From the other side',
    body: "Thirty days ago, you were frustrated. Progress felt slow, and you wondered if the effort was worth it. I want you to know — it was. Every exercise you didn't feel like doing, every log entry that felt tedious, every small win you celebrated — they compounded. You're stronger now, not just in your knee, but in your resilience. Recovery isn't just about getting back to who you were. It's about discovering who you can become.",
  },
];

export const recoveryMountain: MountainStage[] = [
  { id: 'ms1', label: 'Base Camp', description: 'Protection phase — brace, crutches, pain management', icon: 'Flag', progress: 100, achieved: true, elevation: 0 },
  { id: 'ms2', label: 'Walking', description: 'First steps, progressive weight-bearing, gait training', icon: 'Footprints', progress: 100, achieved: true, elevation: 20 },
  { id: 'ms3', label: 'Strength', description: 'Progressive loading, balance, stationary cycling', icon: 'Dumbbell', progress: 72, achieved: false, elevation: 45 },
  { id: 'ms4', label: 'Running', description: 'Return-to-running progression, sport-specific drills', icon: 'Footprints', progress: 0, achieved: false, elevation: 70 },
  { id: 'ms5', label: 'Return to Sport', description: 'Functional assessment, agility, plyometrics', icon: 'Trophy', progress: 0, achieved: false, elevation: 88 },
  { id: 'ms6', label: 'Summit', description: 'Full recovery — competitive sport, long-term joint health', icon: 'Mountain', progress: 0, achieved: false, elevation: 100 },
];

export const recoveryReplay: ReplayChapter[] = [
  { id: 'rp1', month: 'May', title: 'Surgery Day', description: 'ACL reconstruction completed. The journey began with protection, rest, and gentle quad activation.', metric: 'Pain', value: '8/10', icon: 'HeartPulse', color: 'from-rose-400 to-rose-500' },
  { id: 'rp2', month: 'June', title: 'First Steps', description: 'Walked unassisted for the first time. Pain began to decrease as mobility slowly returned.', metric: 'Pain', value: '6/10', icon: 'Footprints', color: 'from-amber-400 to-orange-500' },
  { id: 'rp3', month: 'July', title: 'Building Strength', description: 'Started progressive loading. Completed first full strength session with physio.', metric: 'Strength', value: '45%', icon: 'Dumbbell', color: 'from-blue-400 to-blue-600' },
  { id: 'rp4', month: 'August', title: 'Back on the Bike', description: 'First bike ride since surgery. Mobility reached 70%. Pain dropped to 3/10.', metric: 'Mobility', value: '70%', icon: 'Activity', color: 'from-emerald-400 to-teal-500' },
  { id: 'rp5', month: 'September', title: 'Range of Motion', description: 'Target: full knee flexion. Confidence climbing steadily as fear of re-injury fades.', metric: 'Confidence', value: '8/10', icon: 'Smile', color: 'from-violet-400 to-purple-500' },
  { id: 'rp6', month: 'October', title: 'Return to Sport', description: 'Target: pass functional movement assessment. Return to badminton.', metric: 'Recovery', value: '95%', icon: 'Trophy', color: 'from-amber-400 to-orange-500' },
];

export const smallVictories: SmallVictory[] = [
  { id: 'sv1', title: 'Completed Rehab', message: 'You completed every prescribed exercise today. Consistency is your superpower.', date: '2026-08-01', icon: 'Dumbbell', color: 'from-blue-400 to-blue-600', category: 'Exercise' },
  { id: 'sv2', title: 'Pain Reduced', message: 'Your pain dropped from 4 to 3 today. Every point matters.', date: '2026-07-30', icon: 'HeartPulse', color: 'from-rose-400 to-rose-500', category: 'Pain' },
  { id: 'sv3', title: 'Better Sleep', message: 'You slept 8 hours last night. Your body did serious repair work while you rested.', date: '2026-07-29', icon: 'Moon', color: 'from-violet-400 to-purple-500', category: 'Sleep' },
  { id: 'sv4', title: 'Walked Further', message: 'You walked 2km without pain today. Two months ago, you couldn\'t walk around the block.', date: '2026-07-28', icon: 'Footprints', color: 'from-emerald-400 to-teal-500', category: 'Mobility' },
  { id: 'sv5', title: 'Improved Mobility', message: 'Knee flexion increased to 130°. You\'re 5° away from full range of motion.', date: '2026-07-27', icon: 'Activity', color: 'from-sky-400 to-cyan-500', category: 'Mobility' },
  { id: 'sv6', title: 'Stayed Consistent', message: '30-day logging streak. You\'ve shown up every single day. That\'s extraordinary.', date: '2026-07-25', icon: 'Flame', color: 'from-amber-400 to-orange-500', category: 'Consistency' },
  { id: 'sv7', title: 'Mental Win', message: 'Your anxiety dropped to 3/10 today. You\'re rebuilding trust in your body.', date: '2026-07-24', icon: 'Brain', color: 'from-indigo-400 to-blue-500', category: 'Mental' },
  { id: 'sv8', title: 'First Bike Ride', message: 'You got back on the bike for 20 minutes. That\'s not just physical — that\'s freedom.', date: '2026-07-26', icon: 'Trophy', color: 'from-emerald-500 to-green-600', category: 'Milestone' },
];

export const gratitudeEntries: { id: string; date: string; text: string }[] = [
  { id: 'gr1', date: '2026-08-01', text: 'Grateful for my supportive partner who reminds me to be patient.' },
  { id: 'gr2', date: '2026-07-31', text: 'Grateful for the good weather that made my walk enjoyable.' },
  { id: 'gr3', date: '2026-07-30', text: 'Grateful for my physio team who believed in me from day one.' },
  { id: 'gr4', date: '2026-07-29', text: 'Grateful for my body\'s resilience, even on the hard days.' },
  { id: 'gr5', date: '2026-07-28', text: 'Grateful for each small win that adds up to something bigger.' },
];
