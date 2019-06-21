import {
  Component,
  ElementRef,
  Host,
  Input,
  Optional,
  SkipSelf,
  ViewChild
} from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { AbstractInput } from '../abstract-input';
import { InputType } from '../input-type.enum';
import { InputIdGenerationService } from '../input-id-generation.service';
import { ControlContainer } from '@angular/forms';

/**
 * Component to display a single applyDate picker
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).
 * @example <alv-applyDate-input
 *            label="Date picker label"
 *            [control]="myFormControl"
 *            [minDate]="myMinDate"
 *            [validationMessages]="[{error: 'require', message: 'Custom message'}]"
 *            [readonly]="false"
 *            placement="bottom-right"
 *          </alv-applyDate-input>
 */
@Component({
  selector: 'alv-date-input',
  templateUrl: './date-input.component.html',
  styleUrls: ['../abstract-input.scss', './date-input.component.scss']
})
export class DateInputComponent extends AbstractInput {

  /**
   * minimal selectable applyDate
   */
  @Input() minDate?: NgbDate;

  /**
   * maximal selectable applyDate
   */
  @Input() maxDate?: NgbDate;

  /**
   * (optional) starting applyDate
   */
  @Input() startDate?: NgbDate;

  /**
   * (optional) where to display the applyDate picker: bottom-left (default) or bottom-right
   */
  @Input() placement: 'bottom-left' | 'bottom-right' = 'bottom-left';

  /**
   * (optional) A selector specifying the element the datepicker popup should be appended to.
   * Currently only supports "body".
   */
  @Input() container: string;

  @ViewChild('datePicker') datePicker: any;

  constructor(@Optional() @Host() @SkipSelf()controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.DATE_INPUT, inputIdGenerationService);
  }

  focus() {
    this.datePicker._elRef.nativeElement.focus();
  }
}
