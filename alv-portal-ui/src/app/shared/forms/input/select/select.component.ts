import { Component, Host, Optional, SkipSelf } from '@angular/core';
import { InputType } from '../input-type.enum';
import { AbstractSelectableInput } from '../abstract-selectable-input';
import { InputIdGenerationService } from '../input-id-generation.service';
import { ControlContainer } from '@angular/forms';

/**
 * Component to display a select dropdown
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).
 * @example  <alv-select
 *             label="Demo Select"
 *             [alvControl]="form.get('myControl')"
 *             [options$]="optionsObservable$"
 *             [validationMessages]="[{error: 'require', message: 'Custom message'}]">
 *           </alv-select>
 *           todo also describe use case with alvFormControlName
 */
@Component({
  selector: 'alv-select',
  templateUrl: './select.component.html',
  styleUrls: ['../abstract-input.scss', './select.component.scss']
})
export class SelectComponent extends AbstractSelectableInput {

  stringify = JSON.stringify;
  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.SELECT, inputIdGenerationService);
  }

}
