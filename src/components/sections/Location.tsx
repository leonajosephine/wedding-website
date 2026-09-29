import Image from 'next/image';
import {
  Accessibility,
  BedDouble,
  Car,
  ExternalLink,
  MapPin
} from 'lucide-react';
import {useTranslations} from 'next-intl';

type Accommodation = {
  name: string;
  distance: string;
  description: string;
  link: string;
  price?: string;
  reservationNote?: string;
};

export function Location() {
  const t = useTranslations('location');
  const accommodations = t.raw('accommodations') as Accommodation[];

  const featuredAccommodation = accommodations[0];
  const otherAccommodation = accommodations[1];

  return (
    <section
      id="location"
      className="relative overflow-hidden bg-[var(--brand-400)] px-3 py-5 sm:px-4 sm:py-6 lg:px-5 lg:py-7"
    >
      {/* Decorative eucalyptus */}
      <Image
        src="/images/decor/eucalyptus2.png"
        alt=""
        width={1400}
        height={1400}
        className="pointer-events-none absolute -left-[190px] top-[2%] z-0 w-[520px] rotate-[18deg] opacity-[0.07] sm:-left-[220px] sm:w-[650px] md:-left-[280px] md:top-[1%] md:w-[850px] md:opacity-[0.09] xl:-left-[330px] xl:w-[1050px]"
      />

      <Image
        src="/images/decor/eucalyptus2.png"
        alt=""
        width={1400}
        height={1400}
        className="pointer-events-none absolute -right-[210px] bottom-[3%] z-0 w-[560px] rotate-[198deg] opacity-[0.07] sm:-right-[250px] sm:w-[700px] md:-right-[300px] md:w-[900px] md:opacity-[0.09] xl:-right-[340px] xl:w-[1100px]"
      />

      {/* Full-width stationery frame */}
      <div className="relative z-10 w-full border border-[rgba(245,240,231,0.42)] px-4 py-16 sm:px-7 md:px-10 md:py-20 lg:px-12 lg:py-24 xl:px-16">
        {/* Heading */}
        <div className="relative z-10 mx-auto mb-12 max-w-4xl text-center md:mb-14">
          <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[rgba(245,240,231,0.78)]">
            {t('eyebrow')}
          </p>

          <h2 className="serif text-5xl uppercase leading-[0.95] tracking-[0.12em] text-[var(--dark-text)] md:text-6xl lg:text-7xl">
            {t('title')}
          </h2>

          <div className="mx-auto mt-7 h-px w-20 bg-[rgba(245,240,231,0.42)]" />
        </div>

        {/* Venue */}
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="overflow-hidden border border-[rgba(245,240,231,0.24)] bg-[rgba(255,250,242,0.94)] shadow-[0_22px_60px_rgba(72,67,63,0.11)]">
            <div className="grid desk:grid-cols-[1fr_1fr]">
              {/* Map as large Polaroid */}
              <div className="flex items-center justify-center border-b border-[var(--border-soft)] bg-[rgba(245,239,229,0.48)] p-4 sm:p-5 desk:min-h-[440px] desk:border-b-0 desk:border-r desk:p-5 lg:min-h-[470px] lg:p-6">
                <a
                  href={t('venue.mapLink')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-full rotate-[-1deg] bg-[var(--surface)] p-3 pb-10 shadow-[0_18px_45px_rgba(72,67,63,0.15)] transition duration-500 hover:rotate-0 hover:scale-[1.01] sm:p-3.5 sm:pb-11"
                >
                  <Tape className="-top-5 left-1/2 -translate-x-1/2 rotate-[-3deg]" />

                  <div className="relative aspect-[1.28/1] w-full overflow-hidden bg-[var(--background-soft)]">
                    <Image
                      src="/images/location.png"
                      alt=""
                      fill
                      className="object-cover opacity-90 grayscale-[15%] transition duration-700 group-hover:scale-[1.025]"
                      sizes="(max-width: 900px) 90vw, 560px"
                    />

                    <div className="absolute inset-0 bg-[rgba(252,245,234,0.06)]" />

                    <div className="absolute left-1/2 top-1/2 flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,250,242,0.94)] shadow-[var(--shadow-soft)] backdrop-blur-sm md:h-[72px] md:w-[72px]">
                      <MapPin className="h-8 w-8 text-[var(--brand-600)]" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 flex h-10 items-center justify-center sm:h-11">
                    <span className="hand rotate-[-1deg] text-xl tracking-[0.04em] text-[var(--text-soft)] sm:text-2xl">
                      Tornesch
                    </span>
                  </div>
                </a>
              </div>

              {/* Venue content */}
              <div className="flex flex-col justify-center p-6 sm:p-8 desk:p-10 lg:p-12">
                <h3 className="serif text-4xl leading-tight text-[var(--text)] md:text-5xl">
                  {t('venue.name')}
                </h3>

                <div className="mt-5 flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--brand-600)]" />

                  <p className="whitespace-pre-line text-sm leading-7 text-[var(--text-soft)] md:text-base">
                    {t('venue.address')}
                  </p>
                </div>

                <a
                  href={t('venue.mapLink')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-2 border-b border-[rgba(72,67,63,0.24)] pb-1 text-[0.65rem] uppercase tracking-[0.16em] text-[var(--text)] transition hover:opacity-60"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {t('venue.mapCta')}
                </a>

                <div className="my-7 h-px w-full bg-[var(--border-soft)]" />

                <p className="max-w-xl text-sm leading-7 text-[var(--text-soft)] md:text-base md:leading-8">
                  {t('venue.description')}
                </p>

                <div className="mt-7 grid gap-5 border-t border-[var(--border-soft)] pt-6 text-sm leading-6 text-[var(--text-soft)] md:grid-cols-2">
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
            </div>
          </div>
        </div>

        {/* Accommodation heading */}
        <div className="relative z-10 mx-auto mb-9 mt-16 max-w-2xl text-center md:mt-20">
          <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.24em] text-[rgba(245,240,231,0.72)]">
            {t('stay.eyebrow')}
          </p>

          <h3 className="serif text-4xl text-[var(--dark-text)] md:text-5xl">
            {t('stay.title')}
          </h3>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[rgba(245,240,231,0.78)] md:text-base">
            {t('stay.description')}
          </p>
        </div>

        {/* Accommodations */}
        <div className="relative z-10 mx-auto grid max-w-6xl gap-4 lg:grid-cols-[1.18fr_0.82fr]">
          {/* Featured hotel */}
          {featuredAccommodation && (
            <a
              href={featuredAccommodation.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative grid overflow-visible border border-[rgba(245,240,231,0.22)] bg-[rgba(255,250,242,0.94)] shadow-[0_18px_45px_rgba(72,67,63,0.10)] transition duration-300 hover:-translate-y-1 md:grid-cols-[0.92fr_1.08fr] lg:h-full"
            >
              {/* Featured hotel image / Polaroid frame */}
              <div className="flex min-h-[280px] items-center justify-center bg-[rgba(245,239,229,0.48)] p-4 sm:p-5 md:min-h-[350px] lg:min-h-full lg:p-6">
                <div className="relative h-full min-h-[245px] w-full rotate-[-0.8deg] bg-[var(--surface)] p-2.5 pb-8 shadow-[0_12px_30px_rgba(72,67,63,0.12)] transition duration-500 group-hover:rotate-0 sm:p-3 sm:pb-9 md:min-h-[310px]">
                  <div className="relative h-full min-h-[205px] w-full overflow-hidden md:min-h-[270px]">
                    <Image
                      src="/images/accommodations/1.png"
                      alt={featuredAccommodation.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-[1.025]"
                      sizes="(max-width: 768px) 100vw, 35vw"
                    />
                  </div>
                </div>
              </div>

              {/* Featured hotel content */}
              <div className="flex min-w-0 flex-col justify-center p-6 sm:p-7 lg:p-8">
                {featuredAccommodation.reservationNote && (
                  <p className="mb-4 w-fit bg-[rgba(162,172,161,0.22)] px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-[var(--brand-600)]">
                    {featuredAccommodation.reservationNote}
                  </p>
                )}

                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h4 className="serif text-3xl leading-tight text-[var(--text)] md:text-4xl">
                      {featuredAccommodation.name}
                    </h4>

                    <p className="mt-2 text-[0.6rem] uppercase tracking-[0.15em] text-[var(--text-muted)]">
                      {featuredAccommodation.distance}
                    </p>
                  </div>

                  <ExternalLink className="mt-2 h-4 w-4 shrink-0 text-[var(--text-soft)] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>

                <p className="mt-5 text-sm leading-7 text-[var(--text-soft)] md:text-base">
                  {featuredAccommodation.description}
                </p>

                {featuredAccommodation.price && (
                  <div className="mt-6 border-t border-[var(--border-soft)] pt-5">
                    <p className="text-[0.58rem] uppercase tracking-[0.18em] text-[var(--text-muted)]">
                      {t('stay.priceLabel')}
                    </p>

                    <p className="serif mt-1 text-2xl text-[var(--text)]">
                      {featuredAccommodation.price}
                    </p>
                  </div>
                )}
              </div>
            </a>
          )}

          {/* Right accommodation column */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
            {/* Secondary hotel */}
            {otherAccommodation && (
              <a
                href={otherAccommodation.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid min-h-[190px] grid-cols-[130px_1fr] overflow-hidden border border-[rgba(245,240,231,0.22)] bg-[rgba(255,250,242,0.94)] transition duration-300 hover:-translate-y-0.5 sm:grid-cols-1 lg:grid-cols-[175px_1fr]"
              >
                {/* Secondary hotel image */}
                <div className="flex min-h-[170px] items-center justify-center bg-[rgba(245,239,229,0.48)] p-3 lg:min-h-full lg:p-4">
                  <div className="relative h-full min-h-[145px] w-full rotate-[0.8deg] bg-[var(--surface)] p-2 pb-5 shadow-[0_10px_24px_rgba(72,67,63,0.11)] transition duration-500 group-hover:rotate-0 lg:min-h-[155px]">
                    <div className="relative h-full min-h-[120px] w-full overflow-hidden lg:min-h-[130px]">
                      <Image
                        src="/images/accommodations/2.png"
                        alt={otherAccommodation.name}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="175px"
                      />
                    </div>
                  </div>
                </div>

                {/* Secondary hotel content */}
                <div className="flex min-w-0 flex-col justify-center p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="serif text-2xl leading-tight text-[var(--text)]">
                      {otherAccommodation.name}
                    </h4>

                    <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--text-soft)] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>

                  <p className="mt-2 text-[0.56rem] uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    {otherAccommodation.distance}
                  </p>

                  <p className="mt-3 text-xs leading-5 text-[var(--text-soft)] md:text-sm md:leading-6">
                    {otherAccommodation.description}
                  </p>
                </div>
              </a>
            )}

            {/* Booking */}
            <a
              href={t('stay.moreLink')}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex min-h-[190px] items-center justify-between gap-6 border border-[rgba(245,240,231,0.32)] bg-[rgba(83,99,75,0.20)] p-6 text-[var(--dark-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[rgba(83,99,75,0.28)] md:p-7"
            >
              <div>
                <BedDouble className="mb-4 h-6 w-6 text-[rgba(245,240,231,0.82)]" />

                <h4 className="serif text-2xl md:text-3xl">
                  {t('stay.moreTitle')}
                </h4>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[rgba(245,240,231,0.76)]">
                  {t('stay.moreDescription')}
                </p>
              </div>

              <ExternalLink className="h-5 w-5 shrink-0 text-[rgba(245,240,231,0.82)] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
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