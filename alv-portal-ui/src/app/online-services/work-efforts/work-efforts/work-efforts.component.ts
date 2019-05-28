import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconKey } from '../../../shared/icons/custom-icon/custom-icon.component';
import { WorkEffortsReport } from '../../../shared/backend-services/work-efforts/work-efforts.types';
import { WorkEffortsRepository } from '../../../shared/backend-services/work-efforts/work-efforts.repository';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import {
  catchError,
  debounceTime,
  flatMap,
  switchMap,
  take,
  takeUntil
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { WorkEffortsFilterModalComponent } from './work-efforts-filter-modal/work-efforts-filter-modal.component';
import {
  initialWorkEffortsFilter,
  WorkEffortsFilter,
  WorkEffortsFilterValues
} from './work-efforts-filter.types';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';

@Component({
  selector: 'alv-work-efforts',
  templateUrl: './work-efforts.component.html',
  styleUrls: ['./work-efforts.component.scss']
})
export class WorkEffortsComponent extends AbstractSubscriber implements OnInit {

  readonly SEARCH_QUERY_MAX_LENGTH = 1000;

  IconKey = IconKey;

  form: FormGroup;

  controlPeriods$: Observable<WorkEffortsReport[]>;

  currentFilter: WorkEffortsFilter = initialWorkEffortsFilter;

  private today = new Date();

  constructor(private fb: FormBuilder,
              private modalService: ModalService,
              private authenticationService: AuthenticationService,
              private workEffortsRepository: WorkEffortsRepository) {
    super();
  }

  ngOnInit() {
    this.form = this.fb.group({
      query: ['']
    });

    this.controlPeriods$ = this.authenticationService.getCurrentUser().pipe(
      flatMap(user => this.workEffortsRepository.getControlPeriods(user.id))
    );

    /*

    this.form.get('query').valueChanges.pipe(
      debounceTime(300),
      switchMap((query: string) => query.length >= this.queryMinLength
        ? this.loadItems(query).pipe(catchError(this.handleError.bind(this)))
        : of([])),
      takeUntil(this.ngUnsubscribe))
      .subscribe(value => this.applyQuery(value));

      */
  }

  onFilterClick() {
    const filterModalRef = this.modalService.openMedium(WorkEffortsFilterModalComponent);
    const filterComponent = <WorkEffortsFilterModalComponent>filterModalRef.componentInstance;
    filterComponent.currentFiltering = this.currentFilter;
    filterModalRef.result
      .then(newFilter => {
        this.applyFilter(newFilter);
      })
      .catch(() => {
      });
  }

  isCurrentControlPeriod(workEffortsReport: WorkEffortsReport): boolean {
    const date = new Date(workEffortsReport.controlPeriod);
    return this.today.getFullYear() === date.getFullYear() && this.today.getMonth() === date.getMonth();
  }

  private applyFilter(newFilter: WorkEffortsFilterValues) {
    this.currentFilter = {
      ...this.currentFilter,
      period: newFilter.period,
      workEffortResult: newFilter.workEffortResult
    };
    console.log(this.currentFilter);
  }

  private applyQuery(newQuery: string) {
    this.currentFilter = {
      ...this.currentFilter,
      query: newQuery
    };
    console.log(this.currentFilter);
  }


}
