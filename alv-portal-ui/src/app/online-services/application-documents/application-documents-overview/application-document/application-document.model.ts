/**
 * A "view-model" for the Work-Effort Component that has all of our business logic in it to
 * avoid duplication and calculations in functions. Delegate pattern.
 */
import { ApplicationDocument } from '../../../../shared/backend-services/application-documents/application-documents.types';


export class ApplicationDocumentModel {

  id: string;

  documentTypeLabel: string;

  fileName: string;

  createdAt: string;

  constructor(private applicationDocument: ApplicationDocument) {

    this.id = applicationDocument.id;

    this.documentTypeLabel = 'portal.application-documents.document-type.' + applicationDocument.documentType;

    this.fileName = applicationDocument.documentMetadata.fileName;

    this.createdAt = applicationDocument.createdAt;
  }

}

