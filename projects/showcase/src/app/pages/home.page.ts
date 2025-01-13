import { Component } from "@angular/core";
import { MenuItem } from "@remanx/ui-ng/api";
import { RxButton, RxDialog, RxMenuBar } from "@remanx/ui-ng/components";

@Component({
    template: `
    <h1>Content</h1>
    <rx-button (click)="showDialog()" [label]="'click'" [severity]="'primary'" />
    <rx-dialog [(visible)]="visible"></rx-dialog>
    <rx-menubar [model]="items" />
  `,
    imports: [RxDialog, RxButton, RxMenuBar]
})
export class HomePage
{
  visible = false;

  items: MenuItem[] = [
    {
      label: "Item 1"
    },
    {
      label: "Item 2"
    }
  ];

  showDialog() {
    this.visible = true;
  }
}
