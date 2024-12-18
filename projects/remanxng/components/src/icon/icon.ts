import { NgIf, NgTemplateOutlet } from '@angular/common';
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
import { RxTemplate } from '@remanxng/api/directives';
import { Nullable } from '@remanxng/api/helpers';
import { ObjectUtils } from '@remanxng/api/utils';

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
  imports: [NgIf, NgTemplateOutlet]
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
    this.templates?.forEach((item) => {
      if (item.getType() === 'headless') {
        this.headlessTemplate = item.template;
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
