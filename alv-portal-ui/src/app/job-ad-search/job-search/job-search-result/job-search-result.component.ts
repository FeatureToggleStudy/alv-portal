import { Component, Input, OnInit } from '@angular/core';
import { ResultListItem } from '../result-list-item/result-list-item.model';
import { JobAdvertisementUtils } from '../../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { JobSearchResult } from '../../state-management/state/job-ad-search.state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nService } from '../../../core/i18n.service';
import { JobBadgesMapperService, JobBadgeType } from '../../job-badges-mapper.service';

@Component({
  selector: 'alv-job-search-result',
  templateUrl: './job-search-result.component.html',
  styleUrls: ['./job-search-result.component.scss']
})
export class JobSearchResultComponent implements OnInit {

  @Input()
  jobSearchResult: JobSearchResult;

  resultListItem$: Observable<ResultListItem>;

  constructor(private i18nService: I18nService, private jobBadgesMapperService: JobBadgesMapperService) {
  }

  ngOnInit() {
    this.resultListItem$ = this.jobSearchResultToResultListItemMapper(this.jobSearchResult);
  }

  private jobSearchResultToResultListItemMapper(jobSearchResult: JobSearchResult): Observable<ResultListItem> {
    const jobAdvertisement = jobSearchResult.jobAdvertisement;
    return this.i18nService.currentLanguage$.pipe(
      map(lang => {
        const jobDescription = JobAdvertisementUtils.getJobDescription(jobAdvertisement, lang);
        return {
          title: jobDescription.title,
          description: jobDescription.description,
          header: jobAdvertisement.publication.startDate,
          badges: this.jobBadgesMapperService.map(jobAdvertisement, [
            JobBadgeType.CONTRACT_TYPE,
            JobBadgeType.AVAILABILITY,
            JobBadgeType.WORKPLACE,
            JobBadgeType.WORKLOAD,
            JobBadgeType.REPORTING_OBLIGATION
          ]),
          routerLink: ['/job-search', jobAdvertisement.id],
          subtitle: jobAdvertisement.jobContent.company.name,
          visited: jobSearchResult.visited
        };
      })
    );
  }

}



