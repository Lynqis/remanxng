import { NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  inject,
  Input,
} from '@angular/core';
import { TemplateNull } from '@dexarys/remanxng/api';
import { LayoutService } from '../layout/layout.service';

@Component({
    template: `
    <div
      #container
      [class]="$class"
      [style]="$style"
      [ngClass]="{
        'rx-sidebar': true,
        'rx-sidebar-active': _layout.sidebarVisible(),
        'rx-sidebar-overlay': overlay,
      }"
    >
      @if (_layout.sidebarVisible()) {
        <div
        >
          @if (headlessTemplate) {
            <ng-container>
              <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
            </ng-container>
          } @else {
            <div #content class="rx-sidebar-content">
              <ng-content></ng-content>
            </div>
          }

        </div>
      }
    </div>
  `,
    selector: 'rx-sidebar',
    styleUrl: './sidebar.css',
    imports: [NgClass, NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RxSidebar {
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

  @ContentChild('headless', { descendants: false }) headlessTemplate: TemplateNull<any>;

  _visible: boolean = false;

  _shrink: boolean = false;

  _layout: LayoutService = inject(LayoutService);

  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);
}
