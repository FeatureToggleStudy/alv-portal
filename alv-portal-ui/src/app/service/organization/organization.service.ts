import { Injectable } from '@angular/core';

import { OrganizationAutocomplete, OrganizationSuggestion } from './organization.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private resourceSearchUrl = 'api/_search/organizations';

  constructor(private http: HttpClient) {
  }

  suggest(prefix: string, resultSize: number): Observable<OrganizationSuggestion[]> {
    const params = new HttpParams()
        .set('prefix', prefix)
        .set('resultSize', resultSize.toString());
    return this.http.get<OrganizationAutocomplete>(`${this.resourceSearchUrl}/suggest`, { params })
        .pipe(
            map((autocomplete: OrganizationAutocomplete) => autocomplete ? autocomplete.organizations : [])
        );
  }

}
