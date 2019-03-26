import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { merge, Observable, Subject } from 'rxjs';
import { JobQueryPanelValues } from './job-query-panel-values';
import { OccupationTypeaheadItem } from '../../../shared/occupations/occupation-typeahead-item';
import { OccupationSuggestionService } from '../../../shared/occupations/occupation-suggestion.service';
import { LocalitySuggestionService } from '../../../shared/localities/locality-suggestion.service';
import { StringTypeaheadItem } from '../../../shared/forms/input/typeahead/string-typeahead-item';
import { debounceTime, map, startWith, takeUntil } from 'rxjs/operators';
import { LocalitySuggestion } from '../../../shared/backend-services/reference-service/locality.types';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import {
  LocalityInputType,
  LocalityTypeaheadItem
} from '../../../shared/localities/locality-typeahead-item';

@Component({
  selector: 'alv-job-query-panel',
  templateUrl: './job-query-panel.component.html',
  styleUrls: ['./job-query-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  jobQueryPanelValuesChange = new EventEmitter<JobQueryPanelValues>();

  @Output()
  searchSubmit = new EventEmitter<JobQueryPanelValues>();

  form: FormGroup;

  isRadiusSliderShown$: Observable<boolean>;

  resetFormValues$ = new Subject<JobQueryPanelValues>();

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
      radius: []
    });

    this.setFormValues(this._jobQueryPanelValues);

    this.form.valueChanges.pipe(
      debounceTime(400),
      map<any, JobQueryPanelValues>((valueChanges) => this.map(valueChanges)),
      takeUntil(this.ngUnsubscribe))
      .subscribe(queryPanelValues => this.jobQueryPanelValuesChange.next(queryPanelValues));

    this.isRadiusSliderShown$ = merge(
      this.form.valueChanges.pipe(
        startWith(this.form.value)
      ),
      this.resetFormValues$
    ).pipe(
      map(this.isRadiusSliderVisible)
    );
  }

  loadOccupations(query: string): Observable<OccupationTypeaheadItem[]> {
    return this.occupationSuggestionService.fetchJobSearchOccupations(query);
  }

  loadLocalities(query: string): Observable<LocalityTypeaheadItem[]> {
    return this.localitySuggestionService.fetch(query);
  }

  onGeoSelection(locality: LocalitySuggestion) {
    const geoLocalitySuggestion = LocalitySuggestionService.toLocalityTypeaheadItem(locality);
    const ctrl = this.form.get('localities');
    if (!ctrl.value.find((i: StringTypeaheadItem) => geoLocalitySuggestion.equals(i))) {
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
        radius: jobQueryPanelValues.radius || 30
      }, { emitEvent: false });
      // Because the above "setValue()" method is called with {emitEvent: false} to avoid
      // an infinite loop, we have to emit our own event if the form value is set from
      // outside.
      this.resetFormValues$.next(jobQueryPanelValues);
    }
  }

  private map(valueChanges: any): JobQueryPanelValues {
    return {
      occupations: valueChanges.occupations,
      keywords: valueChanges.keywords,
      localities: valueChanges.localities,
      radius: valueChanges.radius
    };
  }

  private isRadiusSliderVisible(value: JobQueryPanelValues) {
    if (!value.localities || value.localities.length !== 1) {
      return false;
    }

    const selectedLocality = value.localities[0];

    return selectedLocality.type === LocalityInputType.LOCALITY && !!selectedLocality.payload.geoPoint;
  }
}
