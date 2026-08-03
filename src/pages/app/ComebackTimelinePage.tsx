import { motion } from 'framer-motion';
import { Check, Lock, type LucideIcon } from 'lucide-react';
import { Flag, Footprints, Dumbbell, Trophy, Mountain, Calendar } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';
import { comebackTimeline } from '@/lib/emotionalData';
import { cn } from '@/lib/cn';

const phaseIcons: Record<string, LucideIcon> = { Flag, Footprints, Dumbbell, Trophy, Mountain };

export function ComebackTimelinePage() {
  const achievedCount = comebackTimeline.filter((m) => m.achieved).length;
  const totalCount = comebackTimeline.length;
  const progress = Math.round((achievedCount / totalCount) * 100);

  return (
    <AppLayout>
      <PageHeader
        title="My Comeback Timeline"
        subtitle="Every milestone is a chapter in your recovery story."
      />

      {/* Progress overview */}
      <Card glass className="relative mb-8 overflow-hidden bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-100">Your comeback journey</p>
            <p className="mt-1 text-3xl font-bold">{achievedCount} of {totalCount} milestones</p>
            <p className="mt-1 text-sm text-blue-100">Recovery takes time. Every step forward matters — and you're making them.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <span className="text-2xl font-bold">{progress}%</span>
            </div>
          </div>
        </div>
        <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/20">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-full rounded-full bg-white"
          />
        </div>
      </Card>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 h-full w-0.5 bg-slate-200 sm:left-1/2 sm:-translate-x-1/2" />

        <div className="space-y-8">
          {comebackTimeline.map((milestone, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={cn(
                  'relative flex items-center gap-6',
                  isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                )}
              >
                {/* Dot */}
                <div className="absolute left-6 z-10 sm:left-1/2 sm:-translate-x-1/2">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: i * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full border-4 border-white shadow-lg',
                      milestone.achieved ? 'bg-gradient-to-br from-blue-600 to-emerald-500' : 'bg-slate-200'
                    )}
                  >
                    {milestone.achieved ? (
                      <Check size={20} className="text-white" />
                    ) : (
                      <Lock size={16} className="text-slate-400" />
                    )}
                  </motion.div>
                </div>

                {/* Content card */}
                <div className={cn('ml-20 sm:ml-0 sm:w-1/2', isLeft ? 'sm:pr-12 sm:text-right' : 'sm:pl-12')}>
                  <Card hover className={cn(milestone.achieved ? 'border-blue-100' : 'opacity-75')}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{milestone.emoji}</span>
                      <div>
                        <span className="inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-bold text-blue-600">
                          {milestone.phase}
                        </span>
                        <h3 className="mt-1 font-bold text-slate-900">{milestone.title}</h3>
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{milestone.description}</p>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar size={12} />
                      {milestone.achieved ? 'Achieved' : 'Target'}: {new Date(milestone.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Medical disclaimer */}
      <Card className="mt-8 border-amber-100 bg-amber-50/50">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
            <Calendar size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold text-amber-700">A gentle reminder</p>
            <p className="mt-1 text-sm text-amber-600">
              Recovery timelines vary for every individual. These milestones are based on typical recovery patterns.
              Always consult your physiotherapist or surgeon before progressing to a new phase.
            </p>
          </div>
        </div>
      </Card>
    </AppLayout>
  );
}
