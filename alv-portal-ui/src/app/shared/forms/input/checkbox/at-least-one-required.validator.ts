import { FormGroup, ValidatorFn } from '@angular/forms';

export function atLeastOneRequiredValidator(checkboxFields: string[]): ValidatorFn {
  return (form: FormGroup) => {
    if (form) {
      const checkedCheckboxes = checkboxFields
        .map((checkboxField) => form.get(checkboxField) && form.get(checkboxField).value)
        .filter((value) => !!value);

      return checkedCheckboxes.length === 0 ? {atLeastOneRequired: true} : null;
    }
    return null;
  };
}
