import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalConfig } from '../../shared/layout/confirm-modal/confirm-modal-config.model';
import { ConfirmModalComponent } from '../../shared/layout/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) {
  }

  openSmall(content: any): NgbModalRef {
    return this.modalService.open(content, { size: 'sm' });
  }

  openMedium(content: any): NgbModalRef {
    return this.modalService.open(content);
  }

  openBig(content: any): NgbModalRef {
    return this.modalService.open(content, { size: 'lg' });
  }

  openConfirm(config: ConfirmModalConfig): NgbModalRef {

    const modalRef = this.modalService.open(ConfirmModalComponent, { backdrop: 'static' });
    modalRef.componentInstance.title = config.title;
    modalRef.componentInstance.textHtml = config.textHtml;
    modalRef.componentInstance.confirmLabel = config.confirmLabel;
    modalRef.componentInstance.confirmAction = config.confirmAction;
    modalRef.componentInstance.cancelLabel = config.cancelLabel;
    modalRef.componentInstance.cancelAction = config.cancelAction;

    return modalRef;
  }
}
