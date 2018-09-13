import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessage } from '../validation-messages/validation-message.model';

let nextCheckboxId = 0;

@Component({
  selector: 'os-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent {

  @Input() control: FormControl;

  @Input() label?: string;

  @Input() validationMessages?: Array<ValidationMessage>;

  id = 'os-checkbox-' + nextCheckboxId++;
  validationId = this.id + '-validation';

}
