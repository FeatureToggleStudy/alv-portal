import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { SelectableOption } from '../../../shared/forms/input/selectable-option.model';

import { UserRole } from '../../../core/auth/user.model';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { map, takeUntil } from 'rxjs/operators';
import {
  ContractType,
  JobSearchFilter,
  Sort
} from '../../../job-ad-search/job-search-filter.types';
import {
  Canton,
  Degree,
  Experience,
  Graduation
} from '../../../shared/backend-services/shared.types';
import { MultiTypeaheadItemModel } from '../../../shared/forms/input/multi-typeahead/multi-typeahead-item.model';
import {
  CantonSuggestion,
  LocalityAutocomplete, LocalityInputType,
  LocalitySuggestion
} from '../../../showcase/showcase.component';
import { TranslateService } from '@ngx-translate/core';
import { CandidateSearchFilter } from '../../state-management/state/candidate-search.state';

export interface FilterPanelValues {
  sort: Sort;
  displayRestricted: boolean;
  contractType: ContractType;
  workloadPercentageMax: number;
  workloadPercentageMin: number;
  company?: string;
  onlineSince: number;
}

@Component({
  selector: 'alv-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrls: ['./filter-panel.component.scss']
})
export class FilterPanelComponent extends AbstractSubscriber implements OnInit {

  userRole = UserRole;

  form: FormGroup;

  @Output()
  filtersChange: Subject<FilterPanelValues> = new Subject<FilterPanelValues>();

  @Input()
  candidateSearchFilter: CandidateSearchFilter;

  suggestCantonsFn = this.getCantonOptions.bind(this);

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

  contractTypeOptions$: Observable<SelectableOption[]> = of([
    {
      value: ContractType.PERMANENT,
      label: 'job-search.filter.contract-type.option.PERMANENT'
    },
    {
      value: ContractType.TEMPORARY,
      label: 'job-search.filter.contract-type.option.TEMPORARY'
    },
    {
      value: ContractType.ALL,
      label: 'job-search.filter.contract-type.option.ALL'
    }
  ]);

  onlineSinceSliderLabel: number;

  constructor(private fb: FormBuilder,
              private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      degree: [this.candidateSearchFilter.degree],
      graduation: [this.candidateSearchFilter.graduation],
      experience: [this.candidateSearchFilter.experience],
      residence: [this.candidateSearchFilter.residence]
    });
    this.form.valueChanges
      .pipe(
        map<any, FilterPanelValues>((valueChanges) => this.map(valueChanges)),
        takeUntil(this.ngUnsubscribe))
      .subscribe(filterPanelData => this.filtersChange.next(filterPanelData));

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

  suggestCanton(query: string) {

  }

  getCantonOptions(query: string): Observable<MultiTypeaheadItemModel[]> {

    const translatedOptions = Object.keys(Canton)
     // .filter((key) => !isNaN(Number(Canton[key])))

      .map(this.cantonAutocompleteMapper)
      .map((option: MultiTypeaheadItemModel) => {
        return this.translateService.stream(option.label).pipe(
          map((translation) => Object.assign({}, option, { label: translation }))
        );

      });

    return combineLatest(translatedOptions);
  }

  private cantonAutocompleteMapper(cantonKey: string, index: number): MultiTypeaheadItemModel {
    return new MultiTypeaheadItemModel(
      LocalityInputType.CANTON,
      cantonKey,
      `global.reference.canton.${cantonKey}`,
      index);
  }

  private map(valueChanges: any): FilterPanelValues {
    return {
      sort: valueChanges.sort,
      displayRestricted: valueChanges.displayRestricted,
      contractType: valueChanges.contractType,
      workloadPercentageMax: valueChanges.workloadPercentageMax,
      workloadPercentageMin: valueChanges.workloadPercentageMin,
      company: valueChanges.company,
      onlineSince: valueChanges.onlineSince
    };
  }
}
