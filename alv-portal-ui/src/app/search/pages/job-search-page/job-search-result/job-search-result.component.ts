import { Component, Input, OnInit } from '@angular/core';
import { JobAdvertisement } from '../../../services/job-advertisement/job-advertisement.model';
import { ResultListItem } from '../../../components/result-list-item/result-list-item.model';
import { JobAdvertisementUtils } from '../../../services/job-advertisement/job-advertisement.utils';

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
    this.listItem = jobSearchResultToResultListItemMapper(this.jobSearchResult);
  }

}

function jobSearchResultToResultListItemMapper(job: JobAdvertisement): ResultListItem {
  const jobDescription = JobAdvertisementUtils.getJobDescription(job);
  return {
    title: jobDescription.title,
    description: jobDescription.description,
    header: job.publication.startDate,
    badges: [],
    routerLink: ['/job-detail', job.id],
    subtitle: job.jobContent.company.name
  }
}
