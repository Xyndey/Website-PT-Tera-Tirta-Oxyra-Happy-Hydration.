import { Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-hot',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="hot" class="sec snap-sec">
      <div class="floating-droplet" style="left: 18%; top: 35%; animation-delay: 0.5s;"></div>
      <div class="floating-droplet" style="right: 22%; top: 25%; width: 16px; height: 20px; animation-delay: 2.1s;"></div>

      <div class="inner-sm">
        <div class="time">12:47 · BATAM · 34°C</div>
        <h1><span>Panas</span> tidak menunggu siapa-siapa.</h1>
        <p class="desc">Lampu merah. Helm. Shift siang. Kerongkonganmu sudah tahu apa yang kurang.</p>
        <div class="cue">Turun untuk lega</div>
      </div>
    </section>
  `,
})
export class HotComponent {}
