'use client';

import Image from 'next/image';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {ArrowLeft, ArrowRight} from 'lucide-react';

type GalleryItem = {
  date: string;
  caption?: string;
};

const images = [
  '/images/gallery/2017.jpg',
  '/images/gallery/2018.jpg',
  '/images/gallery/2019.jpg',
  '/images/gallery/2020.jpg',
  '/images/gallery/2021.jpg',
  '/images/gallery/2022.jpg',
  '/images/gallery/2023.jpg',
  '/images/gallery/2024.jpg',
  '/images/gallery/2025.jpg',
  '/images/gallery/2026.jpg'
];

const loopImages = [...images, ...images, ...images];

export function Gallery() {
  const t = useTranslations('gallery');
  const items = t.raw('items') as GalleryItem[];

  const scrollRef = useRef<HTMLDivElement>(null);
  const interactionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  /*
   * Width of exactly one complete set of 10 images.
   * Since the gallery is rendered three times, this is 1/3
   * of the complete scroll width.
   */
  const getSetWidth = useCallback(() => {
    const container = scrollRef.current;

    if (!container) return 0;

    return container.scrollWidth / 3;
  }, []);

  /*
   * Start in the middle copy so that the user can immediately
   * scroll both left and right.
   */
  useEffect(() => {
    const container = scrollRef.current;

    if (!container) return;

    const frame = requestAnimationFrame(() => {
      const setWidth = getSetWidth();

      container.scrollLeft = setWidth;
    });

    return () => cancelAnimationFrame(frame);
  }, [getSetWidth]);

  /*
   * Find the card closest to the horizontal center.
   * This controls the progress indicator.
   */
  const updateActiveIndex = useCallback(() => {
    const container = scrollRef.current;

    if (!container) return;

    const cards = Array.from(
      container.querySelectorAll<HTMLElement>('[data-gallery-card]')
    );

    if (!cards.length) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestDistance = Infinity;
    let closestIndex = 0;

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = Number(card.dataset.realIndex ?? 0);
      }
    });

    setActiveIndex(closestIndex);
  }, []);

  /*
   * Invisible infinite-loop correction.
   *
   * We keep the user around the middle copy.
   * The visual position stays exactly the same because
   * all three copies are identical.
   */
  const normalizePosition = useCallback(() => {
    const container = scrollRef.current;

    if (!container) return;

    const setWidth = getSetWidth();

    if (!setWidth) return;

    if (container.scrollLeft < setWidth * 0.5) {
      container.scrollLeft += setWidth;
    } else if (container.scrollLeft > setWidth * 1.5) {
      container.scrollLeft -= setWidth;
    }
  }, [getSetWidth]);

  /*
   * Native scroll handler.
   * Works for:
   * - touch
   * - trackpad
   * - mouse wheel
   * - dragging
   * - buttons
   */
  const handleScroll = useCallback(() => {
    normalizePosition();
    updateActiveIndex();
  }, [normalizePosition, updateActiveIndex]);

  /*
   * Temporarily stop autoplay after user interaction.
   */
  const pauseAutoplay = useCallback(() => {
    setIsInteracting(true);

    if (interactionTimeoutRef.current) {
      clearTimeout(interactionTimeoutRef.current);
    }

    interactionTimeoutRef.current = setTimeout(() => {
      setIsInteracting(false);
    }, 4500);
  }, []);

  useEffect(() => {
    return () => {
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
    };
  }, []);

  /*
   * Scroll exactly one card left/right.
   */
  const scrollOneCard = useCallback(
    (direction: 'previous' | 'next') => {
      const container = scrollRef.current;

      if (!container) return;

      pauseAutoplay();

      const cards = Array.from(
        container.querySelectorAll<HTMLElement>('[data-gallery-card]')
      );

      if (!cards.length) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      /*
       * Find currently centered card.
       */
      let currentCardIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          currentCardIndex = index;
        }
      });

      const targetIndex =
        direction === 'next'
          ? currentCardIndex + 1
          : currentCardIndex - 1;

      const targetCard = cards[targetIndex];

      if (!targetCard) return;

      const targetLeft =
        targetCard.offsetLeft -
        container.clientWidth / 2 +
        targetCard.offsetWidth / 2;

      container.scrollTo({
        left: targetLeft,
        behavior: 'smooth'
      });
    },
    [pauseAutoplay]
  );

  /*
   * Slow automatic progression.
   *
   * Instead of continuously modifying scrollLeft,
   * autoplay advances one actual card at a time.
   * This is much more reliable on touch devices.
   */
  useEffect(() => {
    if (isInteracting) return;

    const interval = setInterval(() => {
      const container = scrollRef.current;

      if (!container) return;

      const cards = Array.from(
        container.querySelectorAll<HTMLElement>('[data-gallery-card]')
      );

      if (!cards.length) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let currentCardIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(containerCenter - cardCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          currentCardIndex = index;
        }
      });

      const targetCard = cards[currentCardIndex + 1];

      if (!targetCard) return;

      const targetLeft =
        targetCard.offsetLeft -
        container.clientWidth / 2 +
        targetCard.offsetWidth / 2;

      container.scrollTo({
        left: targetLeft,
        behavior: 'smooth'
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isInteracting]);

  /*
   * Progress indicator navigation.
   */
  const scrollToImage = useCallback(
    (realIndex: number) => {
      const container = scrollRef.current;

      if (!container) return;

      pauseAutoplay();

      const cards = Array.from(
        container.querySelectorAll<HTMLElement>('[data-gallery-card]')
      );

      /*
       * Always target the matching image in the middle copy.
       */
      const targetCard = cards[images.length + realIndex];

      if (!targetCard) return;

      const targetLeft =
        targetCard.offsetLeft -
        container.clientWidth / 2 +
        targetCard.offsetWidth / 2;

      container.scrollTo({
        left: targetLeft,
        behavior: 'smooth'
      });
    },
    [pauseAutoplay]
  );

  return (
    <section
      id="gallery"
      className="section overflow-hidden bg-[var(--background)]"
    >
      {/* Heading */}
      <div className="container max-w-5xl">
        <div className="mb-12 text-center md:mb-14">
          <p className="mb-3 text-[var(--text-soft)]">
            {t('eyebrow')}
          </p>

          <h2 className="serif text-6xl leading-[0.95] text-[var(--text)] md:text-7xl lg:text-8xl">
            {t('headingPartOne')}{' '}
            <span className="script">
              {t('headingScriptOne')}
            </span>{' '}
            {t('headingPartTwo')}{' '}
            <span className="script">
              {t('headingScriptTwo')}
            </span>{' '}
            {t('headingPartThree')}
          </h2>

          <div className="mx-auto mt-6 h-px w-14 bg-[rgba(72,67,63,0.22)]" />

          <p className="serif mt-6 text-xl tracking-[0.03em] text-[var(--text-soft)] md:text-2xl">
            {t('intro')}
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onPointerDown={pauseAutoplay}
          onTouchStart={pauseAutoplay}
          onWheel={pauseAutoplay}
          className="hide-scrollbar w-full touch-pan-x overflow-x-auto overscroll-x-none px-6 pb-5 md:px-12"
        >
          <div className="flex w-max gap-5">
            {loopImages.map((src, index) => {
              const realIndex = index % images.length;
              const item = items[realIndex];

              if (!item) return null;

              return (
                <GalleryCard
                  key={`${src}-${index}`}
                  src={src}
                  item={item}
                  realIndex={realIndex}
                />
              );
            })}
          </div>
        </div>

        {/* Floating desktop arrows */}
        <button
          type="button"
          onClick={() => scrollOneCard('previous')}
          aria-label="Previous image"
          className="absolute left-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(255,250,242,0.5)] bg-[rgba(255,250,242,0.72)] text-[var(--text)] shadow-[0_10px_30px_rgba(72,67,63,0.12)] backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-[rgba(255,250,242,0.92)] md:flex lg:left-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => scrollOneCard('next')}
          aria-label="Next image"
          className="absolute right-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(255,250,242,0.5)] bg-[rgba(255,250,242,0.72)] text-[var(--text)] shadow-[0_10px_30px_rgba(72,67,63,0.12)] backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-[rgba(255,250,242,0.92)] md:flex lg:right-8"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation + progress */}
      <div className="container mt-5">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-5">
          {/* Mobile previous */}
          <button
            type="button"
            onClick={() => scrollOneCard('previous')}
            aria-label="Previous image"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(255,250,242,0.72)] text-[var(--text)] shadow-[0_6px_20px_rgba(72,67,63,0.06)] backdrop-blur-md transition active:scale-95 md:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          {/* Progress */}
          <div className="flex flex-1 items-center justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToImage(index)}
                aria-label={`Image ${index + 1}`}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  activeIndex === index
                    ? 'w-8 bg-[var(--brand-600)]'
                    : 'w-3 bg-[rgba(72,67,63,0.18)] hover:bg-[rgba(72,67,63,0.32)]'
                }`}
              />
            ))}
          </div>

          {/* Mobile next */}
          <button
            type="button"
            onClick={() => scrollOneCard('next')}
            aria-label="Next image"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(255,250,242,0.72)] text-[var(--text)] shadow-[0_6px_20px_rgba(72,67,63,0.06)] backdrop-blur-md transition active:scale-95 md:hidden"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="container mt-16 md:mt-20">
        <div className="h-px w-full bg-[rgba(72,67,63,0.10)]" />
      </div>
    </section>
  );
}

function GalleryCard({
  src,
  item,
  realIndex
}: {
  src: string;
  item: GalleryItem;
  realIndex: number;
}) {
  return (
    <article
      data-gallery-card
      data-real-index={realIndex}
      className="group relative aspect-[3/4] w-[72vw] shrink-0 overflow-hidden rounded-sm md:w-[36vw] lg:w-[28vw]"
    >
      <Image
        src={src}
        alt={item.caption ?? item.date}
        fill
        className="object-cover grayscale contrast-[0.92] brightness-[1.02] transition-all duration-700 group-hover:scale-[1.03] group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
        sizes="(max-width: 768px) 72vw, (max-width: 1024px) 36vw, 28vw"
      />

      {/* Very subtle warm overlay */}
      <div className="absolute inset-0 bg-[rgba(183,138,111,0.035)] transition-opacity duration-700 group-hover:opacity-0" />

      {/* Bottom readability gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,17,17,0.58)] via-[rgba(17,17,17,0.05)] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Year + optional caption */}
      <div className="absolute inset-x-0 bottom-0 translate-y-4 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 md:p-7">
        <p className="serif text-5xl leading-none text-[var(--background)] md:text-6xl lg:text-7xl">
          {item.date}
        </p>

        {item.caption && (
          <p className="mt-3 max-w-xs text-sm leading-6 text-[rgba(252,245,234,0.82)]">
            {item.caption}
          </p>
        )}
      </div>
    </article>
  );
}