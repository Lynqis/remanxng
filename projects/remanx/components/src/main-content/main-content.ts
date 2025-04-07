import { NgIf, NgTemplateOutlet } from '@angular/common';
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
      <div class="rx-main-content" [style]="$style">
        <ng-content></ng-content>
      </div>
    </ng-template>
    }
  `,
  selector: 'rx-main',
  styleUrls: ['./main-content.css'],
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxMainContent {
  @ContentChild('headless', { descendants: false })
  headlessTemplate: TemplateNull<any>;

  @Input() $style: string = '';
}
