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
  JobAdvertisement, JobAdvertisementWithFavourites
} from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { NotificationsService } from '../../../core/notifications.service';
import { ActivatedRoute } from '@angular/router';
import { JobAdFavouritesRepository } from '../../../shared/backend-services/favourites/job-ad-favourites.repository';
import { FilterManagedJobAdsComponent } from '../../manage-job-ads/manage-job-ad-search/filter-managed-job-ads/filter-managed-job-ads.component';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { FavouriteNoteModalComponent } from '../favourite-note-modal/favourite-note-modal.component';

export interface JobSearchResult extends JobAdvertisementWithFavourites {
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
  searchResultUpdate = new EventEmitter<JobSearchResult>();

  resultListItem$: Observable<ResultListItem>;

  jobSearchResult$: Subject<JobSearchResult>;

  constructor(private i18nService: I18nService,
              private route: ActivatedRoute,
              private jobBadgesMapperService: JobBadgesMapperService,
              private jobAdFavouritesRepository: JobAdFavouritesRepository,
              private modalService: ModalService,
              private notificationService: NotificationsService) {
  }

  ngOnInit() {
    this.jobSearchResult$ = new Subject<JobSearchResult>();
    this.resultListItem$ = this.jobSearchResultToResultListItemMapper(this.jobSearchResult);
  }

  private jobSearchResultToResultListItemMapper(initialJobSearchResult: JobSearchResult): Observable<ResultListItem> {
    return this.searchResultUpdate.pipe(
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
    const favouriteNoteModalRef = this.modalService.openLarge(FavouriteNoteModalComponent, true);
    const favouriteNoteComponent = <FavouriteNoteModalComponent>favouriteNoteModalRef.componentInstance;
    favouriteNoteComponent.jobAdvertisementId = this.jobSearchResult.jobAdvertisement.id;
    favouriteNoteComponent.favouriteItem = this.jobSearchResult.favouriteItem;
    favouriteNoteModalRef.result
      .then(favouriteItem => {
        this.jobSearchResult.favouriteItem = favouriteItem;
        this.searchResultUpdate.emit(this.jobSearchResult);
      })
      .catch(() => {
      });
  }

  private addToFavourites() {
    this.jobAdFavouritesRepository.addFavourite(this.jobSearchResult.jobAdvertisement.id)
      .subscribe(favouriteItem => {
        this.jobSearchResult.favouriteItem = favouriteItem;
        this.searchResultUpdate.emit(this.jobSearchResult);
        this.notificationService.success('portal.job-ad-favourites.notification.favourite-added');
      });
  }

  private removeFromFavorites() {
    this.jobAdFavouritesRepository.removeFavourite(this.jobSearchResult.favouriteItem)
      .subscribe(() => {
        this.jobSearchResult.favouriteItem = null;
        this.searchResultUpdate.emit(this.jobSearchResult);
        this.notificationService.success('portal.job-ad-favourites.notification.favourite-removed');
      });
  }

}



