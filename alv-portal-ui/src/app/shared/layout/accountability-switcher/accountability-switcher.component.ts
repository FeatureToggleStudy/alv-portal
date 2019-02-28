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
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { Accountability } from '../../backend-services/user-info/user-info.types';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { AccountabilitySelectedAction } from '../../../core/state-management/actions/core.actions';


function mapAccountabilityToSelectOption(accountability: Accountability): SelectableOption {
  return {
    label: accountability.companyName,
    value: accountability
  };
}

@Component({
  selector: 'alv-accountability-switcher',
  templateUrl: './accountability-switcher.component.html',
  styleUrls: ['./accountability-switcher.component.scss']
})
export class AccountabilitySwitcherComponent extends AbstractSubscriber implements OnInit {

  accountabilityOptions$: Observable<SelectableOption[]>;
  accontabilityFormControl: FormControl;
  isShown = false;

  constructor(private fb: FormBuilder,
              private store: Store<CoreState>) {
    super();
  }


  ngOnInit() {
    this.accontabilityFormControl = this.fb.control(null);

    this.accountabilityOptions$ = this.store.pipe(
      select(getAccountabilities),
      tap(accountabilities => {
        if (!accountabilities || !accountabilities.length) {
          this.isShown = false;
        }
        this.isShown = true;
      }),
      filter(Boolean),
      map((accountabilities: Accountability[]) => accountabilities.map(mapAccountabilityToSelectOption)),
    );

    this.store.pipe(
      select(getCurrentAccountability),
      filter(Boolean),
      map(mapAccountabilityToSelectOption),
      takeUntil(this.ngUnsubscribe)
    ).subscribe(currentOption => {
      return this.accontabilityFormControl.setValue(currentOption.value);
    });

  }

  switchAccountability(accountability: Accountability) {
    this.store.dispatch(new AccountabilitySelectedAction({
      accountability: accountability
    }));
  }

}
