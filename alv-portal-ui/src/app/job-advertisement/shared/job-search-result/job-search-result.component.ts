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
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nService } from '../../../core/i18n.service';
import { JobBadgesMapperService } from '../../../widgets/job-publication-widget/job-badges-mapper.service';
import { JobAdvertisementWithFavourites } from '../../../shared/backend-services/job-advertisement/job-advertisement.types';
import { NotificationsService } from '../../../core/notifications.service';
import { ActivatedRoute } from '@angular/router';
import { JobAdFavouritesRepository } from '../../../shared/backend-services/favourites/job-ad-favourites.repository';
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
  searchResultUpdate = new EventEmitter<JobSearchResult>(); // todo here jobsearchresult itself is responsible for repainting itself. Also we have two sources of truth here: `this.searchResultUpdate` and `this.jobSearchResult`. I think that it's unnessesary and can be simplified. I think the component can repaint itself when the `this.searchResult` input is changed. This input will be changed by the parent component.

  @Output()
  removeFromFavourites = new EventEmitter<JobSearchResult>();

  @Output()
  addToFavourites = new EventEmitter<JobSearchResult>();

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
    this.resultListItem$ = this.jobSearchResultToResultListItemMapper(this.jobSearchResult); //todo maybe move that to ngOnChanges
  }

  private jobSearchResultToResultListItemMapper(jobSearchResult: JobSearchResult): Observable<ResultListItem> {
    const jobAdvertisement = jobSearchResult.jobAdvertisement;
    return this.i18nService.currentLanguage$.pipe(
      map(lang => {
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
      this.removeFromFavourites.emit(this.jobSearchResult);
    } else {
      this.addToFavourites.emit(this.jobSearchResult);
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

  //
  // private addToFav() {
  //   this.jobAdFavouritesRepository.addFavourite(this.jobSearchResult.jobAdvertisement.id)
  //     .subscribe(favouriteItem => {
  //       this.jobSearchResult.favouriteItem = favouriteItem;
  //       this.searchResultUpdate.emit(this.jobSearchResult);
  //       this.notificationService.success('portal.job-ad-favourites.notification.favourite-added');
  //     });
  // }
  //
  // private removeFromFavorites() {
  //   this.jobAdFavouritesRepository.removeFavourite(this.jobSearchResult.favouriteItem)
  //     .subscribe(() => {
  //       this.jobSearchResult.favouriteItem = null;
  //       this.searchResultUpdate.emit(this.jobSearchResult);
  //       this.notificationService.success('portal.job-ad-favourites.notification.favourite-removed');
  //     });
  // }

}



