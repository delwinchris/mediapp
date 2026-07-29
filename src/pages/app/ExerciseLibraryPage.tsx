import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dumbbell, Clock, Repeat, Target, Check, X, Search } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { exercises as initialExercises } from '@/lib/mockData';
import type { Exercise } from '@/lib/types';
import { cn } from '@/lib/cn';

const categories = ['All', 'Strengthening', 'Mobility', 'Balance', 'Functional', 'Plyometric'];
const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const diffColors: Record<string, string> = {
  Beginner: 'bg-emerald-50 text-emerald-600',
  Intermediate: 'bg-amber-50 text-amber-600',
  Advanced: 'bg-rose-50 text-rose-600',
};

export function ExerciseLibraryPage() {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
  const [category, setCategory] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Exercise | null>(null);

  const filtered = exercises.filter((e) => {
    const matchCat = category === 'All' || e.category === category;
    const matchDiff = difficulty === 'All' || e.difficulty === difficulty;
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchDiff && matchSearch;
  });

  const completedCount = exercises.filter((e) => e.completed).length;
  const toggleComplete = (id: string) => setExercises((es) => es.map((e) => (e.id === id ? { ...e, completed: !e.completed } : e)));

  return (
    <AppLayout>
      <PageHeader
        title="Exercise Library"
        subtitle="Follow your prescribed exercises with clear, step-by-step guidance."
        action={
          <div className="rounded-2xl bg-white px-4 py-2.5 text-sm shadow-sm">
            <span className="font-bold text-emerald-600">{completedCount}</span>
            <span className="text-slate-400"> / {exercises.length} completed</span>
          </div>
        }
      />

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCategory(c)} className={cn('rounded-full px-4 py-2 text-sm font-semibold transition-all', category === c ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25' : 'bg-white text-slate-600 hover:bg-slate-100')}>{c}</button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-slate-400">
          <Search size={16} />
          <input placeholder="Search exercises..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-44 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none" />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {difficulties.map((d) => (
          <button key={d} onClick={() => setDifficulty(d)} className={cn('rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all', difficulty === d ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50')}>{d}</button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ex, i) => (
          <motion.div key={ex.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <Card hover className="flex h-full flex-col overflow-hidden p-0">
              <div className="relative h-40 overflow-hidden">
                <img src={ex.image} alt={ex.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <span className={cn('absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold', diffColors[ex.difficulty])}>{ex.difficulty}</span>
                {ex.completed && (
                  <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg"><Check size={16} /></span>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs font-medium text-blue-100">{ex.category}</p>
                  <h3 className="text-lg font-bold text-white">{ex.name}</h3>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center gap-4 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><Repeat size={14} /> {ex.sets} sets</span>
                  <span className="flex items-center gap-1.5"><Dumbbell size={14} /> {ex.reps} reps</span>
                  {ex.duration && <span className="flex items-center gap-1.5"><Clock size={14} /> {ex.duration}</span>}
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500 line-clamp-2">{ex.instructions}</p>
                <div className="mt-4 flex gap-2">
                  <Button variant="outline" size="sm" fullWidth onClick={() => setSelected(ex)}>View details</Button>
                  <Button size="sm" fullWidth variant={ex.completed ? 'secondary' : 'primary'} onClick={() => toggleComplete(ex.id)}>
                    {ex.completed ? (<><Check size={16} /> Done</>) : 'Complete'}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <Dumbbell size={40} className="mx-auto text-slate-300" />
          <p className="mt-4 text-slate-500">No exercises match your filters.</p>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm" onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ duration: 0.25 }} className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setSelected(null)} className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-slate-600 backdrop-blur hover:bg-white"><X size={18} /></button>
              <div className="relative h-48 overflow-hidden">
                <img src={selected.image} alt={selected.name} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className={cn('rounded-full px-2.5 py-1 text-xs font-bold', diffColors[selected.difficulty])}>{selected.difficulty}</span>
                  <h3 className="mt-2 text-2xl font-bold text-white">{selected.name}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-3 text-center"><Repeat size={18} className="mx-auto text-blue-500" /><p className="mt-1 text-lg font-bold text-slate-900">{selected.sets}</p><p className="text-xs text-slate-400">Sets</p></div>
                  <div className="rounded-2xl bg-slate-50 p-3 text-center"><Dumbbell size={18} className="mx-auto text-emerald-500" /><p className="mt-1 text-lg font-bold text-slate-900">{selected.reps}</p><p className="text-xs text-slate-400">Reps</p></div>
                  <div className="rounded-2xl bg-slate-50 p-3 text-center"><Target size={18} className="mx-auto text-violet-500" /><p className="mt-1 text-xs font-bold text-slate-900">{selected.targetArea}</p><p className="text-xs text-slate-400">Target</p></div>
                </div>
                <div className="mt-5">
                  <h4 className="text-sm font-bold text-slate-900">Instructions</h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{selected.instructions}</p>
                </div>
                <Button fullWidth size="lg" variant={selected.completed ? 'secondary' : 'primary'} className="mt-6" onClick={() => { toggleComplete(selected.id); setSelected(null); }}>
                  {selected.completed ? (<><Check size={18} /> Marked complete</>) : 'Mark as complete'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
