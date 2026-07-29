import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dumbbell, Stethoscope, Pill, Flag, ChevronLeft, ChevronRight, Calendar as CalIcon,
  type LucideIcon,
} from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { calendarEvents } from '@/lib/mockData';
import type { CalendarEvent } from '@/lib/types';
import { cn } from '@/lib/cn';

const typeConfig: Record<CalendarEvent['type'], { icon: LucideIcon; color: string; bg: string; label: string }> = {
  exercise: { icon: Dumbbell, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Exercise' },
  appointment: { icon: Stethoscope, color: 'text-violet-600', bg: 'bg-violet-50', label: 'Appointment' },
  medication: { icon: Pill, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Medication' },
  milestone: { icon: Flag, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Milestone' },
};

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function CalendarPage() {
  const [viewDate, setViewDate] = useState(new Date(2026, 6, 1));
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-07-29');
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const eventsForDate = (dateStr: string) => calendarEvents.filter((e) => e.date === dateStr);
  const selectedEvents = selectedDate ? eventsForDate(selectedDate) : [];

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const formatDateStr = (d: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const upcomingEvents = [...calendarEvents]
    .filter((e) => new Date(e.date) >= new Date('2026-07-29'))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 6);

  return (
    <AppLayout>
      <PageHeader title="Calendar" subtitle="Track exercises, appointments, medication, and recovery milestones in one place." />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">{monthNames[month]} {year}</h3>
              <div className="flex gap-2">
                <button onClick={prevMonth} className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"><ChevronLeft size={18} /></button>
                <button onClick={nextMonth} className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"><ChevronRight size={18} /></button>
              </div>
            </div>

            <div className="mb-2 grid grid-cols-7 gap-1">
              {dayNames.map((d) => (
                <div key={d} className="py-2 text-center text-xs font-bold text-slate-400">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                if (day === null) return <div key={`empty-${i}`} />;
                const dateStr = formatDateStr(day);
                const events = eventsForDate(dateStr);
                const isSelected = selectedDate === dateStr;
                const isToday = dateStr === '2026-07-29';
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={cn(
                      'relative flex min-h-[64px] flex-col items-center rounded-2xl border p-1.5 transition-all',
                      isSelected ? 'border-blue-500 bg-blue-50' : 'border-transparent hover:bg-slate-50',
                      isToday && !isSelected && 'border-blue-200 bg-blue-50/50'
                    )}
                  >
                    <span className={cn('text-sm font-semibold', isSelected ? 'text-blue-700' : isToday ? 'text-blue-600' : 'text-slate-700')}>{day}</span>
                    {events.length > 0 && (
                      <div className="mt-1 flex flex-wrap justify-center gap-0.5">
                        {events.slice(0, 3).map((e) => {
                          const cfg = typeConfig[e.type];
                          return <span key={e.id} className={cn('h-1.5 w-1.5 rounded-full', cfg.bg.replace('50', '500'))} />;
                        })}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-100 pt-4">
              {Object.entries(typeConfig).map(([key, cfg]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className={cn('h-2.5 w-2.5 rounded-full', cfg.bg.replace('50', '500'))} />
                  <span className="text-xs font-medium text-slate-500">{cfg.label}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
              <CalIcon size={18} className="text-blue-500" />
              {selectedDate ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }) : 'Select a date'}
            </h3>
            <AnimatePresence mode="wait">
              <motion.div key={selectedDate} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="space-y-3">
                {selectedEvents.length === 0 ? (
                  <p className="text-sm text-slate-400">No events scheduled for this day.</p>
                ) : (
                  selectedEvents.map((e) => {
                    const cfg = typeConfig[e.type];
                    return (
                      <div key={e.id} className="flex items-start gap-3 rounded-2xl border border-slate-100 p-3">
                        <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', cfg.bg)}>
                          <cfg.icon size={18} className={cfg.color} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-slate-900">{e.title}</p>
                            {e.time && <span className="text-xs font-semibold text-slate-400">{e.time}</span>}
                          </div>
                          {e.description && <p className="mt-0.5 text-xs text-slate-500">{e.description}</p>}
                          <span className={cn('mt-1.5 inline-block rounded-full px-2 py-0.5 text-xs font-bold', cfg.bg, cfg.color)}>{cfg.label}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>
          </Card>

          <Card>
            <h3 className="mb-4 font-bold text-slate-900">Upcoming</h3>
            <div className="space-y-3">
              {upcomingEvents.map((e) => {
                const cfg = typeConfig[e.type];
                return (
                  <div key={e.id} className="flex items-center gap-3">
                    <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', cfg.bg)}>
                      <cfg.icon size={16} className={cfg.color} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-700">{e.title}</p>
                      <p className="text-xs text-slate-400">{new Date(e.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}{e.time ? ` · ${e.time}` : ''}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
