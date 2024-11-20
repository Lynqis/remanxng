import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChildren,
  NgModule,
  QueryList,
} from '@angular/core';
import { RxTemplate } from '../../api/directives/shared';
import { Nullable } from '../../api/helpers/ts-helper';

@Component({
  template: `
    <ng-container *ngIf="headerTemplate; else notTemplate">
      <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
    </ng-container>
    <ng-template #notTemplate>
      <header class="rx-header">
          <ng-content></ng-content>
      </header>
    </ng-template>
  `,
  selector: 'rx-header',
  styleUrls: ['./header.css']
})
export class Header {
  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  headerTemplate: Nullable<any>;
}

@NgModule({
  imports: [CommonModule],
  exports: [Header],
  declarations: [Header],
})
export class HeaderModule {}
