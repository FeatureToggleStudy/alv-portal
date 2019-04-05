import { Component, OnInit } from '@angular/core';
import { IconKey } from '../../shared/icons/custom-icon/custom-icon.component';
import { JobAdFavouritesRepository } from '../../shared/backend-services/favourites/job-ad-favourites.repository';
import { map } from 'rxjs/operators';
import { JobAdvertisementWithFavourites } from '../../shared/backend-services/job-advertisement/job-advertisement.types';

@Component({
  selector: 'alv-favourite-jobs-widget',
  templateUrl: './favourite-jobs-widget.component.html',
  styleUrls: ['./favourite-jobs-widget.component.scss']
})
export class FavouriteJobsWidgetComponent implements OnInit {

  IconKey = IconKey;

  jobFavourites: JobAdvertisementWithFavourites[];

  constructor(private jobAdFavouritesRepositoryService: JobAdFavouritesRepository) {
  }

  ngOnInit() {
    this.getJobAdFavourites();
  }

  onJobAdFavouriteResultUpdate() {
    this.getJobAdFavourites();
  }

  private getJobAdFavourites() {
    return this.jobAdFavouritesRepositoryService.getFavouritesForUser({
      body: {
        query: ''
      },
      page: 0,
      size: 4 // We have to grab 4 items because the API returns non-favourite items sometimes.
    }).pipe(
      map(favouriteJob => favouriteJob.result)
    ).subscribe(jobFavourites => {
      this.jobFavourites = jobFavourites.filter(jobFavourite => jobFavourite.favouriteItem).slice(0, 3);
    });
  }


  addNote() {

  }

  addToFavourites() {

  }

  removeFromFavourites() {

  }
}
