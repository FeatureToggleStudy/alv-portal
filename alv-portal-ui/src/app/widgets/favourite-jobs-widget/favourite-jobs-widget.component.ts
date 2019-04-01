import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { Observable, of } from 'rxjs';
import { mockJobSearchResults } from './favourite-jobs-widget.mock';
import { JobSearchResult } from '../job-search-widget/job-search-result/job-search-result.component';

@Component({
  selector: 'alv-favourite-jobs-widget',
  templateUrl: './favourite-jobs-widget.component.html',
  styleUrls: ['./favourite-jobs-widget.component.scss']
})
export class FavouriteJobsWidgetComponent implements OnInit {

  jobs$: Observable<JobSearchResult[]>; //will be JobAd+Fav[]

  constructor(private authenticationServer: AuthenticationService) {
  }

  ngOnInit() {
    // this.jobs$ = this.authenticationServer.getCurrentUser().pipe(
    //   map(currentUser => this.getFavouriteJobs(currentUser))
    // );

    this.jobs$ = of(mockJobSearchResults);
  }

  private getFavouriteJobs(user) {
    // a call to the api here
    return [];
  }

}
