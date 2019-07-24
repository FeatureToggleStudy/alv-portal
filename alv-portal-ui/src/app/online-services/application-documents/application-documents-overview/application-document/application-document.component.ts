import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../../../shared/layout/modal/modal.service';
import { NotificationsService } from '../../../../core/notifications.service';
import { ProofOfWorkEffortsRepository } from '../../../../shared/backend-services/work-efforts/proof-of-work-efforts.repository';
import { ApplicationDocumentModel } from './application-document.model';
import { deleteApplicationDocumentModalConfig } from '../modal-config.types';
import { ApplicationDocumentsRepository } from '../../../../shared/backend-services/application-documents/application-documents.repository';

@Component({
  selector: 'alv-application-document',
  templateUrl: './application-document.component.html',
  styleUrls: ['./application-document.component.scss']
})
export class ApplicationDocumentComponent {

  @Input() applicationDocumentModel: ApplicationDocumentModel;

  @Output() deleted = new EventEmitter<ApplicationDocumentModel>();

  constructor(private modalService: ModalService,
              private applicationDocumentsRepository: ApplicationDocumentsRepository,
              private notificationsService: NotificationsService) {
  }



}
