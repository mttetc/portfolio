import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCssVar(name: string): string {
  if (typeof window === 'undefined') return '#8B5CF6';

  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();

  if (!value) return '#8B5CF6';

  // Variables now contain full hsl(...) values
  // Parse hsl(H S% L%) format
  const match = value.match(/hsl\(\s*([\d.]+)\s+([\d.]+)%?\s+([\d.]+)%?\s*\)/);
  if (match) {
    const [, h, s, l] = match.map(Number);
    return hslToHex(h, s, l);
  }

  return '#8B5CF6';
}

export function hslToHex(h: number, s: number, l: number): string {
  if (isNaN(h) || isNaN(s) || isNaN(l)) return '#8B5CF6';

  const sNorm = s / 100;
  const lNorm = l / 100;

  const a = sNorm * Math.min(lNorm, 1 - lNorm);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = lNorm - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}
