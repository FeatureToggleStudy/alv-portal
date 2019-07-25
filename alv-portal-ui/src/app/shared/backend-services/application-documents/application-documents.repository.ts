import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import {
  ApplicationDocument,
  ApplicationDocumentType,
  CreateApplicationDocument,
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
    return of(mockApplicationDocuments);
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

  uploadApplicationDocument(document: CreateApplicationDocument, file: File): Observable<HttpEvent<ApplicationDocument>> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('data', `${JSON.stringify(document)};application/json`);
    return this.http.post<ApplicationDocument>(`${this.actionUrl}/add-application-document`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  downloadDocument(documentId: string): Observable<Blob> {
    return this.http.get(this.resourceUrl + '/' + documentId + '/document', {
      responseType: 'blob'
    });
  }
}

export const mockApplicationDocuments: ApplicationDocument[] = [
  {
    id: 'some-id-1',
    documentType: ApplicationDocumentType.CERTIFICATES,
    ownerUserId: 'owner-user-id',
    createdAt: '2019-07-24T09:34:23',
    documentMetadata: {
      fileName: 'my_certificates.pdf',
      contentLength: 1234344,
      documentId: 'document-id-1',
      mimeType: 'application/pdf'
    }
  },
  {
    id: 'some-id-2',
    documentType: ApplicationDocumentType.CV,
    ownerUserId: 'owner-user-id',
    createdAt: '2019-07-21T11:22:33',
    documentMetadata: {
      fileName: 'my_cv.pdf',
      contentLength: 1534344,
      documentId: 'document-id-1',
      mimeType: 'application/pdf'
    }
  },
  {
    id: 'some-id-3',
    documentType: ApplicationDocumentType.LETTER_OF_APPLICATION,
    ownerUserId: 'owner-user-id',
    createdAt: '2019-07-23T23:24:23',
    documentMetadata: {
      fileName: 'my_application_letter.pdf',
      contentLength: 1274344,
      documentId: 'document-id-1',
      mimeType: 'application/pdf'
    }
  },
  {
    id: 'some-id-4',
    documentType: ApplicationDocumentType.TESTIMONIAL,
    ownerUserId: 'owner-user-id',
    createdAt: '2019-07-14T12:39:23',
    documentMetadata: {
      fileName: 'my_testimonial_with_very_long_file_name.pdf',
      contentLength: 123344,
      documentId: 'document-id-1',
      mimeType: 'application/pdf'
    }
  }

];
