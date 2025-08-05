'use client';

import { useEffect } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

export function MobileViewportHandler() {
  useEffect(() => {
    if (!isMobile || !isTablet) return;
    if (typeof window === 'undefined') return;

    let initialViewportHeight = window.innerHeight;
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      const currentHeight = window.innerHeight;

      // If the height increased (keyboard dismissed), reset scroll position
      if (currentHeight > initialViewportHeight) {
        // Small delay to ensure the keyboard is fully dismissed
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          const scrollContainer = document.getElementById('scroll-container');
          if (scrollContainer) {
            scrollContainer.scrollTop = 0;
          }
        }, 100);
      }

      initialViewportHeight = currentHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  return null;
}
