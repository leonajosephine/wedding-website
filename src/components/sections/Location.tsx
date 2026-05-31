import Image from 'next/image';
import {
  ExternalLink,
  MapPin,
  Car,
  Accessibility
} from 'lucide-react';
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
    <section id="location" className="section bg-[var(--background)] relative">
      {/* decorative floral */}
      <Image
        src="/images/decor/eucalyptus2.png"
        alt=""
        width={1600}
        height={800}
        className="pointer-events-none absolute left-0.5 -top-120 opacity-75 rotate-20"
      />

      <div className="container">
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

        {/* VENUE */}
        <div className="relative overflow-hidden rounded-sm border border-[rgba(42,37,34,0.10)] bg-[rgba(255,250,242,0.72)] p-5 shadow-[var(--shadow-paper)] md:p-7">
          {/* top info */}
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

          {/* image */}
          <a
            href={t('venue.mapLink')}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block h-[420px] overflow-hidden rounded-sm border border-[rgba(42,37,34,0.10)]"
          >
            <Image
              src="/images/location.png"
              alt=""
              fill
              className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.03]"
              sizes="100vw"
            />

            <div className="absolute inset-0 bg-[rgba(252,245,234,0.10)]" />

            <div className="absolute right-6 top-6 flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(255,250,242,0.84)] shadow-[var(--shadow-soft)] backdrop-blur-sm">
              <MapPin className="h-7 w-7 text-[var(--brand-600)]" />
            </div>
          </a>

          {/* footer info */}
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

        {/* STAY */}
        <div className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-6">
            <h3 className="serif text-3xl text-[var(--text)]">
              {t('stay.title')}
            </h3>

            <p className="hidden max-w-md text-right text-sm leading-7 text-[var(--text-soft)] md:block">
              {t('stay.description')}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {accommodations.map((item, index) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-sm border border-[rgba(42,37,34,0.09)] bg-[rgba(255,250,242,0.52)] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[rgba(42,37,34,0.22)]"
              >
                <div className="relative mb-4 h-40 overflow-hidden rounded-sm">
                  <Image
                    src={`/images/accommodations/${index + 1}.png`}
                    alt={item.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 360px"
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