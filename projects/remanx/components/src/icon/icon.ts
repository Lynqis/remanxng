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
import { ObjectUtils, TemplateNull } from '@dexarys/remanxng/api';
import { IconRegistryService } from './icon-registry.service';
import { BaseComponent } from '../base/basecomponent';
import { SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'rx-icon',
    template: `
    @if (headlessTemplate) {
      <ng-container>
        <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
      </ng-container>
    } @else {
      @if (iconSvg) {
        <span [innerHTML]="iconSvg"></span>
      } @else {
        <ng-template>
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
export class RxIcon extends BaseComponent implements OnInit {
  @Input() label: string = '';
  @Input() styleClass: string = '';
  @Input({ transform: booleanAttribute }) spin: boolean = false;
  @Input() iconName: string | undefined;
  @Input() stroke: string = 'currentColor';
  @Input() strokeWidth: string = '1';
  @Input() fill: string = 'none';

  @ContentChild('headless', { descendants: false }) headlessTemplate: TemplateNull<any>;

  iconSvg: string | SafeHtml | null = null;

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
    this.cd.detectChanges();
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
