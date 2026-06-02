import Image from 'next/image';

export function EucalyptusDivider() {
  return (
    <section className="relative overflow-hidden bg-[var(--brand-400)] px-6 py-20 md:py-28">

    <Image
        src="/images/decor/eucalyptus2.png"
        alt=""
        width={1400}
        height={1400}
        className="pointer-events-none absolute -left-48 top-1/2 hidden -translate-y-1/2 rotate-[20deg] opacity-12 md:block"
      />

      <Image
        src="/images/decor/eucalyptus2.png"
        alt=""
        width={1400}
        height={1400}
        className="pointer-events-none absolute -right-48 top-1/2 hidden -translate-y-1/2 rotate-[200deg] opacity-12 md:block"
      /> 

      <div className="container relative text-center">
        <p className="mb-4 text-[0.65rem] uppercase tracking-[0.24em] text-[rgba(245,240,231,0.7)]">
          save the date
        </p>

        <div className="mb-6 serif text-3xl tracking-[0.18em] text-[var(--dark-text)] md:text-5xl">
          15 · 05 · 2027
        </div>

        <h2 className="script text-6xl text-[var(--dark-text)] md:text-8xl">
          a weekend to remember
        </h2>

        <div className="mx-auto mt-8 h-px w-24 bg-[rgba(245,240,231,0.22)]" />
      </div>
    </section>
  );
}

   {/* different version for the leaves 
      <Image
        src="/images/decor/eucalyptus2.png"
        alt=""
        width={1200}
        height={1200}
        className="pointer-events-none absolute -left-40 top-1/2 hidden -translate-y-1/2 opacity-15 md:block"
      />

      <Image
        src="/images/decor/eucalyptus2.png"
        alt=""
        width={1200}
        height={1200}
        className="pointer-events-none absolute -right-40 top-1/2 hidden -translate-y-1/2 rotate-180 opacity-15 md:block"
      />
      */}