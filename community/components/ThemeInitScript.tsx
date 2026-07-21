/**
 * Inline script runs before React to prevent theme flash. Reads localStorage and sets data-theme + CSS vars.
 */
const THEME_STORAGE_KEY = 'orbital-theme-settings';

const themeVars: Record<string, Record<string, string>> = {
  'orbital-dark': {
    '--bg': '#050816',
    '--card': 'rgba(15, 23, 42, 0.72)',
    '--card-hover': 'rgba(24, 36, 66, 0.9)',
    '--border': 'rgba(148, 163, 184, 0.16)',
    '--text': '#F8FAFC',
    '--muted': '#94A3B8',
    '--primary': '#4F8CFF',
    '--secondary': '#8B5CF6',
    '--success': '#22C55E',
    '--warning': '#F59E0B',
    '--danger': '#FB7185',
  },
  'light-orbit': {
    '--bg': '#F6F8FC',
    '--card': 'rgba(255, 255, 255, 0.88)',
    '--card-hover': 'rgba(248, 250, 252, 0.96)',
    '--border': 'rgba(15, 23, 42, 0.12)',
    '--text': '#0F172A',
    '--muted': '#475569',
    '--primary': '#2563EB',
    '--secondary': '#7C3AED',
    '--success': '#16A34A',
    '--warning': '#D97706',
    '--danger': '#DC2626',
  },
};

export function ThemeInitScript() {
  const script = `
(function() {
  var key = '${THEME_STORAGE_KEY}';
  try {
    var raw = localStorage.getItem(key);
    if (raw) {
      var s = JSON.parse(raw);
      var theme = s.theme || 'orbital-dark';
      var root = document.documentElement;
      root.setAttribute('data-theme', theme);
      if (s.density) root.setAttribute('data-density', s.density);
      if (theme === 'custom' && s.primary) {
        root.style.setProperty('--bg', s.bg || '#050816');
        root.style.setProperty('--card', s.card || 'rgba(15, 23, 42, 0.72)');
        root.style.setProperty('--card-hover', s.cardHover || 'rgba(24, 36, 66, 0.9)');
        root.style.setProperty('--border', s.border || 'rgba(148, 163, 184, 0.16)');
        root.style.setProperty('--text', s.text || '#F8FAFC');
        root.style.setProperty('--muted', s.muted || '#94A3B8');
        root.style.setProperty('--primary', s.primary || '#4F8CFF');
        root.style.setProperty('--secondary', s.secondary || '#8B5CF6');
      } else {
        var vars = ${JSON.stringify(themeVars)};
        var t = vars[theme] || vars['orbital-dark'];
        for (var k in t) root.style.setProperty(k, t[k]);
      }
    }
  } catch (e) {}
})();
`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
