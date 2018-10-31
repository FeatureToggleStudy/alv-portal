import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

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
   * Action to execute on primary button click. If the Observable returns a value other than
   * null or undefined, the modal will be closed and this value is set as modal result.
   * Otherwise, the modal stays open.
   */
  @Input() primaryAction: Observable<any>;

  /**
   * (optional) Label of the secondary button
   */
  @Input() secondaryLabel?: string;

  /**
   * Action to execute on primary button click. If the Observable returns a value other than
   * null or undefined, the modal will be closed and this value is set as modal result.
   * Otherwise, the modal stays open.
   */
  @Input() secondaryAction?: Observable<any>;

  /**
   * If the custom modal contains a form, just set the formGroup to wrap the whole modal
   * content in a form element to enable the form submit behaviour for the primary button.
   */
  @Input() formGroup?: FormGroup;

  constructor(private activeModal: NgbActiveModal) { }

  handlePrimaryClick(isSubmit?: boolean) {
    if (isSubmit || !this.formGroup) {
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
