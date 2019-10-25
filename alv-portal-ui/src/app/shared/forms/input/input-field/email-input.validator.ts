import { AbstractControl, ValidatorFn } from '@angular/forms';
import { EMAIL_REGEX } from '../../regex-patterns';

/*
   In addition to restrictions on syntax, there is a length limit on
   email addresses.  That limit is a maximum of 64 characters (octets)
   in the "local part" (before the "@") and a maximum of 255 characters
   (octets) in the domain part (after the "@") for a total length of 320
   characters. However, there is a restriction in RFC 2821 on the length of an
   address in MAIL and RCPT commands of 256 characters.  Since addresses
   that do not fit in those fields are not normally useful, the upper
   limit on address lengths should normally be considered to be 256.
   @link https://www.rfc-editor.org/errata_search.php?eid=1003
 */
const EMAIL_LOCAL_MAX_LENGTH = 64;
const EMAIL_TOTAL_MAX_LENGTH = 256;

export function emailInputValidator(): ValidatorFn {

  return (control: AbstractControl) => {
    if (control.value) {
      const emailParts = control.value.split('@');
      if (emailParts[0].length > EMAIL_LOCAL_MAX_LENGTH ||
          control.value.length > EMAIL_TOTAL_MAX_LENGTH ||
          !EMAIL_REGEX.test(control.value)) {
        return {
          'emailValidator': {
            value: control.value
          }
        };
      }
    }
    return null;
  };
}
