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
      className="relative flex min-h-screen items-end justify-center overflow-hidden bg-[var(--background)] lg:items-center lg:justify-end"
    >
      <div className="image-soft absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-[position:25%_center] bg-no-repeat xl:bg-center" />

      <div className="absolute inset-0 bg-[rgba(252,245,234,0.16)]" />

      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(252,245,234,0.03)] via-transparent to-[rgba(252,245,234,0.96)] lg:bg-gradient-to-r lg:from-[rgba(252,245,234,0.01)] lg:via-[rgba(252,245,234,0.12)] lg:to-[rgba(252,245,234,0.94)]" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_45%,transparent_0%,transparent_40%,rgba(42,37,34,0.11)_100%)]" />

      <div className="absolute right-6 top-24 z-10 text-right lg:hidden md:right-10 md:top-28">
        <HeroNames nameOne={t('nameOne')} nameTwo={t('nameTwo')} variant="mobile" />
      </div>

      <div className="relative z-10 max-w-xl px-6 py-10 text-center md:px-12 md:py-16 lg:px-16 lg:py-32 lg:text-right">
        <div className="mb-8 hidden lg:block">
          <HeroNames nameOne={t('nameOne')} nameTwo={t('nameTwo')} variant="desktop" />
        </div>

        <p className="eyebrow mb-4">{t('eyebrow')}</p>

        <div className="mx-auto mb-7 h-px w-20 bg-[rgba(42,37,34,0.22)] lg:ml-auto lg:mr-0" />

        <p className="serif mb-2 text-2xl tracking-[0.12em] text-[var(--text)] md:text-3xl">
          {t('date')}
        </p>

        <p className="mb-8 text-xs uppercase tracking-[0.16em] text-[var(--text-soft)] md:text-sm lg:text-xs">
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
  variant
}: {
  nameOne: string;
  nameTwo: string;
  variant: 'mobile' | 'desktop';
}) {
  return (
    <h1
      className={`script leading-[0.88] text-[var(--text)] ${
        variant === 'mobile'
          ? 'text-6xl md:text-8xl'
          : 'text-8xl lg:text-9xl'
      }`}
    >
      {nameOne}
      <br />
      <span
        className={`ampersand relative -top-1 inline-block text-[var(--brand-500)] ${
          variant === 'mobile'
            ? 'text-4xl md:text-6xl'
            : 'text-5xl lg:text-6xl'
        }`}
      >
        &
      </span>
      <br />
      {nameTwo}
    </h1>
  );
}