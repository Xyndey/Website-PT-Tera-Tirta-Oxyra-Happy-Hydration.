import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { DropfieldAnimation } from '../shared/dropfield-animation';
import { ScrollPhysicsService } from '../core/scroll-physics.service';

@Component({
  selector: 'app-relief',
  standalone: true,
  templateUrl: './relief.component.html',
})
export class ReliefComponent implements AfterViewInit, OnDestroy {
  @Input() crystallized = false;

  @ViewChild('reliefSection', { static: true }) sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('wonderCanvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('flakeImg', { static: true }) flakeRef!: ElementRef<HTMLImageElement>;

  private animation?: DropfieldAnimation;

  constructor(readonly scrollPhysics: ScrollPhysicsService) {}

  ngAfterViewInit(): void {
    this.animation = new DropfieldAnimation(
      this.canvasRef.nativeElement,
      this.sectionRef.nativeElement,
      this.flakeRef.nativeElement
    );
    this.animation.start();
  }

  ngOnDestroy(): void {
    this.animation?.destroy();
  }
}
