import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {
  CreateFavouriteItem,
  FavouriteItem,
  JobAdvertisementWithFavourites
} from '../job-advertisement/job-advertisement.types';

const FAVOURITES_PREFIX = '/api/favourite-items';
const SEARCH_PREFIX = FAVOURITES_PREFIX + '/_search';

@Injectable({
  providedIn: 'root'
})
export class JobAdFavouritesRepositoryService {

  private currentUserId$: Observable<string>;

  constructor(private http: HttpClient,
              private authenticationService: AuthenticationService) {
    this.currentUserId$ = this.authenticationService.getCurrentUser().pipe(map(user => user.id));

  }

  /**
   * make the given jobAdvertisement favourite without a note
   * @param jobAdvertisementId
   * @return the newly created id of the favourite item
   */
  makeFavourite(jobAdvertisementId, note = ''): Observable<string> {
    return this.currentUserId$.pipe(
      map(currentUserId => ({
        note: note,
        userId: currentUserId,
        jobAdvertisementId: jobAdvertisementId
      } as CreateFavouriteItem)),
      switchMap(emptyCreateFavouriteItem => this.http.post<string>(FAVOURITES_PREFIX, emptyCreateFavouriteItem))
    );
  }

  removeFavourite(jobAdvertisement: JobAdvertisementWithFavourites): Observable<void> {
    return this.http.delete<void>(`${FAVOURITES_PREFIX}/${jobAdvertisement.favouriteItem.id}`);
  }

  createNote(jobAdvertisement: JobAdvertisementWithFavourites, note): Observable<string | void> {
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

  getFavouritesForUser(query: string, page: number, size: number): Observable<FavouriteItem> {
    return this.currentUserId$.pipe(
      switchMap((currentUserId) => {
        const params = new HttpParams()
          .set('query', query)
          .set('page', String(page))
          .set('size', String(size))
          .set('userId', currentUserId);
        return this.http.get<FavouriteItem>(`${SEARCH_PREFIX}/byUserId`, { params });
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
