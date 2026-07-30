import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertOctagon, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('TrotOS Uncaught UI Exception:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-8 m-6 rounded-2xl bg-[var(--color-surface)] border border-rose-500/30 flex flex-col items-center justify-center text-center space-y-4 shadow-xl">
          <div className="p-3.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">
              Module Encountered an Unexpected Error
            </h2>
            <p className="text-xs text-[var(--color-text-muted)] mt-1 max-w-md mx-auto">
              {this.state.error?.message || 'A runtime JavaScript exception occurred in this module component.'}
            </p>
          </div>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-4 py-2 bg-rose-500 text-white rounded-lg font-semibold text-sm hover:bg-rose-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Module Component
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
