import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {SectionHeader} from '@/components/ui/SectionHeader';

type DressColor = {
  name: string;
  hex: string;
};

const inspirationImages = [
  '/images/dresscode/sage_4.webp',
  '/images/dresscode/sage_7.webp',
  '/images/dresscode/sage_6.jpg',
  '/images/dresscode/sage_8.jpg'
];

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

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {inspirationImages.map((src, index) => (
            <div
              key={src}
              className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-[var(--shadow)]"
            >
              <Image
                src={src}
                alt={`${t('imageAlt')} ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 240px"
              />
            </div>
          ))}
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