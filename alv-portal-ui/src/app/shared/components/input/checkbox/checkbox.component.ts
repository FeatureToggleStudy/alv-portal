import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractInput } from '../abstract-input';
import { ValidationService } from '../../../validation.service';
import { InputType } from '../input-type.enum';
import { InputService } from '../input.service';

@Component({
  selector: 'alv-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent extends AbstractInput {

  constructor(inputService: InputService,
              validationService: ValidationService) {
    super(InputType.CHECKBOX, inputService, validationService);
  }

}
