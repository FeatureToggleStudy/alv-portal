import {
  Directive,
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

  @HostBinding('attr.autocomplete')
  readonly autocompleteAttr = "off";

  @HostBinding('attr.novalidate')
  readonly novalidateAttr = true;

  @Input()
  public formGroup: FormGroup;

  @Output()
  public validSubmit = new EventEmitter<any>();

  @HostListener('submit')
  public onSubmit() {
    this.markAsTouchedAndDirty(this.formGroup);
    if (this.formGroup.valid) {
      this.validSubmit.emit(this.formGroup.value);
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
