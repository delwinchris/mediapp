import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, AlertCircle, Loader2, Check } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input, PasswordInput } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/lib/auth';
import { cn } from '@/lib/cn';

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="currentColor" d="M17.05 12.04c-.03-2.66 2.17-3.94 2.27-4-1.24-1.81-3.17-2.06-3.86-2.09-1.64-.17-3.2.97-4.03.97-.84 0-2.12-.94-3.49-.92-1.8.03-3.46 1.04-4.38 2.65-1.87 3.25-.48 8.06 1.34 10.69.89 1.29 1.95 2.73 3.33 2.68 1.34-.06 1.85-.86 3.47-.86 1.62 0 2.08.86 3.5.83 1.45-.03 2.36-1.31 3.25-2.61 1.03-1.5 1.45-2.96 1.47-3.04-.03-.01-2.82-1.08-2.85-4.3ZM14.6 4.46c.74-.9 1.24-2.14 1.1-3.38-1.07.04-2.37.71-3.14 1.6-.69.79-1.29 2.06-1.13 3.27 1.19.09 2.42-.61 3.17-1.49Z" />
    </svg>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('alex.morgan@example.com');
  const [password, setPassword] = useState('password');
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email';
    if (!password) e.password = 'Password is required';
    else if (password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setServerError('');
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await signIn(email, password);
      navigate(user.isNewUser ? '/onboarding' : '/app/dashboard');
    } catch {
      setServerError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome back" subtitle="Log in to continue your recovery journey.">
      {serverError && (
        <div className="mb-5 flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
          <AlertCircle size={18} /> {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Input
          id="email" type="email" label="Email" placeholder="you@example.com"
          value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email}
          autoComplete="email" required
        />
        <PasswordInput
          id="password" label="Password" placeholder="Enter your password"
          value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password}
          autoComplete="current-password" required
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-semibold text-blue-600 hover:text-blue-700">Forgot password?</Link>
        </div>
        <Button type="submit" size="lg" fullWidth disabled={loading}>
          {loading ? (<><Loader2 size={18} className="animate-spin" /> Signing in...</>) : (<>Sign in <ArrowRight size={18} /></>)}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs font-medium text-slate-400">OR</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="space-y-3">
        <Button variant="outline" size="lg" fullWidth><GoogleIcon /> Continue with Google</Button>
        <Button variant="outline" size="lg" fullWidth><AppleIcon /> Continue with Apple</Button>
      </div>

      <p className="mt-8 text-center text-sm text-slate-500">
        Don't have an account?{' '}
        <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700">Sign up free</Link>
      </p>
    </AuthLayout>
  );
}
