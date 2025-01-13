import { NgClass, NgIf, NgTemplateOutlet } from "@angular/common";
import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, inject, Input, Output, QueryList, Renderer2, TemplateRef } from "@angular/core";
import { AnimationEvent, animate, animation, style, transition, trigger, useAnimation } from '@angular/animations';
import { Nullable, Position, RxTemplate, VoidListener } from "@remanx/ui-ng/api";

const showAnimation = animation([style({ transform: '{{transform}}', opacity: 0 }), animate('{{transition}}')]);

const hideAnimation = animation([animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))]);

@Component({
    selector: 'rx-dialog',
    template: `
      <div
        class="rx-dialog-mask"
        *ngIf="maskVisible"
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
          *ngIf="visible"
          [@animation]="{ value: 'visible', params: { transform: transformOptions, transition: transitionOptions } }"
          (@animation.start)="onAnimationStart($event)"
          (@animation.done)="onAnimationEnd($event)"
        >
          <ng-container *ngIf="headlessTemplate; else notHeadless">
            <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
          </ng-container>

          <ng-template #notHeadless>
            <div class="rx-dialog-content">
              <h2>Dialog</h2>
              <button (click)="close($event)">X</button>
            </div>
          </ng-template>
        </div>
      </div>
    `,
    imports: [NgIf, NgClass, NgTemplateOutlet],
    styleUrls: ['./dialog.css'],
    animations: [trigger('animation', [transition('void => visible', [useAnimation(showAnimation)]), transition('visible => void', [useAnimation(hideAnimation)])])],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxDialog implements AfterContentInit {
  @Input() get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
    this._visible = value;

    if (this._visible && !this.maskVisible) {
      this.maskVisible = true;
    }
  }

  @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';

  @Input() closable: boolean = true;

  @Input() closeOnEscape: boolean = true;

  @Input() position: Position  = 'center';

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  headlessTemplate: Nullable<TemplateRef<any>>;

  _visible: boolean = false;

  transformOptions: any = 'scale(0.7)';

  documentEscapeListener: VoidListener;

  maskVisible: boolean = false;

  private readonly el: ElementRef = inject(ElementRef);

  private readonly renderer: Renderer2 = inject(Renderer2);

  private readonly cd: ChangeDetectorRef = inject(ChangeDetectorRef);

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

  bindGlobalListeners() {
    if (this.closable && this.closeOnEscape) {
      this.bindDocumentEscapeListener();
    }
  }

  unbindGlobalListeners() {
    this.unbindDocumentEscapeListener();
  }

  bindDocumentEscapeListener() {
    const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

    this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
        if (event.key == 'Escape') {
            this.close(event);
        }
    });
  }

  unbindDocumentEscapeListener() {
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
      this.documentEscapeListener = null;
    }
  }

  close(event: Event) {
    this.visibleChange.emit(false);
    event.preventDefault();
  }

  onContainerDestroy() {
    this.unbindGlobalListeners();

    this.maskVisible = false;
  }
}
