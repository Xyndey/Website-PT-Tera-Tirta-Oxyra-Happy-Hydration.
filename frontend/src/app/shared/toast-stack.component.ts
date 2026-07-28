import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../core/toast.service';

@Component({
  selector: 'app-toast-stack',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-stack" role="status" aria-live="polite" *ngIf="toastService.toasts().length > 0">
      <div class="toast-item" *ngFor="let toast of toastService.toasts()">
        {{ toast.message }}
      </div>
    </div>
  `,
})
export class ToastStackComponent {
  constructor(readonly toastService: ToastService) {}
}
