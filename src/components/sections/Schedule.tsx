import Image from 'next/image';
import {useTranslations} from 'next-intl';

type TimelineEvent = {
  time: string;
  title: string;
  description: string;
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
    <section id="schedule" className="section relative overflow-hidden bg-[var(--background)]">
      <div className="container-wide relative">
        <div className="mx-auto mb-16 max-w-4xl text-center lg:text-left xl:text-center">
          <p className="eyebrow mb-4">{t('eyebrow')}</p>

          <h2 className="serif text-6xl leading-[0.95] text-[var(--text)] md:text-8xl">
            Unser <span className="script">Tag</span>
            <br />
            im <span className="script">Überblick</span>
          </h2>

          <div className="mx-auto mt-8 h-px w-24 bg-[rgba(42,37,34,0.22)]" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <p className="mb-3 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
              {mainDay.label}
            </p>

            <h3 className="serif text-4xl leading-tight text-[var(--text)] md:text-5xl">
              {mainDay.title} 15. Mai. 2027
            </h3>
          </div>

          {/* Desktop horizontal timeline */}
          <div className="relative hidden desk:block">
            <div className="absolute left-0 right-0 top-[204px] h-px bg-[rgba(42,37,34,0.18)]" />

            <div className="grid grid-cols-4 gap-10">
              {mainDay.events.slice(0, 4).map((event) => (
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

                  <span className="absolute left-1/2 top-[197px] z-10 h-4 w-4 -translate-x-1/2 rounded-full border border-[rgba(42,37,34,0.18)] bg-[var(--background)]" />

                  <div className="pt-8">
                    <p className="serif mb-2 text-2xl leading-none text-[var(--brand-600)]">
                      {event.time}
                    </p>

                    <h4 className="serif mb-3 text-2xl leading-tight text-[var(--text)]">
                      {event.title}
                    </h4>

                    <p className="mx-auto max-w-[250px] text-sm leading-7 text-[var(--text-soft)]">
                      {event.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Mobile / tablet vertical timeline */}
          <div className="relative desk:hidden">
            <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-[rgba(42,37,34,0.16)]" />

            <div className="space-y-12">
              {mainDay.events.slice(0, 4).map((event, index) => {
                const textLeft = index % 2 === 0;

                return (
                  <article
                    key={`${mainDay.label}-${event.time}-${event.title}`}
                    className="relative grid grid-cols-[1fr_32px_1fr] items-center gap-3"
                  >
                    <div className={textLeft ? 'text-right' : 'text-left flex justify-end'}>
                      {textLeft ? (
                        <>
                          <p className="serif mb-2 text-2xl leading-none text-[var(--brand-600)]">
                            {event.time}
                          </p>

                          <h4 className="serif mb-2 text-xl leading-tight text-[var(--text)]">
                            {event.title}
                          </h4>

                          <p className="text-xs leading-6 text-[var(--text-soft)]">
                            {event.description}
                          </p>
                        </>
                      ) : (
                        event.icon && (
                          <Image
                            src={event.icon}
                            alt=""
                            width={180}
                            height={180}
                            className="h-24 w-24 object-contain opacity-95 "
                          />
                        )
                      )}
                    </div>

                    <div className="relative z-10 col-start-2 flex h-full items-center justify-center">
                      <span className="h-3.5 w-3.5 rounded-full border border-[rgba(42,37,34,0.18)] bg-[var(--background)]" />
                    </div>

                    <div className={textLeft ? 'text-left' : 'text-left'}>
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
                          <p className="serif mb-2 text-2xl leading-none text-[var(--brand-600)]">
                            {event.time}
                          </p>

                          <h4 className="serif mb-2 text-xl leading-tight text-[var(--text)]">
                            {event.title}
                          </h4>

                          <p className="text-xs leading-6 text-[var(--text-soft)]">
                            {event.description}
                          </p>
                        </>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {sideDay && (
          <aside className="relative mx-auto mt-16 max-w-xs rotate-[1.5deg] overflow-hidden bg-[var(--brand-400)] p-6 text-[var(--dark-text)] shadow-[0_20px_55px_rgba(42,37,34,0.16)] lg:absolute lg:right-3 lg:top-6 xl:right-8 xl:top-20 lg:mt-0 lg:w-[300px]">
            <Image
              src="/images/paperNew.png"
              alt=""
              fill
              className="pointer-events-none object-cover opacity-[0.40] mix-blend-multiply"
              sizes="800px"
            />

            <div className="pointer-events-none absolute inset-3 border border-[rgba(245,240,231,0.26)]" />

            <div className="relative">
              <p className="mb-3 text-[0.68rem] uppercase tracking-[0.22em] text-[rgba(245,240,231,0.76)]">
                {sideDay.label}
              </p>

              <h3 className="serif mb-5 text-2xl leading-tight text-[var(--dark-text)]">
                {sideDay.title}
              </h3>

              <div className="space-y-4">
                {sideDay.events.slice(0, 3).map((event) => (
                  <div
                    key={`${sideDay.label}-${event.time}-${event.title}`}
                    className="border-t border-[rgba(245,240,231,0.22)] pt-3"
                  >
                    <p className="serif text-xl leading-none text-[var(--dark-text)]">
                      {event.time}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[rgba(245,240,231,0.78)]">
                      {event.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}