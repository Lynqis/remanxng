import { animate, AnimationEvent, state, style, transition, trigger } from "@angular/animations";
import { DOCUMENT, isPlatformBrowser, NgIf, NgStyle } from "@angular/common";
import { booleanAttribute, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, Output, PLATFORM_ID, Renderer2, TemplateRef, ViewRef } from "@angular/core";
import { Dom, Nullable, VoidListener } from "@remanx/ui-ng/api";

@Component({
  selector: 'rx-popover',
  template: `
    <div
      #popover
      role="dialog"
      *ngIf="render"
      [@animation]="{
        value: overlayVisible ? 'open' : 'close', params: { showTransitionParams: showTransition, hideTransitionParams: hideTransition }
      }"
      (@animation.start)="onAnimationStart($event)"
      (@animation.done)="onAnimationEnd($event)"
      class="rx-popover"
      [ngStyle]="{ top: position?.top + 'px', left: position?.left + 'px', height: $height, width: $width }"
    >
      <div class="rx-mask">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, NgStyle],
  animations: [
    trigger('animation', [
      state(
        'void',
        style({
          transform: 'scaleY(0.8)',
          opacity: 0,
        })
      ),
      state(
        'close',
        style({
          opacity: 0,
        })
      ),
      state(
        'open',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      transition('void => open', animate('{{showTransitionParams}}')),
      transition('open => close', animate('{{hideTransitionParams}}')),
    ]),
  ],
  styleUrls: ['./popover.css']
})
export class RxPopover implements OnDestroy {
  @Input() ariaLabel: string | undefined;

  @Input({ transform: booleanAttribute }) closeOnOutside: boolean = true;

  @Input() appendTo: HTMLElement | ElementRef | TemplateRef<any> | string | null | undefined | any = 'body';

  @Input() $height: string = '';

  @Input() $width: string = '';

  @Output() onShow: EventEmitter<any> = new EventEmitter();

  showTransition: string = '.12s cubic-bezier(0, 0, 0.2, 1)';

  hideTransition: string = '.1s linear';

  documentClickListener: VoidListener;

  container: Nullable<HTMLDivElement>;

  target: any;

  overlayVisible: boolean = false;

  isAnimationInProgress: boolean = false;

  render: boolean = false;

  position: { top: number, left: number } | null = null;

  private readonly el: ElementRef = inject(ElementRef);

  private readonly renderer: Renderer2 = inject(Renderer2);

  private readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  private readonly platformId: any = inject(PLATFORM_ID);

  private readonly document: Document = inject(DOCUMENT);

  bindDocumentClickListener() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.documentClickListener) {
        const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;

        this.documentClickListener = this.renderer.listen(documentTarget, 'click', (event) => {
          if (!this.closeOnOutside) {
            return;
          }

          if (!this.container?.contains(event.target) && this.target !== event.target && !this.target.contains(event.target)) {
            this.hide();
          }

          this.cd.markForCheck();
      });
      }
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  toggle(event: any, target?: any) {
    if (this.isAnimationInProgress) {
      return;
    }
    if (this.overlayVisible) {
      this.hide();
    } else {
      this.show(event, target);
    }
  }

  show(event: any, target?: any) {
    target && event && event.stopPropagation();
    if (this.isAnimationInProgress) {
      return;
    }
    this.target = target || event.currentTarget || event.target;
    this.overlayVisible = true;
    this.render = true;
    this.cd.markForCheck();
    this.setPosition();
  }

  hide() {
    this.overlayVisible = false;
    this.cd.markForCheck();
  }

  setPosition() {
    if (!this.target || !this.container) return;

    const targetRect = this.target.getBoundingClientRect();
    const overlayRect = this.container.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = targetRect.left;
    let top = targetRect.bottom + window.scrollY;

    if (left + overlayRect.width > viewportWidth) {
      left = viewportWidth - overlayRect.width - 10;
    }

    if (top + overlayRect.height > viewportHeight + window.scrollY) {
      top = targetRect.top - overlayRect.height + window.scrollY;
    }

    this.position = { top, left };
    this.cd.detectChanges();
  }

  appendContainer() {
    if (this.appendTo) {
      if (this.appendTo === 'body') {
        this.renderer.appendChild(this.document.body, this.container);
      } else {
        Dom.appendChild(this.container, this.appendTo);
      }
    }
  }

  onAnimationStart(event: AnimationEvent) {
    if (event.toState === 'open') {
      this.container = event.element;
      this.bindDocumentClickListener();
      this.appendContainer();
      this.onShow.emit(null);
    }
    this.isAnimationInProgress = true;
  }

  onAnimationEnd(event: AnimationEvent) {
    switch (event.toState) {
      case 'void':
        break;

      case 'close':
        this.render = false;
        break;
    }

    this.isAnimationInProgress = false;
  }

  onContainerDestroy() {
    if (!(this.cd as ViewRef).destroyed) {
      this.target = null;
    }

    this.unbindDocumentClickListener();
  }

  ngOnDestroy() {
    if (this.container) {
      this.onContainerDestroy();
    }
  }
}
