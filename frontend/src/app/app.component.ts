import { AfterViewInit, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApiService } from './core/api.service';
import { Brand } from './core/models';
import { FALLBACK_BRAND } from './core/fallback-data';
import { ScrollPhysicsService } from './core/scroll-physics.service';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { InstrumentsComponent } from './shared/instruments.component';
import { SnapDotsComponent } from './shared/snap-dots.component';
import { FooterComponent } from './shared/footer.component';
import { CartDrawerComponent } from './shared/cart-drawer/cart-drawer.component';
import { CheckoutModalComponent } from './shared/checkout-modal/checkout-modal.component';
import { ToastStackComponent } from './shared/toast-stack.component';

import { HotComponent } from './sections/hot.component';
import { DryComponent } from './sections/dry.component';
import { TurnComponent } from './sections/turn.component';
import { ReliefComponent } from './sections/relief.component';
import { ManifestoComponent } from './sections/manifesto.component';
import { WhyOxyraComponent } from './sections/why-oxyra.component';
import { ProductsComponent } from './sections/products.component';
import { ClubComponent } from './sections/club.component';
import { StoreVisitComponent } from './sections/store-visit.component';
import { TestimonialsComponent } from './sections/testimonials.component';
import { LabReportComponent } from './sections/lab-report.component';
import { DeliveryComponent } from './sections/delivery.component';
import { ClosingComponent } from './sections/closing.component';

@Component({
  selector: 'oxyra-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    InstrumentsComponent,
    SnapDotsComponent,
    FooterComponent,
    CartDrawerComponent,
    CheckoutModalComponent,
    ToastStackComponent,
    HotComponent,
    DryComponent,
    TurnComponent,
    ReliefComponent,
    ManifestoComponent,
    WhyOxyraComponent,
    ProductsComponent,
    ClubComponent,
    StoreVisitComponent,
    TestimonialsComponent,
    LabReportComponent,
    DeliveryComponent,
    ClosingComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  readonly brand = signal<Brand>(FALLBACK_BRAND);
  readonly cartOpen = signal(false);
  readonly checkoutOpen = signal(false);

  constructor(
    private readonly api: ApiService,
    readonly scrollPhysics: ScrollPhysicsService
  ) {}

  ngOnInit(): void {
    this.api.getBrand().subscribe((brand) => {
      this.brand.set(brand);
      document.title = `${brand.name} — ${brand.tagline}`;
    });
  }

  ngAfterViewInit(): void {
    this.scrollPhysics.start();
  }

  ngOnDestroy(): void {
    this.scrollPhysics.stop();
  }

  openCart(): void {
    this.cartOpen.set(true);
  }

  closeCart(): void {
    this.cartOpen.set(false);
  }

  openCheckout(): void {
    this.cartOpen.set(false);
    this.checkoutOpen.set(true);
  }

  closeCheckout(): void {
    this.checkoutOpen.set(false);
  }
}
