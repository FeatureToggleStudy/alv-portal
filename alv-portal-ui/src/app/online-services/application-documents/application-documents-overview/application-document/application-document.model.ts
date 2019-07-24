/**
 * A "view-model" for the Work-Effort Component that has all of our business logic in it to
 * avoid duplication and calculations in functions. Delegate pattern.
 */
import { ApplicationDocument } from '../../../../shared/backend-services/application-documents/application-documents.types';


export class ApplicationDocumentModel {

  id: string;

  constructor(private applicationDocument: ApplicationDocument) {

    this.id = this.applicationDocument.id;

  }

}

