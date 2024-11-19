import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChildren,
  NgModule,
  QueryList,
} from '@angular/core';
import { RxTemplate } from '../../api/directives/shared';
import { TemplateNull } from '../../api/helpers/ts-helper';

@Component({
  template: `
    <ng-container *ngIf="footerTemplate; else notTemplate">
      <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
    </ng-container>
    <ng-template #notTemplate>
      <footer class="rx-footer">
          <ng-content></ng-content>
      </footer>
    </ng-template>
  `,
  selector: 'rx-footer',
  styleUrls: ['./footer.css']
})
export class Footer {
  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  footerTemplate: TemplateNull<any>;
}

@NgModule({
  imports: [CommonModule],
  exports: [Footer],
  declarations: [Footer],
})
export class FooterModule {}
