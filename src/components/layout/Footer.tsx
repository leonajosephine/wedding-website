import {useTranslations} from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="bg-[var(--text)] px-6 py-14 text-center text-[rgba(252,245,234,0.68)]">
      <div className="script mb-3 text-3xl text-[var(--brand-200)] md:text-5xl">
        Merle <span className="ampersand text-[var(--brand-200)]">&</span> Lasse
      </div>

      <p className="mb-2 text-xs uppercase tracking-[0.18em]">
        {t('date')}
      </p>

      <p className="mb-4 text-xs uppercase tracking-[0.14em] text-[rgba(252,245,234,0.45)]">
        {t('subtitle')}
      </p>

      <a
        href={`mailto:${t('email')}`}
        className="text-sm text-[var(--brand-200)] transition-colors hover:text-[var(--background)]"
      >
        {t('cta')}
      </a>
    </footer>
  );
}