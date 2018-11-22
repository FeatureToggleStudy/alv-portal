import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { Company } from './company.model';
import { catchError } from 'rxjs/operators';
import { NotificationsService } from '../../core/notifications.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  readonly COMPANY_BY_UID_URL = 'api/getCompanyByUid';

  constructor(private http: HttpClient,
              private notificationsService: NotificationsService) {
  }

  getCompanyByUid(uid: number): Observable<Company> {
    return this.http.post<Company>(this.COMPANY_BY_UID_URL, uid).pipe(
        catchError(error => {
          this.notificationsService.error('registrationCompanyDialog.validation.error.notFound');
          return throwError(error);
        })
    );
  }

  // e.g. CHE-123.456.789 -> 123456789
  extractCompanyUid(uid: string): number {
    return parseInt(uid
        .replace(new RegExp('CHE\-', 'g'), '')
        .replace(new RegExp('\\.', 'g'), '')
        .replace(new RegExp('\-', 'g'), ''), 10);
  }
}
