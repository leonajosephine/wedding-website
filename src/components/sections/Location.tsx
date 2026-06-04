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
    <section
      id="location"
      className="section relative overflow-visible bg-[var(--background)]"
    >
      <Image
        src="/images/decor/eucalyptus2.png"
        alt=""
        width={1600}
        height={800}
        className="pointer-events-none absolute md:-left-32 md:-top-60 z-0 hidden rotate-[20deg] opacity-55 mix-blend-multiply md:block lg:-left-12 lg:-top-120"
      />

      <div className="container relative z-10">
        <div className="mb-14 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <div>
            <p className="eyebrow mb-4">{t('eyebrow')}</p>

            <h2 className="serif text-5xl uppercase leading-[0.95] tracking-[0.12em] text-[var(--text)] md:text-6xl">
              {t('title')}
            </h2>

            <div className="mt-7 h-px w-20 bg-[rgba(42,37,34,0.22)]" />
          </div>

          <p className="max-w-xl text-sm leading-8 text-[var(--text-soft)] md:justify-self-end">
            {t('venue.description')}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-sm border border-[rgba(42,37,34,0.10)] bg-[rgba(255,250,242,0.72)] p-5 shadow-[var(--shadow-paper)] md:p-7">
          <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-2 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--text-muted)]">
                {t('eyebrow')}
              </p>

              <h3 className="serif text-4xl leading-tight text-[var(--text)] md:text-5xl">
                {t('venue.name')}
              </h3>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-[var(--text-soft)]">
                {t('venue.address')}
              </p>
            </div>

            <a
              href={t('venue.mapLink')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-b border-[rgba(42,37,34,0.25)] pb-1 text-xs uppercase tracking-[0.16em] text-[var(--text)] transition hover:opacity-65"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {t('venue.mapCta')}
            </a>
          </div>

          <a
            href={t('venue.mapLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block h-[260px] overflow-hidden rounded-sm border border-[rgba(42,37,34,0.10)] sm:h-[320px] md:h-[420px]"
          >
            <Image
              src="/images/location.png"
              alt=""
              fill
              className="object-cover opacity-90 transition grayscale-15 duration-700 group-hover:scale-[1.03]"
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-[rgba(252,245,234,0.10)]" />

            <div className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(255,250,242,0.84)] shadow-[var(--shadow-soft)] backdrop-blur-sm md:right-6 md:top-6 md:h-14 md:w-14">
              <MapPin className="h-6 w-6 text-[var(--brand-600)] md:h-7 md:w-7" />
            </div>
          </a>

          <div className="mt-5 grid gap-3 border-t border-[rgba(42,37,34,0.10)] pt-5 text-sm leading-7 text-[var(--text-soft)] md:grid-cols-2">
            <p className="flex gap-3">
              <Car className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
              <span>{t('info.parking')}</span>
            </p>

            <p className="flex gap-3">
              <Accessibility className="mt-1 h-4 w-4 shrink-0 text-[var(--text-muted)]" />
              <span>{t('info.accessibility')}</span>
            </p>
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <h3 className="serif text-3xl text-[var(--text)]">
              {t('stay.title')}
            </h3>

            <p className="max-w-md text-sm leading-7 text-[var(--text-soft)] md:text-right">
              {t('stay.description')}
            </p>
          </div>

          <div className="hide-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
            {accommodations.map((item, index) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group min-w-[78vw] snap-center rounded-sm border border-[rgba(42,37,34,0.09)] bg-[rgba(255,250,242,0.52)] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(42,37,34,0.22)] md:min-w-0"
              >
                <div className="relative mb-4 h-40 overflow-hidden rounded-sm">
                  <Image
                    src={`/images/accommodations/${index + 1}.png`}
                    alt={item.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03] grayscale-25"
                    sizes="(max-width: 768px) 78vw, 360px"
                  />

                  <div className="absolute inset-0 bg-[rgba(252,245,234,0.08)]" />
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h4 className="serif text-xl text-[var(--text)]">
                      {item.name}
                    </h4>

                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text-muted)]">
                      {item.distance}
                    </p>
                  </div>

                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-[var(--text-soft)] transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>

                <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}