import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) { setError('Email is required'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Enter a valid email'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setSent(true);
    setLoading(false);
  };

  return (
    <AuthLayout title="Forgot password?" subtitle="Enter your email and we'll send you a secure reset link.">
      {!sent ? (
        <>
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <div className="flex items-center gap-2 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                <AlertCircle size={18} /> {error}
              </div>
            )}
            <Input id="email" type="email" label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} error={error} autoComplete="email" required />
            <Button type="submit" size="lg" fullWidth disabled={loading}>
              {loading ? (<><Loader2 size={18} className="animate-spin" /> Sending...</>) : (<>Send reset link <ArrowRight size={18} /></>)}
            </Button>
          </form>
          <p className="mt-8 text-center text-sm text-slate-500">
            Remembered your password?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">Log in</Link>
          </p>
        </>
      ) : (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center">
          <CheckCircle2 size={40} className="mx-auto text-emerald-500" />
          <h3 className="mt-4 text-lg font-bold text-slate-900">Check your inbox</h3>
          <p className="mt-2 text-sm text-slate-600">
            We've sent a password reset link to <span className="font-semibold text-slate-800">{email}</span>.
            It may take a few minutes to arrive.
          </p>
          <Button onClick={() => navigate('/login')} variant="outline" size="md" fullWidth className="mt-5">
            <ArrowLeft size={16} /> Back to login
          </Button>
        </div>
      )}
    </AuthLayout>
  );
}
