import {
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { BehaviorSubject, fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'q-layout',
  template: `<div
      [class]="classes"
      tabindex="-1"
      #layoutContainer
    >
      <ng-content></ng-content>
    </div>

    <div
      *ngIf="container"
      class="q-layout-container overflow-hidden"
      #layoutContainer
    >
      <div class="absolute-full">
        <div class="scroll">
          <div [class]="classes" tabindex="-1">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div> `,
  standalone: true,
  imports: [CommonModule]
})
export class QLayoutComponent implements AfterViewInit, OnDestroy {
  @Inject(PLATFORM_ID) private platformId: any;

  @Input() container: boolean = false;
  @Input() view: string = 'hhh lpr fff';
  @Output() scroll = new EventEmitter<any>();
  @Output() scrollHeight = new EventEmitter<number>();
  @Output() resize = new EventEmitter<any>();

  @ViewChild('layoutContainer', { static: false })
  layoutContainerRef!: ElementRef;

  height$ = new BehaviorSubject<number>(0);
  width$ = new BehaviorSubject<number>(0);
  scrollInfo$ = new BehaviorSubject<any>({
    position: 0,
    direction: 'down',
    inflectionPoint: 0,
  });
  scrollbarWidth = new BehaviorSubject<number>(0);

  containerHeight$ = new BehaviorSubject<number>(0);
  private resizeSubscription!: Subscription;

  classes: string = '';
  style: any = {};
  targetStyle: any = {};
  targetChildStyle: any = {};

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeLayout();

      this.resizeSubscription = fromEvent(window, 'resize')
        .pipe(debounceTime(300))
        .subscribe(() => this.onResizeWindow());

      this.initializeObservers();
    }
  }

  initializeLayout() {
    this.height$.next(window.innerHeight);
    this.width$.next(window.innerWidth);

    this.classes = this.container
      ? 'q-layout q-layout--containerized'
      : 'q-layout q-layout--standard';
    this.style = this.container
      ? null
      : { minHeight: `${window.innerHeight}px` };
  }

  initializeObservers() {
    fromEvent(this.layoutContainerRef.nativeElement, 'scroll').subscribe(() =>
      this.onScrollPage()
    );

    fromEvent(window, 'resize').subscribe(() => this.onResizeWindow());
  }

  @HostListener('window:scroll', [])
  onScrollPage() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const scrollInfo = {
      position: scrollPosition,
      direction:
        scrollPosition > this.scrollInfo$.value.position ? 'down' : 'up',
      directionChanged: scrollPosition !== this.scrollInfo$.value.position,
      inflectionPoint: scrollPosition,
      delta: scrollPosition - this.scrollInfo$.value.position,
    };

    this.scrollInfo$.next(scrollInfo);
    this.scroll.emit(scrollInfo);
  }

  onResizeWindow() {
    const newHeight = window.innerHeight;
    const newWidth = window.innerWidth;

    if (newHeight !== this.height$.value) {
      this.height$.next(newHeight);
      this.scrollHeight.emit(newHeight);
      this.updateScrollbarWidth();
    }

    if (newWidth !== this.width$.value) {
      this.width$.next(newWidth);
    }

    this.resize.emit({ height: newHeight, width: newWidth });
  }

  updateScrollbarWidth() {
    const scrollbarWidth =
      this.height$.value > this.containerHeight$.value
        ? this.getScrollbarWidth()
        : 0;
    this.scrollbarWidth.next(scrollbarWidth);
  }

  getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  ngOnDestroy() {
    if (this.resizeSubscription) {
      this.resizeSubscription.unsubscribe();
    }
  }
}
