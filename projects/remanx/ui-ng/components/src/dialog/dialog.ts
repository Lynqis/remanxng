import { isPlatformBrowser, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
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
  VoidListener,
} from '@remanx/ui-ng/api';
import { BaseComponent } from '../base/basecomponent';
import { RxButton } from "../button/button";

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
      >
        <ng-container *ngIf="headlessTemplate; else notHeadless">
          <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
        </ng-container>

        <ng-template #notHeadless>
          <div class="rx-dialog-content">
            <div class="rx-dialog-header">
              <h2>{{label}}</h2>
              <div class="button-close">
                <rx-button [severity]="'contrast'" class="" (click)="close($event)">X</rx-button>
                <span>ESC</span>
              </div>
            </div>
            <div class="rx-dialog-body">
              <ng-content></ng-content>
            </div>
          </div>
        </ng-template>
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
export class RxDialog extends BaseComponent implements AfterContentInit {
  @Input() maskVisible: boolean = true;

  @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';

  @Input() closable: boolean = true;

  @Input() closeOnEscape: boolean = true;

  @Input() closeOnOutside: boolean = true;

  @Input() position: Position = 'center';

  @Input() label: string = 'Dialog';

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  headlessTemplate: Nullable<TemplateRef<any>>;

  overlayVisible: boolean = false;

  render: boolean = false;

  transformOptions: any = 'scale(0.7)';

  container: Nullable<HTMLDivElement>;

  target: any;

  documentEscapeListener: VoidListener;

  documentClickListener: VoidListener;

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      if (item.getType() === 'headless') {
        this.headlessTemplate = item.template;
      }
    });
  }

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
        const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : this.document;
        this.documentClickListener = this.renderer.listen(documentTarget, 'mousedown', (event) => {
          if (!this.closeOnOutside) {
            return;
          }

          if (this.el.nativeElement.firstChild && this.el.nativeElement.firstChild.isSameNode(event.target)) {
            this.close(event);
          }

          this.cd.markForCheck();
      });
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
}
