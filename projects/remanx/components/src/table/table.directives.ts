import {
  ComponentRef,
  Directive,
  ElementRef,
  Host,
  HostListener,
  inject,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
  ViewContainerRef,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RxTable } from './table';
import { RxIcon } from '../icon';

@Directive({
  selector: '[rxSortableColumn]',
  standalone: true,
  host: {
    '[class.rx-sort-column]': 'true'
  },
})
export class RxSortableColumn {
  @Input('rxSortableColumn') field: string = '';
  @Input() rxSortableColumnDisabled: boolean = false;

  sorted: boolean = false;
  sortOrder: 'asc' | 'desc' | 'none' = 'asc';
  private subscription: Subscription | undefined;

  dt: RxTable = inject(RxTable);

  constructor() {
    if (!this.dt) {
      throw new Error(
        'RxSortableColumn must be used inside an RxTable component.'
      );
    }
    if (this.isEnabled()) {
      this.subscription = this.dt._table.sortSource$.subscribe(() => {
        this.updateSortState();
      });
    }
  }

  ngOnInit() {
    if (this.isEnabled()) {
      this.updateSortState();
    }
  }

  updateSortState() {
    let sorted = false;
    let sortOrder = 0;

    if (this.dt.sortMode === 'single') {
      sorted = this.dt.isSorted(this.field) as boolean;
      sortOrder = this.dt.sortOrder;
    }

    this.sorted = sorted;
    this.sortOrder = sorted ? (sortOrder === 1 ? 'asc' : 'desc') : 'none';
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.isEnabled()) {
      this.updateSortState();
      this.dt.sortData({
        originalEvent: event,
        field: this.field,
      });
    }
  }

  isEnabled() {
    return this.rxSortableColumnDisabled !== true;
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

  constructor(
    @Optional() @Host() public table: RxTable,
    private el: ElementRef
  ) {
    if (!this.table) {
      throw new Error(
        'RxSortableColumn must be used inside an RxTable component.'
      );
    }
    this.subscription = this.table._table.selectionSource$.subscribe(
      () => {
        this.selected = this.table.isSelected(this.data);
      }
    );
  }

  ngOnInit() {
    this.selected = this.table.isSelected(this.data);
  }

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    if (!this.rxSelectableRowDisabled) {
      if (this.selected) {
        // this.table.onRowUnselect(this.data);
      } else {
        // this.table.onRowSelect(this.data);
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
})
export class RxSortIcon {
  @Input('rxSortIcon') field: string = '';

  sorted: boolean = false;
  sortOrder: 'asc' | 'desc' = 'asc';
  private subscription: Subscription;
  private viewContainerRef: ViewContainerRef = inject(ViewContainerRef);
  private iconRef?: ComponentRef<RxIcon>;

  constructor(@Optional() @Host() public table: RxTable) {
    if (!this.table) {
      throw new Error(
        'RxSortableColumn must be used inside an RxTable component.'
      );
    }
    this.subscription = this.table._table.sortSource$.subscribe(() => {
      this.updateSortState();
    });
  }

  ngOnInit() {
    this.updateSortState();
  }

  updateSortState() {
    this.viewContainerRef.clear();
    this.sorted = this.table.sortField === this.field;
    this.sortOrder = this.table.sortOrder === 1 ? 'asc' : 'desc';
    if (this.sorted) {
      const icon = this.viewContainerRef.createComponent(RxIcon);
      icon.instance.iconJson = this.sortOrder === 'asc' ? 'chevron-up' : 'chevron-down';
      icon.instance.svgClasses = this.sortOrder === 'asc' ? 'rx-sort-icon rx-sort-icon-asc' : 'rx-sort-icon rx-sort-icon-desc';
      this.iconRef = icon;
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
