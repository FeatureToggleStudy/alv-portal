import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { Observable } from 'rxjs';
import { flatMap, map, switchMap } from 'rxjs/operators';
import {
  CreateFavouriteItem,
  FavouriteItem,
  JobAdFavouritesSearchRequest, JobAdFavouritesSearchResponse,
  JobAdvertisementWithFavourites
} from '../job-advertisement/job-advertisement.types';
import { createPageableURLSearchParams } from '../request-util';

const FAVOURITES_PREFIX = '/jobadservice/api/favourite-items';
const SEARCH_PREFIX = FAVOURITES_PREFIX + '/_search';

@Injectable({
  providedIn: 'root'
})
export class JobAdFavouritesRepository {

  private currentUserId$: Observable<string>;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
    this.currentUserId$ = this.authenticationService.getCurrentUser().pipe(map(user => user.id));

  }

  /**
   * make the given jobAdvertisement favourite without a note
   * @param jobAdvertisementId
   * @param note
   * @return the newly created id of the favourite item
   */
  makeFavourite(jobAdvertisementId, note = ''): Observable<FavouriteItem> {
    return this.currentUserId$.pipe(
      map(currentUserId => ({
        note: note,
        userId: currentUserId,
        jobAdvertisementId: jobAdvertisementId
      } as CreateFavouriteItem)),
      switchMap(emptyCreateFavouriteItem => this.http.post<FavouriteItem>(FAVOURITES_PREFIX, emptyCreateFavouriteItem)),
      flatMap(response => this.getFavouritesForJobAd(jobAdvertisementId))
    );
  }

  removeFavourite(jobAdvertisement: JobAdvertisementWithFavourites): Observable<void> {
    return this.http.delete<void>(`${FAVOURITES_PREFIX}/${jobAdvertisement.favouriteItem.id}`);
  }

  createNote(jobAdvertisement: JobAdvertisementWithFavourites, note): Observable<FavouriteItem | void> {
    if (!jobAdvertisement.favouriteItem) {
      return this.makeFavourite(jobAdvertisement.jobAdvertisement.id, note);
    } else {
      return this.editNote(jobAdvertisement, note);
    }
  }

  editNote(jobAdvertisement: JobAdvertisementWithFavourites, note: string): Observable<void> {
    const updatedFavouriteItem: FavouriteItem = {
      ...jobAdvertisement.favouriteItem,
      note
    };
    return this.http.put<void>(FAVOURITES_PREFIX, updatedFavouriteItem);

  }

  getFavouritesForUser(jobAdFavouritesSearchRequest: JobAdFavouritesSearchRequest): Observable<JobAdFavouritesSearchResponse> {
    return this.currentUserId$.pipe(
      switchMap((currentUserId) => {
        const params = createPageableURLSearchParams(jobAdFavouritesSearchRequest)
          .set('userId', currentUserId)
          .set('query', jobAdFavouritesSearchRequest.body.query);

        return this.http.get<JobAdvertisementWithFavourites[]>(`${SEARCH_PREFIX}/byUserId`,
          { params, observe: 'response' }).pipe(
          map((resp) => {
            return {
              totalCount: parseInt(resp.headers.get('X-Total-Count'), 10),
              result: resp.body
            };
          })
        );
      })
    );
  }

  getFavouritesForJobAd(jobAdvertimentId): Observable<FavouriteItem> {
    return this.currentUserId$.pipe(
      switchMap((currentUserId) => {
        const params = new HttpParams()
          .set('userId', currentUserId)
          .set('jobAdvertisementId', jobAdvertimentId);
        return this.http.get<FavouriteItem>(`${SEARCH_PREFIX}/byJobAdvertisementIdAndUserId`, { params });
      }));
  }
}
