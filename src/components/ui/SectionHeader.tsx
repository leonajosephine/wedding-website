type SectionHeaderProps = {
    eyebrow: string;
    title: string;
    align?: 'center' | 'left';
    className?: string;
  };
  
  export function SectionHeader({
    eyebrow,
    title,
    align = 'center',
    className
  }: SectionHeaderProps) {
    const isCenter = align === 'center';
  
    return (
      <div
        className={`${isCenter ? 'mx-auto text-center' : 'text-left'} mb-14 max-w-2xl ${className ?? ''}`}
      >
        <p className="eyebrow mb-3">{eyebrow}</p>
  
        <h2 className="script text-6xl leading-[0.95] text-[var(--text)] md:text-7xl lg:text-8xl">
          {title}
        </h2>
  
        <div
          className={`mt-6 h-px w-14 bg-[rgba(42,37,34,0.22)] ${
            isCenter ? 'mx-auto' : ''
          }`}
        />
      </div>
    );
  }