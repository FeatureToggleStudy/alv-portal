import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SelectOption } from './select-option.model';
import { ValidationMessage } from '../validation-messages/validation-message.model';

let nextSelectId = 0;

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
  styleUrls: ['../input-field/input-field.component.scss', './select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent {

  /**
   * the label of the select
   */
  @Input() label: string;

  /**
   * FormControl object that should be bound to the select
   */
  @Input() control: FormControl;

  /**
   * observable with selectable options which is subscribed to automatically
   */
  @Input() options$: Observable<Array<SelectOption>>;

  /**
   * (optional) add custom validation messages or override the default ones
   */
  @Input() validationMessages?: Array<ValidationMessage>;

  id = 'os-select-' + nextSelectId++;
  validationId = this.id + '-validation';
}
