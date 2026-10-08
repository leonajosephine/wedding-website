import Image from 'next/image';
import {
  BedDouble,
  ExternalLink,
  MapPin,
  ParkingCircle,
  Train
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

      {/* Stationery frame */}
      <div className="relative z-10 w-full border border-[rgba(245,240,231,0.42)] px-4 py-12 sm:px-7 sm:py-16 md:px-10 md:py-20 lg:px-12 lg:py-24 xl:px-16">
        {/* Heading */}
        <div className="mx-auto mb-9 max-w-4xl text-center sm:mb-12 md:mb-14">
          <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.26em] text-[rgba(255,250,242,0.92)] sm:mb-4">
            {t('eyebrow')}
          </p>

          <h2 className="serif text-4xl uppercase leading-[0.95] tracking-[0.1em] text-[var(--surface)] sm:text-5xl sm:tracking-[0.12em] md:text-6xl lg:text-7xl">
            {t('title')}
          </h2>

          <div className="mx-auto mt-6 h-px w-16 bg-[rgba(255,250,242,0.55)] sm:mt-7 sm:w-20" />
        </div>

        {/* Venue */}
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden border border-[rgba(245,240,231,0.24)] bg-[rgba(255,250,242,0.96)] shadow-[0_22px_60px_rgba(72,67,63,0.11)]">
            <div className="grid desk:grid-cols-[1fr_1fr]">
              {/* Map */}
              <div className="flex items-center justify-center border-b border-[var(--border-soft)] bg-[rgba(245,239,229,0.48)] p-3 sm:p-5 desk:min-h-[440px] desk:border-b-0 desk:border-r desk:p-5 lg:min-h-[470px] lg:p-6">
                <a
                  href={t('venue.mapLink')}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('venue.mapCta')}
                  className="group relative block w-full rotate-[-1deg] bg-[var(--surface)] p-2.5 pb-8 shadow-[0_18px_45px_rgba(72,67,63,0.15)] transition duration-500 hover:rotate-0 hover:scale-[1.01] sm:p-3.5 sm:pb-11"
                >
                  <Tape className="-top-4 left-1/2 -translate-x-1/2 rotate-[-3deg] sm:-top-5" />

                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--background-soft)] sm:aspect-[1.28/1]">
                    <Image
                      src="/images/location.png"
                      alt=""
                      fill
                      className="object-cover opacity-90 grayscale-[10%] transition duration-700 group-hover:scale-[1.025]"
                      sizes="(max-width: 900px) 90vw, 560px"
                    />

                    <div className="absolute inset-0 bg-[rgba(252,245,234,0.06)]" />

                    <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(255,250,242,0.94)] shadow-[var(--shadow-soft)] backdrop-blur-sm sm:h-[64px] sm:w-[64px] md:h-[72px] md:w-[72px]">
                      <MapPin className="h-6 w-6 text-[var(--brand-600)] sm:h-8 sm:w-8" />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 flex h-8 items-center justify-center sm:h-11">
                    <span className="hand rotate-[-1deg] text-lg tracking-[0.04em] text-[var(--text-soft)] sm:text-2xl">
                      Tornesch
                    </span>
                  </div>
                </a>
              </div>

              {/* Venue information */}
              <div className="flex flex-col justify-center p-5 sm:p-8 desk:p-10 lg:p-12">
                <h3 className="serif text-3xl leading-tight text-[var(--text)] sm:text-4xl md:text-5xl">
                  {t('venue.name')}
                </h3>

                <div className="mt-4 flex items-start gap-3 sm:mt-5">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-[var(--brand-600)]" />

                  <p className="whitespace-pre-line text-sm leading-6 text-[var(--text-soft)] md:text-base md:leading-7">
                    {t('venue.address')}
                  </p>
                </div>

                <a
                  href={t('venue.mapLink')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-2 border-b border-[rgba(72,67,63,0.24)] pb-1 text-[0.62rem] uppercase tracking-[0.16em] text-[var(--text)] transition hover:opacity-60 sm:mt-5"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {t('venue.mapCta')}
                </a>

                <div className="my-5 h-px w-full bg-[var(--border-soft)] sm:my-7" />

                <p className="max-w-xl text-sm leading-7 text-[var(--text-soft)] sm:text-base sm:leading-8">
                  {t('venue.description')}
                </p>

                {/* Arrival */}
                <div className="mt-5 divide-y divide-[var(--border-soft)] border-t border-[var(--border-soft)] sm:mt-7">
                  <div className="flex gap-3 py-4 sm:gap-4 sm:py-5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-50)] sm:h-9 sm:w-9">
                      <ParkingCircle className="h-4 w-4 text-[var(--brand-600)]" />
                    </div>

                    <div>
                      <p className="mb-1 text-[0.58rem] font-medium uppercase tracking-[0.15em] text-[var(--text-muted)] sm:text-[0.6rem]">
                        {t('info.parkingLabel')}
                      </p>

                      <p className="text-xs leading-5 text-[var(--text-soft)] sm:text-sm sm:leading-6">
                        {t('info.parking')}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 py-4 sm:gap-4 sm:py-5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-50)] sm:h-9 sm:w-9">
                      <Train className="h-4 w-4 text-[var(--brand-600)]" />
                    </div>

                    <div>
                      <p className="mb-1 text-[0.58rem] font-medium uppercase tracking-[0.15em] text-[var(--text-muted)] sm:text-[0.6rem]">
                        {t('info.trainLabel')}
                      </p>

                      <p className="text-xs leading-5 text-[var(--text-soft)] sm:text-sm sm:leading-6">
                        {t('info.accessibility')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Accommodation heading */}
        <div className="mx-auto mb-8 mt-14 max-w-2xl text-center sm:mb-10 sm:mt-20 md:mt-24">
          <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[rgba(255,250,242,0.9)] sm:mb-3 sm:text-[0.68rem]">
            {t('stay.eyebrow')}
          </p>

          <h3 className="serif text-3xl text-[var(--surface)] sm:text-4xl md:text-5xl">
            {t('stay.title')}
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[rgba(255,250,242,0.92)] sm:mt-4 sm:text-base sm:leading-7">
            {t('stay.description')}
          </p>
        </div>

        {/* Featured accommodation */}
        {featuredAccommodation && (
          <div className="mx-auto max-w-6xl overflow-hidden border border-[rgba(245,240,231,0.24)] bg-[rgba(255,250,242,0.96)] shadow-[0_20px_55px_rgba(72,67,63,0.11)]">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* Featured image */}
              <div className="bg-[rgba(245,239,229,0.48)] p-3 sm:p-5 lg:p-6">
                <div className="relative aspect-[16/8] w-full rotate-[-0.5deg] bg-[var(--surface)] p-2 shadow-[0_12px_30px_rgba(72,67,63,0.12)] sm:aspect-[16/9] sm:p-2.5 lg:h-full lg:min-h-[390px] lg:rotate-0 lg:aspect-auto">
                  <div className="relative h-full w-full overflow-hidden">
                    <Image
                      src="/images/accommodations/1.png"
                      alt={featuredAccommodation.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 45vw"
                    />
                  </div>
                </div>
              </div>

              {/* Booking information */}
              <div className="flex flex-col justify-center p-5 sm:p-8 lg:p-10 xl:p-12">
                {featuredAccommodation.reservationNote && (
                  <p className="mb-4 w-fit bg-[var(--brand-50)] px-2.5 py-1.5 text-[0.56rem] font-semibold uppercase tracking-[0.15em] text-[var(--brand-600)] sm:mb-5 sm:px-3 sm:text-[0.6rem] sm:tracking-[0.17em]">
                    {featuredAccommodation.reservationNote}
                  </p>
                )}

                <h4 className="serif text-3xl leading-tight text-[var(--text)] sm:text-4xl md:text-5xl">
                  {featuredAccommodation.name}
                </h4>

                <p className="mt-2 text-[0.58rem] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)] sm:text-[0.62rem] sm:tracking-[0.15em]">
                  {featuredAccommodation.distance}
                </p>

                <p className="mt-4 text-sm leading-6 text-[var(--text-soft)] sm:mt-6 sm:text-base sm:leading-8">
                  {featuredAccommodation.description}
                </p>

                {featuredAccommodation.price && (
                  <div className="mt-5 border-y border-[var(--border-soft)] py-4 sm:mt-6 sm:py-5">
                    <p className="text-[0.58rem] font-medium uppercase tracking-[0.16em] text-[var(--text-muted)] sm:text-[0.6rem]">
                      {t('stay.priceLabel')}
                    </p>

                    <p className="serif mt-1 text-xl leading-snug text-[var(--text)] sm:text-2xl md:text-3xl">
                      {featuredAccommodation.price}
                    </p>
                  </div>
                )}

                <a
                  href={featuredAccommodation.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-fit items-center gap-2 bg-[var(--brand-600)] px-4 py-2.5 text-[0.62rem] font-medium uppercase tracking-[0.15em] text-[var(--surface)] transition hover:bg-[var(--brand-700)] sm:mt-6 sm:px-5 sm:py-3 sm:text-[0.65rem]"
                >
                  {t('stay.hotelCta')}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Other accommodation options */}
        <div className="mx-auto mt-4 max-w-6xl">
          {/*
            Mobile:
            horizontal swipe instead of stacking both cards.

            Tablet/Desktop:
            regular two-column layout.
          */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:-mx-7 sm:px-7 md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
            {/* Secondary hotel */}
            {otherAccommodation && (
              <article className="w-[82vw] max-w-[340px] shrink-0 snap-center overflow-hidden border border-[rgba(245,240,231,0.26)] bg-[rgba(255,250,242,0.94)] sm:w-[360px] md:w-auto md:max-w-none">
                <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[130px_1fr] md:grid-cols-[150px_1fr]">
                  <div className="relative min-h-[155px] bg-[rgba(245,239,229,0.48)]">
                    <Image
                      src="/images/accommodations/2.png"
                      alt={otherAccommodation.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 130px, 150px"
                    />
                  </div>

                  <div className="flex min-w-0 flex-col justify-center p-4 md:p-5">
                    <p className="mb-1 text-[0.54rem] font-medium uppercase tracking-[0.14em] text-[var(--text-muted)]">
                      {t('stay.alternativeLabel')}
                    </p>

                    <h4 className="serif text-xl leading-tight text-[var(--text)] sm:text-2xl">
                      {otherAccommodation.name}
                    </h4>

                    <p className="mt-1 text-[0.65rem] leading-5 text-[var(--text-muted)]">
                      {otherAccommodation.distance}
                    </p>

                    <p className="mt-2 line-clamp-3 text-xs leading-5 text-[var(--text-soft)] md:line-clamp-none md:text-sm md:leading-6">
                      {otherAccommodation.description}
                    </p>

                    <a
                      href={otherAccommodation.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex w-fit items-center gap-1.5 border-b border-[rgba(72,67,63,0.24)] pb-0.5 text-[0.56rem] uppercase tracking-[0.13em] text-[var(--brand-600)]"
                    >
                      {t('stay.hotelCta')}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </article>
            )}

            {/* More accommodation */}
            <a
              href={t('stay.moreLink')}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[155px] w-[72vw] max-w-[300px] shrink-0 snap-center items-center justify-between gap-5 border border-[rgba(255,250,242,0.42)] bg-[rgba(55,50,47,0.18)] p-5 text-[var(--surface)] transition hover:bg-[rgba(55,50,47,0.26)] sm:w-[320px] md:min-h-[190px] md:w-auto md:max-w-none md:p-6 lg:p-7"
            >
              <div>
                <BedDouble className="mb-3 h-5 w-5 text-[var(--surface)] md:mb-4" />

                <p className="mb-1 text-[0.54rem] font-semibold uppercase tracking-[0.15em] text-[rgba(255,250,242,0.82)] md:text-[0.58rem]">
                  {t('stay.alternativeLabel')}
                </p>

                <h4 className="serif text-xl md:text-2xl lg:text-3xl">
                  {t('stay.moreTitle')}
                </h4>

                <p className="mt-2 max-w-sm text-xs leading-5 text-[rgba(255,250,242,0.9)] md:text-sm md:leading-6">
                  {t('stay.moreDescription')}
                </p>
              </div>

              <ExternalLink className="h-4 w-4 shrink-0 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 md:h-5 md:w-5" />
            </a>
          </div>

          {/* Mobile swipe hint */}
          <div className="mt-2 flex items-center justify-center gap-2 md:hidden">
            <span className="h-1 w-6 rounded-full bg-[rgba(255,250,242,0.7)]" />
            <span className="h-1 w-2 rounded-full bg-[rgba(255,250,242,0.3)]" />
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