import {
  Component, ElementRef,
  Host,
  HostBinding,
  Input,
  Optional,
  SkipSelf,
  ViewChild
} from '@angular/core';
import { AbstractInput } from '../abstract-input';
import { InputType } from '../input-type.enum';
import { ControlContainer } from '@angular/forms';
import { InputIdGenerationService } from '../input-id-generation.service';


/**
 * Component to display an input field or textarea.
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).
 * @example <alv-input-field
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
 *          </alv-input-field>
 */
@Component({
  selector: 'alv-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['../abstract-input.scss', './input-field.component.scss']
})
export class InputFieldComponent extends AbstractInput {

  /**
   * (readonly) CSS class of host element
   */
  @HostBinding('class.form-group') readonly formGroupClass = true;

  /**
   * (readonly) CSS class of host element
   */
  @HostBinding('class.d-block') readonly blockClass = true;

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

  @ViewChild('input') input: ElementRef;

  @ViewChild('textarea') textarea: ElementRef;

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.INPUT_FIELD, inputIdGenerationService);
  }

  getRows() {
    return (this.control.value.match(/\n/g) || []).length + 1;
  }

  focus() {
    this.multiline ? this.textarea.nativeElement.focus() : this.input.nativeElement.focus();
  }
}
