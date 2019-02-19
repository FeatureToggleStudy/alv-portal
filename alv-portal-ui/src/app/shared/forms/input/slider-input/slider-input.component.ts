import { AbstractInput } from '../abstract-input';
import { Component, Host, Input, OnInit, Optional, SkipSelf } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { InputIdGenerationService } from '../input-id-generation.service';
import { InputType } from '../input-type.enum';

export interface Labels {
  labelOne: string;
  labelMany: string;
}

/**
 * Component to display a single slider input
 * The ChangeDetectionStrategy.OnPush is used in order to improve the performance (less digest cycles).
 * @example <alv-slider-input
 *            labels="{ labelOne: 'label one {}', labelMany: 'label many {}'}"
 *            [control]="myFormControl"
 *            [min]="10"
 *            [max]="100"
 *            [step]="10"
 *          </alv-slider-input>
 */
@Component({
  selector: 'alv-slider-input',
  templateUrl: './slider-input.component.html',
  styleUrls: ['../abstract-input.scss', './slider-input.component.scss']
})
export class SliderInputComponent extends AbstractInput {

  @Input() min: number;

  @Input() max: number;

  @Input() step: number;

  @Input() labels: Labels;

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.SLIDER_INPUT, inputIdGenerationService);
  }

  get effectiveLabel() {
    if (this.labels) {
      return this.control.value === 0
        ? this.labels.labelOne
        : this.labels.labelMany;
    }

    return this.label;
  }
}
