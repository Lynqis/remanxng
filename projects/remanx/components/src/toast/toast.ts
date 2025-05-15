import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, OnInit, OnDestroy } from "@angular/core";
import { BaseComponent } from "../base/basecomponent";
import { Position, Severity, ToastItemCloseEvent, ToastMessage } from "@lynqis/remanxng/api";
import { Subject } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'rx-toastitem',
  template: `
  @if (visible) {
    <div class="rx-toast-message" [ngClass]="message?.severity" (click)="dismiss()">
      <div class="rx-toast-content">
        <div class="rx-toast-text">
          <span class="rx-toast-title">{{ message?.title }}</span>
          <span class="rx-toast-content">{{ message?.content }}</span>
        </div>
      </div>
      <button class="close" (click)="dismiss()">&times;</button>
    </div>
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [NgClass],
  styleUrls: ['./toast.css']
})
export class RxToastItem extends BaseComponent implements OnInit, OnDestroy {
  @Input() message: ToastMessage | undefined;
  @Output() onClose: EventEmitter<ToastItemCloseEvent> = new EventEmitter();
  @Input() duration: number = 3000;

  visible: boolean = false;
  private unsubscribe$ = new Subject<void>();

  ngOnInit() {
    this.show();
  }

  show() {
    this.visible = true;
    setTimeout(() => this.dismiss(), this.duration);
  }

  dismiss() {
    this.visible = false;
    this.onClose.emit({} as ToastItemCloseEvent);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

@Component({
  selector: 'rx-toast',
  template: `
    <div class="rx-toast">
      @for (item of messages; track item) {
        <rx-toastitem
        [message]="item"
        [duration]="lifetime"
        ></rx-toastitem>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RxToastItem],
  styleUrls: ['./toast.css']
})
export class RxToast extends BaseComponent {
  @Input() position: Position = 'top';
  @Input() severity: Severity = 'primary';
  @Input() lifetime: number = 120;
  @Input() messages: ToastMessage[] | null | undefined;
}
