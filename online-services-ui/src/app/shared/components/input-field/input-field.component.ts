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

  /**
   * (readonly) CSS classes of host element
   */
  @HostBinding('class') readonly class = 'form-group d-block d-md-flex';

  /**
   * type of the input, e.g. number, date, email, password, etc. Defaults to text.
   */
  @Input() type = 'text';

  /**
   * label of the input
   */
  @Input() label: string;

  /**
   * FormControl object that should be bound to the input
   */
  @Input() control: FormControl;

  /**
   * (optional) add custom validation messages or override the default ones
   */
  @Input() validationMessages?: Array<ValidationMessage>;

  /**
   * minimum value (this HTML validation only works on number input field, not on FormControl)
   */
  @Input() min?: number;

  /**
   * (optional) maximum value (this HTML validation only works on number input field, not on FormControl)
   */
  @Input() max?: number;

  /**
   * (optional) minimum length (this HTML validation only works on text input field, not on FormControl)
   */
  @Input() minLength?: number;

  /**
   * (optional) maximum value (this HTML validation only works on number input field, not on FormControl)
   */
  @Input() maxLength?: number;

  /**
   * (optional) if true, multiline input (textarea) is displayed instead of ordinary input
   */
  @Input() multiline?: boolean;

  /**
   * (optional) if true, the field will be readonly without background color and without border
   */
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
