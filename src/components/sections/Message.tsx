import Image from 'next/image';
import {useTranslations} from 'next-intl';

export function Message() {
  const t = useTranslations('message');

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#dfe8df] via-[#f5efe3] to-[#ddd0af] px-6 py-20 md:px-12 md:py-28">
      <div className="relative z-10 mx-auto max-w-5xl">
        <div className="mb-12">
          <div className="relative mx-auto aspect-[16/10] max-w-3xl overflow-hidden rounded-[2rem] shadow-[var(--shadow)]">
            <Image
              src="/images/gallery/3.jpg"
              alt={t('imageAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
        </div>

        <div className="card mx-auto max-w-3xl rounded-[2rem] border border-[rgba(93,103,78,0.18)] bg-[rgba(252,245,234,0.82)] p-8 text-center backdrop-blur-xl md:p-14">
          <div className="mb-6 text-5xl md:text-6xl">
            💌
          </div>

          <div className="space-y-5 text-sm leading-8 text-[var(--text-soft)] md:text-base">
            <p>{t('paragraphOne')}</p>

            <p>{t('paragraphTwo')}</p>

            <p className="hand text-xl italic leading-relaxed text-[var(--olive-dark)] md:text-2xl">
              {t('highlight')}
            </p>
          </div>

          <div className="mt-8 border-t border-[rgba(93,103,78,0.18)] pt-6">
            <p className="script text-5xl text-[var(--olive-dark)] md:text-6xl">
              Merle <span className="ampersand ">&</span> Lasse
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}