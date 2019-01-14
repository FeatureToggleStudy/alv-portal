import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ManagedJobAdsSort,
  SortDirection
} from '../../../job-advertisement/manage-job-ads/state-management/state';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';


export interface JobAdManagementRow2 {

  jobAdvertisement: JobAdvertisement;

  title: string;

  isCancellable: boolean;

  detailRouterLink: string[];
}

export interface JobAdColumnDefinition {
  backendKey: ManagedJobAdsSort;
  columnName: string;
  render: (job: JobAdvertisement) => string;
}

export interface SortChangeEvent {
  column: ManagedJobAdsSort;
  direction: SortDirection;
}

interface CurrentSorting {
  column: ManagedJobAdsSort;
  direction: SortDirection;
}

@Component({
  selector: 'alv-job-ad-management-table',
  templateUrl: './job-ad-management-table.component.html',
  styleUrls: ['./job-ad-management-table.component.scss']
})
export class JobAdManagementTableComponent implements OnInit {

  @Input()
  columns: JobAdColumnDefinition[];

  @Input()
  currentSorting: CurrentSorting;

  @Input()
  rows: JobAdManagementRow2[];

  @Output()
  scroll = new EventEmitter<void>();

  @Output()
  sort = new EventEmitter<SortChangeEvent>();

  SortDirection = SortDirection;

  constructor() {
  }

  ngOnInit() {
    //
  }

  onSortChange(selectedColumn: ManagedJobAdsSort) {
    this.sort.emit({
      column: selectedColumn,
      direction: this.determineSortDirection(selectedColumn)
    });
  }

  private determineSortDirection(newSelectedColumn: ManagedJobAdsSort) {
    if (newSelectedColumn !== this.currentSorting.column) {
      return SortDirection.ASC;
    }
    return this.currentSorting.direction === SortDirection.ASC ? SortDirection.DESC : SortDirection.ASC;
  }

  onScroll() {
    this.scroll.emit();
  }

  cancelJobAdAction() {
    // TODO
  }
}
