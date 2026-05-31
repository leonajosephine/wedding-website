import clsx from 'clsx';

type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({children, className}: CardProps) {
  return (
    <div
      className={clsx(
        'border border-[var(--border-soft)] bg-[rgba(255,250,242,0.68)]',
        'shadow-[var(--shadow-paper)] backdrop-blur-[14px]',
        className
      )}
    >
      {children}
    </div>
  );
}