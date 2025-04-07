import { NgClass, NgStyle } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: 'rx-card',
  template: `
    <div
      class="rx-card-outer"
    >
      <div
        [ngClass]="{
          'rx-card': !noStyle
        }"
        [ngStyle]="$style"
        [class]="$class"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  imports: [NgClass, NgStyle],
  styleUrls: ['./card.css']
})
export class RxCard {
  @Input() noStyle: boolean = false;
  @Input() $style: { [klass: string]: any } | null | undefined;
  @Input() $class: string = '';
}
