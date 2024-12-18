import { NgClass, NgIf } from "@angular/common";
import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Severity } from "@remanxng/api/helpers";

@Component({
    selector: 'rx-button',
    template: `
        <button
          [attr.type]="type"
          [attr.value]="value"
          [attr.name]="name"
          [disabled]="disabled"
          [autofocus]="autofocus"
          (click)="onClick.emit($event)"
          [ngClass]="buttonClasses"
        >
            <ng-container *ngIf="loading">
              <span [attr.aria-hidden]="true">Load</span>
            </ng-container>
            <span *ngIf="label" class="rx-button-label">{{ label }}</span>
        </button>
    `,
    imports: [NgClass, NgIf],
    styleUrls: ['./button.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxButton {
  @Input() autofocus: boolean = false;

  @Input() disabled: boolean = false;

  @Input() label?: string;

  @Input({transform: booleanAttribute}) loading: boolean = false;

  @Input() name?: string;

  @Input() severity: Severity;

  @Input() type: string = 'button';

  @Input() value?: string;

  @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter();

  public _loading: boolean = false;


  get buttonClasses() {
    return {
      'rx-button': true,
      [`rx-button-${this.severity}`]: this.severity
    };
  }
}
