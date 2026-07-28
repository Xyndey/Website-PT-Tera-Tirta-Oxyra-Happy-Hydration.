import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/api.service';
import { WhyReason } from '../core/models';
import { RevealDirective } from '../shared/reveal.directive';
import { IconComponent } from '../shared/icon.component';
import { SkeletonCardComponent } from '../shared/skeleton-card.component';

type Status = 'loading' | 'ready' | 'error';

@Component({
  selector: 'app-why-oxyra',
  standalone: true,
  imports: [CommonModule, RevealDirective, IconComponent, SkeletonCardComponent],
  templateUrl: './why-oxyra.component.html',
})
export class WhyOxyraComponent implements OnInit {
  readonly reasons = signal<WhyReason[]>([]);
  readonly status = signal<Status>('loading');

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.api.getWhyOxyra().subscribe({
      next: (data) => {
        this.reasons.set(data);
        this.status.set('ready');
      },
      error: () => this.status.set('error'),
    });
  }
}
