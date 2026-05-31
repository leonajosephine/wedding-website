import Image from 'next/image';
import {useTranslations} from 'next-intl';

export function Story() {
  const t = useTranslations('story');

  return (
    <section
      id="story"
      className="section relative bg-[var(--background)]"
    >
      <div className="container relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="max-w-md">

            <h2 className="script mb-8 text-5xl tracking-wide text-[var(--text)] md:text-7xl">
              Unsere <span className="serif">Geschichte</span>
            </h2>

            <div className="mb-8 h-px w-16 bg-[rgba(42,37,34,0.24)]" />

            <div className="space-y-5 text-sm leading-8 text-[var(--text-soft)]">
              <p>{t('paragraphOne')}</p>
              <p>{t('paragraphTwo')}</p>
            </div>

            <p className="hand mt-8 text-2xl leading-relaxed text-[var(--text)]">
              “{t('quote')}”
            </p>
          </div>

          <div className="relative min-h-[560px]">

            <div className="absolute left-0 top-10 z-10 aspect-[4/5] w-[68%] rotate-[-2deg] border-[10px] border-[var(--surface)] bg-[var(--surface)] shadow-[var(--shadow-paper)]">
              <Tape className="-top-5 left-1/2 -translate-x-1/2 rotate-[-3deg]" />

              <Image
                src="/images/story.jpg"
                alt={t('imageAlt')}
                fill
                className="image-soft object-cover"
                sizes="(max-width: 768px) 70vw, 520px"
              />
            </div>

            {/*<div className="absolute bottom-8 right-8 z-20 aspect-[4/5] w-[34%] rotate-[4deg] border-[8px] border-[var(--surface)] bg-[var(--surface)] shadow-[var(--shadow-paper)]">
              <Tape className="-top-4 left-1/2 -translate-x-1/2 rotate-[5deg]" />

              <Image
                src="/images/fullWidth.jpg"
                alt={t('imageAlt')}
                fill
                className="image-soft object-cover grayscale"
                sizes="(max-width: 768px) 40vw, 260px"
              />
            </div> */}
          </div>
        </div>
        <Image
              src="/images/decor/eucalyptus2.png"
              alt=""
              width={3200}
              height={3000}
              className="pointer-events-none absolute -right-80 bottom-6 rotate-120 opacity-75 md:-right-100 lg:-right-150 blur-[0.2px] mix-blend-multiply"
            />
      </div>
    </section>
  );
}

function Tape({className = ''}: {className?: string}) {
  return (
    <div
      className={`pointer-events-none absolute z-30 h-8 w-28 bg-[rgba(238,225,204,0.72)] shadow-sm backdrop-blur-[1px] ${className}`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]" />
    </div>
  );
}