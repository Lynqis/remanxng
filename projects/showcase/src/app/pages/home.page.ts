import { Component } from "@angular/core";

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
