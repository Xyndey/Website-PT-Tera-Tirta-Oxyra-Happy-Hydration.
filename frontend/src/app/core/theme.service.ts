import { Injectable, effect, signal } from '@angular/core';

const STORAGE_KEY = 'oxyra:theme';
type Theme = 'light' | 'dark';

function getInitialTheme(): Theme {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly themeSignal = signal<Theme>(getInitialTheme());
  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    effect(() => {
      const theme = this.themeSignal();
      document.documentElement.setAttribute('data-theme', theme);
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Abaikan jika localStorage tidak tersedia.
      }
    });
  }

  toggleTheme(): void {
    this.themeSignal.update((t) => (t === 'dark' ? 'light' : 'dark'));
  }
}
