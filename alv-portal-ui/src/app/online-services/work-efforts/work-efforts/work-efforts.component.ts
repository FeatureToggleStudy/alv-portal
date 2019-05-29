import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconKey } from '../../../shared/icons/custom-icon/custom-icon.component';
import { WorkEffortsReport } from '../../../shared/backend-services/work-efforts/work-efforts.types';
import { WorkEffortsRepository } from '../../../shared/backend-services/work-efforts/work-efforts.repository';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { debounceTime, flatMap, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { WorkEffortsFilterModalComponent } from './work-efforts-filter-modal/work-efforts-filter-modal.component';
import { initialWorkEffortsFilter, WorkEffortsFilter, WorkEffortsFilterValues } from './work-efforts-filter.types';
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

  workEffortsReports$: Observable<WorkEffortsReport[]>;

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

    this.workEffortsReports$ = this.authenticationService.getCurrentUser().pipe(
      flatMap(user => this.workEffortsRepository.getWorkEffortsReports(user.id))
    );

    this.form.get('query').valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        if (value.length >= 3) {
          this.applyQuery(value);
        }
      });
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
