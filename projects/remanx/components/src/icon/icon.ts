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
  /**
   * Call css implementation
   * TODO: rename
   * @param {string | undefined} iconCss
   */
  @Input() iconCss: string | undefined;
  @Input({ transform: booleanAttribute }) spin: boolean = false;
  /**
   * Call json implementation
   * @param {string | undefined} iconJson
   */
  @Input() iconJson: string | undefined;
  /**
   * Color of the stroke
   * @param {string} stroke
   */
  @Input() stroke: string = 'currentColor';
  /**
   * Thickness of the stroke
   * TODO: rename
   * @param {string} thickness
   */
  @Input() thickness: string = '1';
  /**
   * Color of the fill
   * @param {string} fill
   */
  @Input() fill: string = 'none';

  @ContentChild('headless', { descendants: false }) headlessTemplate: TemplateNull<any>;

  /**
   * Result when using json implementation
   */
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
    if (this.iconJson) {
      this.iconSvg = this._iconRegistry.getIcon(this.iconJson, {
        stroke: this.stroke,
        thickness: this.thickness,
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
    return `r-icon ${this.iconCss ? this.iconCss + ' ' : ''}${
      this.spin ? 'rx-icon-spin' : ''
    }`;
  }
}
