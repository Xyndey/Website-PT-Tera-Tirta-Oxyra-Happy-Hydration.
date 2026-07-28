import { Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-closing',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="closing" class="sec">
      <div class="inner rv">
        <p class="sign-off">Stay <em>OXY</em>, Stay <em>Happy.</em></p>
        <p class="mini">OXYRA · Batam, Indonesia</p>
      </div>
      <div class="splash-strip" aria-hidden="true">
        <div class="bar"></div>
      </div>
    </section>
  `,
})
export class ClosingComponent {}
