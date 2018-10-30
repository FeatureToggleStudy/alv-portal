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

  openSmall(content: any, escapable?: boolean): NgbModalRef {
    return this.open(content, 'sm', escapable);
  }

  openMedium(content: any, escapable?: boolean): NgbModalRef {
    return this.open(content, null, escapable);
  }

  openBig(content: any, escapable?: boolean): NgbModalRef {
    return this.open(content, 'lg', escapable);
  }

  openConfirm(config: ConfirmModalConfig): NgbModalRef {

    const modalRef = this.open(ConfirmModalComponent, null, false);
    modalRef.componentInstance.title = config.title;
    modalRef.componentInstance.textHtml = config.textHtml;
    modalRef.componentInstance.confirmLabel = config.confirmLabel;
    modalRef.componentInstance.confirmAction = config.confirmAction;
    modalRef.componentInstance.cancelLabel = config.cancelLabel;
    modalRef.componentInstance.cancelAction = config.cancelAction;

    return modalRef;
  }

  private open(content: any, size?: 'sm' | 'lg', escapable?: boolean): NgbModalRef {
    return this.modalService.open(content, {size: size, backdrop: escapable ? null : 'static'});
  }
}
