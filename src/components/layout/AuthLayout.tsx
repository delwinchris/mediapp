import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, HeartPulse, Sparkles } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-emerald-500 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
        </div>
        <div className="relative">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <Activity size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">MediRecover</span>
          </Link>
        </div>

        <div className="relative text-white">
          <h2 className="text-3xl font-bold leading-tight">Your recovery, beautifully tracked.</h2>
          <p className="mt-4 max-w-md text-blue-100">
            Join thousands of patients turning daily habits into lasting recovery. MediRecover guides you from day one to full strength.
          </p>
          <div className="mt-10 space-y-4">
            {[
              { icon: HeartPulse, text: 'Daily recovery tracking in seconds' },
              { icon: Sparkles, text: 'AI coach available 24/7' },
              { icon: ShieldCheck, text: 'Private, encrypted health data' },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                  <f.icon size={18} />
                </div>
                <span className="text-sm text-blue-50">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex items-center gap-3 text-sm text-blue-100">
          <div className="flex -space-x-2">
            {[415829, 733872, 1239291].map((id) => (
              <img key={id} src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=60`} className="h-8 w-8 rounded-full border-2 border-white object-cover" alt="" />
            ))}
          </div>
          Trusted by 12,000+ patients
        </div>
      </div>

      <div className="flex min-h-screen flex-col justify-center px-4 py-12 sm:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
            <p className="mt-2 text-slate-500">{subtitle}</p>
            <div className="mt-8">{children}</div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
