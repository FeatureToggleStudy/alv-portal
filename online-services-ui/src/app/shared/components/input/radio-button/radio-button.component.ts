import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../selectable-option.model';
import { ValidationMessage } from '../validation-messages/validation-message.model';
import { AbstractInput } from '../abstract-input';
import { ValidationService } from '../../../validation.service';
import { InputType } from '../input-type.enum';
import { AbstractSelectableInput } from '../abstract-selectable-input';

@Component({
  selector: 'os-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent extends AbstractSelectableInput implements OnInit {

  constructor(private validationService: ValidationService) {
    super(InputType.RADIO_BUTTON);
  }

  ngOnInit() {
    this.initInput(this.validationService);
    this.options$ = this.options$ || this.getDefaultOptions();
  }

  private getDefaultOptions(): Observable<Array<SelectableOption>> {
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
