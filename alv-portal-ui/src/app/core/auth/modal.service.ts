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
    const component = modalRef.componentInstance;
    component.title = config.title;
    component.textHtml = config.textHtml;
    component.confirmLabel = config.confirmLabel || component.confirmLabel;
    component.confirmAction = config.confirmAction;
    component.cancelLabel = config.cancelLabel || component.cancelLabel;
    component.cancelAction = config.cancelAction || component.cancelAction;

    return modalRef;
  }

  private open(content: any, size?: 'sm' | 'lg', escapable?: boolean): NgbModalRef {
    return this.modalService.open(content,
        {
          size: size,
          backdrop: escapable ? null : 'static',
          keyboard: escapable
        });
  }
}
