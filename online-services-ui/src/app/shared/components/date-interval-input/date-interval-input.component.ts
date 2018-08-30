import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Sub-form component to display a date interval input (2 date pickers)
 * Use the TS class DateIntervalFormGroup to create the input FormGroup object.
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).
 * @example <os-date-interval-input
 *            [form]="myDateIntervalFormGroup"
 *            fromLabel="From"
 *            toLabel="To"
 *          </os-date-interval-input>
 */
@Component({
  selector: 'os-date-interval-input',
  templateUrl: './date-interval-input.component.html',
  styleUrls: ['./date-interval-input.component.scss', '../input-field/input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateIntervalInputComponent {

  /**
   * FormGroup object the date interval input is bound to
   */
  @Input() form: FormGroup;

  /**
   * (optional) custom "from" label
   */
  @Input() fromLabel?: string;

  /**
   * (optional) custom "to" label
   */
  @Input() toLabel?: string;

}
