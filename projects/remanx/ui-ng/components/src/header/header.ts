import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { TemplateNull } from '@remanx/ui-ng/api';

@Component({
    template: `
    @if (headlessTemplate) {
      <ng-container>
        <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
      </ng-container>
    } @else {
      <ng-template #notTemplate>
        <header class="rx-header" [style]="$style">
            <ng-content></ng-content>
        </header>
      </ng-template>
    }

  `,
    selector: 'rx-header',
    styleUrls: ['./header.css'],
    imports: [NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxHeader {
  @ContentChild('headless', { descendants: false }) headlessTemplate: TemplateNull<any>;

  @Input() $style: string = '';
}
