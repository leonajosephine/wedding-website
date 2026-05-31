import clsx from 'clsx';

type BadgeProps = {
  children: React.ReactNode;
  variant?: 'neutral' | 'brand' | 'dark';
  className?: string;
};

export function Badge({children, variant = 'neutral', className}: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center border px-3 py-1 rounded-4xl',
        'text-[0.66rem] font-medium uppercase tracking-[0.14em]',
        {
          'border-[var(--border)] text-[var(--text-soft)] bg-[rgba(255,250,242,0.42)]':
            variant === 'neutral',
          'border-[var(--border-brand)] text-[var(--text)] bg-[rgba(184,196,170,0.22)]':
            variant === 'brand',
          'border-[rgba(245,240,231,0.22)] text-[var(--dark-text)] bg-[rgba(245,240,231,0.08)]':
            variant === 'dark'
        },
        className
      )}
    >
      {children}
    </span>
  );
}