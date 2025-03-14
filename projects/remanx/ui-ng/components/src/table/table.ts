import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  Injectable,
  Input,
  Output,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { NgClass, NgStyle, NgTemplateOutlet, NgIf } from '@angular/common';
import { Subject } from 'rxjs';

export interface SortMeta {
  field: string;
  order: 1 | -1;
}

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
            *ngTemplateOutlet="bodyTemplate; context: { $implicit: processedData }"
          ></ng-container>
          <tr *ngIf="!processedData?.length" class="rx-table-empty">
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
  providers: [RxTableService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class RxTable<T = any> {
  @Input() value: T[] = [];
  @Input() tableClass: string = '';
  @Input() tableStyle: { [key: string]: string | number } = {};
  @Input() showGridlines: boolean = false;
  @Input() emptyMessage: string = 'Aucune donnée disponible';
  @Input() selection: any;
  @Input() selectionMode: 'single' | 'multiple' | null = null;
  @Input() dataKey: string = '';
  @Input() sortField: string = '';
  @Input() sortOrder: 1 | -1 = 1;
  @Input() multiSortMeta: SortMeta[] = [];
  @Input() sortMode: 'single' | 'multiple' = 'single';

  @Output() selectionChange = new EventEmitter<any>();
  @Output() sortChange = new EventEmitter<SortMeta>();

  @ContentChild('header') headerTemplate!: TemplateRef<any>;
  @ContentChild('body') bodyTemplate!: TemplateRef<any>;

  processedData: T[] = [];

  constructor(public tableService: RxTableService) {}

  ngOnInit() {
    this.processedData = [...this.value];
    this.tableService.onValueChange(this.value);
  }

  ngOnChanges(changes: any) {
    if (changes.value) {
      this.processedData = [...this.value];
      this.tableService.onValueChange(this.value);
    }
  }

  sort(field: string) {
    const order: 1 | -1 = this.sortField === field ? (this.sortOrder === 1 ? -1 : 1) : 1;

    if (this.sortMode === 'single') {
      this.sortOrder = order;
      this.sortField = field;

      this.processedData.sort((a: any, b: any) => {
        const value1 = a[field];
        const value2 = b[field];
        let result = 0;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        return order * result;
      });

      this.sortChange.emit({ field, order });
    }
    this.tableService.onSort({ field, order });
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
        return this.selection.some((selectedRow) => selectedRow[this.dataKey] === rowData[this.dataKey]);
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