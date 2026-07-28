import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
}

let idCounter = 0;

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toastsSignal = signal<Toast[]>([]);
  readonly toasts = this.toastsSignal.asReadonly();

  show(message: string, durationMs = 2400): void {
    const id = ++idCounter;
    this.toastsSignal.update((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      this.toastsSignal.update((prev) => prev.filter((t) => t.id !== id));
    }, durationMs);
  }
}
