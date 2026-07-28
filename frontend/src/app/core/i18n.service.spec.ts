import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(I18nService);
    service.setLanguage('id');
  });

  it('defaults to Indonesian', () => {
    expect(service.language()).toBe('id');
  });

  it('resolves nested translation keys', () => {
    expect(service.t('cart.title')).toBe('Keranjang');
  });

  it('returns the key itself when no translation is found', () => {
    expect(service.t('not.a.real.key')).toBe('not.a.real.key');
  });

  it('toggles between id and en', () => {
    service.toggleLanguage();
    expect(service.language()).toBe('en');
    expect(service.t('cart.title')).toBe('Cart');

    service.toggleLanguage();
    expect(service.language()).toBe('id');
  });
});
