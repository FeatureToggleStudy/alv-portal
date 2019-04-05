import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ResultListItem } from '../../../shared/layout/result-list-item/result-list-item.model';
import { JobAdvertisementUtils } from '../../../shared/backend-services/job-advertisement/job-advertisement.utils';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { map, startWith, withLatestFrom } from 'rxjs/operators';
import { I18nService } from '../../../core/i18n.service';
import { JobBadgesMapperService } from '../../../widgets/job-publication-widget/job-badges-mapper.service';
import {
  FavouriteItem,
  JobAdvertisement
} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { NotificationsService } from '../../../core/notifications.service';
import { ActivatedRoute } from '@angular/router';
import { JobAdFavouritesRepository } from '../../../shared/backend-services/favourites/job-ad-favourites.repository';

export interface JobSearchResult {
  jobAdvertisement: JobAdvertisement;
  favouriteItem: FavouriteItem;
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

  @Input()
  routerLinkBase: string;

  @Output()
  update = new EventEmitter<JobSearchResult>();

  resultListItem$: Observable<ResultListItem>;

  jobSearchResult$: Subject<JobSearchResult>;

  constructor(private i18nService: I18nService,
              private route: ActivatedRoute,
              private jobBadgesMapperService: JobBadgesMapperService,
              private jobAdFavouritesRepository: JobAdFavouritesRepository,
              private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.jobSearchResult$ = new Subject<JobSearchResult>();
    this.resultListItem$ = this.jobSearchResultToResultListItemMapper(this.jobSearchResult);
  }

  private jobSearchResultToResultListItemMapper(initialJobSearchResult: JobSearchResult): Observable<ResultListItem> {
    return this.update.pipe(
      startWith(initialJobSearchResult),
      withLatestFrom(this.i18nService.currentLanguage$),
      map(([jobSearchResult, lang]) => {
        const jobAdvertisement = jobSearchResult.jobAdvertisement;
        const jobDescription = JobAdvertisementUtils.getJobDescription(jobAdvertisement, lang);
        return <ResultListItem>{
          id: jobAdvertisement.id,
          title: jobDescription.title,
          description: jobDescription.description,
          header: jobAdvertisement.publication.startDate,
          badges: this.jobBadgesMapperService.map(jobAdvertisement),
          routerLink: [this.routerLinkBase, jobAdvertisement.id],
          subtitle: jobAdvertisement.jobContent.company.name,
          visited: jobSearchResult.visited,
          hasActions: true,
          isFavourite: !!jobSearchResult.favouriteItem,
          hasNote: !!jobSearchResult.favouriteItem && !!jobSearchResult.favouriteItem.note
        };
      })
    );
  }

  toggleFavourites() {
    if (this.jobSearchResult.favouriteItem) {
      this.removeFromFavorites();
    } else {
      this.addToFavourites();
    }
  }

  showNoteDialog() {
    console.log('show note dialog!');
  }

  private addToFavourites() {
    this.jobAdFavouritesRepository.makeFavourite(this.jobSearchResult.jobAdvertisement.id)
      .subscribe(favouriteItem => {
        this.jobSearchResult.favouriteItem = favouriteItem;
        this.update.emit(this.jobSearchResult);
      });
  }

  private removeFromFavorites() {
    this.jobAdFavouritesRepository.removeFavourite(this.jobSearchResult)
      .subscribe(() => {
        this.jobSearchResult.favouriteItem = null;
        this.update.emit(this.jobSearchResult);
      });
  }

}



