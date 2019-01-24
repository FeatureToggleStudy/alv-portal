import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BlacklistedAgent, BlacklistedAgentStatus } from './blacklist.types';

@Injectable({
  providedIn: 'root'
})
export class BlacklistRepository {

  private readonly BLACKLIST_API = '/api/blacklisted-agent/';

  constructor(private http: HttpClient) {
  }

  getAllBlacklistedAgents(): Observable<BlacklistedAgent[]> {
    return this.http.get<BlacklistedAgent[]>(`${this.BLACKLIST_API}`);
  }

  changeStatus(agent: BlacklistedAgent, status: BlacklistedAgentStatus): Observable<any> {
    return this.http.put<void>(`${this.BLACKLIST_API}${agent.id}/status`, JSON.stringify(status), {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })});
  }

  createBlacklistEntryForPav(organisationId: string) {
    const requestBody = {
      organizationId: organisationId
    }
    return this.http.post<void>(`${this.BLACKLIST_API}`, requestBody, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })});
  }

}
