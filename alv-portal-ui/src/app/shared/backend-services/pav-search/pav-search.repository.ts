import { Injectable } from '@angular/core';

import { PavSuggestion } from './pav-search.types';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PavSearchRepository {

  readonly RESOURCE_SEARCH_URL = 'api/_search/organizations';

  readonly DEFAULT_SUGGEST_SIZE = 10;

  constructor(private http: HttpClient) {
  }

  static formatOrganizationName(organization: PavSuggestion): string {
    let formattedName = organization.name;
    if (organization.city || organization.zipCode) {
      formattedName = organization.city ?
        `${formattedName}, ${organization.zipCode} ${organization.city}`
        : `${formattedName}, ${organization.zipCode}`;

    }
    if (organization.street) {
      formattedName = `${formattedName}, ${organization.street}`;
    }
    return formattedName;
  }

  suggest(prefix: string, resultSize = this.DEFAULT_SUGGEST_SIZE): Observable<PavSuggestion[]> {
    const params = new HttpParams()
      .set('prefix', prefix)
      .set('resultSize', resultSize.toString());
    return this.http.get<PavAutocomplete>(`${this.RESOURCE_SEARCH_URL}/suggest`, { params })
      .pipe(
        map((autocomplete: PavAutocomplete) => autocomplete ? autocomplete.organizations : [])
      );
  }

}

interface PavAutocomplete {
  organizations: Array<PavSuggestion>;
}

