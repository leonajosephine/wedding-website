import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {SectionHeader} from '@/components/ui/SectionHeader';

type DressColor = {
  name: string;
  hex: string;
};

const largeImage = '/images/dresscode/dresscodepainted5.png'; // Replace with the path to your large image

export function Dresscode() {
  const t = useTranslations('dressCode');
  const colors = t.raw('colors') as DressColor[];

  return (
    <section id="dresscode" className="section bg-[var(--background)]">
      <div className="container max-w-5xl">
        <SectionHeader eyebrow={t('eyebrow')} title={t('title')} />

        <p className="mx-auto mb-12 max-w-2xl text-center text-sm leading-7 text-[var(--text-soft)] md:text-base">
          {t('intro')}
        </p>

        <div className="mb-12 flex flex-wrap justify-center gap-5 md:gap-7">
          {colors.map((color) => (
            <div key={color.hex} className="group flex flex-col items-center">
              <div
                className="mb-3 h-16 w-16 rounded-full shadow-[var(--shadow)] transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20"
                style={{backgroundColor: color.hex}}
              />
              <span className="text-xs tracking-[0.12em] text-[var(--text-soft)] md:text-sm">
                {color.name}
              </span>
            </div>
          ))}
        </div>

        {/* Replace the grid of images with one large image */}
        <div className="relative mx-auto mt-10 aspect-[16/9] w-full max-w-4xl overflow-visible rounded-lg ">
          <Image
            src={largeImage}
            alt={t('imageAlt')}
            fill
            className="object-cover overflow-visible"
            sizes="(max-width: 768px) 100vw, 1024px"
          />
        </div>

        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-sm leading-7 text-[var(--text-soft)]">
            <strong className="text-[var(--text)]">{t('noteLabel')}</strong>{' '}
            {t('note')} 🌸
          </p>
        </div>
      </div>
    </section>
  );
}