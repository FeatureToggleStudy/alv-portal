import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationType } from '../../../../shared/layout/notifications/notification.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { ApplicationDocumentsRepository } from '../../../../shared/backend-services/application-documents/application-documents.repository';
import { AuthenticationService } from '../../../../core/auth/authentication.service';
import { flatMap, take } from 'rxjs/operators';

@Component({
  selector: 'alv-application-document-modal',
  templateUrl: './application-document-modal.component.html',
  styleUrls: ['./application-document-modal.component.scss']
})
export class ApplicationDocumentModalComponent implements OnInit {

  readonly ACCEPTED_FILE_TYPES = '.pdf';

  readonly MAX_FILE_SIZE = 5 * 1024 * 1024;

  notificationType = NotificationType;

  form: FormGroup;

  documentTypes$ = of(Object.keys(DocumentType).map(documentType => {
      return {
        value: documentType,
        label: 'global.document-type.' + documentType
      };
    })
  );

  constructor(private activeModal: NgbActiveModal,
              private authenticationService: AuthenticationService,
              private applicationDocumentsRepository: ApplicationDocumentsRepository,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      documentType: ['', Validators.required],
      file: ['', Validators.required]
    });
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

  cancel() {
    this.activeModal.dismiss();
  }

  updateFile(files: File[]) {
    this.form.get('file').setValue(files[0]);
  }
}


