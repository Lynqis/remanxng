import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { NgClass, NgFor, NgStyle } from '@angular/common';
import { RxIcon } from '../icon';

@Component({
  selector: 'rx-pagination',
  template: `
    <div class="rx-pagination" [ngClass]="paginationClass" [ngStyle]="paginationStyle">
      <div class="rx-pagination-info">
        <span>
          Affichage de {{ first + 1 }} à {{ last }} sur {{ totalRecords }} éléments
        </span>
      </div>

      <div class="rx-pagination-controls">
        <button
          class="rx-pagination-button"
          [disabled]="!hasPreviousPage"
          (click)="previousPage()"
          title="Première page"
        >
          <span class="material-icons">first_page</span>
        </button>

        <button
          class="rx-pagination-button"
          [disabled]="!hasPreviousPage"
          (click)="previousPage()"
          title="Page précédente"
        >
          <rx-icon [iconJson]="'chevron-left'" />
        </button>

        <ng-container *ngFor="let page of pageNumbers">
          <button
            class="rx-pagination-page"
            [class.active]="page === currentPage"
            (click)="gotoPage(page)"
          >
            {{ page }}
          </button>
        </ng-container>

        <button
          class="rx-pagination-button"
          [disabled]="!hasNextPage"
          (click)="nextPage()"
          title="Page suivante"
        >
          <rx-icon [iconJson]="'chevron-right'" />
        </button>

        <button
          class="rx-pagination-button"
          [disabled]="!hasNextPage"
          (click)="lastPage()"
          title="Dernière page"
        >
          <span class="material-icons">last_page</span>
        </button>
      </div>

      <div class="rx-pagination-select">
        <select
          class="rx-pagination-select-items"
          [value]="rows"
          (change)="onRowsChange($event)"
        >
          <option *ngFor="let row of rowsOptions" [value]="row">{{ row }} par page</option>
        </select>
      </div>
    </div>
  `,
  standalone: true,
  imports: [NgClass, NgStyle, NgFor, RxIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class RxPagination {
  @Input() get value(): any[] {
    return this._value;
  }
  set value(val: any[]) {
    this._value = val;
    this.updatePagination();
  }

  @Input() get rows(): number {
    return this._rows;
  }
  set rows(val: number) {
    this._rows = val;
    this.updatePagination();
  }

  @Input() get totalRecords(): number {
    return this._totalRecords;
  }
  set totalRecords(val: number) {
    this._totalRecords = val;
    this.updatePagination();
  }

  @Input() paginationClass: string = '';
  @Input() paginationStyle: { [key: string]: string | number } = {};
  @Input() rowsOptions: number[] = [10, 20, 50, 100];

  @Output() pageChange = new EventEmitter<any>();
  @Output() rowsChange = new EventEmitter<number>();

  _value: any[] = [];
  _rows: number = 10;
  _totalRecords: number = 0;

  currentPage: number = 1;
  first: number = 0;
  last: number = 0;
  totalPages: number = 1;
  pageNumbers: number[] = [];

  constructor() {
    this.updatePagination();
  }

  private updatePagination(): void {
    this.totalPages = Math.ceil(this.totalRecords / this.rows);
    this.last = Math.min(this.first + this.rows, this.totalRecords);
    this.pageNumbers = this.generatePageNumbers();
  }

  private generatePageNumbers(): number[] {
    const numbers: number[] = [];
    const maxPages = 7;
    const half = Math.floor(maxPages / 2);

    if (this.totalPages <= maxPages) {
      for (let i = 1; i <= this.totalPages; i++) {
        numbers.push(i);
      }
    } else {
      for (let i = 1; i <= half; i++) {
        numbers.push(i);
      }

      if (this.currentPage > half + 2) {
        numbers.push(-1);
      }

      const start = Math.max(1, this.currentPage - half);
      const end = Math.min(this.totalPages, this.currentPage + half);
      for (let i = start; i <= end; i++) {
        numbers.push(i);
      }

      if (this.currentPage < this.totalPages - half) {
        numbers.push(-1);
      }

      for (let i = Math.max(1, this.totalPages - half + 1); i <= this.totalPages; i++) {
        numbers.push(i);
      }
    }

    return numbers;
  }

  private emitPageChange(): void {
    this.first = (this.currentPage - 1) * this.rows;
    this.last = Math.min(this.first + this.rows, this.totalRecords);
    this.pageChange.emit({
      first: this.first,
      rows: this.rows,
      page: this.currentPage - 1,
      pageCount: this.totalPages,
    });
  }

  gotoPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.emitPageChange();
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage) {
      this.currentPage--;
      this.emitPageChange();
    }
  }

  nextPage(): void {
    if (this.hasNextPage) {
      this.currentPage++;
      this.emitPageChange();
    }
  }

  firstPage(): void {
    if (this.currentPage > 1) {
      this.currentPage = 1;
      this.emitPageChange();
    }
  }

  lastPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.totalPages;
      this.emitPageChange();
    }
  }

  onRowsChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.rows = parseInt(target.value, 10);
    this.currentPage = 1;
    this.emitPageChange();
    this.rowsChange.emit(this.rows);
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }
}
