import { Link } from 'react-router-dom';
import { Activity, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const cols = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Exercise Library', href: '/app/exercises' },
      { label: 'AI Coach', href: '/app/coach' },
      { label: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contact', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Medical Disclaimer', href: '#' },
      { label: 'Data Security', href: '#' },
    ],
  },
];

const socials = [Twitter, Instagram, Linkedin, Youtube];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-500">
              Your AI-powered companion for injury and surgery recovery. Track, understand, and stay motivated — every day.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((Icon, i) => (
                <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600" aria-label="Social link">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-slate-900">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.href} className="text-sm text-slate-500 transition-colors hover:text-blue-600">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
          <p className="text-xs text-slate-400">© 2026 MediRecover. All rights reserved.</p>
          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            <Activity size={12} className="text-emerald-500" />
            MediRecover is a companion tool and does not provide medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
