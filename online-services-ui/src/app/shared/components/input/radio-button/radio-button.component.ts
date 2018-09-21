import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../selectable-option.model';
import { ValidationService } from '../../../validation.service';
import { InputType } from '../input-type.enum';
import { AbstractSelectableInput } from '../abstract-selectable-input';
import { InputService } from '../input.service';

@Component({
  selector: 'os-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent extends AbstractSelectableInput implements OnInit {

  constructor(inputService: InputService,
              validationService: ValidationService) {
    super(InputType.RADIO_BUTTON, inputService, validationService);
  }

  ngOnInit() {
    super.ngOnInit();
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
