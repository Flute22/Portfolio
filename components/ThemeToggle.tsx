import React, { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
/** Keep in sync with the inline script in index.html. */
const BROWSER_CHROME: Record<Theme, string> = { light: '#F3F5F4', dark: '#0C0F0E' };

const currentTheme = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';

const hasSavedChoice = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false; // storage blocked (private mode etc.)
  }
};

/**
 * Light/dark switch. The first visit follows the OS setting; after the visitor
 * clicks, their choice is remembered. index.html sets the initial theme before
 * first paint so there is no flash.
 */
export const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  const apply = useCallback((next: Theme, remember: boolean) => {
    document.documentElement.setAttribute('data-theme', next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', BROWSER_CHROME[next]);
    if (remember) {
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore: the choice just won't persist */
      }
    }
    setTheme(next);
  }, []);

  // Until the visitor chooses, keep following the OS setting live.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      if (!hasSavedChoice()) apply(e.matches ? 'dark' : 'light', false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [apply]);

  const isDark = theme === 'dark';
  const label = isDark ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={() => apply(isDark ? 'light' : 'dark', true)}
      aria-label={label}
      title={label}
      className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-line bg-surface text-ink transition-colors hover:border-line2"
    >
      {isDark ? <Sun className="h-[18px] w-[18px]" aria-hidden="true" /> : <Moon className="h-[18px] w-[18px]" aria-hidden="true" />}
    </button>
  );
};
