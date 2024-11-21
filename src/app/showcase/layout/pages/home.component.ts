import { Component } from "@angular/core";
import { RxDialog } from "../../../components/dialog/dialog";

@Component({
  template: `
    <h1>Content</h1>
    <button (click)="showDialog()">Click</button>
    <rx-dialog [(visible)]="visible"></rx-dialog>
  `,
  imports: [RxDialog],
  standalone: true
})
export class HomeComponent
{
  visible = false;

  showDialog() {
    this.visible = true;
  }
}
