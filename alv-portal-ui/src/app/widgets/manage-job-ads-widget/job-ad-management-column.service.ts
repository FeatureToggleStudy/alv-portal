import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JobAdColumnDefinition } from './job-ad-management-table/job-ad-management-table.component';
import { I18nService } from '../../core/i18n.service';
import { map } from 'rxjs/operators';
import { ManagedJobAdsSort } from '../../job-advertisement/manage-job-ads/state-management/state';
import { JobAdvertisementUtils } from '../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { LocaleAwareDatePipe } from '../../shared/pipes/locale-aware-date.pipe';

@Injectable()
export class JobAdManagementColumnService {

  constructor(private i18n: I18nService, private localeAwareDatePipe: LocaleAwareDatePipe,) {
  }

  public map(): Observable<JobAdColumnDefinition[]> {
    return this.i18n.currentLanguage$.pipe(
      map(currentLang => {
        return [
          {
            backendKey: ManagedJobAdsSort.PUBLICATION_DATE,
            columnName: 'dashboard.job-publication.publication-date',
            render: job => {
              return this.localeAwareDatePipe.transform(job.publication.startDate);
            }
          },
          {
            backendKey: ManagedJobAdsSort.TITLE,
            columnName: 'dashboard.job-publication.job-title',
            render: job => {
              return JobAdvertisementUtils.getJobDescription(job, currentLang).title;
            }
          },
          {
            backendKey: ManagedJobAdsSort.EGOV,
            columnName: 'dashboard.job-publication.job-room-id',
            render: job => {
              return job.stellennummerEgov;
            }
          },
          {
            backendKey: ManagedJobAdsSort.AVAM,
            columnName: 'dashboard.job-publication.avam',
            render: job => {
              return job.stellennummerAvam;
            }
          },
          {
            backendKey: ManagedJobAdsSort.LOCATION,
            columnName: 'dashboard.job-publication.location',
            render: job => {
              return job.jobContent.location.city;
            }
          },
          {
            backendKey: ManagedJobAdsSort.STATUS,
            columnName: 'dashboard.job-publication.status',
            render: job => {
              return 'global.job-publication.status.' + job.status;
            }
          },
          {
            backendKey: ManagedJobAdsSort.OWNER_NAME,
            columnName: 'portal.dashboard.job-publication.owner-name',
            render: job => {
              return job.owner.userDisplayName;
            }
          }
        ];
      })
    )
  }

}
