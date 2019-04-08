import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {
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

  constructor(private http: HttpClient) {
  }

  /**
   * add the given jobAdvertisement favourites without a note
   * @param jobAdvertisementId
   * @param userId the user for which the jobad is favourite
   * @param note
   * @return the newly created id of the favourite item
   */
  addFavourite(jobAdvertisementId: string, userId: string, note = ''): Observable<FavouriteItem> {
    const emptyCreateFavouriteItem = {
      note: note,
      userId: userId,
      jobAdvertisementId: jobAdvertisementId
    };
    return this.http.post<FavouriteItem>(FAVOURITES_PREFIX, emptyCreateFavouriteItem);
  }

  removeFavourite(favouriteItemId: string): Observable<void> {
    return this.http.delete<void>(`${FAVOURITES_PREFIX}/${favouriteItemId}`);
  }

  editNote(favouriteItem: FavouriteItem, note: string): Observable<FavouriteItem> {
    return this.http.put<FavouriteItem>(`${FAVOURITES_PREFIX}/${favouriteItem.id}${UPDATE_NOTE_SUFFIX}`, {note});
  }

  getFavouritesForUser(jobAdFavouritesSearchRequest: JobAdFavouritesSearchRequest, userId: string): Observable<JobAdFavouritesSearchResponse> {
    const params = createPageableURLSearchParams(jobAdFavouritesSearchRequest)
      .set('userId', userId)
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
  }

  getFavouritesForJobAd(jobAdvertisementId: string, userId: string): Observable<FavouriteItem> {
    const params = new HttpParams()
      .set('userId', userId)
      .set('jobAdvertisementId', jobAdvertisementId);
    return this.http.get<FavouriteItem>(`${SEARCH_PREFIX}/byJobAdvertisementIdAndUserId`, {params});
  }

}
