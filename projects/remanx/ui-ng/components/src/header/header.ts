import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { Nullable, RxTemplate, TemplateNull } from '@remanx/ui-ng/api';

@Component({
    template: `
    <ng-container *ngIf="headlessTemplate; else notTemplate">
      <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
    </ng-container>

    <ng-template #notTemplate>
      <header class="rx-header" [style]="$style">
          <ng-content></ng-content>
      </header>
    </ng-template>
  `,
    selector: 'rx-header',
    styleUrls: ['./header.css'],
    imports: [NgIf, NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxHeader {
  @ContentChild('headless', { descendants: false }) headlessTemplate: TemplateNull<any>;

  @Input() $style: string = '';
}
