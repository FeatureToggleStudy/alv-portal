import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorkEffort, WorkEffortsReport } from './proof-of-work-efforts.types';
import { map } from 'rxjs/operators';
import { Page } from '../shared.types';

@Injectable({ providedIn: 'root' })
export class ProofOfWorkEffortsRepository {

  private readonly resourceUrl = '/onlineform-service/api/npa';

  private readonly searchUrl = `${this.resourceUrl}/_search`;

  private readonly actionUrl = `${this.resourceUrl}/_action`;

  constructor(private http: HttpClient) {
  }

  getWorkEffortsReports(userId: string): Observable<WorkEffortsReport[]> {
    return this.http.get<Page<WorkEffortsReport>>(`${this.searchUrl}/by-owner-user-id`, {
      params: new HttpParams().set('userId', userId)
    }).pipe(
      map(result => result.content)
    );
  }

  getWorkEffortsReportById(workEffortReportId: string): Observable<WorkEffortsReport> {
    return this.http.get<WorkEffortsReport>(`${this.resourceUrl}/${workEffortReportId}`);
  }

  getWorkEffortById(workEffortReportId: string, workEffortId: string): Observable<WorkEffort> {
    return this.getWorkEffortsReportById(workEffortReportId).pipe(
      map(workEffortReport =>
        workEffortReport.workEfforts.find(workEffort => workEffort.id === workEffortId))
    );
  }

  deleteWorkEffort(workEffortsReportId: string, workEffortId: string): Observable<null> {
    return this.http.delete<null>(`${this.resourceUrl}/${workEffortsReportId}/work-efforts/${workEffortId}`);
  }

  saveWorkEffort(userId: string, workEffort: WorkEffort): Observable<WorkEffortsReport> {
    return this.http.post<WorkEffortsReport>(`${this.actionUrl}/add-work-effort`, workEffort, {
      params: new HttpParams().set('userId', userId)
    });
  }
}
