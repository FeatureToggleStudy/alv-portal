import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

const FAVOURITES_PREFIX = '/api/favourite-items';
const SEARCH_PREFIX = FAVOURITES_PREFIX + '/_search';

@Injectable({
  providedIn: 'root'
})
export class JobAdFavouritesRepositoryService {

  private userId$: Observable<string>;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
    this.userId$ = this.authenticationService.getCurrentUser().pipe(map(user => user.id));

  }

  makeFavourite(jobAdvertisementId) {
    return this.userId$.pipe(switchMap(userId => this.http.post(FAVOURITES_PREFIX)));
  }

  removeFavourite(jobAdvertisementId) {

  }

  createNote(jobAdvertisementId) {

  }

  editNote(jobAdvertisementId) {

  }

  getFavouritesForUser() {

  }

  getFavouritesForJobAd() {

  }
}
