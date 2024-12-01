import { useSyncExternalStore } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

const getSnapshot = () => {
  const isMobileDevice = isMobile || isTablet;
  const isSmallScreen = typeof window !== 'undefined' && window.innerWidth <= 1024;
  return !isMobileDevice && !isSmallScreen;
};

const subscribe = (callback: () => void) => {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
};

export const useDeviceCursor = () => {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => false // Server snapshot
  );
};
