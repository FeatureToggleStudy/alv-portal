import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { map, takeUntil } from 'rxjs/operators';

import {
  Availability,
  Canton,
  Degree,
  DrivingLicenceCategory,
  Experience,
  Graduation,
  Language,
  LanguageSkill,
  WorkForm
} from '../../../shared/backend-services/shared.types';
import { SimpleMultiTypeaheadItem } from '../../../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';
import { I18nService } from '../../../core/i18n.service';
import { LocalityInputType } from '../../../shared/localities/locality-multi-typeahead-item';

export interface FilterPanelValues {
  experience: Experience;
  residence: Canton[];
  availability: Availability;
  workloadPercentageMin: number;
  workloadPercentageMax: number;
  workForm: WorkForm;
  degree: Degree;
  graduation: Graduation;
  drivingLicenceCategory: DrivingLicenceCategory;
  languageSkills: LanguageSkill[];
}

@Component({
  selector: 'alv-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent extends AbstractSubscriber implements OnInit {

  form: FormGroup;

  @Output()
  filterPanelValuesChange: Subject<FilterPanelValues> = new Subject<FilterPanelValues>();

  @Input()
  set filterPanelValues(value: FilterPanelValues) {
    this._filterPanelValues = value;
    this.setFormValues(this._filterPanelValues);
  }

  suggestCantonsFn = this.suggestCanton.bind(this);

  expanded = false;

  degreeOptions$: Observable<SelectableOption[]> = of([
    {
      value: null,
      label: 'candidate-search.no-selection'
    }
  ].concat(
    Object.keys(Degree).map(degree => {
      return {
        value: degree,
        label: 'global.degree.' + degree
      };
    })
  ));

  graduationOptions$: Observable<SelectableOption[]> = of([
    {
      value: null,
      label: 'candidate-search.toolbar.graduation.default'
    }
  ].concat(
    Object.keys(Graduation).map(graduation => {
      return {
        value: graduation,
        label: 'candidate-search.graduation.' + graduation
      };
    })
  ));

  experienceOptions$: Observable<SelectableOption[]> = of([
    {
      value: null,
      label: 'candidate-search.no-selection'
    }
  ].concat(
    Object.keys(Experience).map(experience => {
      return {
        value: experience,
        label: 'global.experience.' + experience
      };
    })
  ));

  defaultPercentages = [
    { label: '0%', value: 0 },
    { label: '10%', value: 10 },
    { label: '20%', value: 20 },
    { label: '30%', value: 30 },
    { label: '40%', value: 40 },
    { label: '50%', value: 50 },
    { label: '60%', value: 60 },
    { label: '70%', value: 70 },
    { label: '80%', value: 80 },
    { label: '90%', value: 90 },
    { label: '100%', value: 100 }
  ];

  percentagesMin$: BehaviorSubject<SelectableOption[]> = new BehaviorSubject<SelectableOption[]>(this.defaultPercentages);

  percentagesMax$: BehaviorSubject<SelectableOption[]> = new BehaviorSubject<SelectableOption[]>(this.defaultPercentages);

  availabilityOptions$: Observable<SelectableOption[]> = of([
    {
      value: null,
      label: 'candidate-search.no-selection'
    }
  ].concat(
    Object.keys(Availability).map(availability => {
      return {
        value: availability,
        label: 'candidate-search.availability.' + availability
      };
    })
  ));

  languageOptions$: Observable<SelectableOption[]> = of([
    {
      value: null,
      label: 'global.reference.language.no-selection'
    }
  ].concat(
    Object.values(Language).map(language => {
      return {
        value: language,
        label: 'global.reference.language.' + language
      };
    })
  ));

  private _filterPanelValues: FilterPanelValues;

  constructor(private fb: FormBuilder,
              private i18nService: I18nService) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      degree: [],
      graduation: [],
      experience: [],
      residence: [],
      availability: [],
      workloadPercentageMin: [],
      workloadPercentageMax: [],
      languageSkills: []
    });

    this.setFormValues(this._filterPanelValues);

    this.form.valueChanges
      .pipe(
        map<any, FilterPanelValues>((valueChanges) => this.map(valueChanges)),
        takeUntil(this.ngUnsubscribe))
      .subscribe(filterPanelData => this.filterPanelValuesChange.next(filterPanelData));

    this.form.get('workloadPercentageMin').valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(percentageMin => {
        this.percentagesMax$.next(this.defaultPercentages.filter(item => item.value >= percentageMin));
      });

    this.form.get('workloadPercentageMax').valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(percentageMax => {
        this.percentagesMin$.next(this.defaultPercentages.filter(item => item.value <= percentageMax));
      });
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  suggestCanton(query: string): Observable<SimpleMultiTypeaheadItem[]> {
    const cantonSuggestions = Object.keys(Canton)
      .filter((key) => !isNaN(Number(Canton[key])))
      .map((key, index) => this.cantonAutocompleteMapper(key, index))
      .filter((option) => option.label.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1);
    return of(cantonSuggestions);
  }

  private cantonAutocompleteMapper(cantonKey: string, index: number): SimpleMultiTypeaheadItem {
    const cantonLabel = this.i18nService.instant(`global.reference.canton.${cantonKey}`);
    return new SimpleMultiTypeaheadItem(
      LocalityInputType.CANTON,
      cantonKey,
      cantonLabel,
      index);
  }

  private map(valueChanges: any): FilterPanelValues {
    return {
      degree: valueChanges.degree,
      graduation: valueChanges.graduation,
      experience: valueChanges.experience,
      residence: valueChanges.residence.map((r: SimpleMultiTypeaheadItem) => {
        return r.payload;
      }),
      availability: valueChanges.availability,
      workloadPercentageMin: valueChanges.workloadPercentageMin,
      workloadPercentageMax: valueChanges.workloadPercentageMax,
      languageSkills: valueChanges.languageSkills,
      workForm: null,
      drivingLicenceCategory: null
    };
  }

  private setFormValues(filterPanelValues: FilterPanelValues) {
    if (!(this.form && filterPanelValues)) {
      return;
    }
    this.form.setValue({
      degree: filterPanelValues.degree,
      graduation: filterPanelValues.graduation,
      experience: filterPanelValues.experience,
      residence: filterPanelValues.residence.map((r, i) => {
        return this.cantonAutocompleteMapper(r.toString(), i);
      }),
      availability: filterPanelValues.availability,
      workloadPercentageMin: filterPanelValues.workloadPercentageMin,
      workloadPercentageMax: filterPanelValues.workloadPercentageMax,
      languageSkills: filterPanelValues.languageSkills
    }, { emitEvent: false });
  }
}
