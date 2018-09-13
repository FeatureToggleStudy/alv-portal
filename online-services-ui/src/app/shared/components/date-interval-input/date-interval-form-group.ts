import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Period } from '../../../online-forms/forms/forms.model';

export class DateIntervalFormGroup {
  from: AbstractControl;
  to: AbstractControl;

  constructor(fb: FormBuilder,
              period?: Period) {
    this.from = fb.control(period ? period.from : '', Validators.required);
    this.to = fb.control(period ? period.to : '', Validators.required);
  }

}
