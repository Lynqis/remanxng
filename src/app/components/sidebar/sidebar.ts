import { CommonModule } from '@angular/common';
import {
  Component,
  ContentChildren,
  Input,
  NgModule,
  QueryList,
} from '@angular/core';
import { TemplateNull } from '../../api/helpers/ts-helper';
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
        'rx-sidebar-left': position === 'left',
        'rx-sidebar-right': position === 'right',
        'rx-sidebar-overlay': overlay,
      }"
      style="background-color:red"
    >
      <ng-container *ngIf="headlessTemplate; else notHeadless">
        <ng-container *ngTemplateOutlet="headlessTemplate"></ng-container>
      </ng-container>
      <ng-template #notHeadless>
        <ng-container *ngIf="headerTemplate"></ng-container>
        <div class="r-sidebar-content">
          <ng-container *ngIf="contentTemplate; else notContent">
            <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
          </ng-container>
          <ng-template #notContent>
            <ng-content></ng-content>
          </ng-template>
        </div>
        <ng-container *ngTemplateOutlet="footerTemplate"></ng-container>
      </ng-template>
    </div>
  `,
  selector: 'rx-sidebar',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Input() overlay: boolean = false;
  @Input() visible: boolean = true;
  @Input() styleClass: string = '';

  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  headlessTemplate: TemplateNull<any>;
  headerTemplate: TemplateNull<any>;
  footerTemplate: TemplateNull<any>;
  contentTemplate: TemplateNull<any>;

  _position: string = 'left';

  transformOptions: any = 'translate3d(-100%, 0px, 0px)';

  /**
   * Add a default design
   * Add position right | left
   * Add overlay or not
   * Add All page layout : all height, no header, no footer ...
   */

  @Input() get position(): string {
    return this._position;
  }
  set position(value: string) {
    this._position = value;

    switch (value) {
      case 'left':
        this.transformOptions = 'translate3d(-100%, 0px, 0px)';
        break;
      case 'right':
        this.transformOptions = 'translate3d(100%, 0px, 0px)';
        break;
    }
  }
}

@NgModule({
  imports: [CommonModule],
  exports: [Sidebar],
  declarations: [Sidebar],
})
export class SidebarModule {}
