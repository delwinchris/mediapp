import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, Plus, Trophy, Calendar, Flag, Check, X, Activity, Brain, Heart, Dumbbell,
  type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { EmptyState } from '@/components/ui/EmptyState';
import { useAppStore } from '@/lib/store';
import type { Goal } from '@/types';
import { cn } from '@/lib/cn';

const categoryIcons: Record<string, LucideIcon> = {
  physical: Dumbbell, mental: Brain, lifestyle: Heart, sport: Trophy,
};

const categoryColors: Record<string, string> = {
  physical: 'from-blue-500 to-blue-600',
  mental: 'from-violet-500 to-purple-500',
  lifestyle: 'from-emerald-500 to-teal-500',
  sport: 'from-amber-400 to-orange-500',
};

const priorityStyles: Record<string, string> = {
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-amber-50 text-amber-600',
  high: 'bg-rose-50 text-rose-600',
};

const statusStyles: Record<string, string> = {
  active: 'bg-blue-50 text-blue-600',
  completed: 'bg-emerald-50 text-emerald-600',
  paused: 'bg-slate-100 text-slate-500',
};

function formatDate(iso: string): string {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function GoalsPage() {
  const { goals, addGoal, updateGoal, deleteGoal } = useAppStore();
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [newGoal, setNewGoal] = useState({
    title: '', description: '', category: 'physical' as Goal['category'],
    priority: 'medium' as Goal['priority'], targetDate: '',
  });

  const filtered = filter === 'all' ? goals : goals.filter((g) => g.status === filter);
  const activeCount = goals.filter((g) => g.status === 'active').length;
  const completedCount = goals.filter((g) => g.status === 'completed').length;
  const avgProgress = goals.length > 0 ? Math.round(goals.reduce((s, g) => s + g.progress, 0) / goals.length) : 0;

  const handleCreate = () => {
    if (!newGoal.title.trim()) return;
    const goal: Goal = {
      id: `goal_${Date.now()}`,
      title: newGoal.title,
      description: newGoal.description || newGoal.title,
      category: newGoal.category,
      priority: newGoal.priority,
      progress: 0,
      targetDate: newGoal.targetDate || new Date(Date.now() + 90 * 86400000).toISOString().slice(0, 10),
      status: 'active',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    addGoal(goal);
    setNewGoal({ title: '', description: '', category: 'physical', priority: 'medium', targetDate: '' });
    setShowForm(false);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Goals"
        subtitle="Set and track your recovery goals"
        action={<Button onClick={() => setShowForm(true)} size="sm"><Plus size={16} /> New Goal</Button>}
      />

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Target size={18} /></div>
            <div><p className="text-2xl font-bold text-slate-900">{activeCount}</p><p className="text-xs text-slate-500">Active goals</p></div>
          </div>
        </Card>
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><Trophy size={18} /></div>
            <div><p className="text-2xl font-bold text-slate-900">{completedCount}</p><p className="text-xs text-slate-500">Completed</p></div>
          </div>
        </Card>
        <Card hover>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600"><Activity size={18} /></div>
            <div><p className="text-2xl font-bold text-slate-900">{avgProgress}%</p><p className="text-xs text-slate-500">Avg progress</p></div>
          </div>
        </Card>
      </div>

      {/* Filter */}
      <div className="mb-6 flex gap-2">
        {(['all', 'active', 'completed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'rounded-xl px-4 py-2 text-sm font-semibold capitalize transition-all',
              filter === f ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25' : 'bg-white text-slate-600 hover:bg-slate-100'
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Goals grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={Target}
          title="No goals yet"
          description="Create your first recovery goal to start tracking your progress. Goals like 'Return to badminton' or 'Pain below 2' keep you motivated."
          actionLabel="Create Goal"
          onAction={() => setShowForm(true)}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((goal, i) => {
            const Icon = categoryIcons[goal.category] ?? Target;
            return (
              <motion.div key={goal.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card hover className="flex h-full flex-col">
                  <div className="flex items-start justify-between">
                    <div className={cn('flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', categoryColors[goal.category])}>
                      <Icon size={20} />
                    </div>
                    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold', statusStyles[goal.status])}>{goal.status}</span>
                  </div>
                  <h3 className="mt-4 font-bold text-slate-900">{goal.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{goal.description}</p>

                  <div className="mt-3 flex items-center gap-2">
                    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold capitalize', priorityStyles[goal.priority])}>{goal.priority} priority</span>
                  </div>

                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">Progress</span>
                      <span className="text-xs font-bold text-slate-900">{goal.progress}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${goal.progress}%` }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 0.6 }}
                        className={cn('h-full rounded-full bg-gradient-to-r', categoryColors[goal.category])}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                    <Calendar size={14} /> Target: {formatDate(goal.targetDate)}
                  </div>

                  <div className="mt-4 flex gap-2 border-t border-slate-100 pt-3">
                    {goal.status === 'active' && (
                      <Button size="sm" variant="outline" onClick={() => updateGoal(goal.id, { status: 'completed', progress: 100 })}>
                        <Check size={14} /> Complete
                      </Button>
                    )}
                    <Button size="sm" variant="ghost" onClick={() => deleteGoal(goal.id)}><X size={14} /> Remove</Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Create goal modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
            >
              <h3 className="mb-4 text-lg font-bold text-slate-900">Create New Goal</h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Goal title</label>
                  <input
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                    placeholder="e.g. Return to badminton"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Description</label>
                  <input
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                    placeholder="What does success look like?"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700">Category</label>
                    <select
                      value={newGoal.category}
                      onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as Goal['category'] })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="physical">Physical</option>
                      <option value="mental">Mental</option>
                      <option value="lifestyle">Lifestyle</option>
                      <option value="sport">Sport</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-slate-700">Priority</label>
                    <select
                      value={newGoal.priority}
                      onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value as Goal['priority'] })}
                      className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-slate-700">Target date</label>
                  <input
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <Button fullWidth onClick={handleCreate}>Create Goal</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
