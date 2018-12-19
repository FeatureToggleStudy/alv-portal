import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LocalityAutocomplete } from './locality.types';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LocalityRepository {

  private readonly REFERENCESERVICE_URL = '/referenceservice/api/';

  private readonly LOCALITIES_SUGGESTION = this.REFERENCESERVICE_URL + '_search/localities';

  constructor(private http: HttpClient) {
  }

  public suggestLocalities(query: string): Observable<LocalityAutocomplete> {
    const params = new HttpParams()
      .set('prefix', query)
      .set('resultSize', '10')
      .set('distinctByLocalityCity', 'true');
    return this.http.get<LocalityAutocomplete>(this.LOCALITIES_SUGGESTION, { params });
  }

}
