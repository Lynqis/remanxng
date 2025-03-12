import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgClass, NgStyle, NgTemplateOutlet, NgIf } from '@angular/common';



@Component({
  selector: 'rx-table',
  template: `
    <div
      class="rx-table-wrapper"
      [ngClass]="{ 'rx-table-gridlines': showGridlines }"
    >
      <table
        class="rx-table"
        [ngClass]="tableClass"
        [ngStyle]="tableStyle"
      >
        <thead>
          <ng-container
            *ngTemplateOutlet="headerTemplate"
          ></ng-container>
        </thead>
        <tbody>
          <ng-container
            *ngTemplateOutlet="bodyTemplate; context: { $implicit: value }"
          ></ng-container>
          <tr *ngIf="!value?.length" class="rx-table-empty">
            <td colspan="100%">
              {{ emptyMessage }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  standalone: true,
  imports: [NgClass, NgIf, NgTemplateOutlet, NgStyle],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RxTable<T = any> {
  @Input() value: T[] = [];
  @Input() tableClass: string = '';
  @Input() tableStyle: { [key: string]: string | number } = {};
  @Input() showGridlines: boolean = false;
  @Input() emptyMessage: string = 'Aucune donnée disponible';

  @ContentChild('header') headerTemplate!: TemplateRef<any>;
  @ContentChild('body') bodyTemplate!: TemplateRef<any>;
}