import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hslToHex(h: number, s: number, l: number): string {
  if (isNaN(h) || isNaN(s) || isNaN(l)) return '#8B5CF6';

  s /= 100;
  l /= 100;

  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function getCssVar(name: string): string {
  if (typeof window === 'undefined') return '#8B5CF6';

  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  if (!value) return '#8B5CF6';

  const [h, s, l] = value.split(' ').map(n => parseFloat(n));
  return hslToHex(h, s, l);
}
