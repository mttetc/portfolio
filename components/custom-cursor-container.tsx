'use client';

import { CustomCursor } from '@/components/custom-cursor';
import { useDeviceCursor } from '@/hooks/use-device-cursor';

export function CustomCursorContainer() {
  const hasCustomCursor = useDeviceCursor();

  return hasCustomCursor ? <CustomCursor /> : null;
}
