import {ExternalLink, MapPin, Hotel, Car, Accessibility} from 'lucide-react';
import {useTranslations} from 'next-intl';
import {SectionHeader} from '@/components/ui/SectionHeader';

type Accommodation = {
  name: string;
  distance: string;
  description: string;
  link: string;
};

export function Location() {
  const t = useTranslations('location');
  const accommodations = t.raw('accommodations') as Accommodation[];

  return (
    <section id="location" className="section bg-[var(--surface)]">
      <div className="container">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="card overflow-hidden rounded-[2rem] p-7 md:p-9">
            <div className="mb-6 flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 text-[var(--olive-dark)]" />
              <div>
                <h3 className="serif text-3xl text-[var(--text)]">
                  {t('venue.name')}
                </h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[var(--text-soft)]">
                  {t('venue.address')}
                </p>
              </div>
            </div>

            <div className="mb-6 flex h-64 items-center justify-center rounded-[1.4rem] border border-[var(--border)] bg-gradient-to-br from-[rgba(173,169,142,0.35)] to-[rgba(252,245,234,0.9)]">
              <MapPin className="h-10 w-10 text-[var(--olive-dark)]" />
            </div>

            <p className="mb-6 text-sm leading-7 text-[var(--text-soft)]">
              {t('venue.description')}
            </p>

            <a
              href={t('venue.mapLink')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-[rgba(93,103,78,0.35)] pb-1 text-xs uppercase tracking-[0.14em] text-[var(--olive-dark)] transition-colors hover:text-[var(--black)]"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {t('venue.mapCta')}
            </a>
          </article>

          <article className="card rounded-[2rem] p-7 md:p-9">
            <div className="mb-6 flex items-start gap-3">
              <Hotel className="mt-1 h-5 w-5 text-[var(--olive-dark)]" />
              <div>
                <h3 className="serif text-3xl text-[var(--text)]">
                  {t('stay.title')}
                </h3>
                <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                  {t('stay.description')}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {accommodations.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-[1.2rem] border border-[var(--border)] bg-[rgba(252,245,234,0.45)] p-4 transition hover:-translate-y-0.5 hover:border-[rgba(93,103,78,0.35)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="serif text-xl text-[var(--text)]">
                        {item.name}
                      </h4>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--olive)]">
                        {item.distance}
                      </p>
                    </div>
                    <ExternalLink className="mt-1 h-4 w-4 text-[var(--olive-dark)]" />
                  </div>

                  <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                    {item.description}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-6 grid gap-3 text-sm text-[var(--text-soft)]">
              <p className="flex gap-3">
                <Car className="mt-0.5 h-4 w-4 shrink-0 text-[var(--olive-dark)]" />
                <span>{t('info.parking')}</span>
              </p>

              <p className="flex gap-3">
                <Accessibility className="mt-0.5 h-4 w-4 shrink-0 text-[var(--olive-dark)]" />
                <span>{t('info.accessibility')}</span>
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}