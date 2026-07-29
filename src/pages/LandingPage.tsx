import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Star,
  ShieldCheck,
  ChevronDown,
  Activity,
  Brain,
  Dumbbell,
  Sparkles,
  LineChart,
  Flame,
  Check,
  Quote,
  type LucideIcon,
} from 'lucide-react';
import { LandingNav } from '@/components/layout/LandingNav';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { SectionTitle, FadeIn } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { RecoveryRing } from '@/components/ui/RecoveryRing';
import { features, testimonials, faqItems } from '@/lib/mockData';
import { computeRecoveryScore } from '@/lib/analytics';

const iconMap: Record<string, LucideIcon> = {
  Activity,
  Brain,
  Dumbbell,
  Sparkles,
  LineChart,
  Flame,
};

export function LandingPage() {
  const score = computeRecoveryScore();
  const [openFaq, setOpenFaq] = useState<string | null>(faqItems[0].id);

  return (
    <div className="min-h-screen bg-slate-50">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-20 left-1/4 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl" />
          <div className="absolute top-20 right-1/4 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-4 py-1.5 text-xs font-bold text-blue-700 backdrop-blur"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              AI-powered recovery companion
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl"
            >
              Recover smarter,
              <span className="block bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                every single day.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 max-w-lg text-lg leading-relaxed text-slate-500"
            >
              MediRecover guides you from injury to full strength with daily tracking, a personalized
              exercise library, and an AI coach that keeps you motivated between clinic visits.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link to="/signup">
                <Button size="lg" className="group">
                  Start your recovery
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/app/dashboard">
                <Button variant="outline" size="lg">View demo dashboard</Button>
              </Link>
            </motion.div>
            <div className="mt-8 flex items-center gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-500" />
                <span>HIPAA-aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[415829, 733872, 1239291].map((id) => (
                    <img key={id} src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=60`} className="h-8 w-8 rounded-full border-2 border-white object-cover" alt="" />
                  ))}
                </div>
                <span>12,000+ recovering</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="relative"
          >
            <Card glass className="relative z-10 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">Today's Recovery</p>
                  <p className="text-xs text-slate-400">Sunday, July 27</p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">+12 this week</span>
              </div>
              <div className="mt-6 flex justify-center">
                <RecoveryRing score={score} label="Recovery Score" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { label: 'Pain', value: '3/10', color: 'text-emerald-600' },
                  { label: 'Mood', value: '9/10', color: 'text-blue-600' },
                  { label: 'Sleep', value: '7h', color: 'text-violet-600' },
                ].map((s) => (
                  <div key={s.label} className="rounded-2xl bg-slate-50 p-3 text-center">
                    <p className="text-xs text-slate-400">{s.label}</p>
                    <p className={`mt-1 text-lg font-bold ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
            </Card>
            <div className="absolute -bottom-6 -left-6 z-0 hidden sm:block">
              <Card glass className="animate-float p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white">
                    <Flame size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">7 day streak</p>
                    <p className="text-xs text-slate-400">Keep it going!</p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle center eyebrow="Features" title="Everything you need to recover well" subtitle="From your first day post-injury to your return-to-sport clearance, MediRecover supports every dimension of your recovery." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => {
              const Icon = iconMap[f.icon] ?? Activity;
              return (
                <FadeIn key={f.id} delay={i * 0.05}>
                  <Card hover className="h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 text-white shadow-lg shadow-blue-500/25">
                      <Icon size={22} />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-slate-900">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.description}</p>
                  </Card>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionTitle center eyebrow="Testimonials" title="Loved by people on the mend" subtitle="Real stories from real recoveries. Here's what our community says about their journey with MediRecover." />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <FadeIn key={t.id} delay={i * 0.08}>
                <Card hover className="flex h-full flex-col">
                  <Quote size={28} className="text-blue-200" />
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">"{t.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="h-11 w-11 rounded-full object-cover" />
                    <div>
                      <p className="text-sm font-bold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-400">{t.role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star key={idx} size={14} className={idx < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} />
                      ))}
                    </div>
                  </div>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionTitle center eyebrow="FAQ" title="Questions, answered" />
          <div className="mt-12 space-y-3">
            {faqItems.map((item) => {
              const open = openFaq === item.id;
              return (
                <div key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <button onClick={() => setOpenFaq(open ? null : item.id)} className="flex w-full items-center justify-between px-5 py-4 text-left">
                    <span className="font-semibold text-slate-900">{item.question}</span>
                    <ChevronDown size={20} className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-slate-500">{item.answer}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-emerald-500 px-6 py-16 text-center text-white sm:px-12 sm:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Your recovery starts today</h2>
            <p className="mx-auto mt-4 max-w-xl text-blue-100">Join thousands of people taking control of their recovery. It only takes two minutes to set up your plan.</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 shadow-xl">
                  Create free account
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <div className="flex items-center gap-2 text-sm text-blue-100">
                <Check size={16} /> No credit card required
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
