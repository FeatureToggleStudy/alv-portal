import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() modalTitle: string;

  /**
   * (optional) Subtitle of the modal
   */
  @Input() subtitle?: string;

  /**
   * (optional) Label of the primary button
   */
  @Input() primaryLabel?: string;

  /**
   * Emitted event on primary button click. Use the closeModal() method to close the modal.
   */
  @Output() primaryAction = new EventEmitter<(result?) => void>();

  /**
   * (optional) Label of the secondary button
   */
  @Input() secondaryLabel?: string;

  /**
   * Emitted event on secondary button click. Use the dismissModal() method to dismiss the modal.
   */
  @Output() secondaryAction = new EventEmitter<(reason?) => void>();

  /**
   * If the custom modal contains a form, just set the formGroup to wrap the whole modal
   * content in a form element to enable the form submit behaviour for the primary button.
   */
  @Input() formGroup?: FormGroup;

  constructor(private activeModal: NgbActiveModal) {
  }

  handlePrimaryClick() {
    if (!this.formGroup) {
      this.handleSubmitClick();
    }
  }

  handleSubmitClick() {
    this.primaryAction.emit(this.closeModal.bind(this));
  }

  handleSecondaryClick() {
    this.secondaryAction.emit(this.dismissModal.bind(this));
  }

  closeModal(result?: any) {
    this.activeModal.close(result);
  }

  dismissModal(reason?: any) {
    this.activeModal.dismiss(reason);
  }

}
