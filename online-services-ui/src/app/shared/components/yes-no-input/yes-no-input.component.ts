import { Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { map } from 'rxjs/operators';
import { SubForm } from '../sub-form';

/**
 * Why do inherit from SubForm<YesNoQuestion> and not just SubForm<boolean>?
 * Because with our binding each subform must have a FormGroup in its template, and not just a FormControl.
 * That's why we wrap the boolean model into an object.
 */
@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => YesNoInputComponent),
    multi: true
  }, {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => YesNoInputComponent),
    multi: true
  }],
  selector: 'os-yes-no-input',
  templateUrl: './yes-no-input.component.html',
  styleUrls: ['./yes-no-input.component.scss']
})
export class YesNoInputComponent extends SubForm {

  @Input()
  question: string;

  @Input()
  help: string;

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      answer: ''
    } as { [p: string]: any });
  }

  public writeValue(value: any): void {
    if (typeof(value) === 'boolean') {
      this.form.setValue({answer: value}, {emitEvent: false});
      this.onTouched();
    }
  }

  /**
   * reading only the "answer" part
   * @param {(x: any) => void} fn
   */
  public registerOnChange(fn: (x: any) => void): void {
    this.form.valueChanges
        .pipe(map(x => x.answer))
        .subscribe(fn);
  }

}
