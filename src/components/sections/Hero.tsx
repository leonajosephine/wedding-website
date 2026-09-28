'use client';

import {useTranslations} from 'next-intl';
import {Button} from '@/components/ui/Button';

export function Hero() {
  const t = useTranslations('hero');

  const scrollToRsvp = () => {
    document.querySelector('#rsvp')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-end justify-center overflow-hidden bg-[var(--background)] lg:items-center lg:justify-end"
    >
      {/* Background image */}
      <div className="image-soft absolute inset-0 bg-[url('/images/heroNew.png')] bg-cover bg-[position:25%_center] bg-no-repeat xl:bg-center" />

      {/* Soft image wash */}
      <div className="absolute inset-0 bg-[rgba(252,245,234,0.16)]" />

      {/* Readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(252,245,234,0.03)] via-transparent to-[rgba(252,245,234,0.96)] lg:bg-gradient-to-r lg:from-[rgba(252,245,234,0.01)] lg:via-[rgba(252,245,234,0.12)] lg:to-[rgba(252,245,234,0.94)]" />

      {/* Subtle depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_45%,transparent_0%,transparent_40%,rgba(72,67,63,0.10)_100%)]" />

      {/* Mobile names */}
      <div className="absolute right-6 top-24 z-10 md:right-10 md:top-28 lg:hidden">
        <HeroNames
          nameOne={t('nameOne')}
          nameTwo={t('nameTwo')}
          variant="mobile"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-xl px-6 py-10 text-center md:px-12 md:py-16 lg:w-[520px] lg:px-8 lg:py-20 xl:mr-6 xl:py-28 2xl:mr-10 2xl:py-32">
        <div className="mb-10 hidden lg:block">
          <HeroNames
            nameOne={t('nameOne')}
            nameTwo={t('nameTwo')}
            variant="desktop"
          />
        </div>

        <p className="eyebrow mb-5 lg:text-sm lg:tracking-[0.22em]">
          {t('eyebrow')}
        </p>

        <div className="mx-auto mb-8 h-px w-20 bg-[rgba(72,67,63,0.22)] lg:w-24" />

        <p className="serif mb-3 text-2xl tracking-[0.12em] text-[var(--text)] md:text-3xl lg:text-4xl lg:tracking-[0.14em]">
          {t('date')}
        </p>

        <p className="mb-8 text-xs uppercase tracking-[0.16em] text-[var(--text-soft)] md:text-sm lg:mb-10 lg:text-sm lg:tracking-[0.2em]">
          {t('location')}
        </p>

        <Button
          variant="secondary"
          onClick={scrollToRsvp}
          className="lg:px-7 lg:py-3 lg:text-sm"
        >
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
  const isMobile = variant === 'mobile';

  return (
    <h1
      className={`script flex flex-col items-center text-center leading-[0.82] text-[var(--text)] ${
        isMobile
          ? 'w-[230px] text-6xl md:w-[310px] md:text-8xl'
          : 'mx-auto w-[430px] text-8xl lg:text-9xl'
      }`}
    >
      <span className="block w-full text-center">
        {nameOne}
      </span>

      <span
        className={`block w-full text-center text-[var(--text)] ${
          isMobile
            ? 'my-1 text-5xl md:text-7xl'
            : 'my-1 text-7xl lg:text-8xl'
        }`}
      >
        &
      </span>

      <span className="block w-full text-center">
        {nameTwo}
      </span>
    </h1>
  );
}