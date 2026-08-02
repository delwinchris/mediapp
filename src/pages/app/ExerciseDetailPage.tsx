import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft, Dumbbell, Target, Package, Gauge, CheckCircle, AlertTriangle, Shield,
  Play, Image as ImageIcon, Clock,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { exerciseDetails } from '@/lib/mockData';
import { cn } from '@/lib/cn';

const difficultyStyles: Record<string, string> = {
  Beginner: 'bg-emerald-50 text-emerald-600',
  Intermediate: 'bg-amber-50 text-amber-600',
  Advanced: 'bg-rose-50 text-rose-600',
};

export function ExerciseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const exercise = id ? exerciseDetails[id] : undefined;

  if (!exercise) {
    return (
      <AppLayout>
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <Dumbbell size={40} className="text-slate-300" />
          <h3 className="mt-4 text-lg font-bold text-slate-900">Exercise not found</h3>
          <p className="mt-2 text-sm text-slate-500">This exercise may have been removed.</p>
          <Button onClick={() => navigate('/app/exercises')} className="mt-6">Back to Library</Button>
        </Card>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Link to="/app/exercises" className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-slate-900">
        <ArrowLeft size={16} /> Back to Exercise Library
      </Link>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="flex items-center gap-2">
          <span className={cn('rounded-full px-2.5 py-1 text-xs font-bold', difficultyStyles[exercise.difficulty])}>{exercise.difficulty}</span>
          <span className="text-sm text-slate-400">{exercise.category}</span>
        </div>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{exercise.name}</h2>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Media */}
          <Card className="overflow-hidden p-0">
            <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 sm:h-80">
              <img src={exercise.image} alt={exercise.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <Button size="sm" className="bg-white/90 text-slate-900 hover:bg-white"><Play size={16} /> Watch Demo</Button>
              </div>
            </div>
            <div className="flex items-center gap-2 border-b border-slate-100 p-3 text-xs text-slate-400">
              <ImageIcon size={14} /> Image placeholder · <Play size={14} /> Video placeholder
            </div>
          </Card>

          {/* Description */}
          <Card>
            <h3 className="mb-3 font-bold text-slate-900">How to perform</h3>
            <p className="text-sm leading-relaxed text-slate-600">{exercise.description}</p>
          </Card>

          {/* Tips */}
          <Card>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><CheckCircle size={18} /></div>
              <h3 className="font-bold text-slate-900">Tips for Success</h3>
            </div>
            <ul className="space-y-2">
              {exercise.tips.map((tip, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start gap-2 text-sm text-slate-600">
                  <CheckCircle size={16} className="mt-0.5 shrink-0 text-emerald-500" /> {tip}
                </motion.li>
              ))}
            </ul>
          </Card>

          {/* Common Mistakes */}
          <Card>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600"><AlertTriangle size={18} /></div>
              <h3 className="font-bold text-slate-900">Common Mistakes</h3>
            </div>
            <ul className="space-y-2">
              {exercise.commonMistakes.map((m, i) => (
                <motion.li key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start gap-2 text-sm text-slate-600">
                  <AlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-500" /> {m}
                </motion.li>
              ))}
            </ul>
          </Card>

          {/* Safety Notes */}
          <Card className="border-amber-200 bg-amber-50/50">
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-600"><Shield size={18} /></div>
              <h3 className="font-bold text-slate-900">Safety Notes</h3>
            </div>
            <ul className="space-y-2">
              {exercise.safetyNotes.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <Shield size={16} className="mt-0.5 shrink-0 text-amber-500" /> {s}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 font-bold text-slate-900">Exercise Details</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500"><Dumbbell size={16} /> Sets</div>
                <span className="font-bold text-slate-900">{exercise.sets}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500"><Target size={16} /> Reps</div>
                <span className="font-bold text-slate-900">{exercise.reps}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500"><Clock size={16} /> Duration</div>
                <span className="font-bold text-slate-900">{exercise.duration}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-500"><Gauge size={16} /> Difficulty</div>
                <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold', difficultyStyles[exercise.difficulty])}>{exercise.difficulty}</span>
              </div>
            </div>
            <Button fullWidth className="mt-6"><Dumbbell size={16} /> Start Exercise</Button>
          </Card>

          <Card>
            <div className="mb-3 flex items-center gap-2">
              <Target size={18} className="text-blue-500" />
              <h3 className="font-bold text-slate-900">Muscles Targeted</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {exercise.musclesTargeted.map((m) => (
                <span key={m} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">{m}</span>
              ))}
            </div>
          </Card>

          <Card>
            <div className="mb-3 flex items-center gap-2">
              <Package size={18} className="text-emerald-500" />
              <h3 className="font-bold text-slate-900">Equipment</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {exercise.equipment.map((e) => (
                <span key={e} className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600">{e}</span>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
