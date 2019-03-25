import { AbstractInput } from '../abstract-input';
import {
  ChangeDetectionStrategy,
  Component,
  Host,
  Input,
  OnInit,
  Optional,
  SkipSelf
} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { InputIdGenerationService } from '../input-id-generation.service';
import { InputType } from '../input-type.enum';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';

export interface Labels {
  labelOne: string;
  labelMany: string;
}

/**
 * Component to display a single slider input
 * @example <alv-slider-input
 *            labels="{ labelOne: 'label-one', labelMany: 'label-many'}"
 *            [control]="myFormControl"
 *            [min]="10"
 *            [max]="100"
 *            [step]="10"
 *          </alv-slider-input>
 */
@Component({
  selector: 'alv-slider-input',
  templateUrl: './slider-input.component.html',
  styleUrls: ['../abstract-input.scss', './slider-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderInputComponent extends AbstractInput implements OnInit {

  /**
   * minimal selectable value
   */
  @Input() min: number;

  /**
   * maximal selectable value
   */
  @Input() max: number;

  /**
   * step size value
   */
  @Input() step: number;

  /**
   * labels to display
   */
  @Input() labels: Labels;

  currentValue$: Observable<number>;

  constructor(@Optional() @Host() @SkipSelf() controlContainer: ControlContainer,
              inputIdGenerationService: InputIdGenerationService) {
    super(controlContainer, InputType.SLIDER_INPUT, inputIdGenerationService);
  }

  get effectiveLabel() {
    if (this.labels) {
      return this.control.value === 1
        ? this.labels.labelOne
        : this.labels.labelMany;
    }

    return this.label;
  }

  ngOnInit() {
    super.ngOnInit();
    this.currentValue$ = this.control.valueChanges.pipe(startWith(this.control.value));
  }
}
