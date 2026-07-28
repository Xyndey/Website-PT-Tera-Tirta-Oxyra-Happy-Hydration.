import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Dot {
  id: string;
  label: string;
}

const DOTS: Dot[] = [
  { id: 'hot', label: '01 · Panas 34°C' },
  { id: 'dry', label: '02 · Dahaga' },
  { id: 'turn', label: '03 · Transisi' },
  { id: 'relief', label: '04 · Step Into Wonder' },
];

@Component({
  selector: 'app-snap-dots',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="snap-dots" [style.opacity]="visible ? 1 : 0">
      <a
        *ngFor="let dot of dots"
        [href]="'#' + dot.id"
        class="snap-dot"
        [class.active]="activeSection === dot.id"
        [attr.data-label]="dot.label"
        [attr.aria-label]="'Menuju bagian ' + dot.label"
      ></a>
    </div>
  `,
})
export class SnapDotsComponent {
  @Input({ required: true }) activeSection!: string;
  @Input({ required: true }) visible!: boolean;

  readonly dots = DOTS;
}
