import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Badge} from '@/components/ui/Badge';

type TimelineEvent = {
  time: string;
  title: string;
  description: string;
  tag?: string;
  icon?: string;
};

type ScheduleDay = {
  label: string;
  title: string;
  events: TimelineEvent[];
};

export function Schedule() {
  const t = useTranslations('schedule');
  const days = t.raw('days') as ScheduleDay[];

  const sideDay = days[0];
  const mainDay = days[1] ?? days[0];

  return (
    <section id="schedule" className="section relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/schedule-bg.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.30] saturate-[0.65] contrast-[0.9]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[rgba(83,99,75,0.90)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,18,16,0.08),rgba(20,18,16,0.20))]" />
      </div>

      <div className="container relative z-10">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow mb-4 text-[var(--dark-text-soft)]">
            {t('eyebrow')}
          </p>

          <h2 className="serif text-5xl leading-[0.95] tracking-[0.12em] text-[var(--dark-text)] md:text-7xl">
            Unsere <span className="script tracking-normal">Planung </span>für <span className="script tracking-normal">die</span> Woche
          </h2>

          <div className="mt-8 h-px w-24 bg-[rgba(245,240,231,0.32)]" />
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[0.34fr_0.66fr]">
          {sideDay && (
            <aside className="relative border  rounded-sm border-[rgba(255,250,242,0.38)] bg-[rgba(255,248,240,0.82)] p-7 text-[var(--text)] shadow-[0_22px_70px_rgba(20,18,16,0.16)] backdrop-blur-md before:pointer-events-none before:absolute before:inset-[12px] before:border before:border-[rgba(42,37,34,0.06)] before:content-['']">
              <div className="relative">
                <p className="mb-3 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                  {sideDay.label}
                </p>

                <h3 className="serif mb-6 text-3xl leading-tight text-[var(--text)]">
                  {sideDay.title}
                </h3>

                <div className="space-y-5">
                  {sideDay.events.slice(0, 3).map((event) => (
                    <div
                      key={`${sideDay.label}-${event.time}-${event.title}`}
                      className="border-t border-[rgba(42,37,34,0.10)] pt-4"
                    >
                      <p className="mb-1 text-[0.65rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        {event.time}
                      </p>
                      <h4 className="serif text-xl leading-tight text-[var(--text)]">
                        {event.title}
                      </h4>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
                        {event.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          )}

          <article className="relative overflow-hidden border rounded-sm border-[rgba(255,250,242,0.42)] bg-[rgba(255,248,240,0.90)] p-8 text-[var(--text)] shadow-[0_26px_90px_rgba(20,18,16,0.20)] backdrop-blur-md before:pointer-events-none before:absolute before:inset-[14px] before:border before:border-[rgba(42,37,34,0.07)] before:content-[''] md:p-12">
            <Image
              src="/images/paperNew.png"
              alt=""
              fill
              className="pointer-events-none object-cover opacity-[0.25] mix-blend-multiply"
              sizes="1400px"
            />

            <div className="relative">
              <div className="mb-10 flex items-start justify-between gap-8 border-b border-[rgba(42,37,34,0.10)] pb-7">
                <div>
                  <p className="mb-3 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                    {mainDay.label}
                  </p>

                  <h3 className="serif text-4xl leading-tight text-[var(--text)] md:text-5xl">
                    {mainDay.title}
                  </h3>
                </div>

                <span className="script hidden text-6xl leading-none text-[rgba(42,37,34,0.18)] md:block">
                  M&L
                </span>
              </div>

              <div className="space-y-3">
                {mainDay.events.map((event, index) => (
                  <div
                    key={`${mainDay.label}-${event.time}-${event.title}`}
                    className={`grid gap-6 border-b border-[rgba(42,37,34,0.08)] py-7 last:border-b-0 md:grid-cols-[150px_1fr] ${
                      index % 2 === 1 ? 'md:pl-10' : ''
                    }`}
                  >
                    <div className="flex items-center justify-start md:justify-center">
                      {event.icon ? (
                        <Image
                          src={event.icon}
                          alt=""
                          width={180}
                          height={180}
                          className="h-28 w-28 object-contain opacity-90 md:h-36 md:w-36"
                        />
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-[var(--brand-400)]" />
                      )}
                    </div>

                    <div>
                      <p className="mb-2 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                        {event.time}
                      </p>

                      <h4 className="serif mb-2 text-2xl leading-tight text-[var(--text)] md:text-3xl">
                        {event.title}
                      </h4>

                      <p className="max-w-xl text-sm leading-7 text-[var(--text-soft)]">
                        {event.description}
                      </p>

                      {event.tag && (
                        <div className="mt-3">
                          <Badge variant="brand">{event.tag}</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}