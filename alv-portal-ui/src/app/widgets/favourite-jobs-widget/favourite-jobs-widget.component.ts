import { Component, OnInit } from '@angular/core';
import { IconKey } from '../../shared/icons/custom-icon/custom-icon.component';
import { JobAdFavouritesRepository } from '../../shared/backend-services/favourites/job-ad-favourites.repository';
import { map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { JobSearchResult } from '../../job-advertisement/shared/job-search-result/job-search-result.component';
import { NotificationsService } from '../../core/notifications.service';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { CoreState } from '../../core/state-management/state/core.state.ts';
import { ActionsSubject, Store } from '@ngrx/store';
import {
  REMOVED_JOB_AD_FAVOURITE,
  RemoveJobAdFavouriteAction,
  UPDATED_JOB_AD_FAVOURITE,
  UpdatedJobAdFavouriteAction
} from '../../core/state-management/actions/core.actions';
import { ofType } from '@ngrx/effects';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { combineLatest, Observable } from 'rxjs';
import { User } from '../../core/auth/user.model';

@Component({
  selector: 'alv-favourite-jobs-widget',
  templateUrl: './favourite-jobs-widget.component.html',
  styleUrls: ['./favourite-jobs-widget.component.scss']
})
export class FavouriteJobsWidgetComponent extends AbstractSubscriber implements OnInit {

  IconKey = IconKey;

  jobFavourites$: Observable<JobSearchResult[]>; //todo replace with observable and async

  currentUser$: Observable<User>;

  constructor(private jobAdFavouritesRepository: JobAdFavouritesRepository,
              private notificationService: NotificationsService,
              private store: Store<CoreState>,
              private actionsSubject: ActionsSubject,
              private authenticationService: AuthenticationService) {
    super();
  }

  ngOnInit() {
    const currentUser$ = this.authenticationService.getCurrentUser();

    const actions$ = this.actionsSubject.pipe(
      ofType(REMOVED_JOB_AD_FAVOURITE, UPDATED_JOB_AD_FAVOURITE),
      startWith('WIDGET_INIT_ACTION')
    );

    this.jobFavourites$ = combineLatest(currentUser$, actions$)
      .pipe(
        switchMap(([currentUser]) => {
          return this.jobAdFavouritesRepository.searchFavourites({
            body: {
              query: ''
            },
            page: 0,
            size: 10 // We have to grab more items because the API returns non-favourite items sometimes.
          }, currentUser.id);
        }),
        map(favouriteJob => favouriteJob.result),
        map((result) => result.map(value => ({ ...value, visited: false }))),
        map(result => result.filter(jobFavourite => jobFavourite.favouriteItem).slice(0, 3)),
        takeUntil(this.ngUnsubscribe)
      );

    this.currentUser$ = this.authenticationService.getCurrentUser();
  }

  removeFromFavourites(jobSearchResult: JobSearchResult) {
    this.store.dispatch(new RemoveJobAdFavouriteAction({ favouriteItem: jobSearchResult.favouriteItem }));
  }

  updatedFavourite(jobSearchResult: JobSearchResult) {
    this.store.dispatch(new UpdatedJobAdFavouriteAction({ favouriteItem: jobSearchResult.favouriteItem }));
  }

}
