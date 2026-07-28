import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/cart.service';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-drawer.component.html',
})
export class CartDrawerComponent {
  @Input() open = false;
  @Output() closeDrawer = new EventEmitter<void>();
  @Output() checkout = new EventEmitter<void>();

  constructor(
    readonly cart: CartService,
    readonly i18n: I18nService
  ) {}

  formatRupiah(value: number): string {
    return `Rp ${Number(value || 0).toLocaleString('id-ID')}`;
  }
}
