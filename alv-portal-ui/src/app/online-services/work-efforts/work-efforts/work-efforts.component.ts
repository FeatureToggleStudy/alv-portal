import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconKey } from '../../../shared/icons/custom-icon/custom-icon.component';
import {
  WorkEffortApplyStatus,
  WorkEffortsFilterPeriod,
  WorkEffortsReport
} from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';
import { ProofOfWorkEffortsRepository } from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.repository';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { debounceTime, filter, flatMap, map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { WorkEffortsFilterModalComponent } from './work-efforts-filter-modal/work-efforts-filter-modal.component';
import { initialWorkEffortsFilter, WorkEffortsFilter, WorkEffortsFilterValues } from './work-efforts-filter.types';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { FilterBadge } from '../../../shared/layout/inline-badges/inline-badge.types';
import { WorkEffortsBadgesMapperService } from './work-efforts-badges-mapper.service';
import { Notification, NotificationType } from '../../../shared/layout/notifications/notification.model';
import { I18nService } from '../../../core/i18n.service';
import { Languages } from '../../../core/languages.constants';

@Component({
  selector: 'alv-work-efforts',
  templateUrl: './work-efforts.component.html',
  styleUrls: ['./work-efforts.component.scss']
})
export class WorkEffortsComponent extends AbstractSubscriber implements OnInit {

  readonly SEARCH_QUERY_MAX_LENGTH = 1000;

  readonly SEARCH_QUERY_MIN_LENGTH = 3;

  readonly FILTER_RESET_VALUES = {
    period: WorkEffortsFilterPeriod.ALL_MONTHS,
    workEffortResult: WorkEffortApplyStatus.ALL
  };

  englishNotSupportedNotification = {
    type: NotificationType.ERROR,
    messageKey: 'portal.work-efforts.work-effort-report.notification.no-english',
    isSticky: true
  } as Notification;

  IconKey = IconKey;

  form: FormGroup;

  workEffortsReports$: Observable<WorkEffortsReport[]>;

  currentBadges: FilterBadge[];

  isEnglishLanguageSelected$: Observable<boolean>;

  private today = new Date();

  private _currentFilter: WorkEffortsFilter;

  get currentFilter(): WorkEffortsFilter {
    return this._currentFilter;
  }

  set currentFilter(value: WorkEffortsFilter) {
    this.currentBadges = this.workEffortsService.mapFilterBadges(value);
    this._currentFilter = value;
  }
  constructor(private fb: FormBuilder,
              private modalService: ModalService,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService,
              private workEffortsBadgesMapperService: WorkEffortsBadgesMapperService,
              private proofOfWorkEffortsRepository: ProofOfWorkEffortsRepository) {
    super();
  }

  ngOnInit() {
    this.currentFilter = initialWorkEffortsFilter;

    this.form = this.fb.group({
      query: ['']
    });

    this.workEffortsReports$ = this.authenticationService.getCurrentUser().pipe(
      filter(user => !!user),
      flatMap(user => this.proofOfWorkEffortsRepository.getWorkEffortsReports(user.id))
    );


    this.form.get('query').valueChanges.pipe(
      debounceTime(300),
      takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        if (value.length >= this.SEARCH_QUERY_MIN_LENGTH) {
          this.applyQuery(value);
        }
      });

    this.isEnglishLanguageSelected$ = this.i18nService.currentLanguage$.pipe(
      map(language => language === Languages.EN)
    );
  }

  openFilterModal() {
    const filterModalRef = this.modalService.openMedium(WorkEffortsFilterModalComponent);
    const filterComponent = <WorkEffortsFilterModalComponent>filterModalRef.componentInstance;
    filterComponent.currentFiltering = this._currentFilter;
    filterModalRef.result
      .then(newFilter => {
        this.applyFilter(newFilter);
      })
      .catch(() => {
      });
  }

  isCurrentReportPeriod(workEffortsReport: WorkEffortsReport): boolean {
    const date = new Date(workEffortsReport.controlPeriod.value);
    return this.today.getFullYear() === date.getFullYear() && this.today.getMonth() === date.getMonth();
  }

  removeCurrentBadge(badge: FilterBadge) {
    const newFilter = { ...this.currentFilter };
    newFilter[badge.key] = this.FILTER_RESET_VALUES[badge.key];
    this.currentFilter = newFilter;
  }

  private applyFilter(newFilter: WorkEffortsFilterValues) {
    this.currentFilter = {
      ...this.currentFilter,
      period: newFilter.period,
      workEffortResult: newFilter.workEffortResult
    };
    // TODO: call search/filter endpoint
  }

  private applyQuery(newQuery: string) {
    this.currentFilter = {
      ...this.currentFilter,
      query: newQuery
    };
    // TODO: call search/filter endpoint
  }
}
