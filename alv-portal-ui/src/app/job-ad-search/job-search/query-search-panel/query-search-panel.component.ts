import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { QueryPanelValues } from './query-panel-values';
import { OccupationMultiTypeaheadItem } from '../../../shared/occupations/occupation-multi-typeahead-item';
import { OccupationSuggestionService } from '../../../shared/occupations/occupation-suggestion.service';
import {
  LocalityInputType,
  LocalitySuggestionService
} from '../../../shared/localities/locality-suggestion.service';
import { SimpleMultiTypeaheadItem } from '../../../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';
import { JobSearchFilter } from '../../state-management/state/job-search-filter.types';
import { map, takeUntil } from 'rxjs/operators';
import { LocalitySuggestion } from '../../../shared/backend-services/reference-service/locality.types';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';

@Component({
  selector: 'alv-query-search-panel',
  templateUrl: './query-search-panel.component.html',
  styleUrls: ['./query-search-panel.component.scss']
})
export class QuerySearchPanelComponent extends AbstractSubscriber implements OnInit {

  loadOccupationsFn = this.loadOccupations.bind(this);

  loadLocalitiesFn = this.loadLocalities.bind(this);

  @Input()
  jobSearchFilter: JobSearchFilter;

  @Input()
  loading$: Observable<boolean>;

  @Input()
  applyFilterReset$: Observable<JobSearchFilter>;

  @Output()
  queriesChange = new EventEmitter<QueryPanelValues>();

  form: FormGroup;

  showSpinner = false;

  constructor(private fb: FormBuilder,
              private occupationSuggestionService: OccupationSuggestionService,
              private localitySuggestionService: LocalitySuggestionService) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      occupations: [this.jobSearchFilter.occupations],
      keywords: [this.jobSearchFilter.keywords],
      localities: [this.jobSearchFilter.localities],
    });

    this.loading$.pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe((loading) => this.showSpinner = loading);

    this.form.valueChanges.pipe(
      map<any, QueryPanelValues>((valueChanges) => this.map(valueChanges)),
      takeUntil(this.ngUnsubscribe))
      .subscribe(queryPanelValues => this.queriesChange.next(queryPanelValues));

    this.applyFilterReset$.pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe((filter) => this.onFilterFormReset(filter));

  }

  loadOccupations(query: string): Observable<OccupationMultiTypeaheadItem[]> {
    return this.occupationSuggestionService.fetch(query);
  }

  loadLocalities(query: string): Observable<SimpleMultiTypeaheadItem[]> {
    return this.localitySuggestionService.fetch(query);
  }

  onGeoSelection(locality: LocalitySuggestion) {
    const geoLocalitySuggestion = new SimpleMultiTypeaheadItem(LocalityInputType.LOCALITY, String(locality.communalCode), locality.city, 0);
    const ctrl = this.form.get('localities');
    if (!ctrl.value.find((i: SimpleMultiTypeaheadItem) => geoLocalitySuggestion.equals(i))) {
      ctrl.setValue([...ctrl.value, geoLocalitySuggestion]);
    }
  }

  private onFilterFormReset(filter: JobSearchFilter): void {
    this.form.reset({
      occupations: filter.occupations,
      keywords: filter.keywords,
      localities: filter.localities,
    }, { emitEvent: false });
  }

  private map(valueChanges: any): QueryPanelValues {
    return {
      occupations: valueChanges.occupations,
      keywords: valueChanges.keywords,
      localities: valueChanges.localities
    };
  }

}
