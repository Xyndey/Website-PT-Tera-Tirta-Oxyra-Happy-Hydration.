import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../core/api.service';
import { Club } from '../core/models';
import { RevealDirective } from '../shared/reveal.directive';
import { SkeletonCardComponent } from '../shared/skeleton-card.component';

type Status = 'loading' | 'ready' | 'error';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [CommonModule, RevealDirective, SkeletonCardComponent],
  templateUrl: './club.component.html',
})
export class ClubComponent implements OnInit {
  readonly club = signal<Club | null>(null);
  readonly status = signal<Status>('loading');

  constructor(private readonly api: ApiService) {}

  ngOnInit(): void {
    this.api.getClub().subscribe({
      next: (data) => {
        this.club.set(data);
        this.status.set('ready');
      },
      error: () => this.status.set('error'),
    });
  }
}
