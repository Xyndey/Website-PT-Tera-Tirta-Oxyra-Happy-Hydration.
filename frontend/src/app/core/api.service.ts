import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Brand,
  Club,
  CreateOrderPayload,
  LabReport,
  OrderResult,
  Product,
  ProductCategory,
  Testimonial,
  WhyReason,
} from './models';
import {
  FALLBACK_BRAND,
  FALLBACK_CATEGORIES,
  FALLBACK_CLUB,
  FALLBACK_LAB_REPORT,
  FALLBACK_PRODUCTS,
  FALLBACK_TESTIMONIALS,
  FALLBACK_WHY,
} from './fallback-data';

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

/**
 * Wraps every read endpoint with a fallback to static local fixtures, so
 * the storefront always renders correctly even if the backend is offline
 * — useful for demos, static hosting, or first-time local setup.
 */
@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  private withFallback<T>(request: Observable<ApiEnvelope<T>>, fallback: T): Observable<T> {
    return request.pipe(
      map((res) => res.data),
      catchError((err) => {
        // eslint-disable-next-line no-console
        console.warn('[OXYRA API] Menggunakan data cadangan lokal:', err?.message ?? err);
        return of(fallback);
      })
    );
  }

  getBrand(): Observable<Brand> {
    return this.withFallback(this.http.get<ApiEnvelope<Brand>>(`${this.baseUrl}/brand`), FALLBACK_BRAND);
  }

  getProducts(params: { category?: string; q?: string } = {}): Observable<Product[]> {
    const query = new URLSearchParams();
    if (params.category) query.set('category', params.category);
    if (params.q) query.set('q', params.q);
    const qs = query.toString();

    return this.withFallback(
      this.http.get<ApiEnvelope<Product[]>>(`${this.baseUrl}/products${qs ? `?${qs}` : ''}`),
      FALLBACK_PRODUCTS
    );
  }

  getCategories(): Observable<ProductCategory[]> {
    return this.withFallback(
      this.http.get<ApiEnvelope<ProductCategory[]>>(`${this.baseUrl}/products/categories`),
      FALLBACK_CATEGORIES
    );
  }

  getWhyOxyra(): Observable<WhyReason[]> {
    return this.withFallback(this.http.get<ApiEnvelope<WhyReason[]>>(`${this.baseUrl}/why`), FALLBACK_WHY);
  }

  getClub(): Observable<Club> {
    return this.withFallback(this.http.get<ApiEnvelope<Club>>(`${this.baseUrl}/club`), FALLBACK_CLUB);
  }

  getTestimonials(): Observable<Testimonial[]> {
    return this.withFallback(
      this.http.get<ApiEnvelope<Testimonial[]>>(`${this.baseUrl}/testimonials`),
      FALLBACK_TESTIMONIALS
    );
  }

  getLabReport(): Observable<LabReport> {
    return this.withFallback(
      this.http.get<ApiEnvelope<LabReport>>(`${this.baseUrl}/lab-report`),
      FALLBACK_LAB_REPORT
    );
  }

  createOrder(payload: CreateOrderPayload): Observable<OrderResult> {
    return this.http
      .post<ApiEnvelope<OrderResult>>(`${this.baseUrl}/orders`, payload)
      .pipe(map((res) => res.data));
  }

  submitContact(payload: { name: string; phone: string; email?: string; topic?: string; message: string }) {
    return this.http.post<ApiEnvelope<unknown>>(`${this.baseUrl}/contact`, payload).pipe(map((res) => res.data));
  }
}
