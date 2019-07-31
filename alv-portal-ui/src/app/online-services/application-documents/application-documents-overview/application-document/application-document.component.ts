import { Component, Input, OnInit } from '@angular/core';
import { ApplicationDocumentsRepository } from '../../../../shared/backend-services/application-documents/application-documents.repository';
import { ApplicationDocument } from '../../../../shared/backend-services/application-documents/application-documents.types';
import { FileSaverService } from '../../../../shared/file-saver/file-saver.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'alv-application-document',
  templateUrl: './application-document.component.html',
  styleUrls: ['./application-document.component.scss']
})
export class ApplicationDocumentComponent implements OnInit {

  @Input() applicationDocument: ApplicationDocument;

  downloadDocument$: Observable<Blob>;

  constructor(private applicationDocumentsRepository: ApplicationDocumentsRepository,
              private fileSaverService: FileSaverService) {
  }

  ngOnInit() {
    this.downloadDocument$ =  this.applicationDocumentsRepository.downloadDocument(this.applicationDocument.id);
  }

}
