import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

/* ---------------------------------------------------------------------------
   Light / dark theme.
   - First visit: follows the operating system (prefers-color-scheme), and
     keeps following it live while the visitor has not chosen.
   - Once the visitor flips the toggle, the choice is stored and wins.
   - The class is already set before first paint by the inline script in
     index.html (no white flash); this provider only takes over from there.
   ------------------------------------------------------------------------ */

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const THEME_COLORS: Record<Theme, string> = { light: '#f4f2ee', dark: '#131210' };

const readStored = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
};

const systemTheme = (): Theme =>
  window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = (theme: Theme, animate: boolean) => {
  const root = document.documentElement;
  if (animate) {
    root.classList.add('theme-switching');
    window.setTimeout(() => root.classList.remove('theme-switching'), 500);
  }
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
};

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark') ? 'dark' : 'light',
  );

  // Keep in sync with the OS while the visitor has not made a choice.
  useEffect(() => {
    const query = window.matchMedia?.('(prefers-color-scheme: dark)');
    if (!query) return;
    const onChange = () => {
      if (readStored()) return;
      const next = systemTheme();
      applyTheme(next, true);
      setTheme(next);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* private mode: the choice simply lasts for this page view */
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside <ThemeProvider>');
  return context;
};
