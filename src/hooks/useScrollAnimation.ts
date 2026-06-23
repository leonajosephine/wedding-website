import {useEffect, useRef} from 'react';

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add('animate-fadeInUp');
        }
      },
      {threshold: 0.2}
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return ref;
}