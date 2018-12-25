import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { OccupationMultiTypeaheadItem } from '../../../shared/occupations/occupation-multi-typeahead-item';
import { OccupationSuggestionService } from '../../../shared/occupations/occupation-suggestion.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LocalitySuggestion } from '../../../shared/backend-services/reference-service/locality.types';
import { LocalitySuggestionService } from '../../../shared/localities/locality-suggestion.service';
import { CandidateQueryPanelValues } from './candidate-query-panel-values';
import { map, takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { LocalityMultiTypeaheadItem } from '../../../shared/localities/locality-multi-typeahead-item';

@Component({
  selector: 'alv-candidate-query-panel',
  templateUrl: './candidate-query-panel.component.html',
  styleUrls: ['./candidate-query-panel.component.scss']
})
export class CandidateQueryPanelComponent extends AbstractSubscriber implements OnInit {

  @Input()
  showSpinner: boolean;

  @Input()
  set candidateQueryPanelValues(value: CandidateQueryPanelValues) {
    this._candidateQueryPanelValues = value;
    this.setFormValues(value);
  }

  @Output()
  candidateQueryPanelValuesChange = new EventEmitter<CandidateQueryPanelValues>();

  @Output()
  searchSubmit = new EventEmitter<CandidateQueryPanelValues>();

  loadOccupationsFn = this.loadOccupations.bind(this);

  loadLocalitiesFn = this.loadLocalities.bind(this);

  form: FormGroup;

  private _candidateQueryPanelValues: CandidateQueryPanelValues;

  constructor(private fb: FormBuilder,
              private localitySuggestionService: LocalitySuggestionService,
              private occupationSuggestionService: OccupationSuggestionService) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      occupations: [],
      keywords: [],
      localities: [],
    });

    this.setFormValues(this._candidateQueryPanelValues);

    this.form.valueChanges.pipe(
      map<any, CandidateQueryPanelValues>((valueChanges) => this.map(valueChanges)),
      takeUntil(this.ngUnsubscribe))
      .subscribe(queryPanelValues => this.candidateQueryPanelValuesChange.next(queryPanelValues));
  }

  loadOccupations(query: string): Observable<OccupationMultiTypeaheadItem[]> {
    return this.occupationSuggestionService.fetchCandidateSearchOccupations(query);
  }

  loadLocalities(query: string): Observable<LocalityMultiTypeaheadItem[]> {
    return this.localitySuggestionService.fetch(query);
  }

  onGeoSelection(locality: LocalitySuggestion) {
    const geoLocalitySuggestion = LocalitySuggestionService.toLocality(locality);
    const ctrl = this.form.get('localities');
    if (!ctrl.value.find((i: LocalityMultiTypeaheadItem) => geoLocalitySuggestion.equals(i))) {
      ctrl.setValue([geoLocalitySuggestion]);
    }
  }

  onSearchSubmit() {
    this.searchSubmit.emit(this.map(this.form.value));
  }

  private map(valueChanges: any): CandidateQueryPanelValues {
    return {
      occupations: valueChanges.occupations,
      keywords: valueChanges.keywords,
      workplace: valueChanges.localities[0]
    };
  }

  private setFormValues(value: CandidateQueryPanelValues) {
    if (this.form && value) {
      this.form.setValue({
        occupations: value.occupations,
        keywords: value.keywords,
        localities: value.workplace ? [value.workplace] : [],
      }, { emitEvent: false });
    }
  }
}
