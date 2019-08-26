import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureCodeListRepository {

  private readonly resourceUrl = '/api/feature-code-list';

  private readonly actionUrl =  `${this.resourceUrl}/_action`;

  constructor(private http: HttpClient) {
  }

  activateFeature(activationCode: string): Observable<null> {
    return this.http.post<null>(`${this.actionUrl}/activate`, {
      activationCode: activationCode
    });
  }

}
