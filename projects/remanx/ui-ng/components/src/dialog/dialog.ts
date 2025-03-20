import {
  isPlatformBrowser,
  NgClass,
  NgIf,
  NgTemplateOutlet,
} from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import {
  AnimationEvent,
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
import {
  Nullable,
  Position,
  RxTemplate,
  TemplateNull,
  VoidListener,
} from '@remanx/ui-ng/api';
import { BaseComponent } from '../base/basecomponent';
import { RxButton } from '../button/button';

const showAnimation = animation([
  style({ transform: '{{transform}}', opacity: 0 }),
  animate('{{transition}}'),
]);

const hideAnimation = animation([
  animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 })),
]);

@Component({
  selector: 'rx-dialog',
  template: `
    <div
      #dialog
      role="dialog"
      class="rx-dialog-mask"
      *ngIf="render"
      [ngClass]="{
        'rx-dialog-mask-visible': maskVisible,
        'rx-dialog-mask-invisible': !maskVisible,
        'rx-dialog-left': position === 'left',
        'rx-dialog-right': position === 'right',
        'rx-dialog-top': position === 'top',
        'rx-dialog-bottom': position === 'bottom',
        'rx-dialog-bottomleft': position === 'bottomleft',
        'rx-dialog-topleft': position === 'topleft',
        'rx-dialog-topright': position === 'topright',
        'rx-dialog-center': position === 'center'
      }"
    >
      <div
        #container
        class="rx-dialog"
        [@animation]="{
          value: 'visible',
          params: { transform: transformOptions, transition: transitionOptions }
        }"
        (@animation.start)="onAnimationStart($event)"
        (@animation.done)="onAnimationEnd($event)"
        [style]="{ width: width, height: height }"
      >
        @if (headlessTemplate) {
        <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
        } @else {
        <div class="rx-dialog-content">
          <div class="rx-dialog-header">
            <h2>{{ label }}</h2>
            <div class="button-close">
              <rx-button
                [severity]="'contrast'"
                class=""
                (click)="close($event)"
                >X</rx-button
              >
              <span>ESC</span>
            </div>
          </div>
          <div class="rx-dialog-body">
            <ng-content></ng-content>
          </div>
          @if (confirmDialog) {
          <div class="rx-dialog-button-confirm">
            @if (confirmTemplate) {
              <ng-container *ngTemplateOutlet="confirmTemplate"></ng-container>
            } @else {
              <rx-button [severity]="'contrast'" (click)="cancel()"
                >Cancel</rx-button
              >
              <rx-button [severity]="'primary'" (click)="confirm()"
                >Confirm</rx-button
              >
            }
          </div>
          }
        </div>
        }
      </div>
    </div>
  `,
  imports: [NgIf, NgClass, NgTemplateOutlet, RxButton],
  styleUrls: ['./dialog.css'],
  animations: [
    trigger('animation', [
      transition('void => visible', [useAnimation(showAnimation)]),
      transition('visible => void', [useAnimation(hideAnimation)]),
    ]),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxDialog extends BaseComponent {
  @Input() maskVisible: boolean = true;

  @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';

  @Input() closable: boolean = true;

  @Input() closeOnEscape: boolean = true;

  @Input() closeOnOutside: boolean = true;

  @Input() position: Position = 'center';

  @Input() label: string = 'Dialog';

  @Input() width: string = 'auto';

  @Input() height: string = 'auto';

  @Input() confirmDialog: boolean = false;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() onConfirm: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ContentChild('headless', { descendants: false }) headlessTemplate: TemplateNull<any>;

  @ContentChild('confirm', { descendants: false }) confirmTemplate: TemplateNull<any>;

  overlayVisible: boolean = false;

  render: boolean = false;

  transformOptions: any = 'scale(0.7)';

  container: Nullable<HTMLDivElement>;

  target: any;

  documentEscapeListener: VoidListener;

  documentClickListener: VoidListener;

  onAnimationStart(event: AnimationEvent) {
    if (event.toState === 'visible') {
      this.bindGlobalListeners();
    }
  }

  onAnimationEnd(event: AnimationEvent) {
    if (event.toState === 'void') {
      this.onContainerDestroy();
      this.cd.markForCheck();
    }
  }

  toggle() {
    if (this.overlayVisible) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    this.overlayVisible = true;
    this.render = true;
    this.cd.markForCheck();
  }

  hide() {
    this.overlayVisible = false;
    this.render = false;
    this.sendCloseEmitter();
  }

  sendOpenEmitter() {
    this.visibleChange.emit(true);
  }

  sendCloseEmitter() {
    this.visibleChange.emit(false);
    this.onClose.emit(true);
  }

  bindGlobalListeners() {
    if (this.closable && this.closeOnEscape) {
      this.bindDocumentEscapeListener();
    }
    if (this.closeOnOutside) this.bindDocumentClickListener();
  }

  unbindGlobalListeners() {
    this.unbindDocumentEscapeListener();
    this.unbinDocumentClickListener();
  }

  bindDocumentEscapeListener() {
    const documentTarget: any = this.el
      ? this.el.nativeElement.ownerDocument
      : 'document';

    this.documentEscapeListener = this.renderer.listen(
      documentTarget,
      'keydown',
      (event) => {
        if (event.key == 'Escape') {
          this.close(event);
        }
      }
    );
  }

  unbindDocumentEscapeListener() {
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
      this.documentEscapeListener = null;
    }
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
              this.el.nativeElement.firstChild &&
              this.el.nativeElement.firstChild.isSameNode(event.target)
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

  close(event: Event) {
    this.hide();
    event.preventDefault();
  }

  onContainerDestroy() {
    this.unbindGlobalListeners();
  }

  showConfirmDialog() {
    this.show();
    this.cd.markForCheck();
  }

  confirm() {
    this.onConfirm.emit(true);
    this.hide();
  }

  cancel() {
    this.onConfirm.emit(false);
    this.hide();
  }
}
