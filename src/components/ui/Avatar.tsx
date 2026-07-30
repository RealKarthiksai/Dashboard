import { cn } from '../../utils/cn';

interface AvatarProps {
  src?: string;
  initials?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ src, initials, className, size = 'md' }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-[var(--color-primary-light)] overflow-hidden',
        {
          'h-8 w-8 text-xs': size === 'sm',
          'h-10 w-10 text-sm': size === 'md',
          'h-12 w-12 text-base': size === 'lg',
        },
        className
      )}
    >
      {src ? (
        <img src={src} alt="Avatar" className="w-full h-full object-cover" />
      ) : (
        <span className="font-medium text-[var(--color-primary)]">
          {initials || 'U'}
        </span>
      )}
    </div>
  );
}
