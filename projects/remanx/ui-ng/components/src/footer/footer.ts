import { NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { Nullable, RxTemplate } from '@remanx/ui-ng/api';

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
  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  @Input() $style: string = '';

  headlessTemplate: Nullable<TemplateRef<any>>;

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      if (item.getType() === 'headless') {
        this.headlessTemplate = item.template;
      }
    });
  }
}
