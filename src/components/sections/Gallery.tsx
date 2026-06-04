import Image from 'next/image';
import {useTranslations} from 'next-intl';

type GalleryItem = {
  date: string;
  caption: string;
};

const images = [
  '/images/gallery/1.jpg',
  '/images/gallery/2.jpg',
  '/images/gallery/3.jpg',
  '/images/gallery/4.jpg',
  '/images/gallery/5.jpg',
  '/images/gallery/6.jpg',
  '/images/gallery/7.jpg',
  '/images/gallery/8.jpg',
  '/images/gallery/9.jpg',
  '/images/gallery/10.jpg'
];

const loopImages = [...images, ...images];

export function Gallery() {
  const t = useTranslations('gallery');
  const items = t.raw('items') as GalleryItem[];

  return (
    <section id="gallery" className="section overflow-hidden bg-[var(--background)]">
      <div className="container max-w-220">
        <div className="mb-14 text-center">
          <p className="mb-3 text-[var(--text-soft)]">{t('eyebrow')}</p>

          <h2 className="serif text-6xl leading-[0.95] text-[var(--text)] md:text-7xl lg:text-8xl">
            Our Favorite <span className="script"> memories </span>
            over <span className="script"> the </span> years.
          </h2>

          <div className="mx-auto mt-6 h-px w-14 bg-[rgba(42,37,34,0.22)]" />
        </div>
      </div>

      <div className="hide-scrollbar w-screen overflow-x-auto px-6 pb-6 md:px-12">
        <div className="gallery-marquee flex w-max gap-5 hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {loopImages.map((src, index) => {
            const realIndex = index % images.length;

            return (
                <GalleryCard
                key={`${src}-${index}`}
                src={src}
                item={items[realIndex]}
                />
            );
            })}
        </div>
        </div>

      <div className="container mt-20">
        <div className="h-px w-full bg-[rgba(42,37,34,0.10)]" />
      </div>
    </section>
  );
}

function GalleryCard({src, item}: {src: string; item: GalleryItem}) {
  return (
    <article className="group relative aspect-[3/4] w-[72vw] shrink-0 overflow-hidden rounded-sm md:w-[36vw] lg:w-[28vw]">
      <Image
        src={src}
        alt={item.caption}
        fill
        className="object-cover grayscale contrast-[0.92] brightness-[1.02] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
        sizes="(max-width: 768px) 72vw, (max-width: 1024px) 36vw, 28vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,17,0.55)] via-[rgba(17,17,17,0.08)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute inset-x-0 bottom-0 translate-y-6 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <p className="mb-2 text-[0.62rem] uppercase tracking-[0.18em] text-[rgba(252,245,234,0.75)]">
          {item.date}
        </p>

        <h3 className="serif text-2xl text-[var(--background)]">
          {item.caption}
        </h3>
      </div>
    </article>
  );
}