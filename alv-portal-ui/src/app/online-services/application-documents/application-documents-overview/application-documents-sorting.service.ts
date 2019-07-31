import { Injectable } from '@angular/core';
import { ApplicationDocument } from '../../../shared/backend-services/application-documents/application-documents.types';

@Injectable({
  providedIn: 'root'
})
export class ApplicationDocumentsSortingService {

  private readonly DOCUMENT_TYPE_SORT_ORDER = {
    LETTER_OF_APPLICATION: 1,
    CV: 2,
    TESTIMONIAL: 3,
    CERTIFICATES: 4
  };

  constructor() { }

  sortByDate(applicationDocuments: ApplicationDocument[]): ApplicationDocument[] {
    return applicationDocuments.sort(this.dateComparator);
  }

  sortByDocumentType(applicationDocuments: ApplicationDocument[]): ApplicationDocument[] {
    return applicationDocuments.sort((a, b) => {
      if (a.documentType === b.documentType) {
        return this.dateComparator(a, b);
      }
      return this.DOCUMENT_TYPE_SORT_ORDER[a.documentType] - this.DOCUMENT_TYPE_SORT_ORDER[b.documentType];
    });
  }

  sortByFilename(applicationDocuments: ApplicationDocument[]): ApplicationDocument[] {
    return applicationDocuments.sort((a, b) => {
      return a.documentMetadata.fileName.localeCompare(b.documentMetadata.fileName);
    });
  }

  sort(applicationDocuments: ApplicationDocument[], sortType: ApplicationDocumentSortType) {
    switch (sortType) {
      case ApplicationDocumentSortType.BY_DATE:
        return this.sortByDate(applicationDocuments);
      case ApplicationDocumentSortType.BY_DOCUMENT_TYPE:
        return this.sortByDocumentType(applicationDocuments);
      case ApplicationDocumentSortType.BY_FILENAME:
        return this.sortByFilename(applicationDocuments);
    }
  }

  private dateComparator(a: ApplicationDocument, b: ApplicationDocument): number {
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  }
}

export enum ApplicationDocumentSortType {
  BY_DATE = 'BY_DATE',
  BY_DOCUMENT_TYPE = 'BY_DOCUMENT_TYPE',
  BY_FILENAME = 'BY_FILENAME'
}
