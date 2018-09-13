import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessage } from '../validation-messages/validation-message.model';
import { AbstractInput } from '../abstract-input';
import { ValidationService } from '../../../validation.service';
import { InputType } from '../input-type.enum';

@Component({
  selector: 'os-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent extends AbstractInput implements OnInit {

  constructor(private validationService: ValidationService) {
    super(InputType.CHECKBOX);
  }

  ngOnInit() {
    this.initInput(this.validationService);
  }
}
