import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Address } from '../../../forms/forms.model';

export class AddressFormGroup {
  street: AbstractControl;
  number: AbstractControl;
  city: AbstractControl;
  zip: AbstractControl;
  country: AbstractControl;

  constructor(private fb: FormBuilder,
              private address?: Address) {
    this.street = fb.control(address ? address.street : '', Validators.required);
    this.number = fb.control(address ? address.number : '', Validators.required);
    this.city = fb.control(address ? address.city : '', Validators.required);
    this.zip = fb.control(address ? address.zip : '', Validators.required);
    this.country = fb.control(address ? address.country : '', Validators.required);
  }
}
