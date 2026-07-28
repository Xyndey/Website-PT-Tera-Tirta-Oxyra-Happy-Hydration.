import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/api.service';
import { Testimonial } from '../core/models';
import { RevealDirective } from '../shared/reveal.directive';
import { SkeletonCardComponent } from '../shared/skeleton-card.component';

type Status = 'loading' | 'ready' | 'error';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, RevealDirective, SkeletonCardComponent],
  templateUrl: './testimonials.component.html',
})
export class TestimonialsComponent implements OnInit {
  readonly testimonials = signal<Testimonial[]>([]);
  readonly status = signal<Status>('loading');

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.api.getTestimonials().subscribe({
      next: (data) => {
        this.testimonials.set(data);
        this.status.set('ready');
      },
      error: () => this.status.set('error'),
    });
  }

  stars(rating: number): string {
    return '⭐'.repeat(rating);
  }
}
