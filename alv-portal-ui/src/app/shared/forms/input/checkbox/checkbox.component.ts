import { Component, Host, Optional, SkipSelf } from '@angular/core';
import { AbstractInput } from '../abstract-input';
import { InputType } from '../input-type.enum';
import { InputIdGenerationService } from '../input-id-generation.service';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'alv-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['../abstract-checkbox-radio.scss', './checkbox.component.scss']
})
export class CheckboxComponent extends AbstractInput {

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.CHECKBOX, inputIdGenerationService);
  }

}
