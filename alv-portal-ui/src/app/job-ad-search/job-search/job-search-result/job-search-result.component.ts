import { Component, Input, OnInit } from '@angular/core';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { Badge, ResultListItem } from '../result-list-item/result-list-item.model';
import { JobAdvertisementUtils } from '../../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { formatTimeRange } from '../../../shared/layout/pipes/working-time-range.pipe';
import { JobSearchResult } from '../../state-management/state/job-ad-search.state';

@Component({
  selector: 'alv-job-search-result',
  templateUrl: './job-search-result.component.html',
  styleUrls: ['./job-search-result.component.scss']
})
export class JobSearchResultComponent implements OnInit {

  @Input()
  jobSearchResult: JobSearchResult;

  resultListItem: ResultListItem;

  constructor() {
  }

  ngOnInit() {
    this.resultListItem = this.jobSearchResultToResultListItemMapper(this.jobSearchResult);
  }

  private jobSearchResultToResultListItemMapper(jobSearchResult: JobSearchResult): ResultListItem {
    const jobAdvertisement = jobSearchResult.jobAdvertisement;
    const jobDescription = JobAdvertisementUtils.getJobDescription(jobAdvertisement);
    return {
      title: jobDescription.title,
      description: jobDescription.description,
      header: jobAdvertisement.publication.startDate,
      badges: this.generateBadges(jobAdvertisement),
      routerLink: ['/job-search', jobAdvertisement.id],
      subtitle: jobAdvertisement.jobContent.company.name,
      visited: jobSearchResult.visited
    };
  }

  private generateBadges(job: JobAdvertisement): Badge[] {
    const badges: Badge[] = [];
    if (job.jobContent.employment.permanent) {
      badges.push({
        label: 'job-search.job-search-list-item.badge.permanent',
        cssClass: 'badge-green'
      });
    } else {
      badges.push({
          label: 'job-search.job-search-list-item.badge.temporary',
          cssClass: 'badge-yellow'
        }
      );
    }
    if (job.reportingObligation) {
      badges.push({
        label: 'job-search.job-search-list-item.badge.restricted',
        cssClass: 'badge-danger'
      });
    }
    badges.push({
      label: formatTimeRange([job.jobContent.employment.workloadPercentageMin, job.jobContent.employment.workloadPercentageMax]),
      cssClass: 'badge-grey',
      doNotTranslate: true
    });
    return badges;
  }

}



