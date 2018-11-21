import { Component, Input, OnInit } from '@angular/core';
import { Step } from './step.model';

@Component({
  selector: 'alv-step-indicator',
  templateUrl: './step-indicator.component.html',
  styleUrls: ['./step-indicator.component.scss']
})
export class StepIndicatorComponent implements OnInit {

  @Input() steps: Step[];

  @Input() activeStep: number;

  constructor() { }

  ngOnInit() {
  }

}
