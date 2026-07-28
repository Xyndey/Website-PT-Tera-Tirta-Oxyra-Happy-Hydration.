import { Component } from '@angular/core';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-manifesto',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './manifesto.component.html',
})
export class ManifestoComponent {}
