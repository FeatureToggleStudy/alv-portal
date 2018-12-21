import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { JobQueryPanelValues } from './job-query-panel-values';
import { OccupationMultiTypeaheadItem } from '../../../shared/occupations/occupation-multi-typeahead-item';
import { OccupationSuggestionService } from '../../../shared/occupations/occupation-suggestion.service';
import {
  LocalityInputType,
  LocalitySuggestionService
} from '../../../shared/localities/locality-suggestion.service';
import { SimpleMultiTypeaheadItem } from '../../../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';
import { map, takeUntil } from 'rxjs/operators';
import { LocalitySuggestion } from '../../../shared/backend-services/reference-service/locality.types';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';

@Component({
  selector: 'alv-job-query-panel',
  templateUrl: './job-query-panel.component.html',
  styleUrls: ['./job-query-panel.component.scss']
})
export class JobQueryPanelComponent extends AbstractSubscriber implements OnInit {

  loadOccupationsFn = this.loadOccupations.bind(this);

  loadLocalitiesFn = this.loadLocalities.bind(this);

  @Input()
  jobQueryPanelValues: JobQueryPanelValues;

  @Input()
  showSpinner: boolean;

  @Input()
  set applyFilterReset(filter: JobQueryPanelValues) {
    if (this.form && filter) {
      this.onFilterFormReset(filter);
    }
  }

  @Output()
  queriesChange = new EventEmitter<JobQueryPanelValues>();

  @Output()
  searchSubmit = new EventEmitter<JobQueryPanelValues>();

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private occupationSuggestionService: OccupationSuggestionService,
              private localitySuggestionService: LocalitySuggestionService) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      occupations: [[]],
      keywords: [[]],
      localities: [[]],
    });
    if (this.jobQueryPanelValues) {
      this.form.setValue({
        occupations: this.jobQueryPanelValues.occupations,
        keywords: this.jobQueryPanelValues.keywords,
        localities: this.jobQueryPanelValues.localities,
      });
    }
    this.form.valueChanges.pipe(
      map<any, JobQueryPanelValues>((valueChanges) => this.map(valueChanges)),
      takeUntil(this.ngUnsubscribe))
      .subscribe(queryPanelValues => this.queriesChange.next(queryPanelValues));
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

  onSearchSubmit() {
    this.searchSubmit.emit(this.map(this.form.value));
  }

  private onFilterFormReset(filter: JobQueryPanelValues): void {
    this.form.reset({
      occupations: filter.occupations,
      keywords: filter.keywords,
      localities: filter.localities,
    }, { emitEvent: false });
  }

  private map(valueChanges: any): JobQueryPanelValues {
    return {
      occupations: valueChanges.occupations,
      keywords: valueChanges.keywords,
      localities: valueChanges.localities
    };
  }

}
