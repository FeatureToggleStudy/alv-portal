import { Component } from '@angular/core';

@Component({
  selector: 'alv-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  title: string;

  textHtml: string;

  confirmLabel: string;

  confirmAction: (closeModal: (result) => void) => void;

  cancelLabel: string;

  cancelAction?: (dismissModal: (reason) => void) => void;

  constructor() {
  }

}
