import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LegalTerms } from '../../shared/backend-services/legal-terms-management/legal-terms-management.types';
import { LegalTermsManagementRepository } from '../../shared/backend-services/legal-terms-management/legal-terms-management-repository';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { LegalTermsDetailModalComponent } from './legal-terms-detail-modal/legal-terms-detail-modal.component';
import { NotificationsService } from '../../core/notifications.service';
import { ConfirmModalConfig } from '../../shared/layout/modal/confirm-modal/confirm-modal-config.model';

export enum LEGAL_ACTIONS {
  VIEW, EDIT, NEW, DELETE
}

export const CONFIRM_DELETE_MODAL: ConfirmModalConfig = {
  title: 'entity.delete.title',
  content: 'portal.admin.legal-terms-management.legal-terms-delete-dialog.question',
  confirmLabel: 'entity.action.delete',
  cancelLabel: 'entity.action.cancel'
};

export const MESSAGE = {
  success: 'portal.admin.legal-terms-management.notification.success',
  failure: 'portal.admin.legal-terms-management.notification.failure'
};

@Component({
  selector: 'alv-legal-terms-management',
  templateUrl: './legal-terms-management.component.html',
  styleUrls: ['./legal-terms-management.component.scss']
})
export class LegalTermsManagementComponent implements OnInit {

  legalTermsEntries$: Observable<LegalTerms[]>;

  constructor(private legalTermsManagementRepository: LegalTermsManagementRepository,
              private notificationService: NotificationsService,
              private modalService: ModalService) { }

  ngOnInit() {
    this.loadAll();
  }

  onAdd() {
    const modalRef = this.modalService.openLarge(LegalTermsDetailModalComponent);
    modalRef.componentInstance.actionTyp = LEGAL_ACTIONS.NEW;
    modalRef.result.then((legalTermEntry) => this.add(legalTermEntry));
  }

  add(legalTermEntry: LegalTerms) {
    return this.legalTermsManagementRepository.addLegalTermsEntry(legalTermEntry).subscribe(
      () => {
        this.notificationService.success(MESSAGE.success);
        this.loadAll();
      },
      () => {
        this.notificationService.success(MESSAGE.failure);
      });
  }

  onUpdate(legalTerm: LegalTerms) {
    const modalRef = this.modalService.openLarge(LegalTermsDetailModalComponent);
    modalRef.componentInstance.legalTerm = legalTerm;
    modalRef.componentInstance.actionTyp = LEGAL_ACTIONS.EDIT;
    modalRef.result.then((legalTermEntry) => this.update(legalTermEntry));
  }

  update(legalTermEntry: LegalTerms) {
    return this.legalTermsManagementRepository.updateLegalTermsEntry(legalTermEntry).subscribe(
      () => {
        this.notificationService.success(MESSAGE.success);
        this.loadAll();
      },
      () => {
        this.notificationService.success(MESSAGE.failure);
      });
  }

  onView(legalTerm: LegalTerms) {
    const modalRef = this.modalService.openLarge(LegalTermsDetailModalComponent);
    modalRef.componentInstance.legalTerm = legalTerm;
    modalRef.componentInstance.actionTyp = LEGAL_ACTIONS.VIEW;
    // modalRef.componentInstance.readonly = true;
    modalRef.result.then(() => {}, () => {});
  }

  onDelete(legalTerm: LegalTerms) {
    this.modalService.openConfirm(CONFIRM_DELETE_MODAL).result
      .then(() => this.delete(legalTerm.id));
  }

  delete(id: string) {
    return this.legalTermsManagementRepository.deleteLegalTermsEntry(id).subscribe(
      () => {
        this.notificationService.success(MESSAGE.success);
        this.loadAll();
      },
      () => {
        this.notificationService.success(MESSAGE.failure);
      });
  }

  loadAll() {
    this.legalTermsEntries$ = this.legalTermsManagementRepository.getAllLegalTermsEntries();
  }

}
