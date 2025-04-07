import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem, ObjectUtils } from '@dexarys/remanxng/api';
import { BaseComponent } from '../base/basecomponent';

@Component({
  selector: 'rx-menubar-sub',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      [ngClass]="{
        'rx-menubar-flex': level === 0,
        'rx-menubar-row': direction === 'row' && level === 0,
        'rx-menubar-column': (direction === 'column' && level === 0) || level !== 0,
        'rx-absolute': level !== 0,
        'rx-relative': level === 0,
      }"
    >
      <ng-template ngFor let-processedItem [ngForOf]="items" let-index="index">
        <ul class="rx-menubar-list">
          @if (getItemProp(processedItem, 'separator')) {
          <li>
            <div class="separator"></div>
          </li>
          } @if (!getItemProp(processedItem, 'separator')) {
          <li
            (click)="onItemClick($event, processedItem)"
            (mouseleave)="onItemMouseLeave(processedItem)"
            (mouseenter)="onItemMouseEnter(processedItem)"
          >
            <div class="rx-menubar-item-content">
              <a
                [ngClass]="{
                  'rx-menubar-link': getItemProp(processedItem, 'routerLink'),
                  'rx-menubar-disabled': getItemProp(processedItem, 'disabled')
                }"
              >
                @if (getItemProp(processedItem, 'icon') &&
                getItemProp(processedItem, 'iconPosition') === 'left') {
                <span
                  class="rx-menubar-item-icon"
                  [ngClass]="getItemProp(processedItem, 'icon')"
                ></span>
                }
                <span>{{ getItemLabel(processedItem) }}</span>
                @if (getItemProp(processedItem, 'icon') &&
                getItemProp(processedItem, 'iconPosition') === 'right') {
                <span
                  class="rx-menubar-item-icon"
                  [ngClass]="getItemProp(processedItem, 'icon')"
                ></span>
                } @if (getItemProp(processedItem, 'items')) {
                <div></div>
                }
              </a>
            </div>
            @if (getItemProp(processedItem, 'items') &&
            isItemActive(processedItem)) {
            <rx-menubar-sub
              [items]="processedItem.items"
              [direction]="direction"
              [level]="level + 1"
              [parentMenu]="this"
            />
            }
          </li>
          }
        </ul>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxMenuBarSub extends BaseComponent {
  @Input() items: MenuItem[] | undefined;
  @Input() direction: 'row' | 'column' = 'row';
  @Input() level: number = 0;
  @Input() parentMenu: RxMenuBarSub | undefined;

  hoveredItems = new Map<any, boolean>();
  clickedItems = new Map<any, boolean>();

  @HostListener('document:click', ['$event'])
  handleClick(event: Event) {
    if (this.level === 0 && !this.el.nativeElement.contains(event.target)) {
      this.getRootMenu().closeAllMenus();
    }
  }

  private closeAllMenus() {
    this.clickedItems.clear();
    this.hoveredItems.clear();
    if (this.parentMenu) {
      this.parentMenu.closeAllMenus();
    }
  }

  private getRootMenu(): RxMenuBarSub {
    return this.parentMenu ? this.parentMenu.getRootMenu() : this;
  }

  onItemClick(event: Event, processedItem: any) {
    event.stopPropagation();
    const rootMenu = this.getRootMenu();
    const hasSubItems = this.getItemProp(processedItem, 'items');

    if (hasSubItems) {
      const isClicked = rootMenu.clickedItems.get(processedItem);
      if (isClicked) {
        rootMenu.clickedItems.delete(processedItem);
      } else {
        rootMenu.clickedItems.clear();
        rootMenu.clickedItems.set(processedItem, true);
      }
    }
  }

  onItemMouseEnter(processedItem: any) {
    const rootMenu = this.getRootMenu();
    if (!rootMenu.clickedItems.get(processedItem)) {
      this.hoveredItems.set(processedItem, true);
    }
  }

  onItemMouseLeave(processedItem: any) {
    if (!this.getRootMenu().clickedItems.get(processedItem)) {
      this.hoveredItems.set(processedItem, false);
    }
  }

  isItemActive(processedItem: any): boolean {
    return Boolean(
      this.hoveredItems.get(processedItem) ||
        this.getRootMenu().clickedItems.get(processedItem)
    );
  }

  getItemProp(processedItem: any, name: string, params: any = null): any {
    return processedItem
      ? ObjectUtils.getItemValue(processedItem[name], params)
      : undefined;
  }

  getItemLabel(processedItem: any): string {
    return this.getItemProp(processedItem, 'label');
  }

  isItemGroup(processedItem: any) {
    return this.getItemProp(processedItem, 'item');
  }
}

@Component({
  selector: 'rx-menubar',
  standalone: true,
  template: `
    <rx-menubar-sub [items]="model" [direction]="direction"></rx-menubar-sub>
  `,
  imports: [RxMenuBarSub],
  styleUrls: ['./menubar.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.rx-menubar]': 'true',
    '[class.rx-menubar-row]': 'direction === "row"',
    '[class.rx-menubar-column]': 'direction === "column"',
  },
})
export class RxMenuBar {
  @Input() set model(value: MenuItem[] | undefined) {
    this._model = value;
  }
  get model(): MenuItem[] | undefined {
    return this._model;
  }

  @Input() direction: 'column' | 'row' = 'row';

  _model: MenuItem[] | undefined;
}
