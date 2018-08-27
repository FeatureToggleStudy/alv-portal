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
import { NgbDate } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

let nextDateId = 0;

@Component({
  selector: 'os-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['./date-input.component.scss', '../input-field/input-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateInputComponent implements OnInit {

  @Input() label: string;
  @Input() control: FormControl;
  @Input() minDate?: NgbDate;
  @Input() maxDate?: NgbDate;
  @Input() validationMessages?: Array<ValidationMessage>;
  @Input() readonly?: boolean;
  @Input() placement = 'bottom-left';

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
