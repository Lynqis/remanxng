import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { BaseComponent } from '../base/basecomponent';
import { RxTable } from './table';
import { NgTemplateOutlet } from '@angular/common';
import { TemplateNull } from '@remanx/ui-ng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: '[rxTableBody]',
  template: `
    @if (hasData()) { @for (item of dataToRender(); track item) {
    <ng-container
      *ngTemplateOutlet="
        bodyTemplate;
        context: {
          $implicit: item,
          rowIndex: $index,
          columns: columns
        }
      "
    >
    </ng-container>
    } } @else {
    <tr>
      <td>No data</td>
    </tr>
    }
  `,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RxTableBody extends BaseComponent implements OnDestroy {
  @Input('rxTableBody') columns: any[] | undefined;
  @Input() set bodyTemplate(template: TemplateRef<any>) {
    this._bodyTemplate = template;
  }

  get bodyTemplate(): TemplateRef<any> {
    return this._bodyTemplate;
  }

  _bodyTemplate: TemplateNull<any>;

  @Input() get value(): any[] | undefined {
    return this._value;
  }
  set value(val: any[] | undefined) {
    this._value = val;
  }

  _value: any[] | undefined;

  dt: RxTable = inject(RxTable);

  subscription: Subscription | undefined;

  constructor() {
    super();
    this.subscription = this.dt.tableService.valueSource$.subscribe(() => {
      this.cd.detectChanges();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['bodyTemplate']) {
      this.cd.detectChanges();
    }
    if (changes['value']) {
      this.cd.detectChanges();
    }
  }

  hasData() {
    return this.value && this.value.length > 0;
  }

  dataToRender() {
    return this.value;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
