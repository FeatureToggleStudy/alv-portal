import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SelectableOption } from '../../forms/input/selectable-option.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  CoreState,
  getAccountabilities, getCurrentAccountability
} from '../../../core/state-management/state/core.state.ts';
import { filter, map } from 'rxjs/operators';
import { Accountability } from '../../backend-services/user-info/user-info.types';


function mapAccountabilityToSelectOption(accountability) {
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
export class AccountabilitySwitcherComponent implements OnInit {

  accountabilities$: Observable<SelectableOption[]>;
  accontabilityFormControl: FormControl;


  constructor(private fb: FormBuilder,
              private store: Store<CoreState>) {
  }


  ngOnInit() {
    this.accontabilityFormControl = this.fb.control(null);

    this.accountabilities$ = this.store.pipe(
      select(getAccountabilities),
      filter(Boolean),
      map((accountabilities: Accountability[]) => accountabilities.map(mapAccountabilityToSelectOption))
    );

    this.store.pipe(
      select(getCurrentAccountability),
      filter(Boolean),
      map(mapAccountabilityToSelectOption)
    ).subscribe(currentOption => this.accontabilityFormControl.patchValue(currentOption.value));
  }

}
