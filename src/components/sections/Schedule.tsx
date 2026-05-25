import {useTranslations} from 'next-intl';
import {Badge} from '@/components/ui/Badge';
import {SectionHeader} from '@/components/ui/SectionHeader';

type TimelineEvent = {
  time: string;
  title: string;
  description: string;
  tag?: string;
};

type ScheduleDay = {
  label: string;
  title: string;
  events: TimelineEvent[];
};

export function Schedule() {
  const t = useTranslations('schedule');
  const days = t.raw('days') as ScheduleDay[];

  return (
    <section id="schedule" className="section bg-[var(--surface)]">
      <div className="container">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />

        <div className="grid gap-6 lg:grid-cols-2">
          {days.map((day) => (
            <article
              key={day.label}
              className="card rounded-[2rem] p-7 md:p-9"
            >
              <p className="mb-3 text-xs uppercase tracking-[0.18em] text-[var(--olive)]">
                {day.label}
              </p>

              <h3 className="serif mb-8 text-3xl leading-tight text-[var(--text)] md:text-4xl">
                {day.title} 
              </h3>

              <div className="space-y-7">
                {day.events.map((event) => (
                  <div
                    key={`${day.label}-${event.time}-${event.title}`}
                    className="relative border-l border-[rgba(93,103,78,0.22)] pl-6"
                  >
                    <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--olive-light)] ring-4 ring-[var(--surface)]" />

                    <p className="mb-1 text-xs uppercase tracking-[0.16em] text-[var(--olive-dark)]">
                      {event.time}
                    </p>

                    <h4 className="serif mb-1 text-2xl leading-tight text-[var(--text)]">
                      {event.title}
                    </h4>

                    <p className="text-sm leading-7 text-[var(--text-soft)]">
                      {event.description}
                    </p>

                    {event.tag && (
                      <div className="mt-3">
                        <Badge>{event.tag}</Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}