import { Injectable, computed, signal } from '@angular/core';
import { CartLine, Product } from './models';

const STORAGE_KEY = 'oxyra:cart:v1';

function loadInitialCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSignal = signal<CartLine[]>(loadInitialCart());

  readonly items = this.itemsSignal.asReadonly();

  readonly totalItems = computed(() => this.itemsSignal().reduce((sum, line) => sum + line.quantity, 0));

  readonly subtotal = computed(() =>
    this.itemsSignal().reduce((sum, line) => sum + line.product.price * line.quantity, 0)
  );

  private persist(lines: CartLine[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // localStorage tidak tersedia (mode privat, dsb) — keranjang tetap
      // berfungsi untuk sesi berjalan meski tidak persisten.
    }
  }

  addItem(product: Product, quantity = 1): void {
    this.itemsSignal.update((prev) => {
      const existing = prev.find((line) => line.product.id === product.id);
      const next = existing
        ? prev.map((line) =>
            line.product.id === product.id
              ? { ...line, quantity: Math.min(999, line.quantity + quantity) }
              : line
          )
        : [...prev, { product, quantity: Math.min(999, quantity) }];
      this.persist(next);
      return next;
    });
  }

  removeItem(productId: string): void {
    this.itemsSignal.update((prev) => {
      const next = prev.filter((line) => line.product.id !== productId);
      this.persist(next);
      return next;
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    this.itemsSignal.update((prev) => {
      const next =
        quantity <= 0
          ? prev.filter((line) => line.product.id !== productId)
          : prev.map((line) =>
              line.product.id === productId ? { ...line, quantity: Math.min(999, quantity) } : line
            );
      this.persist(next);
      return next;
    });
  }

  clearCart(): void {
    this.itemsSignal.set([]);
    this.persist([]);
  }
}
