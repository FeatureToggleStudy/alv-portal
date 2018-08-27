import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from '../../validation.service';
import { ValidationMessage } from '../validation-messages/validation-message.model';

let nextInputFieldId = 0;

/**
 * Component to display an input field or textarea.
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).
 * @param type                type of the input, e.g. number, date, email, password, etc. Defaults to text.
 * @param label               the label of the input
 * @param control             the FormControl object that should be bound to the input
 * @param validationMessages  (optional) add custom validation messages or override the default ones
 * @param min                 (optional) minimum value (this HTML validation only works on number input field, not on FormControl)
 * @param max                 (optional) maximum value (this HTML validation only works on number input field, not on FormControl)
 * @param minLength           (optional) minimum length (this HTML validation only works on text input field, not on FormControl)
 * @param maxLength           (optional) maximum length (this HTML validation only works on text input field, not on FormControl)
 * @param multiline           (optional) if true, multiline input (textarea) is displayed instead of ordinary input
 * @param readonly            (optional) if ture, the field will be readonly without background color and without border
 * @example <os-input-field
 *            type="number"
 *            label="Demo Input Field"
 *            [control]="form.get('myControl')"
 *            [validationMessages]="[{error: 'require', message: 'Custom message'}]"
 *            [min]="10"
 *            [max]="100"
 *            [minLength]="2"
 *            [maxLength]="3"
 *            [multiline]="false"
 *            [readonly]="false"
 *          </os-input-field>
 */
@Component({
  selector: 'os-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent implements OnInit {

  @HostBinding('class') readonly class = 'form-group d-block d-md-flex';

  @Input() type = 'text';
  @Input() label: string;
  @Input() control: FormControl;
  @Input() validationMessages?: Array<ValidationMessage>;
  @Input() min?: number;
  @Input() max?: number;
  @Input() minLength?: number;
  @Input() maxLength?: number;
  @Input() multiline?: boolean;
  @Input() readonly?: boolean;

  id = 'os-input-field-' + nextInputFieldId++;
  validationId = this.id + '-validation';
  required: string;

  constructor(private validationService: ValidationService) {
  }

  ngOnInit() {
    this.required = this.validationService.isRequired(this.control) ? 'required' : null;
  }

  getRows() {
    return (this.control.value.match(/\n/g) || []).length + 1;
  }

}
