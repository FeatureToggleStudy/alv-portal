import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {
  NgbCalendar,
  NgbDateParserFormatter,
  NgbDatepicker,
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { ValidationService } from '../../validation.service';

@Component({
  selector: 'os-date-interval-input',
  templateUrl: './date-interval-input.component.html',
  styleUrls: ['./date-interval-input.component.scss', '../input-field/input-field.component.scss']
})
export class DateIntervalInputComponent {

  @Input() form: FormGroup;
  @Input() fromLabel: string;
  @Input() toLabel: string;

}
