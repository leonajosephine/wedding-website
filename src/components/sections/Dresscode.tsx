import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {SectionHeader} from '@/components/ui/SectionHeader';

type DressColor = {
  name: string;
  hex: string;
};

const largeImage = '/images/dresscode/dresscodePaintedNew.png';

export function Dresscode() {
  const t = useTranslations('dressCode');

  const mainColors = t.raw('mainColors') as DressColor[];
  const alternativeColors = t.raw('alternativeColors') as DressColor[];

  return (
    <section
      id="dresscode"
      className="section overflow-hidden bg-[var(--background)]"
    >
      <div className="container max-w-5xl">
        <SectionHeader
          eyebrow={t('eyebrow')}
          title={t('title')}
        />

        <p className="mx-auto mb-14 max-w-2xl text-center text-base leading-8 text-[var(--text-soft)]">
          {t('intro')}
        </p>

        {/* Color palette */}
        <div className="mx-auto max-w-4xl">
          {/* Main colors */}
          <div className="text-center">
            <p className="mb-7 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
              {t('mainColorsLabel')}
            </p>

            <div className="flex flex-wrap items-start justify-center gap-5 sm:gap-7 md:gap-8">
              {mainColors.map((color, index) => (
                <ColorSwatch
                  key={`${color.name}-${color.hex}`}
                  color={color}
                  variant="main"
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="mx-auto my-11 flex max-w-xl items-center gap-5 md:my-14">
            <div className="h-px flex-1 bg-[var(--border)]" />

            <span className="hand text-2xl tracking-[0.05em] text-[var(--text-muted)]">
              &
            </span>

            <div className="h-px flex-1 bg-[var(--border)]" />
          </div>

          {/* Alternative colors */}
          <div className="text-center">
            <p className="mb-7 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-[var(--text-muted)]">
              {t('alternativeColorsLabel')}
            </p>

            <div className="grid grid-cols-4 gap-x-3 gap-y-7 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-5 md:gap-x-6">
              {alternativeColors.map((color, index) => (
                <ColorSwatch
                  key={`${color.name}-${color.hex}`}
                  color={color}
                  variant="alternative"
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Painted dresscode illustration */}
        <div className="relative mx-auto mt-16 aspect-[16/9] w-full max-w-4xl overflow-visible md:mt-20">
          <Image
            src={largeImage}
            alt={t('imageAlt')}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 1024px"
          />
        </div>

        {/* Note */}
        <div className="mx-auto mt-10 max-w-2xl text-center">
          <p className="text-sm leading-7 text-[var(--text-soft)] md:text-base md:leading-8">
            <strong className="font-medium text-[var(--text)]">
              {t('noteLabel')}
            </strong>{' '}
            {t('note')} 🌸
          </p>
        </div>
      </div>
    </section>
  );
}

function ColorSwatch({
  color,
  variant,
  index = 0
}: {
  color: DressColor;
  variant: 'main' | 'alternative';
  index?: number;
}) {
  const rotations = [
    '-rotate-[2deg]',
    'rotate-[1deg]',
    '-rotate-[1deg]',
    'rotate-[2deg]',
    '-rotate-[1deg]'
  ];

  const rotation = rotations[index % rotations.length];

  return (
    <div
      className={`group flex flex-col items-center ${
        variant === 'main' ? rotation : ''
      }`}
    >
      <div
        className={
          variant === 'main'
            ? 'flex h-[76px] w-[76px] items-center justify-center rounded-full border border-[rgba(72,67,63,0.10)] bg-[var(--surface)] p-[4px] shadow-[0_10px_28px_rgba(72,67,63,0.10)] transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 sm:h-[88px] sm:w-[88px] md:h-[96px] md:w-[96px]'
            : 'flex h-[58px] w-[58px] items-center justify-center rounded-full border border-[rgba(72,67,63,0.09)] bg-[var(--surface)] p-[4px] shadow-[0_8px_22px_rgba(72,67,63,0.07)] transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105 sm:h-[66px] sm:w-[66px] md:h-[70px] md:w-[70px]'
        }
      >
        <div
          className="h-full w-full rounded-full"
          style={{backgroundColor: color.hex}}
        />
      </div>

      <span
        className={`mt-3 max-w-[100px] text-center leading-5 text-[var(--text-soft)] ${
          variant === 'main'
            ? 'text-xs md:text-[0.8rem]'
            : 'text-[0.62rem] sm:text-xs'
        }`}
      >
        {color.name}
      </span>
    </div>
  );
}