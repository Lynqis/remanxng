import { Component } from "@angular/core";
import { RxDialog } from "../../../components/dialog/dialog";
import { RxButton } from "../../../components/button/button";

@Component({
  template: `
    <h1>Content</h1>
    <rx-button (click)="showDialog()" [label]="'click'" [severity]="'primary'" />
    <rx-dialog [(visible)]="visible"></rx-dialog>
  `,
  imports: [RxDialog, RxButton],
  standalone: true
})
export class HomeComponent
{
  visible = false;

  showDialog() {
    this.visible = true;
  }
}
