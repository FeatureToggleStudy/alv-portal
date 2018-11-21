import { Injectable } from '@angular/core';

import { OrganizationAutocomplete, OrganizationSuggestion } from './organization.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  readonly RESOURCE_SEARCH_URL = 'api/_search/organizations';

  constructor(private http: HttpClient) {
  }

  suggest(prefix: string, resultSize: number): Observable<OrganizationSuggestion[]> {
    const params = new HttpParams()
        .set('prefix', prefix)
        .set('resultSize', resultSize.toString());
    return this.http.get<OrganizationAutocomplete>(`${this.RESOURCE_SEARCH_URL}/suggest`, { params })
        .pipe(
            map((autocomplete: OrganizationAutocomplete) => autocomplete ? autocomplete.organizations : [])
        );
/*
    return of({
      organizations: [{
        externalId: '1231232',
        name: 'mimacom',
        street: 'Galgenfeldweg 16',
        city: 'Bern',
        zipCode: '3003'
      },
        {
          externalId: '1231232',
          name: 'mimacom',
          street: 'Galgenfeldweg 16',
          city: 'Bern',
          zipCode: '3003'
        },
        {
          externalId: '1231232',
          name: 'mimacom',
          street: 'Galgenfeldweg 16',
          city: 'Bern',
          zipCode: '3003'
        }]

    }).pipe(
        map((autocomplete: OrganizationAutocomplete) => autocomplete ? autocomplete.organizations : [])
    );
*/
  }

}
