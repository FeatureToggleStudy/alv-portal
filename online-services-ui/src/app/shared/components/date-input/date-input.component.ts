import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationMessage } from '../validation-messages/validation-message.model';
import { ValidationService } from '../../validation.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

let nextDateId = 0;

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
  styleUrls: ['./date-input.component.scss', '../input-field/input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent implements OnInit {

  /**
   * label of the input
   */
  @Input() label: string;

  /**
   * FormControl object that should be bound to the input
   */
  @Input() control: FormControl;

  /**
   * minimal selectable date
   */
  @Input() minDate?: NgbDate;

  /**
   * maximal selectable date
   */
  @Input() maxDate?: NgbDate;

  /**
   * (optional) add custom validation messages or override the default ones
   */
  @Input() validationMessages?: Array<ValidationMessage>;

  /**
   * (optional) if true, the field will be readonly without background color and without border
   */
  @Input() readonly?: boolean;

  /**
   * (optional) where to display the date picker: bottom-left (default) or bottom-right
   */
  @Input() placement  = 'bottom-left';

  @ViewChild('datePicker') datePicker: ElementRef;

  id = 'date-input-' + nextDateId++;
  validationId = this.id + '-validation';
  required: string;

  constructor(private validationService: ValidationService) {
  }

  ngOnInit() {
    this.required = this.validationService.isRequired(this.control) ? 'required' : null;
  }

}
