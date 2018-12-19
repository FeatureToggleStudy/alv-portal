import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OccupationLabelAutocomplete } from './occupation-label.types';

const DEFAULT_RESPONSE_SIZE = '10';

const OCCUPATION_LABEL_RESOURCE_SEARCH_URL = '/referenceservice/api/_search/occupations/label';

/**
 * This service is supposed to be a data service. The UI components should use the OccupationPresentationService
 * instead of this.
 */
@Injectable({
  providedIn: 'root'
})
export class OccupationLabelRepository {

  constructor(private http: HttpClient) {
  }

  /**
   *
   * @param prefix the term/query
   * @param types of [x28', 'sbn3', 'sbn5'
   */
  suggestOccupations(prefix: string, types: string[]): Observable<OccupationLabelAutocomplete> {
    const params = new HttpParams()
      .set('prefix', prefix)
      .set('types', types.join(','))
      .set('resultSize', DEFAULT_RESPONSE_SIZE);
    return this.http.get<OccupationLabelAutocomplete>(OCCUPATION_LABEL_RESOURCE_SEARCH_URL, { params });
  }
}
