import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {
  JobAdColumnDefinition,
  JobAdManagementRow,
  ManagedJobAdsAction,
  ManagedJobAdsActionType,
  ManagedJobAdsSorting,
  ManagedJobAdsSortingColumn,
  SortDirection
} from './job-ad-management.table-types';


@Component({
  selector: 'alv-job-ad-management-table',
  templateUrl: './job-ad-management-table.component.html',
  styleUrls: ['./job-ad-management-table.component.scss'],
  /* tslint:disable:use-view-encapsulation */
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobAdManagementTableComponent implements OnInit {

  @Input()
  columns: JobAdColumnDefinition[];

  @Input()
  currentSorting: ManagedJobAdsSorting;

  @Input()
  rows: JobAdManagementRow[];

  @Output()
  scroll = new EventEmitter<void>();

  @Output()
  sort = new EventEmitter<ManagedJobAdsSorting>();

  @Output()
  action = new EventEmitter<ManagedJobAdsAction>();

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
    this.action.emit({ row: row, type: ManagedJobAdsActionType.ON_CANCEL });
  }

  open(row: JobAdManagementRow, $event: Event) {
    this.action.emit({ row: row, type: ManagedJobAdsActionType.ON_OPEN });
  }

  duplicate(row: JobAdManagementRow) {
    this.action.emit({ row: row, type: ManagedJobAdsActionType.ON_DUPLICATE });
  }
}
