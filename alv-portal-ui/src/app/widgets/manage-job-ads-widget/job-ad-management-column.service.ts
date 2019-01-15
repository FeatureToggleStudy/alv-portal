import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { I18nService } from '../../core/i18n.service';
import { map } from 'rxjs/operators';
import { JobAdvertisementUtils } from '../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { LocaleAwareDatePipe } from '../../shared/pipes/locale-aware-date.pipe';
import {
  JobAdColumnDefinition,
  ManagedJobAdsSortingColumn
} from './job-ad-management-table/job-ad-management.table-types';

export const ALL_COLUMNS = [
  ManagedJobAdsSortingColumn.PUBLICATION_DATE,
  ManagedJobAdsSortingColumn.TITLE,
  ManagedJobAdsSortingColumn.EGOV,
  ManagedJobAdsSortingColumn.AVAM,
  ManagedJobAdsSortingColumn.LOCATION,
  ManagedJobAdsSortingColumn.STATUS,
  ManagedJobAdsSortingColumn.OWNER_NAME
];

@Injectable()
export class JobAdManagementColumnService {

  constructor(private i18n: I18nService, private localeAwareDatePipe: LocaleAwareDatePipe) {
  }

  public createColumnDefinitions(columns = ALL_COLUMNS): Observable<JobAdColumnDefinition[]> {
    return this.i18n.currentLanguage$.pipe(
      map(currentLang => {
        return [
          {
            backendKey: ManagedJobAdsSortingColumn.PUBLICATION_DATE,
            columnName: 'dashboard.job-publication.publication-date',
            render: job => {
              return this.localeAwareDatePipe.transform(job.publication.startDate);
            }
          },
          {
            backendKey: ManagedJobAdsSortingColumn.TITLE,
            columnName: 'dashboard.job-publication.job-title',
            render: job => {
              return JobAdvertisementUtils.getJobDescription(job, currentLang).title;
            }
          },
          {
            backendKey: ManagedJobAdsSortingColumn.EGOV,
            columnName: 'dashboard.job-publication.job-room-id',
            render: job => {
              return job.stellennummerEgov;
            }
          },
          {
            backendKey: ManagedJobAdsSortingColumn.AVAM,
            columnName: 'dashboard.job-publication.avam',
            render: job => {
              return job.stellennummerAvam;
            }
          },
          {
            backendKey: ManagedJobAdsSortingColumn.LOCATION,
            columnName: 'dashboard.job-publication.location',
            render: job => {
              return job.jobContent.location.city;
            }
          },
          {
            backendKey: ManagedJobAdsSortingColumn.STATUS,
            columnName: 'dashboard.job-publication.status',
            render: job => {
              return 'global.job-publication.status.' + job.status;
            }
          },
          {
            backendKey: ManagedJobAdsSortingColumn.OWNER_NAME,
            columnName: 'portal.dashboard.job-publication.owner-name',
            render: job => {
              return job.owner.userDisplayName;
            }
          }
        ];
      }),
      map(result => result.filter((b) => columns.includes(b.backendKey)))
    );
  }
}
