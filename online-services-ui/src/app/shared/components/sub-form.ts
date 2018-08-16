import { AbstractControl, ControlValueAccessor, FormGroup, ValidationErrors, Validator } from '@angular/forms';

/**
 *
 * extend this class when you need a subform. When you use it, add the following to your subform component:
 * @Component({
 *  providers: [
 *      {
 *          provide: NG_VALUE_ACCESSOR,
 *          useExisting: forwardRef(() => *COMPONENT_CLASS*),
 *          multi: true
 *      }
 *  ],
 *  ...
 */
export abstract class SubForm implements ControlValueAccessor, Validator {

  form: FormGroup;

  public onTouched(): void {
  }

  public writeValue(value: any): void {
    if (value) {
      //todo think if we should use setValue or patchValue
      this.form.patchValue(value, {emitEvent: false});
      this.onTouched();
    }
  }

  public registerOnChange(fn: (x: any) => void): void {
    this.form.valueChanges.subscribe(fn);
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable()
        : this.form.enable();
  }

  //all the errors inside the form go up
  validate(c: AbstractControl): ValidationErrors | null {
    // return this.form.errors; //apparently it doesn't work and there's an issue for that https://github.com/angular/angular/issues/10530
    return this.form.valid ? null : {subformerror: 'Problems in subform!'};
  }

  registerOnValidatorChange(fn: () => void): void {
    this.form.statusChanges.subscribe(fn);
  }
}
