import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Attach via the `rv` CSS class (kept identical to the original prototype's
 * class name so the ported global.css reveal animation "just works").
 * Adds `.vis` once the element scrolls into view, then disconnects.
 */
@Directive({
  selector: '.rv',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const node = this.el.nativeElement;

    if (!('IntersectionObserver' in window)) {
      node.classList.add('vis');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('vis');
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
