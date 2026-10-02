import { useEffect, useRef, useState } from 'react';

/** Playback lifecycle only; never installs wheel, touch, or page-scroll handlers. */
export function usePreviewVisibility() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let nearViewport = false;
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setShouldPlay(nearViewport && !document.hidden && !motionPreference.matches);
    const observer = new IntersectionObserver(([entry]) => {
      nearViewport = entry.isIntersecting;
      update();
    }, { rootMargin: '120px 0px', threshold: 0 });

    observer.observe(container);
    document.addEventListener('visibilitychange', update);
    motionPreference.addEventListener('change', update);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      motionPreference.removeEventListener('change', update);
    };
  }, []);

  return { containerRef, shouldPlay };
}
