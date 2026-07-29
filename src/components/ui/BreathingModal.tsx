import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause } from 'lucide-react';
import type { BreathingExercise } from '@/lib/types';
import { cn } from '@/lib/cn';

interface BreathingModalProps {
  exercise: BreathingExercise;
  onClose: () => void;
}

const phases = [
  { label: 'Breathe In', duration: 4 },
  { label: 'Hold', duration: 4 },
  { label: 'Breathe Out', duration: 4 },
  { label: 'Hold', duration: 4 },
];

export function BreathingModal({ exercise, onClose }: BreathingModalProps) {
  const [running, setRunning] = useState(false);
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(phases[0].duration);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!running) return;
    if (secondsLeft > 0) {
      const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
      return () => clearTimeout(t);
    }
    const nextIdx = (phaseIdx + 1) % phases.length;
    if (nextIdx === 0) setCycle((c) => c + 1);
    setPhaseIdx(nextIdx);
    setSecondsLeft(phases[nextIdx].duration);
  }, [running, secondsLeft, phaseIdx]);

  const toggle = useCallback(() => setRunning((r) => !r), []);
  const phase = phases[phaseIdx];
  const scale = phase.label === 'Breathe In' ? 1 : phase.label === 'Breathe Out' ? 0.5 : phaseIdx === 1 ? 1 : 0.5;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.92, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"><X size={18} /></button>

        <div className="text-center">
          <p className={cn('inline-block rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold text-white', exercise.color)}>{exercise.pattern}</p>
          <h3 className="mt-4 text-2xl font-bold text-slate-900">{exercise.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{exercise.duration} · {exercise.description}</p>
        </div>

        <div className="relative my-10 flex h-56 items-center justify-center">
          <div className={cn('absolute h-48 w-48 rounded-full bg-gradient-to-br opacity-20 blur-2xl', exercise.color)} />
          <motion.div
            animate={{ scale: running ? scale : 0.7 }}
            transition={{ duration: phase.duration, ease: 'easeInOut' }}
            className={cn('relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br text-white shadow-2xl', exercise.color)}
          >
            <div className="text-center">
              <p className="text-lg font-bold">{running ? phase.label : 'Ready'}</p>
              {running && <p className="text-3xl font-bold">{secondsLeft}</p>}
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={toggle}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            {running ? <Pause size={22} /> : <Play size={22} />}
          </button>
          <p className="text-sm text-slate-400">{cycle > 0 ? `${cycle} cycles completed` : 'Press play to begin'}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
