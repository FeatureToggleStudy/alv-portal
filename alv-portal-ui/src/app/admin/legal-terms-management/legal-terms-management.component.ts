import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LegalTerms } from '../../shared/backend-services/legal-terms-management/legal-terms-management.types';
import { LegalTermsManagementRepository } from '../../shared/backend-services/legal-terms-management/legal-terms-management-repository';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { LegalTermsDetailModalComponent } from './legal-terms-detail-modal/legal-terms-detail-modal.component';
import { NotificationsService } from '../../core/notifications.service';
import { CONFIRM_DELETE_MODAL, LEGAL_ACTIONS, MESSAGE } from './legal-terms-management.types';

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
    modalRef.componentInstance.legalTerm = null;
    modalRef.componentInstance.readonly = false;
    modalRef.result.then(() => this.refresh(), () => this.error());
  }

  onUpdate(legalTerm: LegalTerms) {
    const modalRef = this.modalService.openLarge(LegalTermsDetailModalComponent);
    modalRef.componentInstance.actionTyp = LEGAL_ACTIONS.EDIT;
    modalRef.componentInstance.legalTerm = legalTerm;
    modalRef.componentInstance.readonly = false;
    modalRef.result.then(() => this.refresh(), () => this.error());
  }

  onView(legalTerm: LegalTerms) {
    const modalRef = this.modalService.openLarge(LegalTermsDetailModalComponent);
    modalRef.componentInstance.actionTyp = LEGAL_ACTIONS.VIEW;
    modalRef.componentInstance.legalTerm = legalTerm;
    modalRef.componentInstance.readonly = true;
    modalRef.result.then(() => {}, () => {});
  }

  onDelete(legalTerm: LegalTerms) {
    this.modalService.openConfirm(CONFIRM_DELETE_MODAL).result.then(
      () =>
        this.legalTermsManagementRepository.deleteLegalTermsEntry(legalTerm.id)
          .subscribe(() => this.refresh(), () => this.error()),
      () => {});
  }

  refresh() {
    this.notificationService.success(MESSAGE.success);
    this.loadAll();
  }

  error() {
    this.notificationService.error(MESSAGE.failure);
  }

  loadAll() {
    this.legalTermsEntries$ = this.legalTermsManagementRepository.getAllLegalTermsEntries();
  }

}
