import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * A shimmering placeholder shown while async section content loads, so
 * the layout doesn't jump and the wait feels intentional rather than
 * broken. Renders `count` copies in a row.
 */
@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-grid" [attr.aria-hidden]="true">
      <div class="skeleton-card" *ngFor="let i of counter(count)">
        <div class="skeleton-block skeleton-media" *ngIf="variant === 'product'"></div>
        <div class="skeleton-block skeleton-line skeleton-line--title"></div>
        <div class="skeleton-block skeleton-line skeleton-line--wide"></div>
        <div class="skeleton-block skeleton-line skeleton-line--short"></div>
      </div>
    </div>
  `,
})
export class SkeletonCardComponent {
  @Input() count = 3;
  @Input() variant: 'product' | 'line' = 'product';

  counter(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
}
