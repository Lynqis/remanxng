import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  NgModule,
  OnInit,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { ObjectUtils } from '../../api/utils/objectutils';
import { RxTemplate } from '../../api/directives/shared';
import { Nullable } from '../../api/helpers/ts-helper';

@Component({
  selector: 'rx-icon',
  template: `
    <ng-container *ngIf="iconTemplate; else notTemplate">
      <ng-container *ngTemplateOutlet="iconTemplate"></ng-container>
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
  encapsulation: ViewEncapsulation.None,
})
export class Icon implements OnInit {
  @Input() label: string = '';
  @Input() styleClass: string = '';
  @Input({ transform: booleanAttribute }) spin: boolean = false;
  @Input() _templateMap: any;

  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  iconTemplate: Nullable<any>;

  ariaLabel?: string;
  ariaHidden: boolean = true;
  role?: string;

  ngOnInit() {
    this.getAttributes();
  }

  ngAfterContentInit() {
    if ((this.templates as QueryList<RxTemplate>).length!) {
      this._templateMap = {};
    }

    (this.templates as QueryList<RxTemplate>).forEach!((item) => {
      switch (item.getType()) {
        case 'header':
          this.iconTemplate = item.template;
          break;

        default:
          this._templateMap[<any>item.name] = item.template;
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

@NgModule({
  imports: [CommonModule],
  exports: [Icon],
  declarations: [Icon],
})
export class IconModule {}
