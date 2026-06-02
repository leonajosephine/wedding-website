import {useTranslations} from 'next-intl';
import Image from 'next/image';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative overflow-hidden bg-[var(--text)] px-6 py-14 text-center text-[rgba(252,245,234,0.68)]">
      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
        <Image
          src="/images/icons/Icons_bird_white.png"
          alt=""
          width={240}
          height={240}
          className="mb-5 h-auto w-20 opacity-80 md:w-40"
        />

        <p className="mb-4 text-md lowercase hand tracking-[0.14em] text-[rgba(252,245,234,0.45)]">
          {t('subtitle')}
        </p>

        <div className="script mb-3 text-3xl text-[var(--brand-100)] md:text-5xl">
          Merle <span className="ampersand text-[var(--brand-100)]">&</span>{' '}
          Lasse
        </div>

        <p className="mb-2 text-xs uppercase tracking-[0.18em]">
          {t('date')}
        </p>

        <a
          href={`mailto:${t('email')}`}
          className="mt-2 text-sm text-[var(--brand-100)] transition-colors hover:text-[var(--background)]"
        >
          {t('cta')}
        </a>
      </div>
    </footer>
  );
}