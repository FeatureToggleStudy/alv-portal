import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  HostBinding,
  Input,
  Optional,
  Output,
  SkipSelf,
  ViewChild
} from '@angular/core';
import { AbstractInput } from '../abstract-input';
import { InputType } from '../input-type.enum';
import { ControlContainer } from '@angular/forms';
import { InputIdGenerationService } from '../input-id-generation.service';
import { AsYouType, format, isValidNumber, parse } from 'libphonenumber-js';
import { IsoCountryService } from '../../../localities/iso-country.service';


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
export class InputFieldComponent extends AbstractInput implements AfterViewInit {

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
   * (optional) show character counter (only works if a maxLength is set)
   */
  @Input() showCharacterCounter?: boolean;

  /**
   * (optional) if true, multiline input (textarea) is displayed instead of ordinary input
   */
  @Input() multiline?: boolean;

  /**
   * (optional) placeholder value that will be displayed beside the label
   */
  @Input() placeholder?: string;

  /**
   * Output event on input
   */
  @Output() input = new EventEmitter<Event>();

  /**
   * Reference to textarea element
   */
  @ViewChild('textarea') textareaElement: ElementRef<HTMLTextAreaElement>;

  private readonly MULTILINE_MIN_HEIGHT = 46;

  private readonly INPUT_TYPE_TELEPHONE = 'tel';

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.INPUT_FIELD, inputIdGenerationService);
  }

  ngAfterViewInit() {
    if (this.multiline) {
      this.calculateMultilineElementHeight();
    }
  }

  onInput(event: any) {
    const target = event.target || event.srcElement;

    if (this.type === this.INPUT_TYPE_TELEPHONE) {
      // Phone number formatting
      this.formatPhoneNumber(target.value);
    }
    if (this.multiline) {
      // Multiline auto expand feature
      this.calculateMultilineElementHeight();
    }
    this.input.emit(event);
  }

  private calculateMultilineElementHeight() {
    const element = this.textareaElement.nativeElement;
    element.style.height = this.MULTILINE_MIN_HEIGHT + 'px';
    element.style.height = Math.max(element.scrollHeight, this.MULTILINE_MIN_HEIGHT) + 'px';
  }

  private formatPhoneNumber(phoneNumber: string) {
    if (isValidNumber(phoneNumber, IsoCountryService.ISO_CODE_SWITZERLAND)) {
      const formatter = new AsYouType(IsoCountryService.ISO_CODE_SWITZERLAND);
      const value = formatter.input(phoneNumber);
      this.control.patchValue(format(parse(value, IsoCountryService.ISO_CODE_SWITZERLAND), 'International'), { emitEvent: false });
    }
  }
}
