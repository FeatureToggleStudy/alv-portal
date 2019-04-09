import {Component, OnInit} from '@angular/core';
import {IconKey} from '../../shared/icons/custom-icon/custom-icon.component';
import {JobAdFavouritesRepository} from '../../shared/backend-services/favourites/job-ad-favourites.repository';
import {map, switchMap, takeUntil} from 'rxjs/operators';
import {JobSearchResult} from '../../job-advertisement/shared/job-search-result/job-search-result.component';
import {NotificationsService} from '../../core/notifications.service';
import {AuthenticationService} from '../../core/auth/authentication.service';
import {CoreState} from '../../core/state-management/state/core.state.ts';
import {ActionsSubject, Store} from '@ngrx/store';
import {
  REMOVED_JOB_AD_FAVOURITE,
  RemoveJobAdFavouriteAction,
  UPDATED_JOB_AD_FAVOURITE,
  UpdatedJobAdFavouriteAction
} from '../../core/state-management/actions/core.actions';
import {ofType} from '@ngrx/effects';
import {AbstractSubscriber} from '../../core/abstract-subscriber';
import {Observable} from 'rxjs';
import {User} from '../../core/auth/user.model';

@Component({
  selector: 'alv-favourite-jobs-widget',
  templateUrl: './favourite-jobs-widget.component.html',
  styleUrls: ['./favourite-jobs-widget.component.scss']
})
export class FavouriteJobsWidgetComponent extends AbstractSubscriber implements OnInit {

  IconKey = IconKey;

  jobFavourites: JobSearchResult[]; //todo replace with observable and async

  currentUser$: Observable<User>;

  constructor(private jobAdFavouritesRepository: JobAdFavouritesRepository,
              private notificationService: NotificationsService,
              private store: Store<CoreState>,
              private actionsSubject: ActionsSubject,
              private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    this.getJobAdFavourites();

    this.actionsSubject.pipe(
      ofType(REMOVED_JOB_AD_FAVOURITE, UPDATED_JOB_AD_FAVOURITE),
      takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.getJobAdFavourites();
      });

    this.currentUser$ = this.authenticationService.getCurrentUser();
  }

  private getJobAdFavourites() {
    this.authenticationService.getCurrentUser().pipe(
      switchMap(currentUser => {
        return this.jobAdFavouritesRepository.searchFavourites({
          body: {
            query: ''
          },
          page: 0,
          size: 4 // We have to grab 4 items because the API returns non-favourite items sometimes.
        }, currentUser.id);
      }),
      map(favouriteJob => favouriteJob.result),
      map((result) => result.map(value => ({...value, visited: false}))),
      takeUntil(this.ngUnsubscribe))
      .subscribe((jobSearchResults: JobSearchResult[]) => {
        this.jobFavourites = jobSearchResults.filter(jobFavourite => jobFavourite.favouriteItem).slice(0, 3);
      });
  }

  removeFromFavourites(jobSearchResult: JobSearchResult) {
    this.store.dispatch(new RemoveJobAdFavouriteAction({favouriteItem: jobSearchResult.favouriteItem}));
  }

  updatedFavourite(jobSearchResult: JobSearchResult) {
    this.store.dispatch(new UpdatedJobAdFavouriteAction({favouriteItem: jobSearchResult.favouriteItem}));
  }

}
