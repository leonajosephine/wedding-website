import {useTranslations} from 'next-intl';
import {Heart} from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="relative overflow-hidden bg-[var(--text)] px-6 py-14 text-center text-[rgba(252,245,234,0.68)]">
      <div className="mx-auto flex max-w-xl flex-col items-center">
        <div className="relative mb-5 h-16 w-28">
          <Image
            src="/images/monogramm.png"
            alt=""
            fill
            sizes="112px"
            className="object-cover brightness-0 invert"
          />
        </div>

        <p className="mb-4 flex items-center gap-2 text-lg leading-none hand tracking-[0.14em] text-[rgba(252,245,234,0.75)]">
          <span>{t('subtitle')}</span>
          <Heart aria-hidden="true" className="h-4 w-4 shrink-0 fill-white text-white" />
        </p>

        <p className="text-xs uppercase tracking-[0.18em]">{t('date')}</p>
      </div>
    </footer>
  );
}
