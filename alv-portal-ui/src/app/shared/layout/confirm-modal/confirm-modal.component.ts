import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'alv-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  title: string;

  textHtml: string;

  confirmLabel = 'portal.modal.confirm.yes';

  confirmAction: (closeModal: (result?) => void) => void;

  cancelLabel = 'portal.modal.confirm.no';

  cancelAction?: (dismissModal: (reason?) => void) => void;

  constructor() {
  }

}
