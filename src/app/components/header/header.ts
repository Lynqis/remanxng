import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { RxTemplate } from '../../api/directives/shared';
import { Nullable } from '../../api/helpers/ts-helper';

@Component({
  template: `
    <ng-container *ngIf="headlessTemplate; else notTemplate">
      <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
    </ng-container>

    <ng-template #notTemplate>
      <header class="rx-header">
          <ng-content></ng-content>
      </header>
    </ng-template>
  `,
  selector: 'rx-header',
  styleUrls: ['./header.css'],
  standalone: true,
  imports: [CommonModule]
})
export class Header implements AfterContentInit {
  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  headlessTemplate: Nullable<TemplateRef<any>>;

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      switch (item.getType()) {
        case 'headless':
            this.headlessTemplate = item.template;
            break;

        default:
            break;
      }
    });
  }
}
