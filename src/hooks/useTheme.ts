import { useEffect, useState } from 'react';
import type { ThemeSettings } from '@/types';

const STORAGE_KEY = 'medirecover-theme';

const defaultTheme: ThemeSettings = {
  mode: 'light',
  fontSize: 'medium',
  reducedMotion: false,
  highContrast: false,
};

export function useTheme() {
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setTheme(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    const root = document.documentElement;

    if (theme.mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    root.style.fontSize = theme.fontSize === 'small' ? '14px' : theme.fontSize === 'large' ? '18px' : '16px';

    if (theme.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    if (theme.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }
  }, [theme]);

  const update = (partial: Partial<ThemeSettings>) => setTheme((prev) => ({ ...prev, ...partial }));

  return { theme, updateTheme: update };
}
