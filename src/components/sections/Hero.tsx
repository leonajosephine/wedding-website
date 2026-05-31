'use client';

import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/Button';

export function Hero() {
  const t = useTranslations('hero');

  const scrollToRsvp = () => {
    document.querySelector('#rsvp')?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-end justify-center overflow-hidden bg-[var(--background)] md:items-center md:justify-end"
    >
      <div className="image-soft absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-[position:25%_center] bg-no-repeat md:bg-center" />

      <div className="absolute inset-0 bg-[rgba(252,245,234,0.16)]" />

      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(252,245,234,0.03)] via-transparent to-[rgba(252,245,234,0.96)] md:bg-gradient-to-r md:from-[rgba(252,245,234,0.01)] md:via-[rgba(252,245,234,0.12)] md:to-[rgba(252,245,234,0.94)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_45%,transparent_0%,transparent_40%,rgba(42,37,34,0.11)_100%)]" />

      <div className="absolute right-6 top-24 z-10 text-right md:hidden">
        <HeroNames nameOne={t('nameOne')} nameTwo={t('nameTwo')} mobile />
      </div>

      <div className="relative z-10 max-w-xl px-6 py-10 text-center md:px-16 md:py-32 md:text-right">
        <div className="mb-8 hidden md:block">
          <HeroNames nameOne={t('nameOne')} nameTwo={t('nameTwo')} />
        </div>

        <p className="eyebrow mb-4">{t('eyebrow')}</p>

        <div className="mx-auto mb-7 h-px w-20 bg-[rgba(42,37,34,0.22)] md:ml-auto md:mr-0" />

        <p className="serif mb-2 text-2xl tracking-[0.12em] text-[var(--text)] md:text-3xl">
          {t('date')}
        </p>

        <p className="mb-8 text-xs uppercase tracking-[0.16em] text-[var(--text-soft)]">
          {t('location')}
        </p>

        <Button variant="secondary" onClick={scrollToRsvp}>
          {t('cta')}
        </Button>
      </div>
    </section>
  );
}

function HeroNames({
  nameOne,
  nameTwo,
  mobile = false
}: {
  nameOne: string;
  nameTwo: string;
  mobile?: boolean;
}) {
  return (
    <h1
      className={`script leading-[0.88] text-[var(--text)] ${
        mobile ? 'text-6xl' : 'text-8xl lg:text-9xl'
      }`}
    >
      {nameOne}
      <br />
      <span
        className={`ampersand relative -top-1 inline-block text-[var(--brand-500)] ${
          mobile ? 'text-4xl' : 'text-5xl lg:text-6xl'
        }`}
      >
        &
      </span>
      <br />
      {nameTwo}
    </h1>
  );
}