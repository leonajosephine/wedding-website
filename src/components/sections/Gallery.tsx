'use client';

import Image from 'next/image';
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
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
  '/images/gallery/2026.png'
];

const loopImages = [...images, ...images, ...images];

const FIRST_AUTOPLAY_DELAY = 1400;
const AUTOPLAY_DELAY = 3200;
const INTERACTION_PAUSE = 2500;

export function Gallery() {
  const t = useTranslations('gallery');
  const items = t.raw('items') as GalleryItem[];

  const scrollRef = useRef<HTMLDivElement>(null);

  const interactionTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const autoplayTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [hasStartedAutoplay, setHasStartedAutoplay] =
    useState(false);

  const getCards = useCallback(() => {
    const container = scrollRef.current;

    if (!container) return [];

    return Array.from(
      container.querySelectorAll<HTMLElement>(
        '[data-gallery-card]'
      )
    );
  }, []);

  const centerCard = useCallback(
    (
      card: HTMLElement,
      behavior: ScrollBehavior = 'smooth'
    ) => {
      const container = scrollRef.current;

      if (!container) return;

      const targetLeft =
        card.offsetLeft -
        container.clientWidth / 2 +
        card.offsetWidth / 2;

      container.scrollTo({
        left: targetLeft,
        behavior
      });
    },
    []
  );

  const getCenteredCardIndex = useCallback(() => {
    const container = scrollRef.current;
    const cards = getCards();

    if (!container || !cards.length) return -1;

    const containerRect =
      container.getBoundingClientRect();

    const containerCenter =
      containerRect.left +
      containerRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();

      const cardCenter =
        rect.left + rect.width / 2;

      const distance = Math.abs(
        containerCenter - cardCenter
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    return closestIndex;
  }, [getCards]);

  const updateActiveIndex = useCallback(() => {
    const cards = getCards();
    const centeredIndex =
      getCenteredCardIndex();

    if (centeredIndex < 0) return;

    const realIndex = Number(
      cards[centeredIndex]?.dataset.realIndex ?? 0
    );

    setActiveIndex(realIndex);
  }, [getCards, getCenteredCardIndex]);

  const normalizePosition = useCallback(() => {
    const cards = getCards();
    const centeredIndex =
      getCenteredCardIndex();

    if (centeredIndex < 0) return;

    if (centeredIndex < images.length) {
      const equivalentCard =
        cards[centeredIndex + images.length];

      if (equivalentCard) {
        centerCard(equivalentCard, 'auto');
      }
    } else if (
      centeredIndex >= images.length * 2
    ) {
      const equivalentCard =
        cards[centeredIndex - images.length];

      if (equivalentCard) {
        centerCard(equivalentCard, 'auto');
      }
    }
  }, [
    centerCard,
    getCards,
    getCenteredCardIndex
  ]);

  const handleScroll = useCallback(() => {
    updateActiveIndex();
  }, [updateActiveIndex]);

  const handleScrollEnd = useCallback(() => {
    normalizePosition();
    updateActiveIndex();
  }, [
    normalizePosition,
    updateActiveIndex
  ]);

  const pauseAutoplay = useCallback(() => {
    setIsInteracting(true);

    if (interactionTimeoutRef.current) {
      clearTimeout(
        interactionTimeoutRef.current
      );
    }

    interactionTimeoutRef.current =
      setTimeout(() => {
        setIsInteracting(false);
      }, INTERACTION_PAUSE);
  }, []);

  const moveOneCard = useCallback(
    (
      direction: 'previous' | 'next',
      userInteraction = true
    ) => {
      const cards = getCards();
      const currentIndex =
        getCenteredCardIndex();

      if (
        !cards.length ||
        currentIndex < 0
      ) {
        return;
      }

      if (userInteraction) {
        pauseAutoplay();
      }

      let targetIndex =
        direction === 'next'
          ? currentIndex + 1
          : currentIndex - 1;

      if (!cards[targetIndex]) {
        const realIndex = Number(
          cards[currentIndex]?.dataset
            .realIndex ?? 0
        );

        targetIndex =
          images.length +
          realIndex +
          (direction === 'next'
            ? 1
            : -1);
      }

      const targetCard =
        cards[targetIndex];

      if (!targetCard) return;

      centerCard(targetCard);
    },
    [
      centerCard,
      getCards,
      getCenteredCardIndex,
      pauseAutoplay
    ]
  );

  const scrollToImage = useCallback(
    (realIndex: number) => {
      const cards = getCards();

      pauseAutoplay();

      const targetCard =
        cards[images.length + realIndex];

      if (!targetCard) return;

      centerCard(targetCard);
    },
    [
      centerCard,
      getCards,
      pauseAutoplay
    ]
  );

  /* Initial position */
  useEffect(() => {
    const frame = requestAnimationFrame(
      () => {
        const cards = getCards();

        const firstMiddleCard =
          cards[images.length];

        if (!firstMiddleCard) return;

        centerCard(
          firstMiddleCard,
          'auto'
        );

        setActiveIndex(0);
      }
    );

    return () =>
      cancelAnimationFrame(frame);
  }, [centerCard, getCards]);

  /* First autoplay movement */
  useEffect(() => {
    if (
      isInteracting ||
      hasStartedAutoplay
    ) {
      return;
    }

    autoplayTimeoutRef.current =
      setTimeout(() => {
        moveOneCard('next', false);
        setHasStartedAutoplay(true);
      }, FIRST_AUTOPLAY_DELAY);

    return () => {
      if (
        autoplayTimeoutRef.current
      ) {
        clearTimeout(
          autoplayTimeoutRef.current
        );
      }
    };
  }, [
    hasStartedAutoplay,
    isInteracting,
    moveOneCard
  ]);

  /* Regular autoplay */
  useEffect(() => {
    if (
      isInteracting ||
      !hasStartedAutoplay
    ) {
      return;
    }

    const interval =
      window.setInterval(() => {
        moveOneCard('next', false);
      }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(interval);
    };
  }, [
    hasStartedAutoplay,
    isInteracting,
    moveOneCard
  ]);

  /* Infinite-loop correction */
  useEffect(() => {
    const container =
      scrollRef.current;

    if (!container) return;

    container.addEventListener(
      'scrollend',
      handleScrollEnd
    );

    return () => {
      container.removeEventListener(
        'scrollend',
        handleScrollEnd
      );
    };
  }, [handleScrollEnd]);

  useEffect(() => {
    return () => {
      if (
        interactionTimeoutRef.current
      ) {
        clearTimeout(
          interactionTimeoutRef.current
        );
      }

      if (
        autoplayTimeoutRef.current
      ) {
        clearTimeout(
          autoplayTimeoutRef.current
        );
      }
    };
  }, []);

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
          className="hide-scrollbar w-full touch-pan-x snap-x snap-mandatory overflow-x-auto overscroll-x-none px-[14vw] pb-5 sm:px-[22vw] md:px-[28vw] lg:px-[34vw]"
        >
          <div className="flex w-max gap-4 md:gap-5">
            {loopImages.map(
              (src, index) => {
                const realIndex =
                  index % images.length;

                const item =
                  items[realIndex];

                if (!item) return null;

                return (
                  <GalleryCard
                    key={`${src}-${index}`}
                    src={src}
                    item={item}
                    realIndex={realIndex}
                    isActive={
                      activeIndex ===
                      realIndex
                    }
                  />
                );
              }
            )}
          </div>
        </div>

        {/* Desktop / tablet arrows */}
        <button
          type="button"
          onClick={() =>
            moveOneCard('previous')
          }
          aria-label="Previous image"
          className="absolute left-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(255,250,242,0.5)] bg-[rgba(255,250,242,0.78)] text-[var(--text)] shadow-[0_10px_30px_rgba(72,67,63,0.12)] backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-[rgba(255,250,242,0.96)] md:flex lg:left-8"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() =>
            moveOneCard('next')
          }
          aria-label="Next image"
          className="absolute right-5 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(255,250,242,0.5)] bg-[rgba(255,250,242,0.78)] text-[var(--text)] shadow-[0_10px_30px_rgba(72,67,63,0.12)] backdrop-blur-xl transition duration-300 hover:scale-105 hover:bg-[rgba(255,250,242,0.96)] md:flex lg:right-8"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <div className="container mt-5">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-5">
          <button
            type="button"
            onClick={() =>
              moveOneCard('previous')
            }
            aria-label="Previous image"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[rgba(255,250,242,0.72)] text-[var(--text)] shadow-[0_6px_20px_rgba(72,67,63,0.06)] backdrop-blur-md transition active:scale-95 md:hidden"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div className="flex flex-1 items-center justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() =>
                  scrollToImage(index)
                }
                aria-label={`Image ${
                  index + 1
                }`}
                className={`h-[3px] rounded-full transition-all duration-500 ${
                  activeIndex === index
                    ? 'w-8 bg-[var(--brand-600)]'
                    : 'w-3 bg-[rgba(72,67,63,0.18)] hover:bg-[rgba(72,67,63,0.32)]'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() =>
              moveOneCard('next')
            }
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
  realIndex,
  isActive
}: {
  src: string;
  item: GalleryItem;
  realIndex: number;
  isActive: boolean;
}) {
  return (
    <article
      data-gallery-card
      data-real-index={realIndex}
      className="group relative aspect-[4/5] w-[72vw] shrink-0 snap-center overflow-hidden rounded-sm sm:w-[56vw] md:w-[42vw] lg:w-[30vw]"
    >
      <Image
        src={src}
        alt={item.caption ?? item.date}
        fill
        className={`
          object-cover
          transition-all
          duration-700

          ${
            isActive
              ? 'grayscale-0 sepia-0 saturate-100 contrast-100 brightness-100'
              : 'grayscale-[0.88] sepia-[0.34] saturate-[0.72] contrast-[1.1] brightness-[0.96]'
          }

          lg:grayscale-[0.88]
          lg:sepia-[0.34]
          lg:saturate-[0.72]
          lg:contrast-[1.1]
          lg:brightness-[0.96]

          lg:group-hover:scale-[1.025]
          lg:group-hover:grayscale-0
          lg:group-hover:sepia-0
          lg:group-hover:saturate-100
          lg:group-hover:contrast-100
          lg:group-hover:brightness-100
        `}
        sizes="(max-width: 640px) 72vw, (max-width: 768px) 56vw, (max-width: 1024px) 42vw, 30vw"
      />

      {/* Text readability */}
      <div
        className={`
          absolute inset-0
          bg-gradient-to-t
          from-[rgba(17,17,17,0.58)]
          via-[rgba(17,17,17,0.03)]
          to-transparent
          transition-opacity
          duration-500

          ${
            isActive
              ? 'opacity-100'
              : 'opacity-0'
          }

          lg:opacity-0
          lg:group-hover:opacity-100
        `}
      />

      {/* Year */}
      <div
        className={`
          absolute inset-x-0 bottom-0
          p-5
          transition-all
          duration-500
          md:p-7

          ${
            isActive
              ? 'translate-y-0 opacity-100'
              : 'translate-y-3 opacity-0'
          }

          lg:translate-y-3
          lg:opacity-0
          lg:group-hover:translate-y-0
          lg:group-hover:opacity-100
        `}
      >
        <p className="serif text-5xl leading-none text-[var(--background)] md:text-6xl lg:text-7xl">
          {item.date}
        </p>

        {item.caption && (
          <p className="mt-3 max-w-xs text-sm leading-6 text-[rgba(252,245,234,0.86)]">
            {item.caption}
          </p>
        )}
      </div>
    </article>
  );
}