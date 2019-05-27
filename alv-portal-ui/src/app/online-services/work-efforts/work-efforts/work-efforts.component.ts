import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconKey } from '../../../shared/icons/custom-icon/custom-icon.component';
import {
  ControlPeriod,
  mockedControlPeriods
} from '../../../shared/backend-services/work-efforts/work-efforts.types';
import { WorkEffortsRepository } from '../../../shared/backend-services/work-efforts/work-efforts.repository';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'alv-work-efforts',
  templateUrl: './work-efforts.component.html',
  styleUrls: ['./work-efforts.component.scss']
})
export class WorkEffortsComponent implements OnInit {

  readonly SEARCH_QUERY_MAX_LENGTH = 1000;

  IconKey = IconKey;

  form: FormGroup;

  controlPeriods$: Observable<ControlPeriod[]>;

  private today = new Date();

  constructor(private fb: FormBuilder,
              private authenticationService: AuthenticationService,
              private workEffortsRepository: WorkEffortsRepository) { }

  ngOnInit() {
    this.form = this.fb.group({
      query: ['']
    });

    this.controlPeriods$ = this.authenticationService.getCurrentUser().pipe(
      flatMap(user => this.workEffortsRepository.getControlPeriods(user.id))
    );
  }

  onFilterClick() {
    alert('not implemented yet');
  }

  isCurrentControlPeriod(controlPeriod: ControlPeriod): boolean {
    const date = new Date(controlPeriod.date);
    return this.today.getFullYear() === date.getFullYear() && this.today.getMonth() === date.getMonth();
  }

}
