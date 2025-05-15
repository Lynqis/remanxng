import { NgClass } from "@angular/common";
import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { Severity } from "@lynqis/remanxng/api";

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
          @if (loading) {
            <ng-container>
              <span [attr.aria-hidden]="true">Load</span>
            </ng-container>
          }
          @if (label) {
            <span class="rx-button-label">{{ label }}</span>
          }
          <ng-content></ng-content>
        </button>
    `,
    imports: [NgClass],
    styleUrls: ['./button.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
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

  @Input() hidden: boolean = false;

  @Input() noStyle: boolean = false;

  @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter();

  public _loading: boolean = false;


  get buttonClasses() {
    if (!this.noStyle) {
      return {
        'rx-button': !this.hidden,
        'rx-button-hide': this.hidden,
        [`rx-button-${this.severity}`]: this.severity && !this.hidden
      };
    }

    return '';
  }
}
