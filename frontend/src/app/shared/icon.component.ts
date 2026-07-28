import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg *ngIf="name === 'droplet'" viewBox="0 0 24 24">
      <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
      <path d="M12 8v4" />
      <path d="M10 10h4" />
    </svg>
    <svg *ngIf="name === 'bolt'" viewBox="0 0 24 24">
      <circle cx="14" cy="4" r="2" />
      <path d="M16 10l-4 4-3-3-4 4" />
      <path d="M16 10h3v3" />
      <path d="M3 17h4" />
      <path d="M2 13h5" />
    </svg>
    <svg *ngIf="name === 'heart'" viewBox="0 0 24 24">
      <path
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
      />
    </svg>
    <svg *ngIf="name === 'check'" viewBox="0 0 24 24">
      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  `,
})
export class IconComponent {
  @Input({ required: true }) name!: 'droplet' | 'bolt' | 'heart' | 'check';
}
