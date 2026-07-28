import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Brand } from '../../core/models';
import { CartService } from '../../core/cart.service';
import { ThemeService } from '../../core/theme.service';
import { I18nService } from '../../core/i18n.service';

interface NavLink {
  href: string;
  key: string;
}

const NAV_LINKS: NavLink[] = [
  { href: '#hot', key: 'nav.home' },
  { href: '#kenapa', key: 'nav.why' },
  { href: '#produk', key: 'nav.products' },
  { href: '#club', key: 'nav.community' },
  { href: '#toko', key: 'nav.store' },
  { href: '#bukti', key: 'nav.lab' },
  { href: '#testimoni', key: 'nav.testimonials' },
];

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input({ required: true }) brand!: Brand;
  @Output() openCart = new EventEmitter<void>();

  readonly navLinks = NAV_LINKS;
  readonly mobileOpen = signal(false);

  constructor(
    readonly cart: CartService,
    readonly themeService: ThemeService,
    readonly i18n: I18nService
  ) {}

  toggleMobileMenu(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.mobileOpen.set(false);
  }
}
