import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'alv-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  title: string;

  content: string;

  contentParams = {};

  confirmLabel = 'portal.modal.confirm.yes';

  cancelLabel = 'portal.modal.confirm.no';

  constructor(public modal: NgbActiveModal) {
  }

}
