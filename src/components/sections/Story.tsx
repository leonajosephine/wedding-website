import Image from 'next/image';
import {useTranslations} from 'next-intl';

export function Story() {
  const t = useTranslations('story');

  return (
    <section
      id="story"
      className="section relative sm:overflow-hidden lg:overflow-visible bg-[var(--background)]"
    >
      <div className="container relative z-10">
        <div className="grid items-center gap-14 desk:grid-cols-[0.9fr_1.1fr]">
          <div className="mx-auto max-w-md text-center desk:mx-0 desk:text-left">
            <h2 className="script mb-8 text-5xl tracking-wide text-[var(--text)] md:text-6xl desk:text-7xl">
              Unsere <span className="serif">Geschichte</span>
            </h2>

            <div className="mx-auto mb-8 h-px w-16 bg-[rgba(42,37,34,0.24)] desk:mx-0" />

            <div className="space-y-5 text-sm leading-8 text-[var(--text-soft)]">
              <p>{t('paragraphOne')}</p>
              <p>{t('paragraphTwo')}</p>
            </div>

            <p className="hand mt-8 lowercase text-2xl leading-relaxed text-[var(--text)]">
              “{t('quote')}”
            </p>
          </div>

          <div className="relative min-h-[430px] sm:min-h-[500px] desk:min-h-[560px]">
            <div className="absolute left-1/2 top-8 z-10 aspect-[4/5] w-[78%] -translate-x-1/2 rotate-[-2deg] border-[10px] border-[var(--surface)] bg-[var(--surface)] shadow-[var(--shadow-paper)] desk:left-0 desk:top-10 desk:w-[68%] desk:translate-x-0">
              <Tape className="-top-5 left-1/2 -translate-x-1/2 rotate-[-3deg]" />

              <Image
                src="/images/story.jpg"
                alt={t('imageAlt')}
                fill
                className="image-soft object-cover"
                sizes="(max-width: 1000px) 78vw, 520px"
              />
              
            </div>
            <div className="absolute bottom-10 right-6 z-20 aspect-[4/5] w-[34%] rotate-[4deg] border-[8px] border-[var(--surface)] bg-[var(--surface)] shadow-[var(--shadow-paper)]">
                <Tape className="-top-4 left-1/2 -translate-x-1/2 rotate-[5deg]" />

                <Image
                    src="/images/engaged.png"
                    alt={t('imageAlt')}
                    fill
                    className=" object-cover grayscale contrast-[0.96] brightness-95"
                    sizes="280px"
                />
                </div>
          </div>
        </div>
      </div>

      <Image
        src="/images/decor/eucalyptus2.png"
        alt=""
        width={3200}
        height={3000}
        className="pointer-events-none absolute bottom-[-8rem] right-[-36rem] z-0 hidden rotate-[120deg] opacity-80 blur-[0.2px] mix-blend-multiply desk:block desk:right-[-42rem]"
      />
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