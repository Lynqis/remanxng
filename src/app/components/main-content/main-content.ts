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
    <ng-container *ngIf="mainTemplate; else notTemplate">
      <ng-container *ngTemplateOutlet="mainTemplate"></ng-container>
    </ng-container>
    <ng-template #notTemplate>
      <div class="rx-main-content">
          <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  selector: 'rx-main',
  styleUrls: ['./main-content.css']
})
export class MainContent {
  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  mainTemplate: TemplateNull<any>;
}

@NgModule({
  imports: [CommonModule],
  exports: [MainContent],
  declarations: [MainContent],
})
export class MainContentModule {}
