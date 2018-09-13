import { Component, forwardRef, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { map } from 'rxjs/operators';
import { SubForm } from '../sub-form';
import { Observable, of } from 'rxjs';
import { SelectOption } from '../select/select-option.model';

/**
 * Why do inherit from SubForm<YesNoQuestion> and not just SubForm<boolean>?
 * Because with our binding each subform must have a FormGroup in its template, and not just a FormControl.
 * That's why we wrap the boolean model into an object.
 */
@Component({
  selector: 'os-yes-no-input',
  templateUrl: './yes-no-input.component.html',
  styleUrls: ['./yes-no-input.component.scss']
})
export class YesNoInputComponent {

  @Input() control: FormControl;
  @Input() label: string;

  yesNoOptions$: Observable<Array<SelectOption>> = of([
    {
      label: 'Yes',
      value: true
    },
    {
      label: 'No',
      value: false
    }
  ]);

  constructor() {
  }

}
