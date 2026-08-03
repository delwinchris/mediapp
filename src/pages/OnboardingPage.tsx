import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, ArrowLeft, Check, Activity, HeartPulse, Brain, Target, PartyPopper,
  Bone, Footprints, Dumbbell, ShieldCheck, Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Input, Select, Slider } from '@/components/ui/Input';
import { useAuth } from '@/lib/auth';
import { injuryCategories, goalOptions, defaultOnboardingData } from '@/lib/mockData';
import { myWhyOptions } from '@/lib/emotionalData';
import type { OnboardingData, MyWhyOption } from '@/lib/types';
import { cn } from '@/lib/cn';

const steps: { id: number; label: string; icon: LucideIcon }[] = [
  { id: 0, label: 'About you', icon: Activity },
  { id: 1, label: 'Your injury', icon: HeartPulse },
  { id: 2, label: 'How you feel', icon: Brain },
  { id: 3, label: 'Your goal', icon: Target },
  { id: 4, label: 'Your why', icon: Sparkles },
];

const categoryIcons: Record<string, LucideIcon> = {
  Shoulder: Dumbbell, Knee: Activity, Hip: Bone, Foot: Footprints, 'Bone': Bone,
};

const sideOptions: { value: 'left' | 'right' | 'both'; label: string }[] = [
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
  { value: 'both', label: 'Both' },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const { completeOnboarding, user } = useAuth();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<OnboardingData>({
    ...defaultOnboardingData,
    name: user?.name ?? '',
  });
  const [finished, setFinished] = useState(false);

  const set = <K extends keyof OnboardingData>(k: K, v: OnboardingData[K]) => setForm((f) => ({ ...f, [k]: v }));

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
    else {
      completeOnboarding({
        name: form.name,
        age: Number(form.age) || undefined,
        height: Number(form.height) || undefined,
        weight: Number(form.weight) || undefined,
        injury: form.injuryType,
        injuryDate: form.injuryDate,
        surgeryDate: form.surgeryDate || undefined,
        painLevel: form.pain,
        mobilityLevel: form.mobility,
        recoveryGoal: form.goal,
        myWhy: form.myWhy,
      });
      setFinished(true);
      setTimeout(() => navigate('/app/dashboard'), 2200);
    }
  };
  const back = () => (step > 0 ? setStep(step - 1) : navigate('/login'));

  const canProceed = () => {
    if (step === 0) return form.name.trim() && form.age && form.height && form.weight;
    if (step === 1) return form.injuryCategory && form.injuryType && form.injuryDate && form.side;
    if (step === 2) return true;
    if (step === 3) return !!form.goal;
    if (step === 4) return !!form.myWhy;
    return true;
  };

  if (finished) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-2xl shadow-blue-500/30"
          >
            <PartyPopper size={36} />
          </motion.div>
          <h2 className="mt-6 text-3xl font-bold text-slate-900">Your recovery profile is ready</h2>
          <p className="mt-3 text-slate-500">Taking you to your dashboard...</p>
          <div className="mx-auto mt-6 h-1 w-48 overflow-hidden rounded-full bg-slate-200">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2 }} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Logo size="md" to="/" />
          <p className="text-sm text-slate-500">Step {step + 1} of {steps.length}</p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {/* Progress indicator */}
        <div className="mb-10 flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-center">
              <div className={cn('flex h-11 w-11 items-center justify-center rounded-2xl border-2 transition-all duration-300',
                i < step && 'border-emerald-500 bg-emerald-500 text-white',
                i === step && 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30',
                i > step && 'border-slate-200 bg-white text-slate-300')}>
                {i < step ? <Check size={18} /> : <s.icon size={18} />}
              </div>
              {i < steps.length - 1 && (
                <div className="mx-2 h-1 flex-1 overflow-hidden rounded-full bg-slate-200">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-emerald-500" initial={{ width: '0%' }} animate={{ width: i < step ? '100%' : '0%' }} transition={{ duration: 0.4 }} />
                </div>
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            {/* Step 0: Personal */}
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-slate-900">Let's get to know you</h2>
                <p className="text-slate-500">This helps us personalize your recovery plan.</p>
                <Input id="name" label="Full name" placeholder="Alex Morgan" value={form.name} onChange={(e) => set('name', e.target.value)} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input id="age" type="number" label="Age" placeholder="34" value={form.age} onChange={(e) => set('age', e.target.value)} />
                  <Select label="Gender (optional)" value={form.gender} onChange={(e) => set('gender', e.target.value)}>
                    <option value="">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input id="height" type="number" label="Height (cm)" placeholder="178" value={form.height} onChange={(e) => set('height', e.target.value)} />
                  <Input id="weight" type="number" label="Weight (kg)" placeholder="76" value={form.weight} onChange={(e) => set('weight', e.target.value)} />
                </div>
              </div>
            )}

            {/* Step 1: Recovery / Injury */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-slate-900">Tell us about your injury</h2>
                <p className="text-slate-500">Select the category and specific condition you're recovering from.</p>

                {/* Category cards */}
                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-700">Injury / Surgery category</p>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {injuryCategories.map((cat) => {
                      const Icon = categoryIcons[cat.icon] ?? Bone;
                      const selected = form.injuryCategory === cat.id;
                      return (
                        <button key={cat.id} onClick={() => { set('injuryCategory', cat.id); set('injuryType', ''); }}
                          className={cn('flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all duration-200',
                            selected ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300')}>
                          <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500')}>
                            <Icon size={18} />
                          </div>
                          <span className={cn('text-xs font-semibold', selected ? 'text-blue-700' : 'text-slate-600')}>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {form.injuryCategory && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-5">
                    <Select label="Specific condition" value={form.injuryType} onChange={(e) => set('injuryType', e.target.value)}>
                      <option value="">Select a condition...</option>
                      {injuryCategories.find((c) => c.id === form.injuryCategory)?.conditions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Select>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Input label="Date of injury" type="date" value={form.injuryDate} onChange={(e) => set('injuryDate', e.target.value)} />
                      <Input label="Date of surgery (optional)" type="date" value={form.surgeryDate} onChange={(e) => set('surgeryDate', e.target.value)} />
                    </div>
                    <div>
                      <p className="mb-2 text-sm font-semibold text-slate-700">Affected side</p>
                      <div className="flex gap-3">
                        {sideOptions.map((s) => (
                          <button key={s.value} onClick={() => set('side', s.value)}
                            className={cn('flex-1 rounded-2xl border-2 py-3 text-sm font-semibold transition-all',
                              form.side === s.value ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-slate-300')}>
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 2: How you feel */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">How are you feeling today?</h2>
                <p className="text-slate-500">This is your starting point. You can update it daily.</p>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-6">
                  <Slider label="Current pain level" value={form.pain} min={0} max={10} onChange={(v) => set('pain', v)} color="rose" leftLabel="No pain" rightLabel="Worst imaginable" />
                  <div className="h-px bg-slate-100" />
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-700">Current mobility</span>
                      <span className="text-lg font-bold text-emerald-600">{form.mobility}%</span>
                    </div>
                    <input type="range" min={0} max={100} step={5} value={form.mobility} onChange={(e) => set('mobility', Number(e.target.value))} className="w-full" />
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Very limited</span>
                      <span>Full range</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Goal */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-slate-900">What's your recovery goal?</h2>
                <p className="text-slate-500">Choose the one that matters most to you right now.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {goalOptions.map((g) => (
                    <button key={g} onClick={() => set('goal', g)}
                      className={cn('flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200',
                        form.goal === g ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300')}>
                      <div className={cn('flex h-5 w-5 items-center justify-center rounded-full border-2', form.goal === g ? 'border-blue-600 bg-blue-600' : 'border-slate-300')}>
                        {form.goal === g && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{g}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: My Why */}
            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-slate-900">What are you recovering for?</h2>
                <p className="text-slate-500">This is your "why" — the reason behind every exercise, every log, every hard day. We'll remind you of it when motivation dips.</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {myWhyOptions.map((opt) => (
                    <button key={opt.value} onClick={() => set('myWhy', opt.value as string)}
                      className={cn('flex flex-col items-center gap-2 rounded-2xl border-2 p-4 text-center transition-all duration-200',
                        form.myWhy === opt.value ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300')}>
                      <span className="text-3xl">{opt.emoji}</span>
                      <span className={cn('text-xs font-semibold', form.myWhy === opt.value ? 'text-blue-700' : 'text-slate-600')}>{opt.value}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between">
          <Button variant="ghost" onClick={back}><ArrowLeft size={18} /> Back</Button>
          <Button onClick={next} disabled={!canProceed()}>
            {step === steps.length - 1 ? 'Finish setup' : 'Continue'} <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
