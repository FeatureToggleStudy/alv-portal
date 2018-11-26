import { Component, Input, OnInit } from '@angular/core';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.model';
import { Badge, ResultListItem } from '../result-list-item/result-list-item.model';
import { JobAdvertisementUtils } from '../../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { formatTimeRange } from '../../../shared/layout/pipes/working-time-range.pipe';

@Component({
  selector: 'alv-job-search-result',
  templateUrl: './job-search-result.component.html',
  styleUrls: ['./job-search-result.component.scss']
})
export class JobSearchResultComponent implements OnInit {

  @Input()
  jobSearchResult: JobAdvertisement;
  listItem: ResultListItem;

  constructor() {
  }

  ngOnInit() {
    this.listItem = this.jobSearchResultToResultListItemMapper(this.jobSearchResult);
  }


  private jobSearchResultToResultListItemMapper(job: JobAdvertisement): ResultListItem {
    const jobDescription = JobAdvertisementUtils.getJobDescription(job);
    // TODO create a MapperService called JobAdSearchResultMapper
    return {
      title: jobDescription.title,
      description: jobDescription.description,
      header: job.publication.startDate,
      badges: this.generateBadges(job),
      routerLink: ['/job-detail', job.id],
      subtitle: job.jobContent.company.name
    }
  }

  private generateBadges(job: JobAdvertisement): Badge[] {
    const badges: Badge[] = [];
    if (job.jobContent.employment.permanent) {
      badges.push({
        label: 'job-search.job-search-list-item.badge.permanent',
        cssClass: 'badge-green'
      })
    } else {
      badges.push({
          label: 'job-search.job-search-list-item.badge.temporary',
          cssClass: 'badge-yellow'
        }
      )
    }
    if (job.reportingObligation) {
      badges.push({
        label: 'job-search.job-search-list-item.badge.restricted',
        cssClass: 'badge-danger'
      })
    }
    badges.push({
      label: formatTimeRange([job.jobContent.employment.workloadPercentageMin, job.jobContent.employment.workloadPercentageMax]),
      cssClass: 'badge-grey',
      doNotTranslate: true
    });
    return badges;
  }


}



