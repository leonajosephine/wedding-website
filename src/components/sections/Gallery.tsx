'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {useEffect, useRef, useState} from 'react';

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
  '/images/gallery/6.jpg'
];

export function Gallery() {
  const t = useTranslations('gallery');
  const items = t.raw('items') as GalleryItem[];

  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    const card = container?.children[index] as HTMLElement | undefined;

    if (!container || !card) return;

    container.scrollTo({
      left: card.offsetLeft - 24,
      behavior: 'smooth'
    });

    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cards = Array.from(container.children) as HTMLElement[];

      const closestIndex = cards.reduce((closest, card, index) => {
        const currentDistance = Math.abs(
          card.offsetLeft - container.scrollLeft - 24
        );

        const closestCard = cards[closest];
        const closestDistance = Math.abs(
          closestCard.offsetLeft - container.scrollLeft - 24
        );

        return currentDistance < closestDistance ? index : closest;
      }, 0);

      setActiveIndex(closestIndex);
    };

    container.addEventListener('scroll', handleScroll, {passive: true});

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isUserInteracting) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => {
        const next = current === images.length - 1 ? 0 : current + 1;
        scrollToIndex(next);
        return next;
      });
    }, 2600);

    return () => clearInterval(interval);
  }, [isUserInteracting]);

  return (
    <section
      id="gallery"
      className="section overflow-hidden bg-[var(--background-soft)]"
    >
      <div className="container">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-3">{t('eyebrow')}</p>

          <h2 className="script text-6xl leading-[0.95] text-[var(--text)] md:text-7xl lg:text-8xl">
            {t('title')}
          </h2>

          <div className="mx-auto mt-6 h-px w-14 bg-[var(--olive-light)]" />
        </div>
      </div>

      <div
        ref={scrollRef}
        onPointerDown={() => setIsUserInteracting(true)}
        onPointerUp={() => setTimeout(() => setIsUserInteracting(false), 2500)}
        onTouchStart={() => setIsUserInteracting(true)}
        onTouchEnd={() => setTimeout(() => setIsUserInteracting(false), 2500)}
        className="hide-scrollbar flex w-screen snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:px-12"
      >
        {images.map((src, index) => (
          <GalleryCard
            key={src}
            src={src}
            item={items[index]}
          />
        ))}
      </div>

      <div className="mt-4 flex justify-center gap-2">
        {images.map((src, index) => (
          <button
            key={src}
            onClick={() => scrollToIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? 'w-7 bg-[var(--olive-dark)]'
                : 'w-2 bg-[rgba(65,82,63,0.25)]'
            }`}
            aria-label={`Bild ${index + 1} anzeigen`}
          />
        ))}
      </div>
    </section>
  );
}

function GalleryCard({src, item}: {src: string; item: GalleryItem}) {
  return (
    <article className="group relative aspect-[3/4] min-w-[72vw] snap-center overflow-hidden rounded-sm md:min-w-[36vw] lg:min-w-[28vw]">
      <Image
        src={src}
        alt={item.caption}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        sizes="(max-width: 768px) 72vw, 28vw"
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