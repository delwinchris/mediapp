import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => navigate('/onboarding'), 700);
  };

  return (
    <AuthLayout title="Create your account" subtitle="Start your personalized recovery plan in minutes.">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input id="name" type="text" label="Full name" placeholder="Alex Morgan" required />
        <Input id="email" type="email" label="Email" placeholder="you@example.com" required />
        <Input id="password" type="password" label="Password" placeholder="Create a password" required hint="At least 8 characters" />

        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
          <span>
            I agree to the <a href="#" className="font-semibold text-blue-600">Terms of Service</a> and{' '}
            <a href="#" className="font-semibold text-blue-600">Privacy Policy</a>, and acknowledge that
            MediRecover does not provide medical advice.
          </span>
        </label>

        <Button type="submit" size="lg" fullWidth disabled={loading || !agreed}>
          {loading ? 'Creating account...' : 'Create account'}
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
        Already have an account?{' '}
        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700">Log in</Link>
      </p>
    </AuthLayout>
  );
}
