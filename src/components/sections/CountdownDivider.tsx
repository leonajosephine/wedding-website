'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function CountdownDivider() {
  const t = useTranslations('countdown');

  const [countdown, setCountdown] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
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
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[var(--brand-400)] px-6 py-18 text-[var(--dark-text)] md:py-28">
      <div className="container">
        <div className="grid items-center gap-8 md:grid-cols-[0.9fr_1.6fr]">
          <div>
            <p className="hand text-3xl leading-none text-[rgba(245,240,231,0.86)] md:text-4xl">
              countdown to the big day
            </p>
            <p className="mt-2 max-w-xs text-xs uppercase tracking-[0.22em] text-[rgba(245,240,231,0.78)]">
              the 15th of may, 2027
            </p>
          </div>

          <div className="grid grid-cols-4 divide-x divide-[rgba(245,240,231,0.25)]">
            <CountdownItem value={countdown.days} label={"days"} />
            <CountdownItem value={countdown.hours} label={"hours"} />
            <CountdownItem value={countdown.minutes} label={"minutes"} />
            <CountdownItem value={countdown.seconds} label={"seconds"} />
          </div>
        </div>
      </div>
    </section>
  );
}

function CountdownItem({value, label}: {value: number; label: string}) {
  return (
    <div className="px-3 text-center md:px-8">
      <div className="serif text-4xl leading-none text-[var(--dark-text)] md:text-6xl lg:text-7xl">
        {String(value).padStart(2, '0')}
      </div>

      <div className="mt-2 text-[0.58rem] uppercase tracking-[0.2em] text-[rgba(245,240,231,0.72)] md:text-[0.65rem]">
        {label}
      </div>
    </div>
  );
}