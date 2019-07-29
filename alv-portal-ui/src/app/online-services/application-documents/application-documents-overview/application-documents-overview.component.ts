import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IconKey } from '../../../shared/icons/custom-icon/custom-icon.component';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { filter, flatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ModalService } from '../../../shared/layout/modal/modal.service';

import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import {
  Notification,
  NotificationType
} from '../../../shared/layout/notifications/notification.model';
import { I18nService } from '../../../core/i18n.service';
import { Languages } from '../../../core/languages.constants';
import { ApplicationDocumentsRepository } from '../../../shared/backend-services/application-documents/application-documents.repository';
import { ApplicationDocumentModalComponent } from './application-document-modal/application-document-modal.component';
import { NotificationsService } from '../../../core/notifications.service';
import {
  ApplicationDocument,
  ApplicationDocumentType
} from '../../../shared/backend-services/application-documents/application-documents.types';
import {
  ApplicationDocumentSortType,
  ApplicationDocumentsSortingService
} from './application-documents-sorting.service';

@Component({
  selector: 'alv-application-documents-overview',
  templateUrl: './application-documents-overview.component.html',
  styleUrls: ['./application-documents-overview.component.scss']
})
export class ApplicationDocumentsOverviewComponent extends AbstractSubscriber implements OnInit {

  englishNotSupportedNotification: Notification = {
    type: NotificationType.ERROR,
    messageKey: 'portal.online-forms.notification.no-english',
    isSticky: true
  };
  uploadInstructionNotification: Notification = {
    type: NotificationType.INFO,
    isSticky: true
  };

  IconKey = IconKey;

  applicationDocuments: ApplicationDocument[] = [];

  isEnglishLanguageSelected$: Observable<boolean>;

  showUploadInstruction = true;

  selectedSortType = ApplicationDocumentSortType.BY_DATE;

  private readonly MAX_DOCUMENTS_PER_TYPE = 3;

  private page = 0;

  constructor(private fb: FormBuilder,
              private modalService: ModalService,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService,
              private notificationsService: NotificationsService,
              private applicationDocumentsSortingService: ApplicationDocumentsSortingService,
              private applicationDocumentsRepository: ApplicationDocumentsRepository) {
    super();
  }

  ngOnInit() {
    this.isEnglishLanguageSelected$ = this.i18nService.currentLanguage$.pipe(
      map(language => language === Languages.EN)
    );

    this.onScroll();
  }

  onScroll() {
    this.authenticationService.getCurrentUser().pipe(
      filter(user => !!user),
      flatMap(user => this.applicationDocumentsRepository.findByOwnerUserId(user.id, this.page++)),
    ).subscribe(applicationDocuments => {
      this.applicationDocuments = this.applicationDocumentsSortingService.sort(
        [...(this.applicationDocuments || []), ...applicationDocuments],
        this.selectedSortType);
    });
  }

  reloadApplicationDocument(applicationDocument: ApplicationDocument) {
    this.applicationDocumentsRepository.getApplicationDocumentById(applicationDocument.id)
      .subscribe(reloadedApplicationDocument => {
        const indexToUpdate = this.applicationDocuments.findIndex(model => model.id === reloadedApplicationDocument.id);
        this.applicationDocuments[indexToUpdate] = reloadedApplicationDocument;
      });
  }

  openModal(applicationDocument?: ApplicationDocument) {
    const modalRef = this.modalService.openMedium(ApplicationDocumentModalComponent);
    modalRef.componentInstance.applicationDocument = applicationDocument;
    modalRef.componentInstance.invalidatedDocumentTypes = this.getInvalidatedDocumentTypes(applicationDocument ? applicationDocument.documentType : null);
    modalRef.result
      .then(result => {
        this.notificationsService.success('portal.application-documents.success-notification.submitted');
        this.page = 0;
        this.onScroll();
      })
      .catch(err => {
      });
  }

  dismissUploadInstruction() {
    this.showUploadInstruction = false;
  }

  applySortByDate() {
    this.applicationDocuments = this.applicationDocumentsSortingService.sortByDate(this.applicationDocuments);
  }

  applySortByDocumentType() {
    this.applicationDocuments = this.applicationDocumentsSortingService.sortByDocumentType(this.applicationDocuments);
  }

  applySortByFilename() {
    this.applicationDocuments = this.applicationDocumentsSortingService.sortByFilename(this.applicationDocuments);
  }

  private getInvalidatedDocumentTypes(excludedDocumentType: ApplicationDocumentType): ApplicationDocumentType[] {
    return Object.values(ApplicationDocumentType).filter(
      documentType => this.applicationDocuments.filter(
        doc => doc.documentType === documentType).length >= this.MAX_DOCUMENTS_PER_TYPE &&
        documentType !== excludedDocumentType);
  }
}
