import { NgIf, NgTemplateOutlet } from '@angular/common';
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
      <div class="rx-main-content">
          <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  selector: 'rx-main',
  styleUrls: ['./main-content.css'],
  standalone: true,
  imports: [NgIf, NgTemplateOutlet]
})
export class RxMainContent implements AfterContentInit {
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
