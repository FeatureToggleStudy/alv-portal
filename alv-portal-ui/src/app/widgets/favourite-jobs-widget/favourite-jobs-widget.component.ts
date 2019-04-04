import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mockJobSearchResults } from './favourite-jobs-widget.mock';
import { JobSearchResult } from '../../job-advertisement/shared/job-search-result/job-search-result.component';
import { IconKey } from '../../shared/icons/custom-icon/custom-icon.component';
import { JobAdFavouritesRepositoryService } from '../../shared/backend-services/favourites/job-ad-favourites-repository.service';

@Component({
  selector: 'alv-favourite-jobs-widget',
  templateUrl: './favourite-jobs-widget.component.html',
  styleUrls: ['./favourite-jobs-widget.component.scss']
})
export class FavouriteJobsWidgetComponent implements OnInit {

  IconKey = IconKey;

  jobs$: Observable<JobSearchResult[]>; //will be JobAd+Fav[]

  constructor(private jobAdFavouritesRepositoryService: JobAdFavouritesRepositoryService) {
  }

  ngOnInit() {
    // this.jobs$ = this.authenticationServer.getCurrentUser().pipe(
    //   map(currentUser => this.getFavouriteJobs(currentUser))
    // );

    this.jobs$ = of(mockJobSearchResults);
  }

  showAll() {
    console.log('lets go to the page with all favourites!');
  }

  private getFavouriteJobs(user) {
    // a call to the api here
    return [];
  }


  makeFavourite() {
    this.jobAdFavouritesRepositoryService.makeFavourite('50517254-55e4-11e9-80c7-0242ac12000b')
      .subscribe(x => console.log('success', x));

  }

  removeFavourite() {
    this.jobAdFavouritesRepositoryService.removeFavourite('50517254-55e4-11e9-80c7-0242ac12000b')
      .subscribe(() => console.log('removed!!'));

  }

  addNote() {

  }
}
