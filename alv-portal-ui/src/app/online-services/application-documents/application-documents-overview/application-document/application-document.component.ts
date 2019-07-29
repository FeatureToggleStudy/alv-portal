import { Component, Input } from '@angular/core';
import { ApplicationDocumentsRepository } from '../../../../shared/backend-services/application-documents/application-documents.repository';
import { ApplicationDocument } from '../../../../shared/backend-services/application-documents/application-documents.types';
import { FileSaverService } from '../../../../shared/file-saver/file-saver.service';

@Component({
  selector: 'alv-application-document',
  templateUrl: './application-document.component.html',
  styleUrls: ['./application-document.component.scss']
})
export class ApplicationDocumentComponent {

  @Input() applicationDocument: ApplicationDocument;

  constructor(private applicationDocumentsRepository: ApplicationDocumentsRepository,
              private fileSaverService: FileSaverService) {
  }

  downloadDocument(event: Event) {
    event.stopPropagation();
    this.applicationDocumentsRepository.downloadDocument(this.applicationDocument.id)
      .subscribe(blob => {
        this.fileSaverService.saveFile(blob, this.applicationDocument.documentMetadata.fileName);
      });
  }


}
