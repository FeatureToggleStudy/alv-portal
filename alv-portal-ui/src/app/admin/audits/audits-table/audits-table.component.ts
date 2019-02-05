import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Audit, AuditsColumnDefinition } from '../../../shared/backend-services/audits/audits.types';
import { AUDITS_COLUMN_NAME, isAuditsColumnSortable, mapAuditsColumnDefinitionToSort } from '../audits-factory';

@Component({
  selector: 'alv-audits-table',
  templateUrl: './audits-table.component.html',
  styleUrls: ['./audits-table.component.scss']
})
export class AuditsTableComponent implements OnInit {

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
    this.columnDefinitions = AUDITS_COLUMN_NAME.map((columnName) => {
      return {
        columnName: columnName,
        sortOrder: '',
        sortable: isAuditsColumnSortable(columnName)
      } as AuditsColumnDefinition;
    });
  }

  onScroll() {
    this.scroll.emit(this.page + 1);
  }

  onSort(column: string) {
    this.sort.emit(mapAuditsColumnDefinitionToSort(this.currentSorting, column));
  }

}
