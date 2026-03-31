export interface Theme {
  id: string
  name: string
  background: string
  backgroundSecondary: string
  text: string
  textMuted: string
  accent: string
  accentText: string
  border: string
}

export const THEMES: Record<string, Theme> = {
  dark: {
    id: 'dark',
    name: 'Dark',
    background: '#0f0c29',
    backgroundSecondary: '#302b63',
    text: '#ffffff',
    textMuted: '#9ca3af',
    accent: '#a78bfa',
    accentText: '#ffffff',
    border: '#4c1d95',
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean',
    background: '#0c1445',
    backgroundSecondary: '#1a237e',
    text: '#ffffff',
    textMuted: '#90caf9',
    accent: '#40c4ff',
    accentText: '#0c1445',
    border: '#1565c0',
  },
  forest: {
    id: 'forest',
    name: 'Forest',
    background: '#1b2f1b',
    backgroundSecondary: '#2d4a2d',
    text: '#ffffff',
    textMuted: '#a5d6a7',
    accent: '#69f0ae',
    accentText: '#1b2f1b',
    border: '#2e7d32',
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    background: '#3e1a0e',
    backgroundSecondary: '#6d2c0e',
    text: '#ffffff',
    textMuted: '#ffcc80',
    accent: '#ff7043',
    accentText: '#ffffff',
    border: '#bf360c',
  },
  light: {
    id: 'light',
    name: 'Light',
    background: '#ffffff',
    backgroundSecondary: '#f3f4f6',
    text: '#111827',
    textMuted: '#6b7280',
    accent: '#6366f1',
    accentText: '#ffffff',
    border: '#e5e7eb',
  },
  slate: {
    id: 'slate',
    name: 'Slate',
    background: '#0f172a',
    backgroundSecondary: '#1e293b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    accent: '#38bdf8',
    accentText: '#0f172a',
    border: '#334155',
  },
}

export const DEFAULT_THEME = 'dark'

export function getTheme(id?: string): Theme {
  return THEMES[id ?? DEFAULT_THEME] ?? THEMES[DEFAULT_THEME]
}

// Language colors for GitHub card template
export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Rust: '#dea584',
  Go: '#00ADD8',
  Java: '#b07219',
  Ruby: '#701516',
  PHP: '#4F5D95',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  'C++': '#f34b7d',
  C: '#555555',
  Shell: '#89e051',
}
