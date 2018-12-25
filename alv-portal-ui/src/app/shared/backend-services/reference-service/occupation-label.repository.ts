import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  OccupationLabelAutocomplete,
  OccupationLabelData
} from './occupation-label.types';
import { tap } from 'rxjs/operators';

const DEFAULT_RESPONSE_SIZE = '10';

const OCCUPATION_LABEL_RESOURCE_SEARCH_URL = '/referenceservice/api/_search/occupations/label';

const OCCUPATION_LABEL_RESOURCE_URL = '/referenceservice/api/occupations/label';

export enum OccupationTypes {
  AVAM = 'AVAM',
  X28 = 'X28',
  SBN3 = 'SBN3',
  SBN5 = 'SBN5',
}

@Injectable({ providedIn: 'root' })
export class OccupationLabelRepository {

  private occupationLabelDataCache: { [key: string]: OccupationLabelData } = {};

  constructor(private http: HttpClient) {
  }

  getOccupationLabelsByKey(type: string, value: string, language: string): Observable<OccupationLabelData> {
    const cacheKey = `${type}_${value}_${language}`;
    if (this.occupationLabelDataCache[cacheKey]) {
      return of(this.occupationLabelDataCache[cacheKey]);
    }
    return this.http.get<OccupationLabelData>(`${OCCUPATION_LABEL_RESOURCE_URL}/${type}/${value}`, { headers: { 'Cache-Control': 'no-cache' } }).pipe(
      tap((label) => {
        this.occupationLabelDataCache[cacheKey] = label;
      })
    );
  }

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
