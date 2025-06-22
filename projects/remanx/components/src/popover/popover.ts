import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BaseComponent } from '../base/basecomponent';
import { Dom, Nullable, VoidListener } from '@lynqis/remanxng/api';
import {
  animate,
  animation,
  AnimationEvent,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import { isPlatformBrowser, NgClass } from '@angular/common';

const showAnimation = animation([
  style({ transform: '{{transform}}', opacity: 0 }),
  animate('{{transition}}'),
]);

const hideAnimation = animation([
  animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 })),
]);

@Component({
  selector: 'rx-popover',
  standalone: true,
  imports: [NgClass],
  template: `
    @if (render) {
    <div
      [ngClass]="{
        'rx-popover': !noStyle
      }"
      role="dialog"
      [attr.aria-modal]="overlayVisible"
      [@animation]="{
        value: 'visible',
        params: { transform: transformOptions, transition: transitionOptions }
      }"
      (@animation.start)="onAnimationStart($event)"
      (@animation.done)="onAnimationEnd($event)"
      [style]="$style"
    >
      <div class="rx-popover-content">
        <ng-content></ng-content>
      </div>
    </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./popover.css'],
  animations: [
    trigger('animation', [
      transition('void => visible', [useAnimation(showAnimation)]),
      transition('visible => void', [useAnimation(hideAnimation)]),
    ]),
  ],
})
export class RxPopover extends BaseComponent {
  @Input() closeOnOutside: boolean = true;
  @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';
  @Input() $style: string = '';
  @Input() noStyle: boolean = false;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  render: boolean = false;
  overlayVisible: boolean = false;
  target: any;
  container: Nullable<HTMLElement>;
  transformOptions: any = 'scale(0.7)';

  documentClickListener: VoidListener;

  onAnimationStart(event: AnimationEvent) {
    if (event.toState === 'visible') {
      this.container = event.element;
      this.appendContainer();
      this.bindGlobalListeners();
      this.align();
    }
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === 'void') {
      this.unbindGlobalListeners();
      this.cd.markForCheck();
    }
  }

  toggle(event: Event) {
    if (this.overlayVisible) {
      this.hide();
    } else {
      this.show(event);
    }
    this.cd.markForCheck();
  }

  show(event: Event) {
    this.overlayVisible = true;
    this.render = true;

    this.target = event.currentTarget || event.target;
    this.visibleChange.emit(true);
  }

  hide() {
    this.overlayVisible = false;
    this.render = false;
    this.visibleChange.emit(false);
  }

  close(event: Event) {
    this.hide();
    event.preventDefault();
  }

  bindGlobalListeners() {
    if (this.closeOnOutside) this.bindDocumentClickListener();
  }

  unbindGlobalListeners() {
    this.unbinDocumentClickListener();
  }


  bindDocumentClickListener() {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.documentClickListener) {
        const documentTarget: any = this.el
          ? this.el.nativeElement.ownerDocument
          : this.document;
        this.documentClickListener = this.renderer.listen(
          documentTarget,
          'mousedown',
          (event) => {
            if (!this.closeOnOutside) {
              return;
            }

            if (
              this.container &&
              !this.container.contains(event.target as Node) &&
              !this.target.contains(event.target as Node)
            ) {
              this.close(event);
            }

            this.cd.markForCheck();
          }
        );
      }
    }
  }

  unbinDocumentClickListener() {
    if (this.documentClickListener) {
      this.documentClickListener();
      this.documentClickListener = null;
    }
  }

  private align() {
    if (!this.container || !this.target) return;

    const position = Dom.absolutePosition(this.container, this.target);
  }

  private appendContainer() {
    this.renderer.appendChild(this.document.body, this.container);
  }
}
