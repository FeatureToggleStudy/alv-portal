import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Directive({
  selector: '[alvFormSubmitValidation]'
})
export class FormSubmitValidationDirective {

  @HostBinding('attr.autocomplete') readonly autocompleteAttr = 'off';

  @HostBinding('attr.novalidate') readonly novalidateAttr = true;

  @Input() public formGroup: FormGroup;

  @Input() public preSubmit?: () => void;

  @Output() public validSubmit = new EventEmitter<any>();

  private readonly INVALID_INPUT_SELECTOR = '.invalid input, input.ng-invalid, select.ng-invalid, textarea.ng-invalid';

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('submit')
  public onSubmit() {
    this.markAsTouchedAndDirty(this.formGroup);

    if (this.preSubmit) {
      this.preSubmit();
    }

    if (this.formGroup.valid) {
      this.validSubmit.emit(this.formGroup.value);
    } else {
      setTimeout(() => {
        const firstInvalidElement = this.elementRef.nativeElement.querySelector(this.INVALID_INPUT_SELECTOR);
        if (firstInvalidElement) {
          firstInvalidElement.focus();
        }
      });
    }
    // TODO think about the async validators (this.formGroup.pending) that might take some time to complete
  }

  private markAsTouchedAndDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls)
      .forEach((key) => {
        const control = formGroup.controls[key];
        if (control instanceof FormGroup) {
          this.markAsTouchedAndDirty(control as FormGroup);
        } else if (control.enabled) {
          control.markAsDirty();
          control.markAsTouched();
          control.updateValueAndValidity();
        }
      });
  }

}
