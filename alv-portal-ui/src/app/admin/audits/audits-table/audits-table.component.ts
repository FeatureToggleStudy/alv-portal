import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Audit, AuditsColumnDefinition } from '../../../shared/backend-services/audits/audits.types';
import { mapAuditsColumnDefinitionToSort } from '../audits-factory';

@Component({
  selector: 'alv-audits-table',
  templateUrl: './audits-table.component.html'
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

  constructor() { }

  ngOnInit() {
    // COLUMN DEFINITIONS - map
  }

  onScroll() {
    this.scroll.emit(this.page + 1);
  }

  onSort(column: string) {
    this.sort.emit(mapAuditsColumnDefinitionToSort(this.currentSorting, column));
  }

}
