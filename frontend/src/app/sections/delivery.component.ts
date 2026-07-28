import { Component, Input } from '@angular/core';
import { Brand } from '../core/models';
import { RevealDirective } from '../shared/reveal.directive';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './delivery.component.html',
})
export class DeliveryComponent {
  @Input({ required: true }) brand!: Brand;
}
