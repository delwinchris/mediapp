import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSent(true); setLoading(false); }, 700);
  };

  return (
    <AuthLayout title="Forgot password?" subtitle="Enter your email and we'll send you a reset link.">
      {!sent ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input id="email" type="email" label="Email" placeholder="you@example.com" required />
          <Button type="submit" size="lg" fullWidth disabled={loading}>
            {loading ? 'Sending...' : 'Send reset link'}
            {!loading && <ArrowRight size={18} />}
          </Button>
        </form>
      ) : (
        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-6 text-center">
          <CheckCircle2 size={40} className="mx-auto text-emerald-500" />
          <h3 className="mt-4 text-lg font-bold text-slate-900">Check your inbox</h3>
          <p className="mt-2 text-sm text-slate-600">
            We've sent a password reset link to your email. It may take a few minutes to arrive.
          </p>
          <Button onClick={() => navigate('/login')} variant="outline" size="md" fullWidth className="mt-5">
            <ArrowLeft size={16} /> Back to login
          </Button>
        </div>
      )}

      <p className="mt-8 text-center text-sm text-slate-500">
        Remembered your password?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">Log in</Link>
      </p>
    </AuthLayout>
  );
}
