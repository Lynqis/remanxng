import { Component } from "@angular/core";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app',
  template: `
    <div class="layout">
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: true,
  imports: [ RouterOutlet ]
})
export class Layout
{}
