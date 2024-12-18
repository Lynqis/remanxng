import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RxLayout } from '../../../components/layout/layout';
import { RxHeader } from '../../../components/header/header';
import { RxFooter } from "../../../components/footer/footer";
import { RxMainContent } from "../../../components/main-content/main-content";
import { RxTemplate } from '../../../api/directives/shared';
import { RxSidebar } from '../../../components/sidebar/sidebar';

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
  imports: [RouterOutlet, RxSidebar, RxLayout, RxHeader, RxFooter, RxMainContent, RxTemplate],
})
export class Layout {}
