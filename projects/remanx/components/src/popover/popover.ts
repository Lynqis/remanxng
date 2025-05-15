import {
  animate,
  AnimationEvent,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { isPlatformBrowser, NgClass, NgStyle } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Input,
  NgZone,
  numberAttribute,
  OnDestroy,
  Output,
  TemplateRef,
  ViewEncapsulation,
  ViewRef,
} from '@angular/core';
import { BaseComponent } from '../base/basecomponent';
import { Dom, Nullable, TemplateNull, VoidListener, ZIndexUtils } from '@lynqis/remanxng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rx-popover',
  standalone: true,
  imports: [NgClass, NgStyle],
  template: `
    @if (render) {
      <div
        class="rx-popover"
        [ngClass]="$class"
        [ngStyle]="$style"
        (click)="onOverlayClick($event)"
        [@animation]="{
          value: overlayVisible ? 'open' : 'close',
          params: {
            showTransitionParams: showTransitionOptions,
            hideTransitionParams: hideTransitionOptions
          }
        }"
        (@animation.start)="onAnimationStart($event)"
        (@animation.done)="onAnimationEnd($event)"
        role="dialog"
        [attr.aria-modal]="overlayVisible"
        [attr.aria-label]="ariaLabel"
        [attr.aria-labelledBy]="ariaLabelledBy"
      >
        <div
          class="rx-popover-content"
          (click)="onContentClick($event)"
          (mousedown)="onContentClick($event)"
        >
          <ng-content></ng-content>
        </div>
      </div>
    }
  `,
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./popover.css'],
})
export class RxPopover
  extends BaseComponent
  implements OnDestroy
{
    @Input() ariaLabel: string | undefined;
  @Input() ariaLabelledBy: string | undefined;
  @Input({ transform: booleanAttribute }) dismissable: boolean = true;
  @Input() $style: { [klass: string]: any } | null | undefined;
  @Input() $class: string | undefined;
  @Input() appendTo:
    | HTMLElement
    | ElementRef
    | TemplateRef<any>
    | string
    | null
    | undefined
    | any = 'body';
  @Input({ transform: booleanAttribute }) autoZIndex: boolean = true;
  @Input() ariaCloseLabel: string | undefined;
  @Input({ transform: numberAttribute }) baseZIndex: number = 0;
  @Input({ transform: booleanAttribute }) focusOnShow: boolean = true;
  @Input() showTransitionOptions: string = '.12s cubic-bezier(0, 0, 0.2, 1)';
  @Input() hideTransitionOptions: string = '.1s linear';
  @Output() onShow: EventEmitter<any> = new EventEmitter();
  @Output() onHide: EventEmitter<any> = new EventEmitter<any>();

  container: Nullable<HTMLDivElement>;

  overlayVisible: boolean = false;

  render: boolean = false;

  isOverlayAnimationInProgress: boolean = false;

  selfClick: boolean = false;

  documentClickListener: VoidListener;

  target: any;

  willHide: Nullable<boolean>;

  documentResizeListener: VoidListener;

  @ContentChild('headless', { descendants: false }) contentTemplate: TemplateNull<any>;

  destroyCallback: Nullable<Function>;

  overlayEventListener: Nullable<(event?: any) => void>;

  overlaySubscription: Subscription | undefined;

  zone = inject(NgZone);

  bindDocumentClickListener() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.documentClickListener) {
        let documentEvent = 'click';
        const documentTarget: any = this.el
          ? this.el.nativeElement.ownerDocument
          : this.document;

        this.documentClickListener = this.renderer.listen(
          documentTarget,
          documentEvent,
          (event) => {
            if (!this.dismissable) {
              return;
            }

            if (
              !this.container?.contains(event.target) &&
              this.target !== event.target &&
              !this.target.contains(event.target) &&
              !this.selfClick
            ) {
              this.hide();
            }

            this.selfClick = false;
            this.cd.markForCheck();
          }
        );
      }
    }
  }

  unbindDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
      this.selfClick = false;
    }
  }

  toggle(event: any, target?: any) {
    if (this.isOverlayAnimationInProgress) {
      return;
    }

    if (this.overlayVisible) {
      if (this.hasTargetChanged(event, target)) {
        this.destroyCallback = () => {
          this.show(null, target || event.currentTarget || event.target);
        };
      }

      this.hide();
    } else {
      this.show(event, target);
    }
  }

  show(event: any, target?: any) {
    target && event && event.stopPropagation();
    if (this.isOverlayAnimationInProgress) {
      return;
    }

    this.target = target || event.currentTarget || event.target;
    this.overlayVisible = true;
    this.render = true;
    this.cd.markForCheck();
  }

  onOverlayClick(event: MouseEvent) {
    this.selfClick = true;
  }

  onContentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    this.selfClick =
      event.offsetX < targetElement.clientWidth &&
      event.offsetY < targetElement.clientHeight;
  }

  hasTargetChanged(event: any, target: any) {
    return (
      this.target != null &&
      this.target !== (target || event.currentTarget || event.target)
    );
  }

  appendContainer() {
    if (this.appendTo) {
      if (this.appendTo === 'body')
        this.renderer.appendChild(this.document.body, this.container);
      else Dom.appendChild(this.appendTo, this.container);
    }
  }

  restoreAppend() {
    if (this.container && this.appendTo) {
      this.renderer.appendChild(this.el.nativeElement, this.container);
    }
  }

  align() {
    Dom.absolutePosition(this.container, this.target);

    if (!this.container || !this.target) return;

    const containerOffset = Dom.getOffset(this.container);
    const targetOffset = Dom.getOffset(this.target);
    const borderRadius =
      parseFloat(
        getComputedStyle(this.container).getPropertyValue('border-radius')
      ) || 0;

    const arrowLeft = Math.max(
      0,
      targetOffset.left - containerOffset.left - borderRadius * 2
    );
    this.container.style.setProperty(
      '--popover-arrow-left',
      `${arrowLeft}px`
    );

    const isFlipped = containerOffset.top < targetOffset.top;
    if (isFlipped) {
      this.container.setAttribute('data-rx-popover-flipped', 'true');
      this.container.classList.add('rx-popover-flipped');
    } else {
      this.container.removeAttribute('data-rx-popover-flipped');
      this.container.classList.remove('rx-popover-flipped');
    }
  }

  onAnimationStart(event: AnimationEvent) {
    if (event.toState === 'open') {
      this.container = event.element;
      this.appendContainer();
      this.align();
      this.bindDocumentClickListener();

      this.overlayEventListener = (e) => {
        if (this.container && this.container.contains(e.target)) {
          this.selfClick = true;
        }
      };

      this.onShow.emit(null);
    }

    this.isOverlayAnimationInProgress = true;
  }

  onAnimationEnd(event: AnimationEvent) {
    switch (event.toState) {
      case 'void':
        if (this.destroyCallback) {
          this.destroyCallback();
          this.destroyCallback = null;
        }

        if (this.overlaySubscription) {
          this.overlaySubscription.unsubscribe();
        }
        break;

      case 'close':
        if (this.autoZIndex) {
          ZIndexUtils.clear(this.container);
        }

        if (this.overlaySubscription) {
          this.overlaySubscription.unsubscribe();
        }

        this.onContainerDestroy();
        this.onHide.emit({});
        this.render = false;
        break;
    }

    this.isOverlayAnimationInProgress = false;
  }

  /**
   * Hides the panel.
   * @group Method
   */
  hide() {
    this.overlayVisible = false;
    this.cd.markForCheck();
  }

  onCloseClick(event: MouseEvent) {
    this.hide();
    event.preventDefault();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKeydown(event: KeyboardEvent) {
    this.hide();
  }

  onContainerDestroy() {
    if (!(this.cd as ViewRef).destroyed) {
      this.target = null;
    }

    this.unbindDocumentClickListener();
  }

  ngOnDestroy() {
    if (this.container && this.autoZIndex) {
        ZIndexUtils.clear(this.container);
    }

    if (!(this.cd as ViewRef).destroyed) {
      this.target = null;
    }

    this.destroyCallback = null;
    if (this.container) {
      this.restoreAppend();
      this.onContainerDestroy();
    }

    if (this.overlaySubscription) {
      this.overlaySubscription.unsubscribe();
    }
  }
}
