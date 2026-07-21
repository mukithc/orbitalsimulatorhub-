/**
 * Global theme system: theme packs + custom.
 * data-theme values: space-aurora (default), light-clean, nasa-blue, deep-purple, mars-red, earth-green, custom
 */

export type ThemeId =
  | 'orbital-dark'
  | 'light-orbit'
  | 'custom';

export type Density = 'compact' | 'normal' | 'spacious';

export interface ThemeVariables {
  bg: string;
  card: string;
  cardHover: string;
  border: string;
  text: string;
  muted: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  heroGradient?: string;
}

export interface ThemeSettings {
  theme: ThemeId;
  primary?: string;
  bg?: string;
  card?: string;
  cardHover?: string;
  border?: string;
  text?: string;
  muted?: string;
  secondary?: string;
  density?: Density;
}

export const THEME_PACKS: Record<Exclude<ThemeId, 'custom'>, ThemeVariables> = {
  'orbital-dark': {
    bg: '#050816',
    card: 'rgba(15, 23, 42, 0.72)',
    cardHover: 'rgba(24, 36, 66, 0.9)',
    border: 'rgba(148, 163, 184, 0.16)',
    text: '#F8FAFC',
    muted: '#94A3B8',
    primary: '#4F8CFF',
    secondary: '#8B5CF6',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#FB7185',
    heroGradient: 'linear-gradient(135deg, #4F8CFF 0%, #8B5CF6 50%, #D946EF 100%)',
  },
  'light-orbit': {
    bg: '#F6F8FC',
    card: 'rgba(255, 255, 255, 0.88)',
    cardHover: 'rgba(248, 250, 252, 0.96)',
    border: 'rgba(15, 23, 42, 0.12)',
    text: '#0F172A',
    muted: '#475569',
    primary: '#2563EB',
    secondary: '#7C3AED',
    success: '#16A34A',
    warning: '#D97706',
    danger: '#DC2626',
    heroGradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 50%, #DB2777 100%)',
  },
};

export const THEME_LABELS: Record<Exclude<ThemeId, 'custom'>, string> = {
  'orbital-dark': 'Orbital Dark',
  'light-orbit': 'Light Orbit',
};

export const DEFAULT_THEME: ThemeId = 'orbital-dark';

export function getThemeVariables(settings: ThemeSettings | null): ThemeVariables {
  if (!settings || settings.theme === 'custom') {
    const custom = settings?.theme === 'custom' ? settings : null;
    return {
      bg: custom?.bg ?? THEME_PACKS['space-aurora'].bg,
      card: custom?.card ?? THEME_PACKS['orbital-dark'].card,
      cardHover: custom?.cardHover ?? THEME_PACKS['orbital-dark'].cardHover,
      border: custom?.border ?? THEME_PACKS['orbital-dark'].border,
      text: custom?.text ?? THEME_PACKS['orbital-dark'].text,
      muted: custom?.muted ?? THEME_PACKS['orbital-dark'].muted,
      primary: custom?.primary ?? THEME_PACKS['orbital-dark'].primary,
      secondary: custom?.secondary ?? THEME_PACKS['orbital-dark'].secondary,
      success: THEME_PACKS['orbital-dark'].success,
      warning: THEME_PACKS['orbital-dark'].warning,
      danger: THEME_PACKS['orbital-dark'].danger,
      heroGradient: THEME_PACKS['orbital-dark'].heroGradient,
    };
  }
  return THEME_PACKS[settings.theme];
}

export function applyThemeToDocument(settings: ThemeSettings | null) {
  if (typeof document === 'undefined') return;
  const vars = getThemeVariables(settings);
  const root = document.documentElement;
  root.setAttribute('data-theme', settings?.theme ?? DEFAULT_THEME);
  root.style.setProperty('--bg', vars.bg);
  root.style.setProperty('--card', vars.card);
  root.style.setProperty('--card-hover', vars.cardHover);
  root.style.setProperty('--border', vars.border);
  root.style.setProperty('--text', vars.text);
  root.style.setProperty('--muted', vars.muted);
  root.style.setProperty('--primary', vars.primary);
  root.style.setProperty('--secondary', vars.secondary);
  root.style.setProperty('--success', vars.success);
  root.style.setProperty('--warning', vars.warning);
  root.style.setProperty('--danger', vars.danger);
  if (vars.heroGradient) root.style.setProperty('--hero-gradient', vars.heroGradient);
  const density = settings?.density ?? 'normal';
  root.setAttribute('data-density', density);
}

const STORAGE_KEY = 'orbital-theme-settings';

export function loadThemeFromStorage(): ThemeSettings | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ThemeSettings;
  } catch {
    return null;
  }
}

export function saveThemeToStorage(settings: ThemeSettings) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {}
}
