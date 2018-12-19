import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { QueryPanelValues } from '../query-panel-values';
import { OccupationMultiTypeaheadItem } from '../../occupation-multi-typeahead-item';
import { MultiTypeaheadItem } from '../../../shared/forms/input/multi-typeahead/multi-typeahead-item';

@Component({
  selector: 'alv-query-search-panel',
  templateUrl: './query-search-panel.component.html',
  styleUrls: ['./query-search-panel.component.scss']
})
export class QuerySearchPanelComponent implements OnInit {

  constructor() {
  }

  keywordControl = new FormControl();
  localitiesControl = new FormControl();
  occupationsControl = new FormControl();

  @Output()
  filtersChange = new EventEmitter<QueryPanelValues>();


  ngOnInit() {
  }

  loadOccupations(): Observable<OccupationMultiTypeaheadItem[]> {
    return of([new OccupationMultiTypeaheadItem('mockType', [{type: 'mockType', value: 3}], 'mockLabel', 0)]).pipe(timeout(1));
  }

  loadKeywords(): Observable<MultiTypeaheadItem<any>[]> {
    return of([]).pipe(timeout(1));
  }

  loadLocalities(): Observable<MultiTypeaheadItem<any>[]> {
    return of([]).pipe(timeout(1));
  }


}
