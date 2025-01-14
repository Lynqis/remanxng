import { Component, Input } from "@angular/core";
import { MenuItem } from "../../api/interfaces/menuitem";
import { NgFor, NgIf } from "@angular/common";
import { ObjectUtils } from "../../api/utils/objectutils";

@Component({
  selector: "rx-menubar-sub",
  template: `
    <ul>
      <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
        <li *ngIf="getItemProp(processedItem, 'separator')">Test</li>
        <li *ngIf="!getItemProp(processedItem, 'separator')">
          <div>test</div>
          <rx-menubar-sub [items]="processedItem.items" />
        </li>
      </ng-template>
    </ul>
  `,
  standalone: true,
  imports: [NgFor, NgIf]
})
export class RxMenuBarSub {
  @Input() items: MenuItem[] | undefined;

  getItemProp(processedItem: any, name: string, params: any = null) {
    return processedItem?.item ? ObjectUtils.getItemValue(processedItem.item[name], params) : undefined;
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