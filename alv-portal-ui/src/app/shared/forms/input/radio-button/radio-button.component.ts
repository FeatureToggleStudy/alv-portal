import {
  ChangeDetectionStrategy,
  Component,
  Host,
  OnInit,
  Optional,
  SkipSelf
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { SelectableOption } from '../selectable-option.model';
import { InputType } from '../input-type.enum';
import { AbstractSelectableInput } from '../abstract-selectable-input';
import { InputService } from '../input.service';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'alv-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadioButtonComponent extends AbstractSelectableInput implements OnInit {

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputService: InputService) {
    super(controlContainer, InputType.RADIO_BUTTON, inputService);
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
