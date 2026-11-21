import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * One soft (neumorphic) switch: a knob carrying the sun or the moon slides
 * from one end to the other, and the label sits on the free side. The track
 * turns night blue in dark mode.
 */
export const ThemeToggle = ({ className = '' }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const dark = theme === 'dark';
  const action = dark ? t('nav.theme.light') : t('nav.theme.dark');

  return (
    <button
      type="button"
      role="switch"
      onClick={toggleTheme}
      aria-checked={dark}
      aria-label={action}
      title={action}
      className={`theme-switch ${dark ? 'is-dark' : ''} ${className}`}
    >
      <span className="theme-switch-label" aria-hidden="true">
        {dark ? t('nav.theme.darkLabel') : t('nav.theme.lightLabel')}
      </span>
      <span className="theme-switch-knob" aria-hidden="true">
        {/* Sun */}
        <svg className={`theme-icon ${dark ? 'is-off' : ''}`} width="17" height="17" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
          <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.55 1.55M17.15 17.15l1.55 1.55M5.3 18.7l1.55-1.55M17.15 6.85l1.55-1.55" />
          </g>
        </svg>
        {/* Moon and a small star */}
        <svg className={`theme-icon ${dark ? '' : 'is-off'}`} width="17" height="17" viewBox="0 0 24 24">
          <path d="M20.2 14.6A8.4 8.4 0 0 1 9.4 3.8a8.4 8.4 0 1 0 10.8 10.8Z" fill="currentColor" />
          <path d="M17.5 3.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
};
