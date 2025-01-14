import { Component } from "@angular/core";
import { RxDialog } from "../../../components/dialog/dialog";
import { RxButton } from "../../../components/button/button";
import { RxMenuBar } from "../../../components/menubar/menubar";
import { MenuItem } from "../../../api/interfaces/menuitem";

@Component({
  template: `
    <h1>Content</h1>
    <rx-button (click)="showDialog()" [label]="'click'" [severity]="'primary'" />
    <rx-dialog [(visible)]="visible"></rx-dialog>
    <rx-menubar [model]="items" />
  `,
  imports: [RxDialog, RxButton, RxMenuBar],
  standalone: true
})
export class HomeComponent
{
  visible = false;

  items: MenuItem[] = [
    {
      label: "test"
    },
    {
      label: "test"
    }
  ];

  showDialog() {
    this.visible = true;
  }
}
