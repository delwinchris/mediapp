import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, WifiOff, Inbox, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-50 to-emerald-50">
          <Compass size={40} className="text-blue-500" />
        </div>
        <h1 className="mt-8 text-6xl font-bold tracking-tight text-slate-900">404</h1>
        <h2 className="mt-2 text-xl font-bold text-slate-700">Page not found</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          The page you're looking for may have been moved or doesn't exist. Let's get you back on track.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={() => navigate('/app/dashboard')}>Back to Dashboard</Button>
        </div>
      </motion.div>
    </div>
  );
}

export function NetworkErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-rose-50 to-orange-50">
          <WifiOff size={40} className="text-rose-500" />
        </div>
        <h1 className="mt-8 text-2xl font-bold text-slate-900">Connection lost</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          We couldn't reach our servers. Check your internet connection and try again.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button onClick={() => window.location.reload()}><RefreshCw size={16} /> Retry</Button>
          <Button variant="outline" onClick={() => navigate('/app/dashboard')}>Go home</Button>
        </div>
      </motion.div>
    </div>
  );
}

export function EmptyDataPage({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="flex min-h-[400px] items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100">
          <Inbox size={36} className="text-slate-400" />
        </div>
        <h2 className="mt-6 text-xl font-bold text-slate-900">No data available</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          We couldn't load your recovery data. This might be a temporary issue.
        </p>
        {onRetry && (
          <Button onClick={onRetry} variant="outline" className="mt-6"><RefreshCw size={16} /> Try again</Button>
        )}
      </motion.div>
    </div>
  );
}
