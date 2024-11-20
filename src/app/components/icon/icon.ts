import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { ObjectUtils } from '../../api/utils/objectutils';
import { RxTemplate } from '../../api/directives/shared';
import { Nullable } from '../../api/helpers/ts-helper';

@Component({
  selector: 'rx-icon',
  template: `
    <ng-container *ngIf="headlessTemplate; else notTemplate">
      <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
    </ng-container>

    <ng-template #notTemplate>
      <ng-content
        [attr.aria-label]="ariaLabel"
        [attr.aria-hidden]="ariaHidden"
        [attr.role]="role"
      >
        <span [class]="getClassNames()"></span>
      </ng-content>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule]
})
export class RxIcon implements OnInit, AfterContentInit {
  @Input() label: string = '';
  @Input() styleClass: string = '';
  @Input({ transform: booleanAttribute }) spin: boolean = false;

  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  headlessTemplate: Nullable<TemplateRef<any>>;

  ariaLabel?: string;
  ariaHidden: boolean = true;
  role?: string;

  ngOnInit() {
    this.getAttributes();
  }

  ngAfterContentInit() {
    (this.templates as QueryList<RxTemplate>).forEach!((item) => {
      switch (item.getType()) {
        case 'headless':
          this.headlessTemplate = item.template;
          break;

        default:
          break;
      }
    });
  }

  getAttributes() {
    const isLabelEmpty = ObjectUtils.isEmpty(this.label);
    this.role = !isLabelEmpty ? 'img' : undefined;
    this.ariaLabel = !isLabelEmpty ? this.label : undefined;
    this.ariaHidden = isLabelEmpty;
  }

  getClassNames() {
    return `r-icon ${this.styleClass ? this.styleClass + ' ' : ''}${
      this.spin ? 'rx-icon-spin' : ''
    }`;
  }
}
