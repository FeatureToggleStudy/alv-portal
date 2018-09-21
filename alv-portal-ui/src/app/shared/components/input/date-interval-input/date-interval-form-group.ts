import {
  AbstractControl,
  AbstractControlOptions,
  AsyncValidatorFn,
  FormGroup,
  ValidatorFn
} from '@angular/forms';

export type Validator = ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
export type AsyncValidator = AsyncValidatorFn | AsyncValidatorFn[] | null;

export type DateInterval = {
  from: AbstractControl;
  to: AbstractControl;
};

export class DateIntervalFormGroup extends FormGroup {

  constructor(controls: DateInterval, validatorOrOpts?: Validator, asyncValidator?: AsyncValidator) {
    super(controls, validatorOrOpts, asyncValidator);
  }

}
