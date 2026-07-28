import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-instruments',
  standalone: true,
  template: `
    <div id="temp-pill">{{ temperature }}</div>
    <div id="gauge">
      <div id="gauge-fill" [style.height.%]="gaugePercent"></div>
    </div>
    <div id="mock-label">MOCK · DATA ILUSTRASI · INTERNAL</div>
  `,
})
export class InstrumentsComponent {
  @Input({ required: true }) temperature!: string;
  @Input({ required: true }) gaugePercent!: number;
}
