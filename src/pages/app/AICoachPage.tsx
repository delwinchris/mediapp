import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, AlertTriangle, User } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { aiSampleResponses } from '@/lib/mockData';
import type { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/cn';

const suggestions = [
  "Is my pain level normal at this stage?",
  "What exercises should I do today?",
  "I'm feeling anxious about re-injury.",
  "How's my recovery trending?",
];

const initialMessages: ChatMessage[] = [
  {
    id: 'c0',
    role: 'coach',
    text: "Hi Alex! I'm your AI recovery coach. I can help you understand your progress, suggest exercises, and support you through tough moments. What's on your mind today?",
    timestamp: new Date().toISOString(),
  },
];

export function AICoachPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: ChatMessage = { id: `u${Date.now()}`, role: 'user', text, timestamp: new Date().toISOString() };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const reply = aiSampleResponses[Math.floor(Math.random() * aiSampleResponses.length)];
      const coachMsg: ChatMessage = { id: `c${Date.now()}`, role: 'coach', text: reply, timestamp: new Date().toISOString() };
      setMessages((m) => [...m, coachMsg]);
      setTyping(false);
    }, 1400);
  };

  return (
    <AppLayout>
      <PageHeader title="AI Recovery Coach" subtitle="Your supportive companion for questions, motivation, and reflection." />

      <div className="mb-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <AlertTriangle size={20} className="mt-0.5 shrink-0 text-amber-500" />
        <p className="text-sm text-amber-800">
          <span className="font-bold">Medical disclaimer:</span> The AI coach provides general support and
          encouragement only. It does not diagnose, treat, or replace professional medical advice. Always
          consult your doctor or physiotherapist for medical concerns.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="flex h-[600px] flex-col p-0">
            <div className="flex items-center gap-3 border-b border-slate-100 p-4">
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white shadow-lg shadow-blue-600/25"><Sparkles size={20} /></div>
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Recovery Coach</p>
                <p className="text-xs text-emerald-600">Online · Always here to help</p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn('flex gap-3', m.role === 'user' && 'flex-row-reverse')}>
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', m.role === 'coach' ? 'bg-gradient-to-br from-blue-600 to-emerald-500 text-white' : 'bg-slate-200 text-slate-600')}>
                    {m.role === 'coach' ? <Sparkles size={16} /> : <User size={16} />}
                  </div>
                  <div className={cn('max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed', m.role === 'coach' ? 'bg-slate-100 text-slate-700' : 'bg-blue-600 text-white')}>{m.text}</div>
                </motion.div>
              ))}

              <AnimatePresence>
                {typing && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white"><Sparkles size={16} /></div>
                    <div className="flex items-center gap-1 rounded-2xl bg-slate-100 px-4 py-4">
                      {[0, 1, 2].map((i) => (
                        <motion.span key={i} className="h-2 w-2 rounded-full bg-slate-400" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {messages.length <= 2 && (
              <div className="flex flex-wrap gap-2 border-t border-slate-100 p-3">
                {suggestions.map((s) => (
                  <button key={s} onClick={() => send(s)} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600">{s}</button>
                ))}
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex items-center gap-2 border-t border-slate-100 p-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your coach anything..."
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100"
              />
              <button type="submit" disabled={!input.trim() || typing} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50">
                <Send size={18} />
              </button>
            </form>
          </Card>
        </div>

        <div className="space-y-6">
          <Card glass className="bg-gradient-to-br from-blue-600 to-emerald-500 text-white">
            <Sparkles size={28} />
            <h3 className="mt-4 text-lg font-bold">How I can help</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-blue-50">
              <li>• Explain your recovery metrics</li>
              <li>• Suggest exercises for today</li>
              <li>• Help with motivation & mindset</li>
              <li>• Answer general recovery questions</li>
              <li>• Reflect on your weekly progress</li>
            </ul>
          </Card>

          <Card>
            <h3 className="mb-3 font-bold text-slate-900">This week's insight</h3>
            <p className="text-sm leading-relaxed text-slate-600">
              Your pain dropped from 6 to 3 and your mood rose from 5 to 9 — the strongest weekly
              improvement since you started. Sleep is trending up too, which is accelerating tissue repair.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-emerald-50 p-3 text-center">
                <p className="text-2xl font-bold text-emerald-600">-3</p>
                <p className="text-xs text-slate-500">Pain points</p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-3 text-center">
                <p className="text-2xl font-bold text-blue-600">+4</p>
                <p className="text-xs text-slate-500">Mood points</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
