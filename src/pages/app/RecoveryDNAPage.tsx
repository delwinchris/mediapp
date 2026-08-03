import { motion } from 'framer-motion';
import {
  Flame, Smile, Footprints, HeartPulse, Moon, Brain, Dumbbell,
  Sparkles, type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { recoveryDNA } from '@/lib/emotionalData';
import { cn } from '@/lib/cn';

const iconMap: Record<string, LucideIcon> = {
  Flame, Smile, Footprints, HeartPulse, Moon, Brain, Dumbbell,
};

export function RecoveryDNAPage() {
  const avgScore = Math.round(recoveryDNA.reduce((s, c) => s + c.score, 0) / recoveryDNA.length);

  return (
    <AppLayout>
      <PageHeader
        title="Recovery DNA"
        subtitle="Your unique recovery profile, decoded from 90 days of data."
      />

      {/* Hero */}
      <Card glass className="relative mb-8 overflow-hidden bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500 text-white">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
              <Sparkles size={26} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-violet-100">Your Recovery DNA</p>
              <p className="text-3xl font-bold">{avgScore}/100</p>
              <p className="text-sm text-violet-100">Overall recovery composition</p>
            </div>
          </div>
          <p className="max-w-xs text-sm text-violet-50">
            Just like DNA is unique to each person, your recovery has its own signature.
            These seven dimensions define your comeback.
          </p>
        </div>
      </Card>

      {/* DNA Categories */}
      <div className="grid gap-6 lg:grid-cols-2">
        {recoveryDNA.map((cat, i) => {
          const Icon = iconMap[cat.icon] ?? Sparkles;
          return (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Card hover className="h-full">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', cat.color)}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{cat.label}</h3>
                      <p className="text-xs text-slate-400">Recovery DNA dimension</p>
                    </div>
                  </div>
                  <span className="text-2xl font-bold text-slate-900">{cat.score}<span className="text-sm text-slate-400">/100</span></span>
                </div>

                {/* Progress bar */}
                <div className="mt-4">
                  <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${cat.score}%` }}
                      transition={{ delay: i * 0.08 + 0.3, duration: 0.8, ease: 'easeOut' }}
                      className={cn('h-full rounded-full bg-gradient-to-r', cat.color)}
                    />
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-600">{cat.explanation}</p>

                {/* AI Insight */}
                <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-violet-50/50 p-3">
                  <Sparkles size={16} className="mt-0.5 shrink-0 text-violet-500" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-violet-500">AI Insight</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-slate-600">{cat.aiInsight}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <Card className="mt-8 border-amber-100 bg-amber-50/50">
        <p className="text-sm text-amber-600">
          Recovery DNA scores are generated from your self-reported data and are for motivational purposes only.
          They are not a medical assessment. Always consult your healthcare provider for clinical decisions.
        </p>
      </Card>
    </AppLayout>
  );
}
