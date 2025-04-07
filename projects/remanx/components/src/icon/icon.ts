import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import { ObjectUtils, TemplateNull } from '@remanxng/api';
import { IconRegistryService } from './icon-registry.service';

@Component({
    selector: 'rx-icon',
    template: `

    @if (headlessTemplate) {
      <ng-container>
        <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
      </ng-container>
    } @else {
      @if (iconSvg) {
        <ng-template #notTemplate>
          <ng-template #svgContent>
            <span [innerHTML]="iconSvg"></span>
          </ng-template>
        </ng-template>
      } @else {
        <ng-template #notTemplate>
          <ng-content
            [attr.aria-label]="ariaLabel"
            [attr.aria-hidden]="ariaHidden"
            [attr.role]="role"
          >
            <span [class]="getClassNames()"></span>
          </ng-content>
        </ng-template>
      }
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet]
})
export class RxIcon implements OnInit {
  @Input() label: string = '';
  @Input() styleClass: string = '';
  @Input({ transform: booleanAttribute }) spin: boolean = false;
  @Input() iconName: string | undefined;
  @Input() stroke: string = 'currentColor';
  @Input() strokeWidth: string = '1';
  @Input() fill: string = 'none';

  @ContentChild('headless', { descendants: false }) headlessTemplate: TemplateNull<any>;

  iconSvg: string | undefined;

  ariaLabel: string |undefined;
  ariaHidden: boolean = true;
  role: string | undefined;

  private _iconRegistry: IconRegistryService = inject(IconRegistryService);

  ngOnInit() {
    this.getAttributes();
    this.loadIcon();
  }

  private loadIcon() {
    if (this.iconName) {
      this.iconSvg = this._iconRegistry.getIcon(this.iconName, {
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
        fill: this.fill,
      });
    }
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
