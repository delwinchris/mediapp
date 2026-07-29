import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => navigate('/app/dashboard'), 700);
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue your recovery journey.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input id="email" type="email" label="Email" placeholder="you@example.com" defaultValue="alex.morgan@example.com" required />
        <Input id="password" type="password" label="Password" placeholder="Enter your password" defaultValue="password" required />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-semibold text-blue-600 hover:text-blue-700">Forgot password?</Link>
        </div>
        <Button type="submit" size="lg" fullWidth disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
          {!loading && <ArrowRight size={18} />}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium text-slate-400">OR</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <Button variant="outline" size="lg" fullWidth>
        <Mail size={18} /> Continue with Google
      </Button>

      <p className="mt-8 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">Sign up free</Link>
      </p>
    </AuthLayout>
  );
}
