import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/api.service';
import { LabReport } from '../core/models';
import { RevealDirective } from '../shared/reveal.directive';

type Status = 'loading' | 'ready' | 'error';

@Component({
  selector: 'app-lab-report',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  templateUrl: './lab-report.component.html',
})
export class LabReportComponent implements OnInit {
  readonly report = signal<LabReport | null>(null);
  readonly status = signal<Status>('loading');

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.api.getLabReport().subscribe({
      next: (data) => {
        this.report.set(data);
        this.status.set('ready');
      },
      error: () => this.status.set('error'),
    });
  }
}
