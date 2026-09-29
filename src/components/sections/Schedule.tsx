import Image from 'next/image';
import {ExternalLink, MapPin} from 'lucide-react';
import {useTranslations} from 'next-intl';

type TimelineEvent = {
  time: string;
  title: string;
  description: string;
  icon?: string;
  anchor?: string;
  linkLabel?: string;
};

type ScheduleDay = {
  label: string;
  title: string;
  startTime?: string;
  location?: string;
  mapLink?: string;
  events: TimelineEvent[];
};

export function Schedule() {
  const t = useTranslations('schedule');
  const days = t.raw('days') as ScheduleDay[];

  const sideDay = days[0];
  const mainDay = days[1] ?? days[0];

  const mainEvents = mainDay.events.slice(0, 5);

  return (
    <section
      id="schedule"
      className="section relative overflow-hidden bg-[var(--background)]"
    >
      <div className="container-wide relative">
        <div className="mx-auto mb-16 max-w-4xl text-center lg:text-left xl:text-center">
          <p className="eyebrow mb-4">
            {t('eyebrow')}
          </p>

          <h2 className="serif text-6xl leading-[0.95] text-[var(--text)] md:text-8xl">
            {t('headingPartOne')}{' '}
            <span className="script">
              {t('headingScriptOne')}
            </span>

            <br />

            {t('headingPartTwo')}{' '}
            <span className="script">
              {t('headingScriptTwo')}
            </span>
          </h2>

          <div className="mx-auto mt-8 h-px w-24 bg-[rgba(72,67,63,0.22)]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Main wedding date */}
          <div className="mb-10 text-center">
            <p className="serif text-2xl tracking-[0.06em] text-[var(--text)] md:text-3xl">
              {mainDay.label}
            </p>
          </div>

          {/* Desktop horizontal timeline */}
          <div className="relative hidden desk:block">
            <div className="absolute left-0 right-0 top-[204px] h-px bg-[rgba(72,67,63,0.18)]" />

            <div
              className={
                mainEvents.length === 5
                  ? 'grid grid-cols-5 gap-6'
                  : 'grid grid-cols-4 gap-10'
              }
            >
              {mainEvents.map((event) => (
                <article
                  key={`${mainDay.label}-${event.time}-${event.title}`}
                  className="relative pt-2 text-center"
                >
                  <div className="mb-10 flex h-48 items-center justify-center">
                    {event.icon && (
                      <Image
                        src={event.icon}
                        alt=""
                        width={300}
                        height={300}
                        className="h-48 w-48 object-contain opacity-95"
                      />
                    )}
                  </div>

                  <span className="absolute left-1/2 top-[197px] z-10 h-4 w-4 -translate-x-1/2 rounded-full border border-[rgba(72,67,63,0.18)] bg-[var(--background)]" />

                  <div className="pt-8">
                    <p className="serif mb-2 text-xl leading-none text-[var(--brand-600)]">
                      {event.time}
                    </p>

                    <h4 className="script mb-3 text-2xl leading-tight text-[var(--text)]">
                      {event.title}
                    </h4>

                    <p className="mx-auto max-w-[250px] text-sm leading-7 text-[var(--text-soft)]">
                      {event.description}
                    </p>

                    {event.anchor && event.linkLabel && (
                      <EventAnchor
                        anchor={event.anchor}
                        label={event.linkLabel}
                      />
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Mobile / tablet vertical timeline */}
          <div className="relative desk:hidden">
            <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-[rgba(72,67,63,0.16)]" />

            <div className="space-y-12">
              {mainEvents.map((event, index) => {
                const textLeft = index % 2 === 0;

                return (
                  <article
                    key={`${mainDay.label}-${event.time}-${event.title}`}
                    className="relative grid grid-cols-[1fr_32px_1fr] items-center gap-3"
                  >
                    <div
                      className={
                        textLeft
                          ? 'text-right'
                          : 'flex justify-end text-left'
                      }
                    >
                      {textLeft ? (
                        <>
                          <p className="serif mb-2 text-xl leading-none text-[var(--brand-600)]">
                            {event.time}
                          </p>

                          <h4 className="script mb-2 text-2xl leading-tight text-[var(--text)]">
                            {event.title}
                          </h4>

                          <p className="text-xs leading-6 text-[var(--text-soft)]">
                            {event.description}
                          </p>

                          {event.anchor && event.linkLabel && (
                            <EventAnchor
                              anchor={event.anchor}
                              label={event.linkLabel}
                              align="right"
                            />
                          )}
                        </>
                      ) : (
                        event.icon && (
                          <Image
                            src={event.icon}
                            alt=""
                            width={180}
                            height={180}
                            className="h-24 w-24 object-contain opacity-95"
                          />
                        )
                      )}
                    </div>

                    <div className="relative z-10 col-start-2 flex h-full items-center justify-center">
                      <span className="h-3.5 w-3.5 rounded-full border border-[rgba(72,67,63,0.18)] bg-[var(--background)]" />
                    </div>

                    <div className="text-left">
                      {textLeft ? (
                        event.icon && (
                          <Image
                            src={event.icon}
                            alt=""
                            width={180}
                            height={180}
                            className="h-24 w-24 object-contain opacity-95"
                          />
                        )
                      ) : (
                        <>
                          <p className="serif mb-2 text-xl leading-none text-[var(--brand-600)]">
                            {event.time}
                          </p>

                          <h4 className="script mb-2 text-2xl leading-tight text-[var(--text)]">
                            {event.title}
                          </h4>

                          <p className="text-xs leading-6 text-[var(--text-soft)]">
                            {event.description}
                          </p>

                          {event.anchor && event.linkLabel && (
                            <EventAnchor
                              anchor={event.anchor}
                              label={event.linkLabel}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* Polterabend note */}
        {sideDay && (
          <aside className="relative mx-auto mt-16 max-w-xs rotate-[1.5deg] bg-[var(--brand-400)] p-7 text-[var(--dark-text)] shadow-[0_20px_55px_rgba(72,67,63,0.16)] lg:absolute lg:right-3 lg:top-6 lg:mt-0 lg:w-[300px] xl:right-8 xl:top-20">
            <Tape className="-top-4 left-1/2 -translate-x-1/2 rotate-[-4deg]" />

            <Image
              src="/images/paperNew.png"
              alt=""
              fill
              className="pointer-events-none object-cover opacity-[0.40] mix-blend-multiply"
              sizes="300px"
            />

            <div className="pointer-events-none absolute inset-3 border border-[rgba(245,240,231,0.26)]" />

            <div className="relative">
              <h3 className="serif text-3xl leading-tight text-[var(--dark-text)]">
                {sideDay.title}
              </h3>

              <div className="mt-5 border-t border-[rgba(245,240,231,0.24)] pt-5">
                <p className="text-xs uppercase tracking-[0.18em] text-[rgba(245,240,231,0.76)]">
                  {sideDay.label}
                </p>

                {sideDay.startTime && (
                  <p className="serif mt-3 text-2xl text-[var(--dark-text)]">
                    {sideDay.startTime}
                  </p>
                )}

                {sideDay.location && (
                  <div className="mt-5">
                    {sideDay.mapLink ? (
                      <a
                        href={sideDay.mapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-start gap-2 text-sm leading-6 text-[rgba(245,240,231,0.9)] transition hover:text-[var(--dark-text)]"
                      >
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />

                        <span className="border-b border-[rgba(245,240,231,0.35)] pb-0.5">
                          {sideDay.location}
                        </span>

                        <ExternalLink className="mt-1 h-3 w-3 shrink-0 opacity-65 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    ) : (
                      <div className="flex items-start gap-2 text-sm leading-6 text-[rgba(245,240,231,0.9)]">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{sideDay.location}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}

function EventAnchor({
  anchor,
  label,
  align = 'left'
}: {
  anchor: string;
  label: string;
  align?: 'left' | 'right';
}) {
  return (
    <a
      href={anchor}
      className={`mt-3 inline-flex items-center gap-1.5 border-b border-[rgba(72,67,63,0.25)] pb-0.5 text-[0.62rem] uppercase tracking-[0.14em] text-[var(--brand-600)] transition hover:border-[var(--brand-600)] ${
        align === 'right' ? 'flex-row-reverse' : ''
      }`}
    >
      <MapPin className="h-3 w-3 shrink-0" />
      {label}
    </a>
  );
}

function Tape({className = ''}: {className?: string}) {
  return (
    <div
      className={`pointer-events-none absolute z-30 h-8 w-28 bg-[rgba(238,225,204,0.76)] shadow-sm backdrop-blur-[1px] ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]" />
    </div>
  );
}