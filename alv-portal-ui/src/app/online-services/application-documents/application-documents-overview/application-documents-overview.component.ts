import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconKey } from '../../../shared/icons/custom-icon/custom-icon.component';
import { ProofOfWorkEfforts } from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';
import { ProofOfWorkEffortsRepository } from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.repository';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { debounceTime, filter, flatMap, map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ModalService } from '../../../shared/layout/modal/modal.service';

import { AbstractSubscriber } from '../../../core/abstract-subscriber';
import { FilterBadge } from '../../../shared/layout/inline-badges/inline-badge.types';
import {
  Notification,
  NotificationType
} from '../../../shared/layout/notifications/notification.model';
import { I18nService } from '../../../core/i18n.service';
import { Languages } from '../../../core/languages.constants';

@Component({
  selector: 'alv-work-efforts-overview',
  templateUrl: './application-documents-overview.component.html',
  styleUrls: ['./application-documents-overview.component.scss']
})
export class ApplicationDocumentsOverviewComponent extends AbstractSubscriber implements OnInit {

  englishNotSupportedNotification = {
    type: NotificationType.ERROR,
    messageKey: 'portal.work-efforts.proof-of-work-efforts.notification.no-english',
    isSticky: true
  } as Notification;

  IconKey = IconKey;

  proofOfWorkEffortsModels: ProofOfWorkEffortsModel[];

  isEnglishLanguageSelected$: Observable<boolean>;

  private page = 0;

  constructor(private fb: FormBuilder,
              private modalService: ModalService,
              private authenticationService: AuthenticationService,
              private i18nService: I18nService,
              private proofOfWorkEffortsRepository: ProofOfWorkEffortsRepository) {
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
      flatMap(user => this.proofOfWorkEffortsRepository.findByOwnerUserId(user.id, this.page++)),
      map(proofOfWorkEffortsList => proofOfWorkEffortsList.map(proofOfWorkEfforts => new ProofOfWorkEffortsModel(proofOfWorkEfforts)))
    ).subscribe(proofOfWorkEffortsModels => {
      this.proofOfWorkEffortsModels = [...(this.proofOfWorkEffortsModels || []), ...proofOfWorkEffortsModels];
    });
  }

  reloadApplicationDocuments(proofOfWorkEffortsModel: ProofOfWorkEffortsModel) {
    this.proofOfWorkEffortsRepository.getProofOfWorkEffortsById(proofOfWorkEffortsModel.id)
      .subscribe(reloadedProofOfWorkEfforts => {
        const indexToUpdate = this.proofOfWorkEffortsModels.findIndex(model => model.id === reloadedProofOfWorkEfforts.id);
        this.proofOfWorkEffortsModels[indexToUpdate] = new ProofOfWorkEffortsModel(reloadedProofOfWorkEfforts);
      });
  }

}
