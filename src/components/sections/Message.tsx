import Image from 'next/image';
import {useTranslations} from 'next-intl';

export function Message() {
  const t = useTranslations('message');

  return (
    <section className="section relative overflow-hidden bg-[var(--background)]">
      {/* decorative floral */}
      <Image
        src="/images/decor/eucalyptus2.png"
        alt=""
        width={800}
        height={600}
        className="pointer-events-none absolute left-20 top-10 opacity-75"
      />

      <Image
        src="/images/decor/eucalyptus2.png"
        alt=""
        width={800}
        height={600}
        className="pointer-events-none absolute bottom-0 rotate-180 right-0 opacity-70"
      />

      <div className="container relative z-10 flex justify-center">
        <div className="relative w-full max-w-3xl">
          {/* paper background */}
          <Image
            src="/images/paperNew.png"
            alt=""
            width={1800}
            height={1400}
            className="pointer-events-none select-none opacity-95"
          />

          {/* content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-10 py-16 text-center md:px-24">
            {/* quote mark */}
            <div className="mb-5 text-[3rem] leading-none text-[rgba(42,37,34,0.22)] md:text-[4rem]">
              “
            </div>

            {/* quote */}
            <blockquote className="max-w-xl">
                {/* text */}
            <div className="mx-auto max-w-2xl space-y-5 text-center text-sm leading-8 text-[var(--text-soft)] md:text-[15px]">
                <p>{t('paragraphOne')}</p>

                
            </div>

            {/* highlight */}
              <p className="hand text-lg leading-9 text-[var(--text-soft)] md:text-2xl md:leading-[2.2rem]">
                {t('highlight')}
              </p>
            </blockquote>

            {/* heart */}
            <div className="mt-6 text-[var(--brand-400)]">
              ♡
            </div>

            {/* names */}
            <p className="script mt-4 text-4xl text-[var(--text)] md:text-5xl">
              Merle <span className="ampersand">&</span> Lasse
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}