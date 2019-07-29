import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  ApplicationDocument,
  CreateApplicationDocument,
} from './application-documents.types';

@Injectable({ providedIn: 'root' })
export class ApplicationDocumentsRepository {

  private readonly resourceUrl = '/onlineform-service/api/bu';

  private readonly searchUrl = `${this.resourceUrl}/_search`;

  private readonly uploadUrl = `${this.resourceUrl}/`;

  constructor(private http: HttpClient) {
  }

  findByOwnerUserId(userId: string, page: number): Observable<ApplicationDocument[]> {
    return this.http.get<ApplicationDocument[]>(`${this.searchUrl}/by-owner-user-id`, {
      params: new HttpParams()
        .set('userId', userId)
        .set('page', page.toString())
    });
  }

  getApplicationDocumentById(id: string): Observable<ApplicationDocument> {
    return this.http.get<ApplicationDocument>(`${this.resourceUrl}/${id}`);
  }

  deleteApplicationDocument(id: string): Observable<null> {
    return this.http.delete<null>(`${this.resourceUrl}/${id}`);
  }

  uploadApplicationDocument(createApplicationDocument: CreateApplicationDocument, file: File): Observable<HttpEvent<ApplicationDocument>> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('data', new Blob([JSON.stringify(createApplicationDocument)], { type: 'application/json' }));
    return this.http.post<ApplicationDocument>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  downloadDocument(id: string): Observable<Blob> {
    return this.http.get(`${this.resourceUrl}/${id}/document`, {
      responseType: 'blob'
    });
  }

}
