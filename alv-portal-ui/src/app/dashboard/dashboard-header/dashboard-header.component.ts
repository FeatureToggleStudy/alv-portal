import { Component, Input } from '@angular/core';
import { User } from '../../core/auth/user.model';
import { FormBuilder, FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import {
  CoreState,
  getAccountabilities,
  getCurrentAccountability
} from '../../core/state-management/state/core.state.ts';
import { Observable } from 'rxjs';
import { Accountability } from '../../shared/backend-services/user-info/user-info.types';
import { SelectableOption } from '../../shared/forms/input/selectable-option.model';
import { filter, map } from 'rxjs/operators';


function mapAccountabilityToSelectOption(accountability) {
  return {
    label: accountability.companyName,
    value: accountability.companyId
  } as SelectableOption;
}

@Component({
  selector: 'alv-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent {

  @Input() user: User;

  accountabilities$: Observable<SelectableOption[]>;

  companyFormControl: FormControl;

  constructor(private fb: FormBuilder,
              store: Store<CoreState>) {
    this.companyFormControl = fb.control(null);
    this.accountabilities$ = store.pipe(
      select(getAccountabilities),
      filter(Boolean),
      map((accountabilities: Accountability[]) => accountabilities.map(mapAccountabilityToSelectOption))
    );
    store.pipe(
      select(getCurrentAccountability),
      filter(Boolean),
      map(mapAccountabilityToSelectOption)
    ).subscribe(currentOption => this.companyFormControl.patchValue(currentOption.value));
  }

}
