import { NotificationType } from '../../shared/layout/notifications/notification.model';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { Observable } from 'rxjs';
import { JobCenter } from '../../shared/backend-services/reference-service/job-center.types';
import { JobCenterRepository } from '../../shared/backend-services/reference-service/job-center.repository';
import { I18nService } from '../../core/i18n.service';
import { flatMap, map, take } from 'rxjs/operators';
import { InitialFormValueConfig } from './job-publication-form/job-publication-form-value-factory';
import { ActivatedRoute } from '@angular/router';
import { isNotAuthenticatedUser } from '../../core/auth/user.model';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { CoreState } from '../../core/state-management/state/core.state.ts';
import { Store } from '@ngrx/store';
import { JobAdvertisementUpdatedAction } from '../../core/state-management/actions/core.actions';
import { IconKey } from '../../shared/icons/custom-icon/custom-icon.component';

@Component({
  selector: 'alv-job-publication',
  templateUrl: './job-publication.component.html',
  styleUrls: ['./job-publication.component.scss']
})
export class JobPublicationComponent implements OnInit {

  IconKey = IconKey;

  initialFormValueConfig: InitialFormValueConfig;

  currentLanguage$: Observable<string>;

  successNotification = {
    type: NotificationType.SUCCESS,
    messageKey: 'portal.job-publication.submit.success',
    isSticky: true
  };

  infoNotification = {
    type: NotificationType.INFO,
    isSticky: true
  };

  submitted = false;

  responsibleJobCenter$: Observable<JobCenter>;

  showLeftColumn$: Observable<boolean>;

  constructor(private jobCenterRepository: JobCenterRepository,
              private i18nService: I18nService,
              private store: Store<CoreState>,
              private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
    this.initialFormValueConfig = route.snapshot.data['initialFormValueConfig'];
    this.currentLanguage$ = i18nService.currentLanguage$;
  }

  ngOnInit() {
    this.showLeftColumn$ = this.authenticationService.getCurrentUser().pipe(
      map(user => isNotAuthenticatedUser(user))
    );
  }

  jobPublicationCreated(jobAdvertisement: JobAdvertisement) {
    if (jobAdvertisement.jobCenterCode) {
      this.responsibleJobCenter$ = this.i18nService.currentLanguage$.pipe(
        take(1),
        flatMap(lang => this.jobCenterRepository.resolveJobCenter(jobAdvertisement.jobCenterCode, lang))
      );
    }
    this.store.dispatch(new JobAdvertisementUpdatedAction({ jobAdvertisement: jobAdvertisement }));
    this.submitted = true;
  }

  createNewJobPublication() {
    this.submitted = false;
  }
}
