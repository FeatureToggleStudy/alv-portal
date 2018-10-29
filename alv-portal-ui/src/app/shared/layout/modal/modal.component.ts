import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'alv-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() title: string;

  @Input() subtitle?: string;

  @Input() primaryLabel: string;

  @Input() primaryAction: (closeModal: (result) => void) => void;

  @Input() secondaryLabel?: string;

  @Input() secondaryAction?: (dismissModal: (reason) => void) => void;

  @Input() backAction?: () => void;

  @Input() formGroup?: FormGroup;

  constructor(private activeModal: NgbActiveModal) { }

  handlePrimaryClick() {
    if (!this.formGroup) {
      this.primaryAction(this.closeModal.bind(this));
    }
  }

  handleSecondaryClick() {
    this.secondaryAction ? this.secondaryAction(this.closeModal.bind(this)) : this.activeModal.dismiss('cancel');
  }

  closeModal(result: any) {
    this.activeModal.close(result);
  }

  dismissModal(reason: any) {
    this.activeModal.dismiss(reason);
  }

}
