import { Component, Input } from '@angular/core';
import { StepIndicatorItem } from './step.model';

@Component({
  selector: 'alv-step-indicator',
  templateUrl: './step-indicator.component.html',
  styleUrls: ['./step-indicator.component.scss']
})
export class StepIndicatorComponent {

  @Input() steps: StepIndicatorItem[];

  @Input() activeStep: number;

  constructor() {
  }

}
