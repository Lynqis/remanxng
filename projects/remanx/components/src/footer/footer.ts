import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { TemplateNull } from '@dexarys/remanxng/api';

@Component({
    template: `
    @if (headlessTemplate) {
      <ng-container>
        <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
      </ng-container>
    } @else {
      <ng-template #notTemplate>
        <footer class="rx-footer" [style]="$style">
            <ng-content></ng-content>
        </footer>
      </ng-template>
    }
  `,
    selector: 'rx-footer',
    styleUrls: ['./footer.css'],
    imports: [NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxFooter {
  @ContentChild('headless', { descendants: false }) headlessTemplate: TemplateNull<any>;

  @Input() $style: string = '';
}
