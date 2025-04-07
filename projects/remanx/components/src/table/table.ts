import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  inject,
  Injectable,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { NgClass, NgTemplateOutlet, NgStyle } from '@angular/common';
import { Subject } from 'rxjs';
import { BaseComponent } from '../base/basecomponent';
import {
  ObjectUtils,
  SortMeta,
  TemplateNull,
  UniqueComponentId,
} from '@dexarys/remanxng/api';
import { RxTableBody } from './tablebody';
import { RxPagination } from '../pagination/pagination';

@Injectable({
  providedIn: 'root',
})
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

let instanceCounter = 0;

@Component({
  selector: 'rx-table',
  template: `
    <div class="rx-table-container">
      <div
        class="rx-table-wrapper"
        [ngClass]="{ 'rx-table-gridlines': showGridlines }"
      >
        <table
          class="rx-table"
          [ngClass]="tableClass"
          [ngStyle]="tableStyle"
          [attr.id]="id"
        >
          <thead>
            <ng-container *ngTemplateOutlet="headerTemplate"></ng-container>
          </thead>
          <tbody
            [rxTableBody]="value"
            [bodyTemplate]="bodyTemplate"
            [value]="pagedData"
          ></tbody>
        </table>
      </div>

      @if (value && value.length > 0) {
        <rx-pagination
          [value]="value"
          [rows]="rows"
          [totalRecords]="value.length"
          (pageChange)="onPageChange($event)"
          (rowsChange)="rows = $event"
        ></rx-pagination>
      }
    </div>
  `,
  standalone: true,
  imports: [
    NgClass,
    NgTemplateOutlet,
    NgStyle,
    RxPagination,
    RxTableBody,
  ],
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./table.css'],
})
export class RxTable extends BaseComponent implements OnInit, AfterViewInit {
  @Input() get value(): any[] {
    return this._value;
  }
  set value(val: any[]) {
    this._value = val;
    this.updatePagination();
    this._table.onValueChange(val);
  }

  @Input() tableClass: string = '';
  @Input() tableStyle: { [key: string]: string | number } = {};
  @Input() showGridlines: boolean = true;
  @Input() emptyMessage: string = 'Aucune donnée disponible';
  @Input() selection: any;
  @Input() selectionMode: 'single' | 'multiple' | null = null;
  @Input() key: string = '';
  @Input() get sortField(): string | undefined | null {
    return this._sortField;
  }
  set sortField(val: string | undefined | null) {
    this._sortField = val;
    this.updateSortMeta();
  }

  @Input() get sortOrder(): number {
    return this._sortOrder;
  }
  set sortOrder(val: number) {
    this._sortOrder = val;
    this.updateSortMeta();
  }

  @Input() get sortIcon(): string {
    return this._sortIcon;
  }
  set sortIcon(val: string) {
    this._sortIcon = val;
    this.updateSortMeta();
  }

  @Input() rows: number = 10;
  @Input() page: number = 0;
  @Input() sortMode: 'single' | 'multiple' = 'single';
  @Input() defaultSortOrder: number = 1;

  @Output() selectionChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<SortMeta>();

  @ContentChild('header', { descendants: false })
  headerTemplate: TemplateNull<any>;
  @ContentChild('body', { descendants: false }) bodyTemplate: TemplateNull<any>;

  get processedData() {
    return this.value || [];
  }

  get pagedData(): any[] {
    if (!this.value) {
      return [];
    }
    const start = this.page * this.rows;
    const end = start + this.rows;
    return this.value.slice(start, end);
  }

  private _value: any[] = [];
  private _sortField: string | undefined | null = undefined;
  private _sortOrder: number = 1;
  private _sortIcon: string = '';
  public _table: RxTableService = inject(RxTableService);

  instanceId: number = ++instanceCounter;

  id: string = UniqueComponentId();

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.updatePagination();
    this._table.onValueChange(this._value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['value']) {
      this.updatePagination();
      this._table.onValueChange(this._value);
    }
    if (changes['sortField'] || changes['sortOrder'] || changes['sortIcon']) {
      this.updateSortMeta();
    }
    this.cd.detectChanges();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  updateSortMeta() {
    this._table.onSort({
      field: this._sortField,
      order: this._sortOrder,
    });
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
    this._table.onSort(sortMeta);
    this.cd.markForCheck();
  }

  onPageChange(event: any) {
    this.page = event.page;
    this.cd.markForCheck();
  }

  updatePagination() {
    this.page = 0;
  }

  isSorted(field: string) {
    if (this.sortMode === 'single') {
      return this.sortField && this.sortField === field;
    }
    return false;
  }

  isSortedUp(field: string) {
    return this.isSorted(field) && this.sortOrder === 1;
  }

  isSortedDown(field: string) {
    return this.isSorted(field) && this.sortOrder === -1;
  }

  isSelected(rowData: any): boolean {
    if (!this.selection || !rowData) {
      return false;
    }

    if (this.selectionMode === 'single') {
      return this.selection === rowData;
    } else {
      return (this.selection as any[]).includes(rowData);
    }
  }

  selectRow(rowData: any) {
    if (this.selectionMode === 'single') {
      this.selection = rowData;
    } else if (this.selectionMode === 'multiple') {
      const selection = this.selection as any[];
      const index = selection.indexOf(rowData);

      if (index === -1) {
        selection.push(rowData);
      } else {
        selection.splice(index, 1);
      }
    }

    this.selectionChange.emit(this.selection);
    this.cd.markForCheck();
  }
}
