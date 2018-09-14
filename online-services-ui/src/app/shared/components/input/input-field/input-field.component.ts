import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ValidationService } from '../../../validation.service';
import { AbstractInput } from '../abstract-input';
import { InputType } from '../input-type.enum';
import { InputService } from '../input.service';


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
  styleUrls: ['../abstract-input.scss', './input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent extends AbstractInput {

  /**
   * (readonly) CSS classes of host element
   */
  @HostBinding('class') readonly class = 'form-group d-block d-md-flex';

  /**
   * type of the input, e.g. number, date, email, password, etc. Defaults to text.
   */
  @Input() type = 'text';

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

  constructor(inputService: InputService,
              validationService: ValidationService) {
    super(InputType.INPUT_FIELD, inputService, validationService);
  }

  getRows() {
    return (this.control.value.match(/\n/g) || []).length + 1;
  }

}
