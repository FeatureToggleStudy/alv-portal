import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  JobAdColumnDefinition,
  JobAdManagementRow,
  ManagedJobAdsSortingColumn,
  MangedJobAdsAction,
  MangedJobAdsActionType,
  MangedJobAdsSorting,
  SortDirection
} from './job-ad-management.table-types';

@Component({
  selector: 'alv-job-ad-management-table',
  templateUrl: './job-ad-management-table.component.html',
  styleUrls: ['./job-ad-management-table.component.scss']
})
export class JobAdManagementTableComponent implements OnInit {

  @Input()
  columns: JobAdColumnDefinition[];

  @Input()
  currentSorting: MangedJobAdsSorting;

  @Input()
  rows: JobAdManagementRow[];

  @Output()
  scroll = new EventEmitter<void>();

  @Output()
  sort = new EventEmitter<MangedJobAdsSorting>();

  @Output()
  action = new EventEmitter<MangedJobAdsAction>();

  SortDirection = SortDirection;

  constructor() {
  }

  ngOnInit() {
    //
  }

  onSortChange(selectedColumn: ManagedJobAdsSortingColumn) {
    this.sort.emit({
      column: selectedColumn,
      direction: this.determineSortDirection(selectedColumn)
    });
  }

  private determineSortDirection(selectedColumn: ManagedJobAdsSortingColumn) {
    if (selectedColumn !== this.currentSorting.column) {
      return SortDirection.ASC;
    }
    return this.currentSorting.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
  }

  onScroll() {
    this.scroll.emit();
  }

  cancel(row: JobAdManagementRow) {
    this.action.emit({ row: row, type: MangedJobAdsActionType.ON_CANCEL });
  }

  open(row: JobAdManagementRow) {
    this.action.emit({ row: row, type: MangedJobAdsActionType.ON_OPEN });
  }

  duplicate(row: JobAdManagementRow) {
    this.action.emit({ row: row, type: MangedJobAdsActionType.ON_DUPLICATE });
  }
}
