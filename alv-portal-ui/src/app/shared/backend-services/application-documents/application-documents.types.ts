
export interface ApplicationDocument {
  id?: string;
  documentType: ApplicationDocumentType;
  ownerUserId: string;
  createdAt: string;
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
  CV = 'CV',
  LETTER_OF_APPLICATION = 'LETTER_OF_APPLICATION',
  TESTIMONIAL = 'TESTIMONIAL',
  CERTIFICATES = 'CERTIFICATES'
}
