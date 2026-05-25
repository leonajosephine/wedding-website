type SectionHeaderProps = {
    eyebrow: string;
    title: string;
  };
  
  export function SectionHeader({eyebrow, title}: SectionHeaderProps) {
    return (
      <div className="mx-auto mb-14 max-w-2xl text-center">
        <p className="eyebrow mb-3">{eyebrow}</p>
  
        <h2 className="script text-6xl leading-[0.95] text-[var(--text)] md:text-7xl lg:text-8xl">
          {title}
        </h2>
  
        <div className="mx-auto mt-6 h-px w-14 bg-[var(--olive-light)]" />
      </div>
    );
  }