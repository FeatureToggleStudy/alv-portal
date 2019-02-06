import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Audit, AuditsColumnDefinition } from '../../../shared/backend-services/audits/audits.types';
import { mapAuditsColumnDefinitionToSort } from '../audits-request.mapper';

@Component({
  selector: 'alv-audits-table',
  templateUrl: './audits-table.component.html',
  styleUrls: ['./audits-table.component.scss']
})
export class AuditsTableComponent implements OnInit {

  readonly AUDITS_COLUMN_NAMES = ['timestamp', 'principal', 'type', 'data'];
  @Input()
  auditList: Audit[];

  @Input()
  currentSorting: AuditsColumnDefinition;

  @Input()
  page: number;

  @Output()
  sort = new EventEmitter<string>();

  @Output()
  scroll = new EventEmitter<number>();

  columnDefinitions: AuditsColumnDefinition[];

  constructor() { }

  ngOnInit() {
    this.columnDefinitions = this.AUDITS_COLUMN_NAMES.map((columnName) => {
      return {
        columnName: columnName,
        sortOrder: '',
        sortable: this.isAuditsColumnSortable(columnName)
      } as AuditsColumnDefinition;
    });
  }

  onScroll() {
    this.scroll.emit(this.page + 1);
  }

  onSort(column: string) {
    this.sort.emit(mapAuditsColumnDefinitionToSort(this.currentSorting, column));
  }

  private isAuditsColumnSortable(columnName: string): boolean {
    return columnName === 'timestamp' || columnName === 'type';
  }

}
