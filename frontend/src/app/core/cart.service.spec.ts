import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { Product } from './models';

const sampleProduct: Product = {
  id: 'refill-mineral-19l',
  category: 'refill',
  badge: 'MINERAL · 19L',
  badgeVariant: 'default',
  name: 'Air Mineral',
  volumeLabel: 'Isi Ulang Galon 19 Liter',
  price: 10000,
  priceLabel: 'Rp 10.000',
  unit: '/ galon',
  description: 'Air mineral murni.',
  image: null,
  orderLink: 'https://wa.me/628117710369',
};

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    service.clearCart();
  });

  it('starts empty', () => {
    expect(service.items().length).toBe(0);
    expect(service.totalItems()).toBe(0);
    expect(service.subtotal()).toBe(0);
  });

  it('adds an item', () => {
    service.addItem(sampleProduct, 2);
    expect(service.items().length).toBe(1);
    expect(service.totalItems()).toBe(2);
    expect(service.subtotal()).toBe(20000);
  });

  it('merges quantity when adding the same product twice', () => {
    service.addItem(sampleProduct, 1);
    service.addItem(sampleProduct, 3);
    expect(service.items().length).toBe(1);
    expect(service.totalItems()).toBe(4);
  });

  it('updates quantity, removing the line when it drops to zero', () => {
    service.addItem(sampleProduct, 2);
    service.updateQuantity(sampleProduct.id, 5);
    expect(service.totalItems()).toBe(5);

    service.updateQuantity(sampleProduct.id, 0);
    expect(service.items().length).toBe(0);
  });

  it('removes an item', () => {
    service.addItem(sampleProduct, 1);
    service.removeItem(sampleProduct.id);
    expect(service.items().length).toBe(0);
  });

  it('clears the cart', () => {
    service.addItem(sampleProduct, 1);
    service.clearCart();
    expect(service.items().length).toBe(0);
  });
});
