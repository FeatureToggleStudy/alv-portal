import { FormGroup, ValidatorFn } from '@angular/forms';

export function atLeastOneRequiredValidator(formFields: string[]): ValidatorFn {
  return (form: FormGroup) => {
    if (form) {
      const filledOutFields = formFields
        .map((field) => form.get(field) && form.get(field).value)
        .filter((value) => !!value);

      return filledOutFields.length === 0 ? { atLeastOneRequired: true } : null;
    }
    return null;
  };
}
