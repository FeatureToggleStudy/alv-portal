import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectableOption } from '../../forms/input/selectable-option.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  CoreState,
  getAccountabilities,
  getCurrentAccountability
} from '../../../core/state-management/state/core.state.ts';
import {
  distinctUntilChanged,
  filter,
  map, share,
  takeUntil,
  withLatestFrom
} from 'rxjs/operators';
import { Accountability } from '../../backend-services/user-info/user-info.types';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { AccountabilitySelectedAction } from '../../../core/state-management/actions/core.actions';


function mapAccountabilityToSelectOption(accountability: Accountability) {
  return {
    label: accountability.companyName,
    value: accountability.companyId
  } as SelectableOption;
}

@Component({
  selector: 'alv-accountability-switcher',
  templateUrl: './accountability-switcher.component.html',
  styleUrls: ['./accountability-switcher.component.scss']
})
export class AccountabilitySwitcherComponent extends AbstractSubscriber implements OnInit {

  accountabilityOptions$: Observable<SelectableOption[]>;
  accontabilityFormControl: FormControl;

  accountabilities$: Observable<Accountability[]>;


  constructor(private fb: FormBuilder,
              private store: Store<CoreState>) {
    super();
  }


  ngOnInit() {
    this.accontabilityFormControl = this.fb.control(null);

    this.accountabilities$ = this.store.pipe(
      select(getAccountabilities),
      filter(Boolean),
      share());

    this.accountabilityOptions$ = this.accountabilities$.pipe(
      map((accountabilities: Accountability[]) => accountabilities.map(mapAccountabilityToSelectOption))
    );

    this.store.pipe(
      takeUntil(this.ngUnsubscribe),
      select(getCurrentAccountability),
      filter(Boolean),
      map(mapAccountabilityToSelectOption)
    ).subscribe(currentOption => {
      this.accontabilityFormControl.patchValue(currentOption.value);
    });

    // this clumsiness indicated the need to refactor alv-select
    this.accontabilityFormControl.valueChanges.pipe(
      distinctUntilChanged(),
      withLatestFrom(this.accountabilities$),
      map(([selectedOption, accountabilities]: [SelectableOption, Accountability[]]) => {
        this.store.dispatch(new AccountabilitySelectedAction({
          accountability: accountabilities.find(a => a.companyId === selectedOption.value)
        }));
      })
    );
  }

}
