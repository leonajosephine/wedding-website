import {useTranslations} from 'next-intl';

export function QuoteDivider() {
  const t = useTranslations('quoteDivider');

  return (
    <section className="relative overflow-hidden bg-[var(--brand-400)] px-6 py-28 md:py-36 lg:py-40">
      <div className="container relative text-center">
        {/* Watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="script whitespace-nowrap text-[13rem] leading-none text-[rgba(245,240,231,0.04)] sm:text-[17rem] md:text-[24rem] lg:text-[28rem]">
            M&L
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-8 text-[0.65rem] uppercase tracking-[0.25em] text-[rgba(245,240,231,0.65)]">
            {t('eyebrow')}
          </p>

          {/* Personal message */}
          <div className="mx-auto max-w-2xl">
            <p className="hand mt-7 text-2xl leading-9 tracking-[0.04em] text-[var(--dark-text)] md:text-3xl md:leading-10">
            {t('paragraphOne')} {t('highlight')}
            </p>
          </div>

          {/* Heart */}
          <div className="mt-9 text-lg text-[rgba(245,240,231,0.72)]">
            ♡
          </div>

          {/* Signature */}
          <p className="script mt-4 text-4xl text-[var(--dark-text)] md:text-5xl">
            Merle & Lasse
          </p>
        </div>
      </div>
    </section>
  );
}