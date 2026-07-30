import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '@/shared/components/forms/Input';

export function MfaVerification() {
  const [code, setCode] = useState('123456');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { verifyMfa, pendingMfaUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const res = await verifyMfa(code);
    setIsSubmitting(false);

    if (res.success) {
      navigate('/dashboard/overview');
    } else {
      setError(res.error || 'Verification failed');
    }
  };

  const handleBackToLogin = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[var(--color-background)] px-4">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[16px] shadow-[var(--shadow-level-2)] p-8">
        
        <button
          onClick={handleBackToLogin}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] mx-auto flex items-center justify-center mb-3">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Two-Factor Authentication</h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            Enter the 6-digit security code sent to your authenticator app for{' '}
            <span className="font-semibold text-[var(--color-text-primary)]">
              {pendingMfaUser?.email || 'admin@trotos.com'}
            </span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-[10px] bg-red-50 border border-red-200 flex items-center gap-2 text-sm text-[var(--color-danger)]">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
              placeholder="123456"
              className="text-center tracking-[0.5em] text-lg font-mono font-bold"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 text-base font-semibold shadow-sm"
          >
            {isSubmitting ? 'Verifying Code...' : 'Verify & Continue'}
          </Button>
        </form>

        <p className="mt-4 text-center text-xs text-[var(--color-text-muted)]">
          Demo Code: <code className="bg-gray-100 px-1.5 py-0.5 rounded font-mono text-[var(--color-text-primary)]">123456</code>
        </p>
      </div>
    </div>
  );
}
