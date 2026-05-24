'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
};

export function Hero() {
  const t = useTranslations('hero');

  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0
  });

  useEffect(() => {
    const weddingDate = new Date('2027-05-15T14:00:00');

    const updateCountdown = () => {
      const now = new Date();
      const diff = weddingDate.getTime() - now.getTime();

      if (diff <= 0) return;

      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);

    return () => clearInterval(interval);
  }, []);

  const scrollToRsvp = () => {
    document.querySelector('#rsvp')?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-end justify-center overflow-hidden md:items-center md:justify-end"
    >
      <div className="absolute inset-0 bg-[url('/images/hero.png')] bg-cover bg-[position:25%_center] bg-no-repeat md:bg-center" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(252,245,234,0.95)] md:bg-gradient-to-r md:from-transparent md:via-[rgba(252,245,234,0.15)] md:to-[rgba(252,245,234,0.96)]" />

      <div className="absolute right-6 top-24 z-10 text-right md:hidden">
        <HeroNames
          nameOne={t('nameOne')}
          nameTwo={t('nameTwo')}
          mobile
        />
      </div>

      <div className="relative z-10 max-w-xl px-6 py-10 text-center md:px-16 md:py-32 md:text-right">
        <div className="mb-6 hidden md:block">
          <HeroNames
            nameOne={t('nameOne')}
            nameTwo={t('nameTwo')}
          />
        </div>

        <p className="eyebrow mb-4">{t('eyebrow')}</p>

        <div className="mx-auto mb-6 h-px w-16 bg-[var(--olive-light)] md:ml-auto md:mr-0" />

        <p className="serif mb-1 text-2xl tracking-[0.08em] text-[var(--text)] md:text-3xl">
          {t('date')}
        </p>

        <p className="mb-10 text-xs uppercase tracking-[0.12em] text-[var(--text-soft)]">
          {t('location')}
        </p>

        <div className="mb-8 flex justify-center gap-6 md:justify-end md:gap-8">
          <CountdownItem value={countdown.days} label={t('days')} />
          <CountdownItem value={countdown.hours} label={t('hours')} />
          <CountdownItem value={countdown.minutes} label={t('minutes')} />
        </div>

        <button onClick={scrollToRsvp} className="btn btn-secondary">
          {t('cta')}
        </button>
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
      className={`script leading-[0.9] text-[var(--text)] ${
        mobile ? 'text-6xl' : 'text-8xl lg:text-9xl'
      }`}
    >
      {nameOne}
      <br />
      <span
        className={`ampersand text-[var(--olive)] ${
          mobile ? 'text-5xl' : 'text-7xl'
        }`}
      >
        &
      </span>
      <br />
      {nameTwo}
    </h1>
  );
}

function CountdownItem({value, label}: {value: number; label: string}) {
  return (
    <div className="text-center">
      <div className="serif text-4xl leading-none text-[var(--text)] md:text-5xl">
        {value}
      </div>
      <div className="mt-2 text-[0.62rem] uppercase tracking-[0.16em] text-[var(--text-soft)]">
        {label}
      </div>
    </div>
  );
}