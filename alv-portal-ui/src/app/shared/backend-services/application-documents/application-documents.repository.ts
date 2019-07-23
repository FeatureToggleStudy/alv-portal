import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApplicationDocument, CreateApplicationDocument,
} from './application-documents.types';
import { map } from 'rxjs/operators';
import { Page } from '../shared.types';

@Injectable({ providedIn: 'root' })
export class ApplicationDocumentsRepository {

  private readonly resourceUrl = '/onlineform-service/api/bu';

  private readonly searchUrl = `${this.resourceUrl}/_search`;

  private readonly actionUrl = `${this.resourceUrl}/_action`;

  constructor(private http: HttpClient) {
  }

  findByOwnerUserId(userId: string, page: number): Observable<ApplicationDocument[]> {
    return this.http.get<Page<ApplicationDocument>>(`${this.searchUrl}/by-owner-user-id`, {
      params: new HttpParams()
        .set('userId', userId)
        .set('page', page.toString())
    }).pipe(
      map(result => result.content)
    );
  }

  getApplicationDocumentById(documentId: string): Observable<ApplicationDocument> {
    return this.http.get<ApplicationDocument>(`${this.resourceUrl}/${documentId}`);
  }

  deleteApplicationDocument(documentId: string): Observable<null> {
    return this.http.delete<null>(`${this.resourceUrl}/${documentId}`);
  }

  uploadApplicationDocument(document: CreateApplicationDocument, file: File): Observable<ApplicationDocument> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('data', `${JSON.stringify(document)};application/json`);
    return this.http.post<ApplicationDocument>(`${this.actionUrl}/add-work-effort`, formData);
  }

  downloadDocument(documentId: string): Observable<Blob> {
    return this.http.get(this.resourceUrl + '/' + documentId + '/document', { responseType: 'blob' });
  }
}
