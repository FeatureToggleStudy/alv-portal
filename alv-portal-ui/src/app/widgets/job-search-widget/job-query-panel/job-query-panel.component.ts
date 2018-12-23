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

  private _jobQueryPanelValues: JobQueryPanelValues;

  @Input()
  set jobQueryPanelValues(value: JobQueryPanelValues) {
    this._jobQueryPanelValues = value;
    this.setFormValues(value);
  }

  @Input()
  showSpinner: boolean;

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
      occupations: [],
      keywords: [],
      localities: [],
    });

    this.setFormValues(this._jobQueryPanelValues);

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

  private setFormValues(jobQueryPanelValues: JobQueryPanelValues) {
    if (this.form && jobQueryPanelValues) {
      this.form.setValue({
        occupations: jobQueryPanelValues.occupations,
        keywords: jobQueryPanelValues.keywords,
        localities: jobQueryPanelValues.localities,
      }, { emitEvent: false });
    }
  }

  private map(valueChanges: any): JobQueryPanelValues {
    return {
      occupations: valueChanges.occupations,
      keywords: valueChanges.keywords,
      localities: valueChanges.localities
    };
  }

}
