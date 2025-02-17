import { NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
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
    <div
      #container
      [class]="$class"
      [style]="$style"
      *ngIf="visible"
      [ngClass]="{
        'rx-sidebar': true,
        'rx-sidebar-active': visible,
        'rx-sidebar-overlay': overlay,
      }"
    >
      <ng-container *ngIf="headlessTemplate; else notHeadless">
        <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
      </ng-container>

      <ng-template #notHeadless>
        <div #content class="r-sidebar-content">
          <ng-content></ng-content>
        </div>
      </ng-template>
    </div>
  `,
    selector: 'rx-sidebar',
    styleUrl: './sidebar.css',
    imports: [NgIf, NgClass, NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxSidebar implements AfterContentInit {
  @Input() overlay: boolean = false;
  @Input() visible: boolean = true;
  @Input() $class: string = '';
  @Input() $style: string = '';

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
