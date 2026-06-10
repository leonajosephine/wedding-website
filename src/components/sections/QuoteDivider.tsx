import {useTranslations} from 'next-intl';

export function QuoteDivider() {
  const t = useTranslations('quoteDivider');

  return (
    <section className="relative overflow-hidden bg-[var(--brand-400)] px-6 py-28 md:py-36">
      <div className="container relative text-center">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="script text-[14rem] leading-none text-[rgba(245,240,231,0.04)] md:text-[24rem]">
            M&L
          </span>
        </div>

        <div className="relative z-10">
          <p className="mb-6 text-[0.65rem] uppercase tracking-[0.25em] text-[rgba(245,240,231,0.65)]">
            {t('eyebrow')}
          </p>

          <blockquote className="mx-auto max-w-4xl">
            <p className="serif text-4xl leading-tight text-[var(--dark-text)] md:text-6xl">
              {t('lineOne')}
              <br />
              {t('lineTwo')}
            </p>
          </blockquote>

          <div className="mt-10 text-[rgba(245,240,231,0.7)]">♡</div>
        </div>
      </div>
    </section>
  );
}