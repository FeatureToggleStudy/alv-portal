import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Optional,
  SkipSelf
} from '@angular/core';
import { AbstractInput } from '../abstract-input';
import { InputType } from '../input-type.enum';
import { InputService } from '../input.service';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'alv-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent extends AbstractInput {

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputService: InputService) {
    super(controlContainer, InputType.CHECKBOX, inputService);
  }

}
