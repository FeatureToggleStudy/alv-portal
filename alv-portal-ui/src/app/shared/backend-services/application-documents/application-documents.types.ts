
export interface ApplicationDocument {
  id?: string;
  documentType: ApplicationDocumentType;
  ownerUserId: string;
  createdAt: string;
  updatedAt: string;
  documentMetadata: DocumentMetadata;
}

export interface CreateApplicationDocument {
  documentType: ApplicationDocumentType;
  ownerUserId: string;
}

export interface DocumentMetadata {
  documentId: string;
  mimeType: string;
  fileName: string;
  contentLength: number;
}

export enum ApplicationDocumentType {
  LETTER_OF_APPLICATION = 'LETTER_OF_APPLICATION',
  CV = 'CV',
  TESTIMONIAL = 'TESTIMONIAL',
  CERTIFICATES = 'CERTIFICATES'
}

export enum ApplicationDocumentErrors {
  VIRUS_FOUND = 'http://www.job-room.ch/online-form-service/problem/upload-file-contains-virus',
  INVALID_MIME_TYPE = 'http://www.job-room.ch/online-form-service/problem/invalid-mime-type-exception'
}
