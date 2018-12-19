import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OccupationLabelAutocomplete } from './occupation-label.types';

const DEFAULT_RESPONSE_SIZE = '10';

const OCCUPATION_LABEL_RESOURCE_SEARCH_URL = '/referenceservice/api/_search/occupations/label';

export enum OccupationTypes {
  X28 = 'x28',
  SBN3 = 'sbn3',
  SBN5 = 'sbn5',
}


@Injectable({ providedIn: 'root' })
export class OccupationLabelRepository {

  constructor(private http: HttpClient) {
  }

  //
  /**
   *
   * @param query the query/term
   * @param types of [x28', 'sbn3', 'sbn5'
   */
  suggestOccupations(query: string, types: OccupationTypes[]): Observable<OccupationLabelAutocomplete> {
    const params = new HttpParams()
      .set('prefix', query)
      .set('types', types.join(','))
      .set('resultSize', DEFAULT_RESPONSE_SIZE);
    return this.http.get<OccupationLabelAutocomplete>(OCCUPATION_LABEL_RESOURCE_SEARCH_URL, { params });
  }
}
