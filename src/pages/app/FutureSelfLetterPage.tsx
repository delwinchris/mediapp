import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, ChevronRight, Calendar } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { futureSelfLetters } from '@/lib/emotionalData';
import { cn } from '@/lib/cn';

export function FutureSelfLetterPage() {
  const [selected, setSelected] = useState(futureSelfLetters[0]);

  return (
    <AppLayout>
      <PageHeader
        title="Letter From Your Future Self"
        subtitle="A reflection on how far you've come, written from who you're becoming."
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Letter list */}
        <div className="space-y-3 lg:col-span-1">
          {futureSelfLetters.map((letter, i) => (
            <motion.button
              key={letter.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => setSelected(letter)}
              className={cn(
                'w-full rounded-2xl border-2 p-4 text-left transition-all duration-200',
                selected.id === letter.id ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-slate-200 bg-white hover:border-slate-300'
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-xl',
                  selected.id === letter.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                )}>
                  <Mail size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">{letter.title}</p>
                  <p className="flex items-center gap-1 text-xs text-slate-400">
                    <Calendar size={11} /> {new Date(letter.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <ChevronRight size={16} className={cn('text-slate-300 transition-transform', selected.id === letter.id && 'rotate-90')} />
              </div>
            </motion.button>
          ))}
        </div>

        {/* Letter display */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <Card glass className="relative overflow-hidden">
                <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br from-violet-200 to-blue-200 opacity-50 blur-3xl" />
                <div className="relative">
                  {/* Letter header */}
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 text-white shadow-lg">
                      <Mail size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-violet-500">A letter from your future self</p>
                      <h3 className="font-bold text-slate-900">{selected.title}</h3>
                    </div>
                  </div>

                  {/* Letter body */}
                  <div className="mt-6">
                    <p className="text-base leading-relaxed text-slate-700">
                      <span className="float-left mr-2 text-5xl font-bold leading-none text-violet-300">"</span>
                      {selected.body}
                    </p>
                  </div>

                  {/* Signature */}
                  <div className="mt-6 border-t border-slate-100 pt-4">
                    <p className="text-sm font-semibold text-slate-900">— Your future self</p>
                    <p className="text-xs text-slate-400">
                      Written on day {90 - selected.daysAgo} of your recovery · {new Date(selected.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  {/* AI badge */}
                  <div className="mt-4 flex items-center gap-2 rounded-2xl bg-violet-50/50 p-3">
                    <Sparkles size={16} className="text-violet-500" />
                    <p className="text-xs text-violet-600">
                      This reflection was generated from your recovery data. It's meant to encourage, not to predict.
                      Your actual recovery journey is unique to you.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Action */}
          <Card className="mt-6 bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-bold text-slate-900">Write your own letter</h4>
                <p className="text-sm text-slate-500">What would you say to yourself on day 1 of recovery?</p>
              </div>
              <Button variant="outline" size="sm"><Mail size={16} /> Write a letter</Button>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
