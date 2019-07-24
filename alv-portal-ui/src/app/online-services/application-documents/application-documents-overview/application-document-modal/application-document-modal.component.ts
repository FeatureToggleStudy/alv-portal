import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationType } from '../../../../shared/layout/notifications/notification.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { ApplicationDocumentsRepository } from '../../../../shared/backend-services/application-documents/application-documents.repository';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { flatMap, take } from 'rxjs/operators';
import { ApplicationDocumentModel } from '../application-document/application-document.model';
import { deleteApplicationDocumentModalConfig } from '../modal-config.types';
import { ModalService } from '../../../../shared/layout/modal/modal.service';
import { NotificationsService } from '../../../../core/notifications.service';
import { ApplicationDocumentType } from '../../../../shared/backend-services/application-documents/application-documents.types';
import { ValidationMessage } from '../../../../shared/forms/input/validation-messages/validation-message.model';

@Component({
  selector: 'alv-application-document-modal',
  templateUrl: './application-document-modal.component.html',
  styleUrls: ['./application-document-modal.component.scss']
})
export class ApplicationDocumentModalComponent implements OnInit {

  readonly ACCEPTED_FILE_TYPES = 'application/pdf';

  readonly MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  @Input() applicationDocumentModel: ApplicationDocumentModel;

  isEdit: boolean;

  modalTitle: string;

  secondaryLabel: string;

  notificationType = NotificationType;

  form: FormGroup;

  documentTypes$ = of(Object.keys(ApplicationDocumentType).map(documentType => {
      return {
        value: documentType,
        label: 'portal.application-documents.document-type.' + documentType
      };
    })
  );

  documentTypeValidationMessages: ValidationMessage[] = [
    {
      error: 'required',
      message: 'portal.application-documents.edit-create-modal.document-type.validation.required'
    },
    {
      error: 'maxFilesCount',
      message: 'portal.application-documents.edit-create-modal.document-type.validation.maxFilesCount'
    }
  ];

  fileValidationMessages: ValidationMessage[] = [
    {
      error: 'required',
      message: 'portal.application-documents.edit-create-modal.file.validation.required'
    },
    {
      error: 'maxFilesCount',
      message: 'portal.application-documents.edit-create-modal.file.validation.maxFilesCount'
    },
    {
      error: 'invalidFileType',
      message: 'portal.application-documents.edit-create-modal.file.validation.invalidFileType'
    }
  ];

  constructor(private activeModal: NgbActiveModal,
              private authenticationService: AuthenticationService,
              private applicationDocumentsRepository: ApplicationDocumentsRepository,
              private notificationsService: NotificationsService,
              private modalService: ModalService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.isEdit = !!this.applicationDocumentModel;

    this.form = this.fb.group({
      documentType: ['', Validators.required],
      file: ['', [Validators.required]]
    });

    this.modalTitle = 'portal.application-documents.edit-create-modal.' + (this.isEdit ? 'edit-title' : 'create-title');

    this.secondaryLabel = this.isEdit ? 'entity.action.delete' : null;
  }

  submit() {
    this.authenticationService.getCurrentUser()
      .pipe(
        take(1),
        flatMap(user => this.applicationDocumentsRepository.uploadApplicationDocument({
          documentType: this.form.value.documentType,
          ownerUserId: user.id
        }, this.form.value.file))
      ).subscribe(result => {
      this.activeModal.close();
    });
  }

  delete() {
    this.modalService.openConfirm(
      deleteApplicationDocumentModalConfig
    ).result
      .then(result => {
        this.applicationDocumentsRepository.deleteApplicationDocument(this.applicationDocumentModel.id)
          .subscribe(() => {
            this.notificationsService.success('portal.application-documents.notification.deleted');
            this.activeModal.close();
          });
      })
      .catch(() => {
      });
  }

  cancel() {
    this.activeModal.dismiss();
  }

}


