import { Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-dry',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="dry" class="sec snap-sec">
      <div class="floating-droplet" style="left: 30%; top: 40%; width: 14px; height: 18px; animation-delay: 1.2s;"></div>
      <div class="inner-sm">
        <p class="main-text rv">Sebagian besar air hanya membasahi. Tidak semua air menyelesaikan dahaga.</p>
      </div>
    </section>
  `,
})
export class DryComponent {}
