import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ResultListItem } from '../../../shared/layout/result-list-item/result-list-item.model';
import { JobAdvertisementUtils } from '../../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nService } from '../../../core/i18n.service';
import { JobBadgesMapperService } from '../../job-publication-widget/job-badges-mapper.service';
import { JobAdvertisement } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';

export interface JobSearchResult {
  jobAdvertisement: JobAdvertisement;
  visited: boolean;
}
@Component({
  selector: 'alv-job-search-result',
  templateUrl: './job-search-result.component.html',
  styleUrls: ['./job-search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
          id: jobAdvertisement.id,
          title: jobDescription.title,
          description: jobDescription.description,
          header: jobAdvertisement.publication.startDate,
          badges: this.jobBadgesMapperService.map(jobAdvertisement),
          routerLink: ['/job-search', jobAdvertisement.id],
          subtitle: jobAdvertisement.jobContent.company.name,
          visited: jobSearchResult.visited
        };
      })
    );
  }

  public toggleFavourites() {
    console.log('favourites toggled!');
  }

  public showNoteDialog() {
    console.log('show note dialog!');
  }

}



