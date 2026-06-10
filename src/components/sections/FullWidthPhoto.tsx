import Image from 'next/image';
import {useTranslations} from 'next-intl';

export function FullWidthPhoto() {
  const t = useTranslations('fullWidthPhoto');

  return (
    <section className="relative h-[50vh] w-full overflow-hidden md:h-[72vh]">
      <Image
        src="/images/fullWidth.jpg"
        alt={t('imageAlt')}
        fill
        className="object-cover grayscale contrast-[0.92] brightness-[1.02]"
        sizes="100vw"
        priority={false}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
    </section>
  );
}