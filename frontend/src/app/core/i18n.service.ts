import { Injectable, computed, effect, signal } from '@angular/core';
import { ID_DICT } from './i18n/id';
import { EN_DICT } from './i18n/en';

const STORAGE_KEY = 'oxyra:lang';
export type Language = 'id' | 'en';

const DICTIONARIES = { id: ID_DICT, en: EN_DICT };

function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === 'en' || saved === 'id' ? saved : 'id';
  } catch {
    return 'id';
  }
}

function resolvePath(dict: unknown, path: string): string {
  const value = path
    .split('.')
    .reduce<unknown>((acc, key) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[key] : undefined), dict);
  return typeof value === 'string' ? value : path;
}

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly languageSignal = signal<Language>(getInitialLanguage());
  readonly language = this.languageSignal.asReadonly();

  readonly dict = computed(() => DICTIONARIES[this.languageSignal()]);

  constructor() {
    effect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, this.languageSignal());
      } catch {
        // Abaikan jika localStorage tidak tersedia.
      }
    });
  }

  t(path: string): string {
    return resolvePath(this.dict(), path);
  }

  setLanguage(lang: Language): void {
    this.languageSignal.set(lang);
  }

  toggleLanguage(): void {
    this.languageSignal.update((l) => (l === 'id' ? 'en' : 'id'));
  }
}
