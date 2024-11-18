import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarModule } from '../../../components/sidebar/sidebar';
import { QLayoutComponent } from '../../../components/layout/layout';
import { HeaderModule } from '../../../components/header/header';
import { FooterModule } from "../../../components/footer/footer";
import { MainContentModule } from "../../../components/main-content/main-content";

@Component({
  selector: 'app',
  template: `
    <rx-layout>
      <rx-header>Header</rx-header>
      <rx-sidebar [visible]="true"><h4>Sidebar</h4></rx-sidebar>
      <rx-main>
        <router-outlet></router-outlet>
      </rx-main>
      <rx-footer>Footer</rx-footer>
    </rx-layout>
  `,
  standalone: true,
  imports: [RouterOutlet, SidebarModule, QLayoutComponent, HeaderModule, FooterModule, MainContentModule],
})
export class Layout {}
