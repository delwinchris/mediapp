import { motion } from 'framer-motion';
import {
  Flag, Footprints, Dumbbell, Trophy, Mountain, Check, Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { recoveryMountain } from '@/lib/emotionalData';
import { cn } from '@/lib/cn';

const iconMap: Record<string, LucideIcon> = { Flag, Footprints, Dumbbell, Trophy, Mountain };

export function RecoveryMountainPage() {
  const achievedCount = recoveryMountain.filter((s) => s.achieved).length;
  const overallProgress = Math.round(
    recoveryMountain.reduce((s, stage) => s + stage.progress, 0) / recoveryMountain.length
  );

  return (
    <AppLayout>
      <PageHeader
        title="Recovery Mountain"
        subtitle="Your climb from base camp to summit — one stage at a time."
      />

      {/* Progress overview */}
      <Card glass className="relative mb-8 overflow-hidden bg-gradient-to-br from-slate-700 via-slate-800 to-blue-900 text-white">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-300">Your ascent</p>
            <p className="mt-1 text-3xl font-bold">{achievedCount} of {recoveryMountain.length} camps reached</p>
            <p className="mt-1 text-sm text-slate-300">The climb isn't linear. What matters is that you keep climbing.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Mountain size={28} />
            </div>
          </div>
        </div>
        <div className="relative mt-4 h-2 overflow-hidden rounded-full bg-white/15">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-blue-400"
          />
        </div>
      </Card>

      {/* Mountain visualization */}
      <div className="relative">
        {/* Mountain SVG background */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ pointerEvents: 'none' }}
        >
          <defs>
            <linearGradient id="mountainG" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <polygon points="50,5 95,95 5,95" fill="url(#mountainG)" />
        </svg>

        {/* Stages */}
        <div className="relative space-y-6 py-4">
          {recoveryMountain.map((stage, i) => {
            const Icon = iconMap[stage.icon] ?? Flag;
            const isCurrent = !stage.achieved && stage.progress > 0;
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
                className="relative"
              >
                <div className="flex items-center gap-4">
                  {/* Stage icon */}
                  <div className="relative z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.12 + 0.2, type: 'spring', stiffness: 300 }}
                      className={cn(
                        'flex h-14 w-14 items-center justify-center rounded-2xl border-4 border-white shadow-lg',
                        stage.achieved
                          ? 'bg-gradient-to-br from-emerald-500 to-blue-600 text-white'
                          : isCurrent
                          ? 'bg-gradient-to-br from-amber-400 to-orange-500 text-white'
                          : 'bg-slate-200 text-slate-400'
                      )}
                    >
                      {stage.achieved ? <Check size={24} /> : <Icon size={22} />}
                    </motion.div>
                  </div>

                  {/* Stage content */}
                  <div className="flex-1">
                    <Card hover className={cn(stage.achieved ? 'border-emerald-100' : isCurrent ? 'border-amber-100' : '')}>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold uppercase tracking-wide text-slate-400">Camp {i + 1}</span>
                            {stage.achieved && (
                              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-600">Reached</span>
                            )}
                            {isCurrent && (
                              <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-600">
                                <Sparkles size={10} /> You are here
                              </span>
                            )}
                          </div>
                          <h3 className="mt-1 font-bold text-slate-900">{stage.label}</h3>
                          <p className="mt-0.5 text-sm text-slate-500">{stage.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-slate-900">{stage.progress}<span className="text-sm text-slate-400">%</span></p>
                          <p className="text-xs text-slate-400">elevation {stage.elevation}%</p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stage.progress}%` }}
                          transition={{ delay: i * 0.12 + 0.4, duration: 0.8 }}
                          className={cn(
                            'h-full rounded-full bg-gradient-to-r',
                            stage.achieved ? 'from-emerald-400 to-blue-500' : isCurrent ? 'from-amber-400 to-orange-500' : 'from-slate-300 to-slate-400'
                          )}
                        />
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Connector line */}
                {i < recoveryMountain.length - 1 && (
                  <div className="ml-7 h-6 w-0.5 bg-slate-200" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Summit message */}
      <Card glass className="relative mt-8 overflow-hidden bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 text-white">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-amber-50">The Summit</p>
            <p className="mt-1 text-base font-medium leading-relaxed">
              The summit isn't a destination — it's who you become on the climb.
              Every camp you reach is proof that you can reach the next one.
            </p>
          </div>
        </div>
      </Card>
    </AppLayout>
  );
}
