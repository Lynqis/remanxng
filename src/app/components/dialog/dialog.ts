import { CommonModule } from "@angular/common";
import { AfterContentInit, Component, ContentChildren, Input, QueryList, TemplateRef } from "@angular/core";
import { RxTemplate } from "../../api/directives/shared";
import { Nullable } from "../../api/helpers/ts-helper";

@Component({
    standalone: true,
    selector: 'rx-dialog',
    template: `
      <div
        #container
        *ngIf="_visible"
        class="rx-dialog-mask"
      >
        <div
          class="rx-dialog"
        >
          <ng-container *ngIf="headlessTemplate; else notHeadless">
            <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
          </ng-container>

          <ng-template #notHeadless>
            <div class="rx-dialog-content">
              <h2>Dialog</h2>
            </div>
          </ng-template>
        </div>
      </div>
    `,
    imports: [CommonModule],
    styleUrls: ['./dialog.css']
})
export class RxDialog implements AfterContentInit {
  /**
   * List of features
   * 
   * - header
   * - close button
   * - position
   * - footer
   * - content
   * - headless
   * - background
   * 
   * It's an overlay, with absolute position
   * It can also 
  */
  @Input() get visible(): boolean {
    return this._visible;
  }
  set visible(value: boolean) {
    this._visible = value;
  }

  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  headlessTemplate: Nullable<TemplateRef<any>>;

  _visible: boolean = false;

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case 'headless':
            this.headlessTemplate = item.template;
            break;

        default:
            break;
      }
    });
  }
}