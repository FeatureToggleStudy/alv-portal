import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SelectOption } from '../select/select-option.model';
import { ValidationMessage } from '../validation-messages/validation-message.model';

let nextRadioId = 0;

@Component({
  selector: 'os-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent implements OnInit {

  @Input() control: FormControl;

  @Input() label?: string;

  @Input() validationMessages?: Array<ValidationMessage>;

  @Input() options$?: Observable<Array<SelectOption>>;

  id = 'os-radio-' + nextRadioId++;
  validationId = this.id + '-validation';

  ngOnInit() {
    this.options$ = this.options$ || this.getDefaultOptions();
  }

  private getDefaultOptions(): Observable<Array<SelectOption>> {
    return of([
      {
        label: 'Yes',
        value: true
      },
      {
        label: 'No',
        value: false
      }
    ]);
  }

}
