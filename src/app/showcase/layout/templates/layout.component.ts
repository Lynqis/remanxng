import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarModule } from '../../../components/sidebar/sidebar';
import { QLayoutComponent } from '../../../components/layout/layout';

@Component({
  selector: 'app',
  template: `
    <rx-layout>
      <header>Remanx</header>
      <rx-sidebar [visible]="true"><h4>test</h4></rx-sidebar>
      <div class="main-content">
        <router-outlet></router-outlet>
      </div>
    </rx-layout>
  `,
  standalone: true,
  imports: [RouterOutlet, SidebarModule, QLayoutComponent],
})
export class Layout {}
