import Image from 'next/image';
import {ExternalLink, MapPin, Car, Accessibility} from 'lucide-react';
import {useTranslations} from 'next-intl';

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
    <section id="location" className="section bg-[var(--background)]">
      <div className="container">
        <div className="mb-10 text-center">
          <p className="eyebrow mb-4">{t('eyebrow')}</p>

          <h2 className="serif text-5xl uppercase leading-[0.95] tracking-[0.12em] text-[var(--text)] md:text-6xl">
            {t('title')}
          </h2>

          <div className="mx-auto mt-7 h-px w-20 bg-[rgba(42,37,34,0.22)]" />
        </div>

        <div className="overflow-hidden rounded-sm border border-[rgba(42,37,34,0.10)] bg-[rgba(255,250,242,0.72)] shadow-[var(--shadow-paper)]">
          <div className="grid desk:grid-cols-[0.9fr_1.1fr]">
            <a
              href={t('venue.mapLink')}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-[240px] overflow-hidden border-b border-[rgba(42,37,34,0.10)] desk:h-auto desk:min-h-[390px] desk:border-b-0 desk:border-r"
            >
              <Image
                src="/images/location.png"
                alt=""
                fill
                className="object-cover opacity-90 grayscale-15 transition duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 950px) 100vw, 50vw"
              />

              <div className="absolute inset-0 bg-[rgba(252,245,234,0.10)]" />

              <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,250,242,0.9)] shadow-[var(--shadow-soft)] backdrop-blur-sm md:h-18 md:w-18">
                <MapPin className="h-8 w-8 text-[var(--brand-600)] md:h-9 md:w-9" />
              </div>
            </a>

            <div className="p-5 sm:p-7 desk:p-8">
              <div className="mb-6">
                <h3 className="serif text-4xl leading-tight text-[var(--text)] md:text-5xl">
                  {t('venue.name')}
                </h3>

                <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--text-soft)]">
                  {t('venue.address')}
                </p>

                <a
                  href={t('venue.mapLink')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 border-b border-[rgba(42,37,34,0.25)] pb-1 text-xs uppercase tracking-[0.16em] text-[var(--text)] transition hover:opacity-65"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {t('venue.mapCta')}
                </a>
              </div>

              <p className="mb-6 max-w-xl text-sm leading-7 text-[var(--text-soft)]">
                {t('venue.description')}
              </p>

              <div className="mb-6 grid gap-3 border-y border-[rgba(42,37,34,0.10)] py-5 text-sm leading-6 text-[var(--text-soft)] md:grid-cols-2">
                <p className="flex gap-3">
                  <Car className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                  <span>{t('info.parking')}</span>
                </p>

                <p className="flex gap-3">
                  <Accessibility className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
                  <span>{t('info.accessibility')}</span>
                </p>
              </div>

              <div>
                <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <h4 className="serif text-2xl text-[var(--text)]">
                    {t('stay.title')}
                  </h4>

                  <p className="max-w-sm text-xs leading-5 text-[var(--text-soft)] sm:text-right">
                    {t('stay.description')}
                  </p>
                </div>

                <div className="hide-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-7 sm:px-7 desk:mx-0 desk:grid desk:grid-cols-3 desk:overflow-visible desk:px-0 desk:pb-0">
                  {accommodations.slice(0, 3).map((item, index) => (
                    <a
                      key={item.name}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group min-w-[38vw] snap-center rounded-sm border border-[rgba(42,37,34,0.09)] bg-[rgba(255,250,242,0.54)] p-2.5 transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(42,37,34,0.22)] sm:min-w-[12vw] desk:min-w-0"
                    >
                      <div className="relative mb-2.5 h-22 overflow-hidden rounded-sm md:h-24 desk:h-22">
                        <Image
                          src={`/images/accommodations/${index + 1}.png`}
                          alt={item.name}
                          fill
                          className="object-cover grayscale-25 transition duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 950px) 64vw, 180px"
                        />

                        <div className="absolute inset-0 bg-[rgba(252,245,234,0.08)]" />
                      </div>

                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h5 className="serif text-base leading-tight text-[var(--text)] md:text-lg">
                            {item.name}
                          </h5>

                          <p className="mt-1 text-[0.54rem] uppercase tracking-[0.12em] text-[var(--text-muted)]">
                            {item.distance}
                          </p>
                        </div>

                        <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--text-soft)] transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>

                      <p className="mt-2 text-xs leading-5 text-[var(--text-soft)]">
                        {item.description}
                      </p>
                    </a>
                  ))}
                </div>

                <div className="mt-5 flex justify-center desk:justify-end">
                  <a
                    href={t('stay.moreLink')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-b border-[rgba(42,37,34,0.25)] pb-1 text-xs uppercase tracking-[0.16em] text-[var(--text)] transition hover:opacity-65"
                  >
                    {t('stay.moreCta')}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}