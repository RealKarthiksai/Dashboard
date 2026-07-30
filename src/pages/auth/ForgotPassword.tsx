import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound, ArrowLeft, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { requestPasswordReset } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await requestPasswordReset(email);
    setIsSubmitting(false);
    setSubmittedMessage(res.message);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-[var(--color-background)] px-4">
      <div className="w-full max-w-md bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[16px] shadow-[var(--shadow-level-2)] p-8">
        
        <Link
          to="/login"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] mb-6 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
        </Link>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] mx-auto flex items-center justify-center mb-3">
            <KeyRound className="h-6 w-6" />
          </div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Reset your password</h2>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">
            Enter your work email address and we'll send you recovery instructions.
          </p>
        </div>

        {submittedMessage ? (
          <div className="p-4 rounded-[10px] bg-green-50 border border-green-200 text-center space-y-3">
            <CheckCircle className="h-8 w-8 text-[var(--color-success)] mx-auto" />
            <p className="text-sm font-medium text-green-900">{submittedMessage}</p>
            <Link to="/login">
              <Button variant="secondary" className="w-full mt-2">
                Return to Login
              </Button>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-1">
                Work Email
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 text-base font-semibold shadow-sm"
            >
              {isSubmitting ? 'Sending Request...' : 'Send Reset Link'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
