import { Component, OnInit } from '@angular/core';
import { JobBadge, JobBadgesMapperService } from '../../shared/job-badges-mapper.service';
import { JobDetailModelFactory } from '../../shared/job-detail-model-factory';
import { select, Store } from '@ngrx/store';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JobDetailModel } from '../../shared/job-detail-model';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import {
  getSelectedJobAdvertisement,
  ManageJobAdsState
} from '../state-management/state';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { hasAnyAuthorities, UserRole } from '../../../core/auth/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'alv-manage-job-ad-detail',
  templateUrl: './manage-job-ad-detail.component.html',
  styleUrls: ['./manage-job-ad-detail.component.scss']
})
export class ManageJobAdDetailComponent extends AbstractSubscriber implements OnInit {

  jobDetailModel$: Observable<JobDetailModel>;

  badges$: Observable<JobBadge[]>;

  isPavOrCompany = false;

  token: string;

  constructor(private jobBadgesMapperService: JobBadgesMapperService,
              private jobDetailModelFactory: JobDetailModelFactory,
              private store: Store<ManageJobAdsState>,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    const job$ = this.store.pipe(select(getSelectedJobAdvertisement));

    this.jobDetailModel$ = job$.pipe(
      switchMap((job) => this.jobDetailModelFactory.create(job))
    );

    this.badges$ = job$.pipe(map(job => this.jobBadgesMapperService.map(job)));

    this.route.queryParamMap.pipe(
      takeUntil(this.ngUnsubscribe))
      .subscribe((params) => this.token = params.get('token'));

    this.authenticationService.getCurrentUser()
      .pipe(
        map(user => hasAnyAuthorities(user, [UserRole.ROLE_COMPANY, UserRole.ROLE_PAV])),
        takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        this.isPavOrCompany = value;
      });
  }

}
