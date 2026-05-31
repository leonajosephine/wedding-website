import clsx from 'clsx';

type DividerProps = {
  className?: string;
};

export function Divider({className}: DividerProps) {
  return (
    <div
      className={clsx(
        'h-px w-14 bg-[rgba(42,37,34,0.22)]',
        className
      )}
    />
  );
}