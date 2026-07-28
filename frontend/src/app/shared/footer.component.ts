import { Component, Input } from '@angular/core';
import { Brand } from '../core/models';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <img [src]="brand.logoUrl" [alt]="brand.name" class="footer-logo-img" />
      <div class="links">
        <a href="#produk">Produk &amp; Harga</a>
        <br />
        <a href="#club">Happy Hydration Club</a>
        <br />
        <a [href]="brand.instagram.url" target="_blank" rel="noopener noreferrer">
          &#64;{{ brand.instagram.handle }}
        </a>
        <br />
        <a [href]="brand.whatsapp.link" target="_blank" rel="noopener noreferrer">
          WhatsApp {{ brand.whatsapp.displayNumber }}
        </a>
      </div>
      <p class="tiny">
        © {{ brand.copyrightYear }} {{ brand.name }} · {{ brand.tagline }} · Melayani {{ brand.serviceArea }}
      </p>
    </footer>
  `,
})
export class FooterComponent {
  @Input({ required: true }) brand!: Brand;
}
