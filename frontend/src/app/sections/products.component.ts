import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { ApiService } from '../core/api.service';
import { Product, ProductCategory } from '../core/models';
import { CartService } from '../core/cart.service';
import { ToastService } from '../core/toast.service';
import { I18nService } from '../core/i18n.service';
import { RevealDirective } from '../shared/reveal.directive';
import { SkeletonCardComponent } from '../shared/skeleton-card.component';

type Status = 'loading' | 'ready' | 'error';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RevealDirective, SkeletonCardComponent],
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  readonly products = signal<Product[]>([]);
  readonly categories = signal<ProductCategory[]>([]);
  readonly activeTab = signal('all');
  readonly status = signal<Status>('loading');

  readonly visibleProducts = computed(() => {
    const tab = this.activeTab();
    const all = this.products();
    return tab === 'all' ? all : all.filter((p) => p.category === tab);
  });

  constructor(
    private readonly api: ApiService,
    readonly cart: CartService,
    private readonly toast: ToastService,
    readonly i18n: I18nService
  ) {}

  ngOnInit(): void {
    forkJoin({ products: this.api.getProducts(), categories: this.api.getCategories() }).subscribe({
      next: ({ products, categories }) => {
        this.products.set(products);
        this.categories.set(categories);
        this.status.set('ready');
      },
      error: () => this.status.set('error'),
    });
  }

  setTab(tabId: string): void {
    this.activeTab.set(tabId);
  }

  handleAddToCart(product: Product): void {
    this.cart.addItem(product, 1);
    this.toast.show(`${product.name} ditambahkan ke ${this.i18n.t('cart.title').toLowerCase()}!`);
  }
}
