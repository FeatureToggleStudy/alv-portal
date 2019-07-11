# Debugging Helpers

The document lists some debugging helpers for Angular that have proven to be useful.

## Get all errors from a FromGroup

```
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

/**
 * a debugging function that traverses the form group object and shows all errors for controls, and subforms
 * @param fGroup
 * @return an object of all errors in the group and all subgroups. Uses the key __groupErrors for the errors related
 * to the whole form group
 */
export function getAllErrors(fGroup: FormGroup ): {[index: string]: any} {
  return Object
    .keys(fGroup.controls) // go through all the control names
    .reduce((result, name) => {
      const control = <FormGroup | AbstractControl>fGroup.controls[name];

      // if control is FormGroup recursively call its `allErrors`
      if (control instanceof FormGroup) {
        result[name] = {
          __groupErrors: control.errors,
          ...getAllErrors(control)
        };
      } else if (control instanceof FormArray) {
        // add implementation for array here
      } else {
        // for normal controls add errors here
        result[name] = control.errors;
      }

      return result; // and return the result to the next control
    }, {__groupErrors: fGroup.errors});
}

```   

## Color JSON values according their type

```
pre span {
  white-space: normal;
}

.string {
  color: #388066;
}

.number {
  color: darkorange;
}

.boolean {
  color: blue;
}

.null {
  color: #a800a8;
}

.key {
  color: #3d1211;
}

```
