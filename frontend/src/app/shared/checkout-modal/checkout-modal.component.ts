import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/cart.service';
import { I18nService } from '../../core/i18n.service';
import { ApiService } from '../../core/api.service';
import { OrderResult } from '../../core/models';

interface CheckoutForm {
  customerName: string;
  phone: string;
  address: string;
  notes: string;
}

const EMPTY_FORM: CheckoutForm = { customerName: '', phone: '', address: '', notes: '' };

@Component({
  selector: 'app-checkout-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout-modal.component.html',
})
export class CheckoutModalComponent {
  @Input() open = false;
  @Output() closeModal = new EventEmitter<void>();

  form: CheckoutForm = { ...EMPTY_FORM };
  readonly submitting = signal(false);
  readonly error = signal('');
  readonly result = signal<OrderResult | null>(null);

  constructor(
    readonly cart: CartService,
    readonly i18n: I18nService,
    private readonly api: ApiService
  ) {}

  handleSubmit(): void {
    this.error.set('');
    this.submitting.set(true);

    const payload = {
      ...this.form,
      items: this.cart.items().map((line) => ({ productId: line.product.id, quantity: line.quantity })),
    };

    this.api.createOrder(payload).subscribe({
      next: (res) => {
        this.result.set(res);
        this.cart.clearCart();
        this.submitting.set(false);
      },
      error: (err) => {
        this.error.set(err?.error?.error?.message || err?.message || 'Gagal membuat pesanan.');
        this.submitting.set(false);
      },
    });
  }

  handleClose(): void {
    this.result.set(null);
    this.error.set('');
    this.form = { ...EMPTY_FORM };
    this.closeModal.emit();
  }
}
