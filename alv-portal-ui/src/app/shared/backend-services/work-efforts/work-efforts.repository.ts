import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  WorkEffortsReport,
  mockedControlPeriods,
  mockedWorkEffort,
  WorkEffort
} from './work-efforts.types';

@Injectable({ providedIn: 'root' })
export class WorkEffortsRepository {

  // TODO: replace with correct endpoint
  private readonly resourceUrl = '/microservice/api/workEfforts';

  private readonly searchUrl = `${this.resourceUrl}/_search`;

  constructor(private http: HttpClient) {
  }

  getWorkEffortsReports(userId: string): Observable<WorkEffortsReport[]> {
    return of(mockedControlPeriods);
  }

  getWorkEffortById(workEffortId: string): Observable<WorkEffort> {
    return of(mockedWorkEffort);
  }

}
