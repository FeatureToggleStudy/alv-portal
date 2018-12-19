import { Component, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { timeout } from 'rxjs/operators';
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
  filtersChange: Subject<any> = new Subject<any>();


  ngOnInit() {
  }

  loadOccupations(): Observable<MultiTypeaheadItem<any>[]> {
    return of([]).pipe(timeout(1));
  }

  loadKeywords(): Observable<MultiTypeaheadItem<any>[]> {
    return of([]).pipe(timeout(1));
  }

  loadLocalities(): Observable<MultiTypeaheadItem<any>[]> {
    return of([]).pipe(timeout(1));
  }


}
