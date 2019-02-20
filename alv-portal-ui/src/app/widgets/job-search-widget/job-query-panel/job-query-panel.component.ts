import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
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
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'alv-job-query-panel',
  templateUrl: './job-query-panel.component.html',
  styleUrls: ['./job-query-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobQueryPanelComponent extends AbstractSubscriber implements OnInit {

  //Feature toggle. Must be removed after the feature released to production.
  jobAdRadiusSearchEnabled = environment.jobAdRadiusSearchEnabled;

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

  isRadiusSliderShow$: Observable<boolean>;

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

    this.isRadiusSliderShow$ = this.form.valueChanges.pipe(
      startWith(this.form.value),
      map(isRadiusSliderVisible)
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

}

function isRadiusSliderVisible(value: JobQueryPanelValues) {
  if (!value.localities || value.localities.length !== 1) {
    return false;
  }

  const selectedLocality = value.localities[0];

  return selectedLocality.type === LocalityInputType.LOCALITY && !!selectedLocality.payload.geoPoint;
}
