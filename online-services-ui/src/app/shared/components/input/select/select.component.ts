import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ValidationService } from '../../../validation.service';
import { InputType } from '../input-type.enum';
import { AbstractSelectableInput } from '../abstract-selectable-input';

/**
 * Component to display a select dropdown
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).
 * @example  <os-select
 *             label="Demo Select"
 *             [control]="form.get('myControl')"
 *             [options$]="optionsObservable$"
 *             [validationMessages]="[{error: 'require', message: 'Custom message'}]">
 *           </os-select>
 */
@Component({
  selector: 'os-select',
  templateUrl: './select.component.html',
  styleUrls: ['../abstract-input.scss', './select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent extends AbstractSelectableInput implements OnInit {

  constructor(private validationService: ValidationService) {
    super(InputType.SELECT);
  }

  ngOnInit() {
    this.initInput(this.validationService);
  }
}
