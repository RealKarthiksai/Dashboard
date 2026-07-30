import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Activity, Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '@/shared/components/forms/Input';

export function Login() {
  const [email, setEmail] = useState('admin@trotos.com');
  const [password, setPassword] = useState('trotos2026');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = await login(email, password);
    setIsSubmitting(false);

    if (res.success) {
      if (res.requiresMfa) {
        navigate('/login/mfa');
      } else {
        navigate('/dashboard/overview');
      }
    } else {
      setError(res.error || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[var(--color-background)] px-4">
      
      {/* Brand Header */}
      <div className="flex items-center gap-2 text-[var(--color-primary)] font-bold text-2xl tracking-tight mb-8">
        <div className="w-10 h-10 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center shadow-md">
          <Activity className="h-6 w-6" />
        </div>
        TrotOS
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[16px] shadow-[var(--shadow-level-2)] p-8">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Sign in to TrotOS</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Enterprise Mission Control Dashboard
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-[10px] bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 flex items-center gap-2 text-sm text-[var(--color-danger)]">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Input
                type="email"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="pl-9"
              />
              <Mail className="absolute left-3 top-3 h-4 w-4 text-[var(--color-text-muted)] pointer-events-none" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs text-[var(--color-primary)] hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="pl-9 pr-10"
              />
              <Lock className="absolute left-3 top-3 h-4 w-4 text-[var(--color-text-muted)] pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[var(--color-text-secondary)] py-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" defaultChecked className="rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
              <span>Remember this device for 30 days</span>
            </label>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 text-base font-semibold shadow-xs mt-2"
          >
            {isSubmitting ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-[var(--color-border)] text-center text-xs text-[var(--color-text-muted)]">
          Protected by Enterprise SSO & SAML 2.0
        </div>
      </div>
    </div>
  );
}
