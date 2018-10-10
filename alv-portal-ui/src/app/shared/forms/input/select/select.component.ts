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
 *             [control]="form.get('myControl')"
 *             [options$]="optionsObservable$"
 *             [validationMessages]="[{error: 'require', message: 'Custom message'}]">
 *           </alv-select>
 */
@Component({
  selector: 'alv-select',
  templateUrl: './select.component.html',
  styleUrls: ['../abstract-input.scss', './select.component.scss']
})
export class SelectComponent extends AbstractSelectableInput {

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.SELECT, inputIdGenerationService);
  }

}
