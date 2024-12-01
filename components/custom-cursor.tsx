'use client';

import { useCallback, useEffect, useRef } from 'react';

const lerp = (start: number, end: number, amt: number) => (1 - amt) * start + amt * end;

export function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);
  const cursorVisible = useRef(false);
  const cursorEnlarged = useRef(false);
  const currentScale = useRef(1);
  const targetScale = useRef(1);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  const animateScale = useCallback(() => {
    if (!cursor.current) return;

    currentScale.current = lerp(currentScale.current, targetScale.current, 0.15);
    cursor.current.style.transform = `translate3d(${mouseX.current}px, ${mouseY.current}px, 0) translate(-50%, -50%) scale(${currentScale.current})`;

    if (Math.abs(currentScale.current - targetScale.current) > 0.001) {
      requestAnimationFrame(animateScale);
    }
  }, []);

  const positionCursor = useCallback((e: MouseEvent) => {
    if (!cursor.current) return;
    cursorVisible.current = true;
    mouseX.current = e.clientX;
    mouseY.current = e.clientY;
    cursor.current.style.transform = `translate3d(${mouseX.current}px, ${mouseY.current}px, 0) translate(-50%, -50%) scale(${currentScale.current})`;
  }, []);

  const toggleCursorVisibility = useCallback(() => {
    if (!cursor.current) return;
    cursor.current.style.opacity = cursorVisible.current ? '1' : '0';
  }, []);

  const isInteractive = useCallback((target: HTMLElement) => {
    return !!target.closest('a, button, [role="button"], input, textarea, select');
  }, []);

  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isInteractive(target)) {
        cursorEnlarged.current = true;
        targetScale.current = 2;
        requestAnimationFrame(animateScale);
      }
    },
    [animateScale, isInteractive]
  );

  const handleMouseOut = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isInteractive(target)) {
        cursorEnlarged.current = false;
        targetScale.current = 1;
        requestAnimationFrame(animateScale);
      }
    },
    [animateScale, isInteractive]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      positionCursor(e);
      toggleCursorVisibility();
    };

    const onMouseDown = () => {
      targetScale.current = 0.8;
      requestAnimationFrame(animateScale);
    };

    const onMouseUp = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      targetScale.current = isInteractive(target) ? 2 : 1;
      requestAnimationFrame(animateScale);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [
    handleMouseOver,
    handleMouseOut,
    positionCursor,
    toggleCursorVisibility,
    animateScale,
    isInteractive,
  ]);

  return (
    <div
      ref={cursor}
      className="fixed pointer-events-none z-[9999] mix-blend-difference w-5 h-5 rounded-full bg-white opacity-0 transition-opacity duration-300"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  );
}
