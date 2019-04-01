import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { mockJobs } from './favourite-jobs-widget.mock';

@Component({
  selector: 'alv-favourite-jobs-widget',
  templateUrl: './favourite-jobs-widget.component.html',
  styleUrls: ['./favourite-jobs-widget.component.scss']
})
export class FavouriteJobsWidgetComponent implements OnInit {

  jobs$: Observable<JobAdvertisement[]>; //will be JobAd+Fav[]

  constructor(private authenticationServer: AuthenticationService) {
  }

  ngOnInit() {
    this.jobs$ = this.authenticationServer.getCurrentUser().pipe(
      map(currentUser => this.getFavouriteJobs(currentUser))
    );

    this.jobs$ = of(mockJobs as JobAdvertisement[]);
  }

  private getFavouriteJobs(user) {
    // a call to the api here
    return [];
  }

}
