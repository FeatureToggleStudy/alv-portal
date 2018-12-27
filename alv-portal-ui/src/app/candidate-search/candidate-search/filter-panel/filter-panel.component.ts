import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { map, takeUntil } from 'rxjs/operators';

import {
  Availability,
  Canton,
  CEFR_Level,
  Degree,
  DrivingLicenceCategory,
  Experience,
  Graduation,
  Language,
  WorkForm
} from '../../../shared/backend-services/shared.types';
import { SimpleMultiTypeaheadItem } from '../../../shared/forms/input/multi-typeahead/simple-multi-typeahead.item';
import { I18nService } from '../../../core/i18n.service';
import { LocalityInputType } from '../../../shared/localities/locality-multi-typeahead-item';
import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { LanguageSkill } from '../../../shared/backend-services/candidate/candidate.types';

const EMPTY_LANGUAGE_SKILL: LanguageSkill = {
  code: null,
  written: CEFR_Level.NONE,
  spoken: CEFR_Level.NONE
};

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
  styleUrls: ['./filter-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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

  drivingLicenceCategoryOptions$: Observable<SelectableOption[]> = of([
    {
      value: null,
      label: 'candidate-search.no-selection'
    }
  ].concat(
    Object.keys(DrivingLicenceCategory).map(drivingLicenceCategory => {
      return {
        value: drivingLicenceCategory,
        label: 'global.drivingLicenceCategory.' + drivingLicenceCategory
      };
    })
  ));

  workFormOptions$: Observable<SelectableOption[]> = of([
    {
      value: null,
      label: 'candidate-search.no-selection'
    }
  ].concat(
    Object.keys(WorkForm).map(workForm => {
      return {
        value: workForm,
        label: 'global.workForm.' + workForm
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

  languageLevelOptions$: Observable<SelectableOption[]> = of(
    Object.values(CEFR_Level).map(level => {
      return {
        value: level,
        label: 'global.reference.language.level.' + level
      };
    })
  );

  private _filterPanelValues: FilterPanelValues;

  private readonly MAX_LANGUAGE_OPTIONS_NUM = 5;

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
      drivingLicenceCategory: [],
      workForm: [],
      languageSkills: this.fb.array([])
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

  removeLanguageSkill(languageSkill: LanguageSkill) {
    const languageSkills = this.languageSkillFormArray;
    languageSkills.removeAt(this.form.value.languageSkills.indexOf(languageSkill));
  }

  addNewLanguageSkill() {
    const languageSkills = this.languageSkillFormArray;
    languageSkills.push(this.createNewLanguageSkillFormGroup());
  }

  isAddLanguageSkillEnabled(): boolean {
    const languageSkills = this.languageSkillFormArray;
    const maxNotReached = languageSkills.length < this.MAX_LANGUAGE_OPTIONS_NUM;
    const lastValid = !!languageSkills.at(languageSkills.length - 1).get('code').value;
    return maxNotReached && lastValid;
  }

  onLanguageSkillCodeChanged(languageSkillFormGroup: FormGroup) {
    languageSkillFormGroup.patchValue({
      written: EMPTY_LANGUAGE_SKILL.written,
      spoken: EMPTY_LANGUAGE_SKILL.spoken
    }, { emitEvent: false });
  }

  get languageSkillFormArray(): FormArray {
    return this.form.controls['languageSkills'] as FormArray;
  }

  private createNewLanguageSkillFormGroup(): FormGroup {
    const formGroup = this.fb.group({
      code: [],
      written: [],
      spoken: []
    });
    formGroup.setValue(EMPTY_LANGUAGE_SKILL);
    return formGroup;
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
      workForm: valueChanges.workForm,
      drivingLicenceCategory: valueChanges.drivingLicenceCategory
    };
  }

  private setFormValues(filterPanelValues: FilterPanelValues) {
    if (!(this.form && filterPanelValues)) {
      return;
    }
    this.prepareLanguageSkillsFormArray(filterPanelValues.languageSkills);
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
      drivingLicenceCategory: filterPanelValues.drivingLicenceCategory,
      workForm: filterPanelValues.workForm,
      languageSkills: filterPanelValues.languageSkills.length ? filterPanelValues.languageSkills : [EMPTY_LANGUAGE_SKILL]
    }, { emitEvent: false });
  }

  private prepareLanguageSkillsFormArray(languageSkills: LanguageSkill[]) {
    const languageSkillsFormArray = this.languageSkillFormArray;
    if (languageSkillsFormArray.controls.length === 0) {
      this.addNewLanguageSkill();
    }
    if (languageSkills.length > languageSkillsFormArray.controls.length) {
      const diff = languageSkills.length - languageSkillsFormArray.controls.length;
      for (let i = 0; i < diff; i++) {
        this.addNewLanguageSkill();
      }
    }
  }
}
