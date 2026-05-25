type BadgeProps = {
    children: React.ReactNode;
  };
  
  export function Badge({children}: BadgeProps) {
    return (
      <span className="inline-flex rounded-full border border-[rgba(93,103,78,0.28)] px-3 py-1 text-[0.68rem] uppercase tracking-[0.12em] text-[var(--olive-dark)]">
        {children}
      </span>
    );
  }