import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, AlertTriangle, User, Clock } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import type { ChatMessage } from '@/lib/types';
import { cn } from '@/lib/cn';
import { aiChatService } from '@/services';
import { useAppStore } from '@/lib/store';

const suggestions = [
  'Why is my pain worse today?',
  'When can I return to sports?',
  'How can I improve my recovery?',
  'What should I discuss with my physiotherapist?',
];

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

export function AICoachPage() {
  const { recoveryLogs, mentalLogs } = useAppStore();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [pendingReply, setPendingReply] = useState('');
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const orderedRecoveryLogs = [...recoveryLogs].sort((a, b) => a.date.localeCompare(b.date));
  const latestRecovery = orderedRecoveryLogs[orderedRecoveryLogs.length - 1];
  const previousRecovery = orderedRecoveryLogs[orderedRecoveryLogs.length - 2];
  const painChange = latestRecovery && previousRecovery ? latestRecovery.pain - previousRecovery.pain : null;
  const latestConfidence = mentalLogs[0]?.confidence;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing, displayedText]);

  useEffect(() => {
    if (!typing || !pendingReply) return;
    let i = 0;
    setDisplayedText('');
    const interval = setInterval(() => {
      i += 2;
      setDisplayedText(pendingReply.slice(0, i));
      if (i >= pendingReply.length) {
        clearInterval(interval);
        setMessages((m) => [...m, { id: `c${Date.now()}`, role: 'coach', text: pendingReply, timestamp: new Date().toISOString() }]);
        setDisplayedText('');
        setPendingReply('');
        setTyping(false);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [typing, pendingReply]);

  const send = async (text: string) => {
    if (!text.trim() || typing) return;
    const userMsg: ChatMessage = { id: `u${Date.now()}`, role: 'user', text, timestamp: new Date().toISOString() };
    setMessages((m) => [...m, userMsg]);
    setInput('');

    setTyping(true);
    setError(null);
    try {
      const conversation = await aiChatService.create(text.trim().slice(0, 60));
      const { coachResponse } = await aiChatService.sendMessage(conversation.id, text);
      setPendingReply(coachResponse);
    } catch (err) {
      setTyping(false);
      setError(err instanceof Error ? err.message : 'The AI coach could not respond.');
    }
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
              {messages.length === 0 && !typing && <div className="py-16 text-center text-sm text-slate-400">Start a conversation when you are ready. Live responses will appear here once AI coaching is configured.</div>}
              {messages.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={cn('flex gap-3', m.role === 'user' && 'flex-row-reverse')}>
                  <div className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', m.role === 'coach' ? 'bg-gradient-to-br from-blue-600 to-emerald-500 text-white' : 'bg-slate-200 text-slate-600')}>
                    {m.role === 'coach' ? <Sparkles size={16} /> : <User size={16} />}
                  </div>
                  <div className={cn('max-w-[75%]', m.role === 'user' && 'flex flex-col items-end')}>
                    <div className={cn('rounded-2xl px-4 py-3 text-sm leading-relaxed', m.role === 'coach' ? 'bg-slate-100 text-slate-700' : 'bg-blue-600 text-white')}>{m.text}</div>
                    <div className={cn('mt-1 flex items-center gap-1 text-xs text-slate-400', m.role === 'user' && 'flex-row-reverse')}>
                      <Clock size={10} /> {formatTime(m.timestamp)}
                    </div>
                  </div>
                </motion.div>
              ))}

              <AnimatePresence>
                {typing && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-500 text-white"><Sparkles size={16} /></div>
                    <div className="max-w-[75%] rounded-2xl bg-slate-100 px-4 py-3 text-sm leading-relaxed text-slate-700">
                      {displayedText || (
                        <div className="flex items-center gap-1 py-1">
                          {[0, 1, 2].map((i) => (
                            <motion.span key={i} className="h-2 w-2 rounded-full bg-slate-400" animate={{ y: [0, -6, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                          ))}
                        </div>
                      )}
                      {displayedText && displayedText.length < (pendingReply?.length ?? 0) && (
                        <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-slate-500 align-middle" />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {messages.length <= 2 && !typing && (
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
            {error && <p className="px-4 pb-3 text-sm text-rose-600">{error}</p>}
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
            {painChange !== null || latestConfidence !== undefined ? (
              <>
                <p className="text-sm leading-relaxed text-slate-600">
                  {painChange !== null
                    ? `Your latest logged pain is ${Math.abs(painChange)} point${Math.abs(painChange) === 1 ? '' : 's'} ${painChange < 0 ? 'lower' : painChange > 0 ? 'higher' : 'unchanged'} than your previous recovery check-in.`
                    : 'Your latest recovery check-in is recorded. Keep logging to build a personal trend.'}
                </p>
                {latestConfidence !== undefined && <p className="mt-2 text-sm text-slate-500">Latest mental confidence: {latestConfidence}/10.</p>}
              </>
            ) : (
              <p className="text-sm leading-relaxed text-slate-500">Complete a recovery or mental check-in to see a personal insight here.</p>
            )}
          </Card>

          <Card>
            <h3 className="mb-3 font-bold text-slate-900">Suggested questions</h3>
            <div className="space-y-2">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)} disabled={typing} className="flex w-full items-center gap-2 rounded-2xl border border-slate-100 p-3 text-left text-sm font-medium text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50">
                  <Sparkles size={14} className="shrink-0 text-blue-400" /> {s}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
