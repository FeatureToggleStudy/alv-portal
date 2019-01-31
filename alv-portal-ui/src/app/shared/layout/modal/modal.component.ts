import { Component, EventEmitter, Input, Output } from '@angular/core';
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
   * (optional) attribute to set visibility of primary action, default true
   */
  @Input() primaryAllow = true;

  /**
   * Emitted event on primary button click.
   */
  @Output() primaryAction = new EventEmitter<void>();

  /**
   * (optional) Label of the secondary button
   */
  @Input() secondaryLabel?: string;

  /**
   * Emitted event on secondary button click.
   */
  @Output() secondaryAction = new EventEmitter<void>();

  /**
   * If the custom modal contains a form, just set the formGroup to wrap the whole modal
   * content in a form element to enable the form submit behaviour for the primary button.
   */
  @Input() formGroup?: FormGroup;

  constructor() {
  }

  handlePrimaryClick() {
    if (!this.formGroup) {
      this.handleSubmitClick();
    }
  }

  handleSubmitClick() {
    this.primaryAction.emit();
  }

  handleSecondaryClick() {
    this.secondaryAction.emit();
  }

}
