import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { RxTemplate } from '../../../api/src/directives/shared';
import { Nullable } from '../../../api/src/helpers/ts-helper';

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
  imports: [NgIf, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxHeader implements AfterContentInit {
  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  headlessTemplate: Nullable<TemplateRef<any>>;

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      if (item.getType() === 'headless') {
        this.headlessTemplate = item.template;
      }
    });
  }
}
