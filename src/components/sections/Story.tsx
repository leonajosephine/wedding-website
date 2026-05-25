import Image from 'next/image';
import {useTranslations} from 'next-intl';

export function Story() {
  const t = useTranslations('story');

  return (
    <section
      id="story"
      className="section relative overflow-hidden bg-[var(--background-soft)]"
    >
      <div className="container relative z-10">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="eyebrow mb-3">{t('eyebrow')}</p>

          <h2 className="serif script text-6xl leading-[0.95] text-[var(--text)] md:text-7xl lg:text-8xl">
            {t('title')}
          </h2>

          <div className="mx-auto mt-6 h-px w-14 bg-[var(--olive-light)]" />
        </div>

        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2 lg:gap-16">
          <div className="space-y-5 text-[var(--text-soft)]">
            <p className="leading-8 first-letter:serif first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:leading-[0.8] first-letter:text-[var(--olive)]">
              {t('paragraphOne')}
            </p>

            <p className="leading-8">{t('paragraphTwo')}</p>

            <p className="hand pt-3 text-xl italic leading-relaxed text-[var(--olive-dark)]">
              “{t('quote')}”
            </p>
          </div>

          <div className="relative order-first aspect-[3/4] overflow-hidden rounded-sm shadow-[var(--shadow)] md:order-last">
            <Image
              src="/images/story.jpg"
              alt={t('imageAlt')}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 480px"
            />

            <div className="pointer-events-none absolute inset-3 border border-[rgba(252,245,234,0.55)]" />
          </div>
        </div>
      </div>
    </section>
  );
}