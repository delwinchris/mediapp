import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HeartPulse, Footprints, Dumbbell, Activity, Smile, Trophy,
  Play, ChevronRight, type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { recoveryReplay } from '@/lib/emotionalData';
import { cn } from '@/lib/cn';

const iconMap: Record<string, LucideIcon> = {
  HeartPulse, Footprints, Dumbbell, Activity, Smile, Trophy,
};

export function RecoveryReplayPage() {
  const [currentChapter, setCurrentChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const play = () => {
    setIsPlaying(true);
    let chapter = 0;
    const interval = setInterval(() => {
      chapter++;
      if (chapter >= recoveryReplay.length) {
        clearInterval(interval);
        setIsPlaying(false);
        setCurrentChapter(0);
        return;
      }
      setCurrentChapter(chapter);
    }, 2500);
  };

  return (
    <AppLayout>
      <PageHeader
        title="Recovery Replay"
        subtitle="Your recovery journey, retold — like a wrapped year of comeback."
      />

      {/* Player */}
      <Card glass className="relative mb-8 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 text-white">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
        <div className="relative">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-purple-200">Your Recovery Wrapped</p>
              <h3 className="text-xl font-bold">90 Days of Comeback</h3>
            </div>
            <Button
              onClick={play}
              disabled={isPlaying}
              className="bg-white/20 text-white hover:bg-white/30"
              size="sm"
            >
              <Play size={16} /> {isPlaying ? 'Playing...' : 'Play replay'}
            </Button>
          </div>

          {/* Chapter display */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentChapter}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className={cn('mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br shadow-2xl', recoveryReplay[currentChapter].color)}>
                  {(() => {
                    const Icon = iconMap[recoveryReplay[currentChapter].icon] ?? Trophy;
                    return <Icon size={36} className="text-white" />;
                  })()}
                </div>
                <p className="mt-4 text-sm font-bold uppercase tracking-wide text-purple-200">{recoveryReplay[currentChapter].month}</p>
                <h4 className="mt-1 text-2xl font-bold">{recoveryReplay[currentChapter].title}</h4>
                <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-purple-100">
                  {recoveryReplay[currentChapter].description}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur">
                  <span className="text-sm font-semibold text-purple-200">{recoveryReplay[currentChapter].metric}:</span>
                  <span className="text-lg font-bold">{recoveryReplay[currentChapter].value}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress dots */}
          <div className="mt-6 flex justify-center gap-2">
            {recoveryReplay.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => setCurrentChapter(i)}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  i === currentChapter ? 'w-8 bg-white' : 'w-2 bg-white/30 hover:bg-white/50'
                )}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Chapter list */}
      <div className="space-y-4">
        {recoveryReplay.map((chapter, i) => {
          const Icon = iconMap[chapter.icon] ?? Trophy;
          return (
            <motion.button
              key={chapter.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setCurrentChapter(i)}
              className="w-full"
            >
              <Card hover className={cn(currentChapter === i && 'border-blue-200 ring-2 ring-blue-100')}>
                <div className="flex items-center gap-4">
                  <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', chapter.color)}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-bold text-slate-500">{chapter.month}</span>
                      <h4 className="font-bold text-slate-900">{chapter.title}</h4>
                    </div>
                    <p className="mt-1 text-sm text-slate-500">{chapter.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">{chapter.metric}</p>
                    <p className="text-lg font-bold text-slate-900">{chapter.value}</p>
                  </div>
                  <ChevronRight size={20} className={cn('text-slate-300 transition-transform', currentChapter === i && 'rotate-90')} />
                </div>
              </Card>
            </motion.button>
          );
        })}
      </div>

      {/* Closing message */}
      <Card glass className="relative mt-8 overflow-hidden bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
        <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-100">Your story so far</p>
          <p className="mt-2 text-lg font-medium leading-relaxed">
            From pain 8/10 to pain 3/10. From crutches to cycling. From fear to confidence.
            That's your comeback — and it's only the beginning.
          </p>
        </div>
      </Card>
    </AppLayout>
  );
}
