import { Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-turn',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="turn" class="sec snap-sec">
      <div class="inner-sm">
        <p class="rv">Lalu — tegukan pertama.</p>
      </div>
    </section>
  `,
})
export class TurnComponent {}
