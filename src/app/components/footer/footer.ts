import { CommonModule } from '@angular/common';
import {
  Component,
  NgModule,
} from '@angular/core';

@Component({
  template: `
    <footer>
        <ng-content></ng-content>
    </footer>
  `,
  selector: 'rx-footer',
})
export class Footer {}

@NgModule({
  imports: [CommonModule],
  exports: [Footer],
  declarations: [Footer],
})
export class FooterModule {}
