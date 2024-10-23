import { Component } from "@angular/core";
import { IconModule } from "../../../components/icon/icon";
import { SidebarModule } from "../../../components/sidebar/sidebar";

@Component({
  template: `<h1>Home</h1>`,
  imports: [SidebarModule],
  standalone: true
})
export class HomeComponent
{}
