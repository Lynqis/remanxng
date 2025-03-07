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
        [ngStyle]="_style"
        [class]="_class"
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
  @Input() _style: { [klass: string]: any } | null | undefined;
  @Input() _class: string = '';
}
