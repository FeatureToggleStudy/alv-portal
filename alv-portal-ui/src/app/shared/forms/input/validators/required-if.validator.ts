import { ValidatorFn, Validators } from '@angular/forms';
import { BooleanFn, conditionalValidator } from './conditional.validator';

export function requiredIfValidator(predicate: BooleanFn,
                                    errorNamespace?: string): ValidatorFn {
  return conditionalValidator(predicate, Validators.required, errorNamespace);
}
