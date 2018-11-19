import { Injectable } from '@angular/core';

import { OrganizationAutocomplete } from './organization.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class OrganizationService {

    private resourceUrl = 'api/organizations';
    private resourceSearchUrl = 'api/_search/organizations';

    constructor(private http: HttpClient) {
    }

    suggest(prefix: string, resultSize: number): Observable<OrganizationAutocomplete> {
        const params = new HttpParams()
            .set('prefix', prefix)
            .set('resultSize', resultSize.toString());

        return this.http.get<OrganizationAutocomplete>(`${this.resourceSearchUrl}/suggest`, { params });
        /*
                return Observable.of({
                    organizations: [<OrganizationSuggestion>{
                        externalId: '1231232',
                        name: 'mimacom',
                        street: 'Galgenfeldweg 16',
                        city: 'Bern',
                        zipCode: '3003'
                    }]
                });
        */
    }

}
