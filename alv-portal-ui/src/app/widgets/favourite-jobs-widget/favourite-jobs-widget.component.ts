import { Component, OnInit } from '@angular/core';
import { IconKey } from '../../shared/icons/custom-icon/custom-icon.component';
import { JobAdFavouritesRepository } from '../../shared/backend-services/favourites/job-ad-favourites.repository';
import { map, switchMap, tap } from 'rxjs/operators';
import { JobAdvertisementWithFavourites } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { JobSearchResult } from '../../job-advertisement/shared/job-search-result/job-search-result.component';
import { NotificationsService } from '../../core/notifications.service';
import { AuthenticationService } from '../../core/auth/authentication.service';

@Component({
  selector: 'alv-favourite-jobs-widget',
  templateUrl: './favourite-jobs-widget.component.html',
  styleUrls: ['./favourite-jobs-widget.component.scss']
})
export class FavouriteJobsWidgetComponent implements OnInit {

  IconKey = IconKey;

  jobFavourites: JobAdvertisementWithFavourites[]; //todo replace with observable and async

  constructor(private jobAdFavouritesRepository: JobAdFavouritesRepository,
              private notificationService: NotificationsService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.getJobAdFavourites();
  }

  private getJobAdFavourites() {
    this.authenticationService.getCurrentUser().pipe(
      switchMap(currentUser => {
        return this.jobAdFavouritesRepository.getFavouritesForUser({
          body: {
            query: ''
          },
          page: 0,
          size: 4 // We have to grab 4 items because the API returns non-favourite items sometimes.
        }, currentUser.id);
      }),
      map(favouriteJob => favouriteJob.result)
    ).subscribe(jobFavourites => {
      this.jobFavourites = jobFavourites.filter(jobFavourite => jobFavourite.favouriteItem).slice(0, 3);
    });
  }


  addNote() {

  }

  removeFromFavourites(jobSearchResult: JobSearchResult) {
    this.jobAdFavouritesRepository.removeFavourite(jobSearchResult.favouriteItem.id).pipe(
      tap(() => this.notificationService.success('portal.job-ad-favourites.notification.favourite-removed')),
    )
      .subscribe(() => {
        this.getJobAdFavourites(); //todo double subscription here, not good
      });
  }
}
