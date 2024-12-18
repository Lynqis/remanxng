import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { MenuItem } from "../../../api/src/interfaces/menuitem";
import { NgFor, NgIf } from "@angular/common";
import { ObjectUtils } from "../../../api/src/utils/objectutils";

@Component({
  selector: "rx-menubar-sub",
  template: `
    <ul>
      <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
        <li *ngIf="getItemProp(processedItem, 'separator')"></li>
        <li *ngIf="!getItemProp(processedItem, 'separator')">
          <div>
            <a>
              <span>{{ getItemLabel(processedItem) }}</span>
            </a>
          </div>
          <rx-menubar-sub [items]="processedItem.items" />
        </li>
      </ng-template>
    </ul>
  `,
  standalone: true,
  imports: [NgFor, NgIf],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxMenuBarSub {
  @Input() items: MenuItem[] | undefined;

  getItemProp(processedItem: any, name: string, params: any = null): any {
    return processedItem ? ObjectUtils.getItemValue(processedItem[name], params) : undefined;
  }

  getItemLabel(processedItem: any): string {
    return this.getItemProp(processedItem, 'label');
  }
}

@Component({
  standalone: true,
  selector: "rx-menubar",
  template: `
    <div>
        <rx-menubar-sub [items]="model"></rx-menubar-sub>
    </div>
  `,
  imports: [RxMenuBarSub]
})
export class RxMenuBar {
  // list of element
  // separator
  @Input() set model(value: MenuItem[] | undefined) {
      this._model = value;
  }
  get model(): MenuItem[] | undefined {
      return this._model;
  }

  _model: MenuItem[] | undefined;
}
