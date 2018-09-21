import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import { ValidationService } from '../../../validation.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AbstractInput } from '../abstract-input';
import { InputType } from '../input-type.enum';
import { InputService } from '../input.service';

/**
 * Component to display a single date picker
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).
 * @example <os-date-input
 *            label="Date picker label"
 *            [control]="myFormControl"
 *            [minDate]="myMinDate"
 *            [validationMessages]="[{error: 'require', message: 'Custom message'}]"
 *            [readonly]="false"
 *            placement="bottom-right"
 *          </os-date-input>
 */
@Component({
  selector: 'os-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['../abstract-input.scss', './date-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent extends AbstractInput {

  /**
   * minimal selectable date
   */
  @Input() minDate?: NgbDate;

  /**
   * maximal selectable date
   */
  @Input() maxDate?: NgbDate;

  /**
   * (optional) where to display the date picker: bottom-left (default) or bottom-right
   */
  @Input() placement: 'bottom-left' | 'bottom-right'  = 'bottom-left';

  @ViewChild('datePicker') datePicker: ElementRef;

  constructor(inputService: InputService,
              validationService: ValidationService) {
    super(InputType.DATE_INPUT, inputService, validationService);
  }

}
