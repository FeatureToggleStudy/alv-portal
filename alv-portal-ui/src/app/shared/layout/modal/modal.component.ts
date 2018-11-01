import { Component, HostListener, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';

/**
 * Component to create custom modals after the styleguide
 * @example see local-login.component.html
 */
@Component({
  selector: 'alv-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  /**
   * Title of the modal
   */
  @Input() title: string;

  /**
   * (optional) Subtitle of the modal
   */
  @Input() subtitle?: string;

  /**
   * (optional) Label of the primary button
   */
  @Input() primaryLabel?: string;

  /**
   * Action to execute on primary button click. Use the closeModal() method to close the modal.
   */
  @Input() primaryAction: (closeModal: (result?) => void) => void;


  /**
   * (optional) Label of the secondary button
   */
  @Input() secondaryLabel?: string;

  /**
   * Action to execute on secondary button click. Use the dismissModal() method to dismiss the modal.
   */
  @Input() secondaryAction?: (dismissModal: (reason?) => void) => void;

  /**
   * If the custom modal contains a form, just set the formGroup to wrap the whole modal
   * content in a form element to enable the form submit behaviour for the primary button.
   */
  @Input() formGroup?: FormGroup;

  constructor(private activeModal: NgbActiveModal) { }

  handlePrimaryClick() {
    if (!this.formGroup) {
      this.primaryAction(this.closeModal.bind(this));
    }
  }

  handleSecondaryClick() {
    if (this.secondaryAction) {
      this.secondaryAction(this.dismissModal.bind(this));
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
