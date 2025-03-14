import { Directive, ElementRef, EventEmitter, HostListener, Input, NgZone, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { RxTable } from './table';

@Directive({
  selector: '[rxSortableColumn]',
  standalone: true,
})
export class RxSortableColumn {
  @Input('rxSortableColumn') field: string = '';
  @Input() rxSortableColumnDisabled: boolean = false;

  sorted: boolean = false;
  sortOrder: 'asc' | 'desc' = 'asc';
  private subscription: Subscription;

  constructor(public table: RxTable, private zone: NgZone) {
    this.subscription = this.table.tableService.sortSource$.subscribe(() => {
      this.updateSortState();
    });
  }

  ngOnInit() {
    this.updateSortState();
  }

  updateSortState() {
    this.sorted = this.table.sortField === this.field;
    this.sortOrder = this.table.sortOrder === 1 ? 'asc' : 'desc';
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.rxSortableColumnDisabled) {
      this.zone.run(() => {
        this.table.sort(this.field);
      });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

@Directive({
  selector: '[rxSelectableRow]',
  standalone: true,
})
export class RxSelectableRow {
  @Input('rxSelectableRow') data: any;
  @Input() rxSelectableRowIndex: number | undefined;
  @Input() rxSelectableRowDisabled: boolean = false;

  selected: boolean = false;
  private subscription: Subscription;

  constructor(public table: RxTable, private el: ElementRef) {
    this.subscription = this.table.tableService.selectionSource$.subscribe(() => {
      this.selected = this.table.isSelected(this.data);
    });
  }

  ngOnInit() {
    this.selected = this.table.isSelected(this.data);
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (!this.rxSelectableRowDisabled) {
      if (this.selected) {
        this.table.onRowUnselect(this.data);
      } else {
        this.table.onRowSelect(this.data);
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

@Directive({
  selector: '[rxSortIcon]',
  standalone: true,
  host: {
    '[class.rx-sort-icon]': 'true',
    '[class.rx-sort-icon-asc]': 'sorted && sortOrder === "asc"',
    '[class.rx-sort-icon-desc]': 'sorted && sortOrder === "desc"'
  }
})
export class RxSortIcon {
  @Input('rxSortIcon') field: string = '';

  sorted: boolean = false;
  sortOrder: 'asc' | 'desc' = 'asc';
  private subscription: Subscription;

  constructor(public table: RxTable) {
    this.subscription = this.table.tableService.sortSource$.subscribe(() => {
      this.updateSortState();
    });
  }

  ngOnInit() {
    this.updateSortState();
  }

  updateSortState() {
    this.sorted = this.table.sortField === this.field;
    this.sortOrder = this.table.sortOrder === 1 ? 'asc' : 'desc';
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
