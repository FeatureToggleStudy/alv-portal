import { Injectable } from '@angular/core';

import {
  Organization,
  OrganizationAutocomplete,
  OrganizationSuggestion
} from './organization.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  readonly RESOURCE_SEARCH_URL = 'api/_search/organizations';

  readonly DEFAULT_SUGGEST_SIZE = 10;

  constructor(private http: HttpClient) {
  }

  static formatOrganizationName(organization: Organization | OrganizationSuggestion): string {
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

  suggest(prefix: string, resultSize? = this.DEFAULT_SUGGEST_SIZE): Observable<OrganizationSuggestion[]> {
    const params = new HttpParams()
        .set('prefix', prefix)
        .set('resultSize', resultSize.toString());
    return this.http.get<OrganizationAutocomplete>(`${this.RESOURCE_SEARCH_URL}/suggest`, { params })
        .pipe(
            map((autocomplete: OrganizationAutocomplete) => autocomplete ? autocomplete.organizations : [])
        );
  }

}
