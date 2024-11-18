import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
} from '@angular/core';

@Component({
  template: `
    <div class="main-content">
        <ng-content></ng-content>
    </div>
  `,
  selector: 'rx-main',
})
export class MainContent {}

@NgModule({
  imports: [CommonModule],
  exports: [MainContent],
  declarations: [MainContent],
})
export class MainContentModule {}
