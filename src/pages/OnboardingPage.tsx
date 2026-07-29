import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Activity, HeartPulse, Brain, Target } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Input, Select, Slider } from '@/components/ui/Input';
import { cn } from '@/lib/cn';

const steps = [
  { id: 0, label: 'About you', icon: Activity },
  { id: 1, label: 'Your injury', icon: HeartPulse },
  { id: 2, label: 'How you feel', icon: Brain },
  { id: 3, label: 'Your goal', icon: Target },
];

const injuryOptions = [
  'ACL Reconstruction Surgery',
  'Meniscus Repair',
  'Rotator Cuff Repair',
  'Hip Replacement',
  'Knee Replacement',
  'Ankle Reconstruction',
  'Spinal Surgery',
  'Fracture Recovery',
  'Other',
];

const goalOptions = [
  'Return to competitive sport',
  'Return to running',
  'Walk without pain',
  'Regain full range of motion',
  'Return to work duties',
  'Return to daily activities',
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', age: '', height: '', weight: '',
    injury: injuryOptions[0], injuryDate: '',
    pain: 5, mobility: 5, goal: goalOptions[0],
  });

  const set = (k: string, v: string | number) => setForm((f) => ({ ...f, [k]: v }));
  const next = () => (step < steps.length - 1 ? setStep(step + 1) : navigate('/app/dashboard'));
  const back = () => (step > 0 ? setStep(step - 1) : navigate('/signup'));

  const canProceed = () => {
    if (step === 0) return form.name && form.age && form.height && form.weight;
    if (step === 1) return form.injury && form.injuryDate;
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Logo size="md" to="/" />
          <p className="text-sm text-slate-500">Step {step + 1} of {steps.length}</p>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        <div className="mb-10 flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s.id} className="flex flex-1 items-center">
              <div
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-2xl border-2 transition-all duration-300',
                  i < step && 'border-emerald-500 bg-emerald-500 text-white',
                  i === step && 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/30',
                  i > step && 'border-slate-200 bg-white text-slate-300'
                )}
              >
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
            {step === 0 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-slate-900">Let's get to know you</h2>
                <p className="text-slate-500">This helps us personalize your recovery plan.</p>
                <Input id="name" label="Full name" placeholder="Alex Morgan" value={form.name} onChange={(e) => set('name', e.target.value)} />
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input id="age" type="number" label="Age" placeholder="34" value={form.age} onChange={(e) => set('age', e.target.value)} />
                  <Input id="height" type="number" label="Height (cm)" placeholder="178" value={form.height} onChange={(e) => set('height', e.target.value)} />
                </div>
                <Input id="weight" type="number" label="Weight (kg)" placeholder="76" value={form.weight} onChange={(e) => set('weight', e.target.value)} />
              </div>
            )}

            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-slate-900">Tell us about your injury</h2>
                <p className="text-slate-500">We'll tailor your exercises and tracking to your recovery.</p>
                <Select label="Injury / Surgery type" value={form.injury} onChange={(e) => set('injury', e.target.value)}>
                  {injuryOptions.map((o) => (<option key={o} value={o}>{o}</option>))}
                </Select>
                <Input label="Date of injury / surgery" type="date" value={form.injuryDate} onChange={(e) => set('injuryDate', e.target.value)} />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900">How are you feeling today?</h2>
                <p className="text-slate-500">This is your starting point. You can update it daily.</p>
                <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-6">
                  <Slider label="Current pain level" value={form.pain} onChange={(v) => set('pain', v)} color="rose" leftLabel="No pain" rightLabel="Worst imaginable" />
                  <Slider label="Mobility level" value={form.mobility} onChange={(v) => set('mobility', v)} color="emerald" leftLabel="Very limited" rightLabel="Full range" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-2xl font-bold text-slate-900">What's your recovery goal?</h2>
                <p className="text-slate-500">Choose the one that matters most to you right now.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {goalOptions.map((g) => (
                    <button
                      key={g}
                      onClick={() => set('goal', g)}
                      className={cn(
                        'flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-200',
                        form.goal === g ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'
                      )}
                    >
                      <div className={cn('flex h-5 w-5 items-center justify-center rounded-full border-2', form.goal === g ? 'border-blue-600 bg-blue-600' : 'border-slate-300')}>
                        {form.goal === g && <Check size={12} className="text-white" />}
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{g}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex items-center justify-between">
          <Button variant="ghost" onClick={back}>
            <ArrowLeft size={18} /> Back
          </Button>
          <Button onClick={next} disabled={!canProceed()}>
            {step === steps.length - 1 ? 'Finish setup' : 'Continue'}
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
}
