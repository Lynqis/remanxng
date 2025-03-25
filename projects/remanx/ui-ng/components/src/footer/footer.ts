import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
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
      <footer class="rx-footer" [style]="$style">
          <ng-content></ng-content>
      </footer>
    </ng-template>
  `,
    selector: 'rx-footer',
    styleUrls: ['./footer.css'],
    imports: [NgIf, NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxFooter {
  @ContentChild('headless', { descendants: false }) headlessTemplate: TemplateNull<any>;

  @Input() $style: string = '';
}
