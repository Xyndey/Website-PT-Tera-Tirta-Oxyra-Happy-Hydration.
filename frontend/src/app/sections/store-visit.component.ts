import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Brand } from '../core/models';
import { RevealDirective } from '../shared/reveal.directive';
import { I18nService } from '../core/i18n.service';

const MAPS_QUERY = encodeURIComponent('OXYRA Air Minum Isi Ulang Premium Batam');
const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;

@Component({
  selector: 'app-store-visit',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './store-visit.component.html',
})
export class StoreVisitComponent {
  @Input({ required: true }) brand!: Brand;

  readonly mapsUrl = MAPS_URL;

  constructor(readonly i18n: I18nService) {}
}
