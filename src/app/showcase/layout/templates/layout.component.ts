import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { QLayoutComponent } from '../../../components/layout/layout';
import { HeaderModule } from '../../../components/header/header';
import { FooterModule } from "../../../components/footer/footer";
import { MainContentModule } from "../../../components/main-content/main-content";
import { RxTemplate } from '../../../api/directives/shared';
import { Sidebar } from '../../../components/sidebar/sidebar';

@Component({
  selector: 'app',
  template: `
    <rx-layout>
      <rx-header>Header</rx-header>
      <rx-sidebar [visible]="true">
        <ng-template rxTemplate="headless">
          <h4>Sidebar</h4>
        </ng-template>
      </rx-sidebar>
      <rx-main>
        <router-outlet></router-outlet>
      </rx-main>
      <rx-footer>Footer</rx-footer>
    </rx-layout>
  `,
  standalone: true,
  imports: [RouterOutlet, Sidebar, QLayoutComponent, HeaderModule, FooterModule, MainContentModule, RxTemplate],
})
export class Layout {}
