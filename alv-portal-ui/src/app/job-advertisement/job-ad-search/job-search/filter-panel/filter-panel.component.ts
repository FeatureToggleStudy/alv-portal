import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { SelectableOption } from '../../../../shared/forms/input/selectable-option.model';
import { ContractType, Sort } from '../../state-management';
import { UserRole } from '../../../../core/auth/user.model';
import { AbstractSubscriber } from '../../../../core/abstract-subscriber';
import { debounceTime, map, takeUntil } from 'rxjs/operators';

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
  styleUrls: ['./filter-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPanelComponent extends AbstractSubscriber implements OnInit {

  userRole = UserRole;

  form: FormGroup;

  @Input()
  set filterPanelValues(value: FilterPanelValues) {
    this._filterPanelValues = value;
    this.setFormValues(value);
  }

  @Output()
  filterPanelValueChange = new Subject<FilterPanelValues>();

  expanded = false;

  restrictOptions$: Observable<SelectableOption[]> = of([
    {
      value: false,
      label: 'portal.job-search.filter.reporting-obligation.all.label'
    },
    {
      value: true,
      label: 'job-search.filter.restricted-jobs.label'
    }
  ]);

  sortOptions$: Observable<SelectableOption[]> = of([
    {
      value: Sort.RELEVANCE_DESC,
      label: 'job-search.filter.sort.option.RELEVANCE_DESC'
    },
    {
      value: Sort.DATE_ASC,
      label: 'job-search.filter.sort.option.DATE_ASC'
    },
    {
      value: Sort.DATE_DESC,
      label: 'job-search.filter.sort.option.DATE_DESC'
    }]);

  defaultPercentages = [
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

  contractTypeOptions$: Observable<SelectableOption[]> = of(
    Object.keys(ContractType).map(contractType => {
      return {
        value: contractType,
        label: 'job-search.filter.contract-type.option.' + contractType
      };
    })
  );

  onlineSinceSliderLabel: number;

  private _filterPanelValues: FilterPanelValues;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      displayRestricted: [],
      sort: [],
      company: [],
      contractType: [],
      workloadPercentageMin: [],
      workloadPercentageMax: [],
      onlineSince: []
    });

    this.setFormValues(this._filterPanelValues);

    this.form.valueChanges
      .pipe(
        debounceTime(400),
        map<any, FilterPanelValues>((valueChanges) => this.map(valueChanges)),
        takeUntil(this.ngUnsubscribe))
      .subscribe(filterPanelData => {
        return this.filterPanelValueChange.next(filterPanelData);
      });

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

  updateSliderLabel(value: number) {
    this.onlineSinceSliderLabel = value;
  }

  getOnlineSinceLabel(value: number): string {
    if (value === 1) {
      return 'job-search.filter.online-since.day.one';
    } else {
      return 'job-search.filter.online-since.day.many';
    }
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
  }

  private setFormValues(filter: FilterPanelValues): void {
    if (!(this.form && filter)) {
      return;
    }
    this.form.setValue({
      displayRestricted: filter.displayRestricted,
      sort: filter.sort,
      company: filter.company,
      contractType: filter.contractType,
      workloadPercentageMin: filter.workloadPercentageMin,
      workloadPercentageMax: filter.workloadPercentageMax,
      onlineSince: filter.onlineSince
    }, { emitEvent: false });
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
