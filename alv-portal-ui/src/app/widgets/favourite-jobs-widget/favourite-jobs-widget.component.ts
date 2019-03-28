import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/auth/authentication.service';
import { JobAdvertisement } from '../../shared/backend-services/job-advertisement/job-advertisement.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
      map(currentUser => this.retrieveCurrentUserFavourites(currentUser))
    );
  }

  private retrieveCurrentUserFavourites(user) {
    // a call to the api here
    return [];
  }

}
