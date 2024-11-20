import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { Nullable } from '../../api/helpers/ts-helper';
import { RxTemplate } from '../../api/directives/shared';

@Component({
  template: `
    <div
      #container
      [class]="styleClass"
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
  imports: [CommonModule],
  standalone: true
})
export class Sidebar implements AfterContentInit {
  @Input() overlay: boolean = false;
  @Input() visible: boolean = true;
  @Input() styleClass: string = '';

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
