import Link from 'next/link';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'dark';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
};

export function Button({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  disabled = false,
  className
}: ButtonProps) {
  const classes = clsx(
    'inline-flex min-h-[2.85rem] items-center justify-center gap-2',
    'px-5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em]',
    'transition-all duration-300',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-500)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]',
    disabled && 'pointer-events-none opacity-45',
    {
      'border border-[var(--brand-400)] bg-[var(--brand-400)] text-[var(--background)] hover:-translate-y-0.5 hover:bg-[var(--brand-700)] hover:border-[var(--brand-700)] rounded-lg':
        variant === 'primary',

      'border border-[rgba(42,37,34,0.28)] bg-transparent text-[var(--text)] hover:-translate-y-0.5 hover:border-[var(--text)] hover:bg-[rgba(42,37,34,0.04)]':
        variant === 'secondary',

      'border border-transparent bg-transparent px-0 text-[var(--text)] hover:opacity-65':
        variant === 'ghost',

      'border border-[var(--text-strong)] bg-[var(--text-strong)] text-[var(--background)] hover:-translate-y-0.5 hover:bg-[var(--black)]':
        variant === 'dark'
    },
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}