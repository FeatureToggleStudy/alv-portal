import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Sub-form component to display a applyDate interval input (2 applyDate pickers)
 * Use the TS class DateIntervalFormGroup to create the input FormGroup object.
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).
 * @example <alv-applyDate-interval-input
 *            [form]="myDateIntervalFormGroup"
 *            fromLabel="From"
 *            toLabel="To"
 *          </alv-applyDate-interval-input>
 */
@Component({
  selector: 'alv-date-interval-input',
  templateUrl: './date-interval-input.component.html',
  styleUrls: ['../abstract-input.scss', './date-interval-input.component.scss']
})
export class DateIntervalInputComponent {

  /**
   * FormGroup object the applyDate interval input is bound to
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
