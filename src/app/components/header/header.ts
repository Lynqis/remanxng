import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
} from '@angular/core';

@Component({
  template: `
    <header>
        <ng-content></ng-content>
    </header>
  `,
  selector: 'rx-header',
})
export class Header {}

@NgModule({
  imports: [CommonModule],
  exports: [Header],
  declarations: [Header],
})
export class HeaderModule {}
