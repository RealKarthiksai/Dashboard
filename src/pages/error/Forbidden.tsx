import { ShieldX, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function Forbidden() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] p-6 text-center space-y-5">
      <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center">
        <ShieldX className="h-8 w-8" />
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] tracking-tight">
          403 — Access Forbidden
        </h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          You do not have the required permissions or capabilities to access this resource within TrotOS.
        </p>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <Button variant="secondary" onClick={() => navigate(-1)} className="gap-2 text-xs">
          <ArrowLeft className="h-4 w-4" /> Go Back
        </Button>
        <Button variant="primary" onClick={() => navigate('/dashboard/overview')} className="gap-2 text-xs">
          <Home className="h-4 w-4" /> Mission Control
        </Button>
      </div>
    </div>
  );
}
