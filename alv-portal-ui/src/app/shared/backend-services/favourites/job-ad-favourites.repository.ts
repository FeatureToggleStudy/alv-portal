import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthenticationService} from '../../../core/auth/authentication.service';
import {Observable, of} from 'rxjs';
import {flatMap, map, switchMap} from 'rxjs/operators';
import {
  CreateFavouriteItem,
  FavouriteItem,
  JobAdFavouritesSearchRequest,
  JobAdFavouritesSearchResponse,
  JobAdvertisementWithFavourites
} from '../job-advertisement/job-advertisement.types';
import {createPageableURLSearchParams} from '../request-util';

const FAVOURITES_PREFIX = '/jobadservice/api/favourite-items';
const SEARCH_PREFIX = FAVOURITES_PREFIX + '/_search';
const UPDATE_NOTE_SUFFIX = '/note';

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
   * add the given jobAdvertisement favourites without a note
   * @param jobAdvertisementId
   * @param note
   * @return the newly created id of the favourite item
   */
  addFavourite(jobAdvertisementId, note = ''): Observable<FavouriteItem> {
    // return of({
    //   id: 'someid',
    //   note: 'some note',
    //   ownerId: '20303239293-dsfdsf-deeee',
    //   jobAdvertisementId: '',
    //   createdTime: '2019-04-01',
    //   updatedTime: '2019-04-01'
    // });
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

  removeFavourite(favouriteItemId: string): Observable<void> {
    return this.http.delete<void>(`${FAVOURITES_PREFIX}/${favouriteItemId}`);
  }

  createNote(jobAdvertisementId: string, note: string): Observable<FavouriteItem> {
    return this.addFavourite(jobAdvertisementId, note);
  }

  editNote(favouriteItem: FavouriteItem, note: string): Observable<void> {
    return this.http.put<void>(`${FAVOURITES_PREFIX}/${favouriteItem.id}${UPDATE_NOTE_SUFFIX}`, {note});
  }

  getFavouritesForUser(jobAdFavouritesSearchRequest: JobAdFavouritesSearchRequest): Observable<JobAdFavouritesSearchResponse> {
    return this.currentUserId$.pipe(
      switchMap((currentUserId) => {
        const params = createPageableURLSearchParams(jobAdFavouritesSearchRequest)
          .set('userId', currentUserId)
          .set('query', jobAdFavouritesSearchRequest.body.query);

        return this.http.get<JobAdvertisementWithFavourites[]>(`${SEARCH_PREFIX}/byUserId`,
          {params, observe: 'response'}).pipe(
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

  getFavouritesForJobAd(jobAdvertisementId): Observable<FavouriteItem> {
    return this.currentUserId$.pipe(
      switchMap((currentUserId) => {
        const params = new HttpParams()
          .set('userId', currentUserId)
          .set('jobAdvertisementId', jobAdvertisementId);
        return this.http.get<FavouriteItem>(`${SEARCH_PREFIX}/byJobAdvertisementIdAndUserId`, {params});
      }));
  }
}
