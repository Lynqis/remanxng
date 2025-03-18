import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  EventEmitter,
  inject,
  Injectable,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { NgClass, NgStyle, NgTemplateOutlet, NgIf } from '@angular/common';
import { Subject } from 'rxjs';
import { BaseComponent } from '../base/basecomponent';
import { ObjectUtils, RxTemplate, SortMeta, TemplateNull } from '@remanx/ui-ng/api';
import { RxTableBody } from './tablebody';

@Injectable()
export class RxTableService {
  private sortSource = new Subject<SortMeta>();
  private selectionSource = new Subject<any>();
  private valueSource = new Subject<any>();

  sortSource$ = this.sortSource.asObservable();
  selectionSource$ = this.selectionSource.asObservable();
  valueSource$ = this.valueSource.asObservable();

  onSort(sortMeta: SortMeta) {
    this.sortSource.next(sortMeta);
  }

  onSelectionChange() {
    this.selectionSource.next(null);
  }

  onValueChange(value: any) {
    this.valueSource.next(value);
  }
}

@Component({
  selector: 'rx-table',
  template: `
    <div
      class="rx-table-wrapper"
      [ngClass]="{ 'rx-table-gridlines': showGridlines }"
    >
      <table class="rx-table" [ngClass]="tableClass" [ngStyle]="tableStyle">
        <thead>
          <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
        </thead>
        <tbody
          [rxTableBody]="value"
          [bodyTemplate]="bodyTemplate"
          [value]="value"
        ></tbody>
      </table>
    </div>
  `,
  standalone: true,
  imports: [NgClass, NgTemplateOutlet, NgStyle, RxTableBody],
  providers: [RxTableService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RxTable extends BaseComponent implements OnInit {
  @Input() get value(): any[] {
    return this._value;
  }
  set value(val: any[]) {
    this._value = val;
  }
  @Input() tableClass: string = '';
  @Input() tableStyle: { [key: string]: string | number } = {};
  @Input() showGridlines: boolean = false;
  @Input() emptyMessage: string = 'Aucune donnée disponible';
  @Input() selection: any;
  @Input() selectionMode: 'single' | 'multiple' | null = null;
  @Input() dataKey: string = '';
  @Input() get sortField(): string | undefined | null {
    return this._sortField;
  }
  set sortField(val: string | undefined | null) {
    this._sortField = val;
  }
  @Input() get sortOrder(): number {
    return this._sortOrder;
  }
  set sortOrder(val: number) {
    this._sortOrder = val;
  }
  @Input() multiSortMeta: SortMeta[] = [];
  @Input() sortMode: 'single' | 'multiple' = 'single';
  @Input() defaultSortOrder: number = 1;

  @Output() selectionChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<SortMeta>();

  @ContentChild('header') headerTemplate: TemplateNull<any>;
  @ContentChild('body', { descendants: false }) bodyTemplate: TemplateNull<any>;

  @ContentChildren(RxTemplate) templates: QueryList<RxTemplate> | undefined;

  get processedData() {
    return this.value || [];
  }

  _value: any[] = [];

  _sortField: string | undefined | null;

  _sortOrder: number = 1;

  public tableService: RxTableService = inject(RxTableService);

  ngOnInit() {
    this.tableService.onValueChange(this.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.tableService.onValueChange(this.value);
    }
    this.cd.detectChanges();
  }

  dataToRender(data: any) {
    const _data = data || this.processedData;

    return _data;
  }

  sortData(event: any) {
    if (this.sortMode === 'single') {
      this._sortOrder =
        this.sortField === event.field
          ? this.sortOrder * -1
          : this.defaultSortOrder;
      this._sortField = event.field;
      this.sortSingle();
    }
  }

  sortSingle() {
    const field = this.sortField;
    const order: number = this.sortField ? this.sortOrder : 1;

    if (this.sortMode === 'single') {
      console.log('sortSingle =>', field);
      this.value.sort((a: any, b: any) => {
        let value1 = ObjectUtils.resolveFieldData(a, field);
        let value2 = ObjectUtils.resolveFieldData(b, field);
        let result = null;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        return order * result;
      });

      this._value = [...this.value];
    }

    let sortMeta: SortMeta = {
      field: field,
      order: order,
    };

    this.sortChange.emit(sortMeta);
    this.tableService.onSort(sortMeta);
    this.cd.detectChanges();
  }

  isSorted(field: string) {
    if (this.sortMode === 'single') {
      return this.sortField && this.sortField === field;
    }
    return false;
  }

  isSelected(rowData: any): boolean {
    if (!this.selection || !rowData) {
      return false;
    }

    if (!this.dataKey) {
      return this.selection === rowData;
    }

    if (this.selectionMode === 'single') {
      return this.selection[this.dataKey] === rowData[this.dataKey];
    } else if (this.selectionMode === 'multiple') {
      if (Array.isArray(this.selection)) {
        return this.selection.some(
          (selectedRow) => selectedRow[this.dataKey] === rowData[this.dataKey]
        );
      }
    }
    return false;
  }

  onRowSelect(rowData: any) {
    if (!this.selectionMode) {
      return;
    }

    if (this.selectionMode === 'single') {
      this.selection = rowData;
    } else if (this.selectionMode === 'multiple') {
      if (!Array.isArray(this.selection)) {
        this.selection = [];
      }
      this.selection = [...this.selection, rowData];
    }

    this.selectionChange.emit(this.selection);
    this.tableService.onSelectionChange();
  }

  onRowUnselect(rowData: any) {
    if (!this.selectionMode) {
      return;
    }

    if (this.selectionMode === 'single') {
      this.selection = null;
    } else if (this.selectionMode === 'multiple') {
      if (Array.isArray(this.selection)) {
        this.selection = this.selection.filter(
          (val) => val[this.dataKey] === rowData[this.dataKey]
        );
      }
    }

    this.selectionChange.emit(this.selection);
    this.tableService.onSelectionChange();
  }
}
