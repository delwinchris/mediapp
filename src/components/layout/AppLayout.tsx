import { useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

const titles: Record<string, string> = {
  '/app/dashboard': 'Dashboard',
  '/app/tracker': 'Recovery Tracker',
  '/app/mental': 'Mental Recovery',
  '/app/mind': 'Mind Recovery',
  '/app/exercises': 'Exercise Library',
  '/app/progress': 'Progress',
  '/app/coach': 'AI Coach',
  '/app/profile': 'Profile',
  '/app/analytics': 'Analytics',
  '/app/achievements': 'Achievements',
  '/app/calendar': 'Calendar',
  '/app/report': 'Recovery Report',
  '/app/notifications': 'Notifications',
  '/app/plan': 'Recovery Plan',
  '/app/insights': 'AI Insights',
  '/app/settings': 'Settings',
};

export function AppLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const title = titles[location.pathname] ?? 'MediRecover';
  // Also check for exercise detail sub-routes
  const titleFromPath = location.pathname.startsWith('/app/exercises/') ? 'Exercise Details' : title;

  return (
    <div className="min-h-screen bg-slate-50">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-72">
        <Topbar onMenuClick={() => setSidebarOpen(true)} title={titleFromPath} />
        <main id="main-content" role="main" aria-label={titleFromPath} className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
