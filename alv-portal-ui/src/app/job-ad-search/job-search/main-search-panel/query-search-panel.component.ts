import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { QueryPanelValues } from '../query-panel-values';
import { MultiTypeaheadItem } from '../../../shared/forms/input/multi-typeahead/multi-typeahead-item';
import { OccupationMultiTypeaheadItem } from '../../../shared/occupations/occupation-multi-typeahead-item';
import { OccupationSuggestionService } from '../../../shared/occupations/occupation-suggestion.service';

@Component({
  selector: 'alv-query-search-panel',
  templateUrl: './query-search-panel.component.html',
  styleUrls: ['./query-search-panel.component.scss']
})
export class QuerySearchPanelComponent implements OnInit {

  loadOccupationsFn = this.loadOccupations.bind(this);

  constructor(private occupationSuggestionService: OccupationSuggestionService) {
  }


  keywordControl = new FormControl();
  localitiesControl = new FormControl();
  occupationsControl = new FormControl();

  @Output()
  filtersChange = new EventEmitter<QueryPanelValues>();


  ngOnInit() {
  }

  loadOccupations(query: string): Observable<OccupationMultiTypeaheadItem[]> {
    return this.occupationSuggestionService.fetch(query);
  }

  loadKeywords(): Observable<MultiTypeaheadItem<any>[]> {
    return of([]).pipe(timeout(1));
  }

  loadLocalities(): Observable<MultiTypeaheadItem<any>[]> {
    return of([]).pipe(timeout(1));
  }


}
