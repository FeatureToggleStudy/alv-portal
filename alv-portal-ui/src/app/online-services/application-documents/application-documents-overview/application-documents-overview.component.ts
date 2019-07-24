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
import { ApplicationDocumentModel } from './application-document/application-document.model';

@Component({
  selector: 'alv-work-efforts-overview',
  templateUrl: './application-documents-overview.component.html',
  styleUrls: ['./application-documents-overview.component.scss']
})
export class ApplicationDocumentsOverviewComponent extends AbstractSubscriber implements OnInit {

  englishNotSupportedNotification: Notification = {
    type: NotificationType.ERROR,
    messageKey: 'portal.work-efforts.proof-of-work-efforts.notification.no-english',
    isSticky: true
  };

  uploadInstructionNotification: Notification = {
    type: NotificationType.INFO,
    isSticky: true
  };

  IconKey = IconKey;

  applicationDocumentModels: ApplicationDocumentModel[];

  isEnglishLanguageSelected$: Observable<boolean>;

  showUploadInstruction = true;

  private page = 0;

  constructor(private fb: FormBuilder,
              private modalService: ModalService,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService,
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
      map(applicationDocuments => applicationDocuments.map(applicationDocument => new ApplicationDocumentModel(applicationDocument)))
    ).subscribe(applicationDocumentModels => {
      this.applicationDocumentModels = [...(this.applicationDocumentModels || []), ...applicationDocumentModels];
    });
  }

  reloadApplicationDocument(applicationDocumentModel: ApplicationDocumentModel) {
    this.applicationDocumentsRepository.getApplicationDocumentById(applicationDocumentModel.id)
      .subscribe(reloadedApplicationDocument => {
        const indexToUpdate = this.applicationDocumentModels.findIndex(model => model.id === reloadedApplicationDocument.id);
        this.applicationDocumentModels[indexToUpdate] = new ApplicationDocumentModel(reloadedApplicationDocument);
      });
  }

  dismissUploadInstruction() {
    this.showUploadInstruction = false;
  }
}
