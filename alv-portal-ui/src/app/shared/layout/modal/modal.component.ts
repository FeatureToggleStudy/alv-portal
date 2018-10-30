import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'alv-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() title: string;

  @Input() subtitle?: string;

  @Input() primaryLabel: string;

  @Input() primaryAction: Observable<any>;

  @Input() secondaryLabel?: string;

  @Input() secondaryAction?: Observable<any>;

  @Input() formGroup?: FormGroup;

  constructor(private activeModal: NgbActiveModal) { }

  handlePrimaryClick(ignoreFormGroup?: boolean) {
    if (ignoreFormGroup || !this.formGroup) {
      this.primaryAction.subscribe(result => {
        if (result !== null && result !== undefined) {
          this.closeModal(result);
        }
      });
    }
  }

  handleSecondaryClick() {
    if (this.secondaryAction) {
      this.secondaryAction.subscribe(reason => {
        if (reason !== null && reason !== undefined) {
          this.dismissModal(reason);
        }
      });
    } else {
      this.dismissModal('cancel');
    }
  }

  closeModal(result?: any) {
    this.activeModal.close(result);
  }

  dismissModal(reason?: any) {
    this.activeModal.dismiss(reason);
  }

}
