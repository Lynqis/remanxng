import { AsyncPipe, NgClass, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  inject,
  Input,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { Nullable, RxTemplate } from '@remanx/ui-ng/api';
import { LayoutService } from '../layout/layout.service';

@Component({
    template: `
    <div
      #container
      [class]="$class"
      [style]="$style"
      *ngIf="_layout.sidebarVisible()"
      [ngClass]="{
        'rx-sidebar': true,
        'rx-sidebar-active': _layout.sidebarVisible(),
        'rx-sidebar-overlay': overlay,
      }"
    >
      <ng-container *ngIf="headlessTemplate; else notHeadless">
        <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
      </ng-container>

      <ng-template #notHeadless>
        <div #content class="rx-sidebar-content">
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
  @Input()
  set visible(value: boolean) {
    this._visible = value;
    this._layout.setSidebarVisible(value);
    this.cd.markForCheck();
  }
  get visible(): boolean {
    return this._visible;
  }

  @Input()
  set shrink(value: boolean) {
    this._shrink = value;
    this._layout.setSidebarShrink(value);
    this.cd.markForCheck();
  }
  get shrink(): boolean {
    return this._shrink;
  }
  @Input() $class: string = '';
  @Input() $style: string = '';

  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  headlessTemplate: Nullable<TemplateRef<any>>;

  _visible: boolean = false;

  _shrink: boolean = false;

  _layout: LayoutService = inject(LayoutService);

  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngAfterContentInit(): void {
    this.templates?.forEach((item) => {
      if (item.getType() === 'headless') {
        this.headlessTemplate = item.template;
      }
    });
  }
}
