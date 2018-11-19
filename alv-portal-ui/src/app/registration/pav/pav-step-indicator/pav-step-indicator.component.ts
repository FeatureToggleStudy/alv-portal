import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../../step-indicator/step.model';

@Component({
  selector: 'alv-pav-step-indicator',
  templateUrl: './pav-step-indicator.component.html',
  styleUrls: ['./pav-step-indicator.component.scss']
})
export class PavStepIndicatorComponent implements OnInit {

  @Input() currentStep: number;

  steps: Step[] = [
    {
      label: 'portal.registration.company.step1',
      icon: 'user'
    },
    {
      label: 'portal.registration.company.step2',
      icon: 'envelope'
    },
    {
      label: 'portal.registration.company.step3',
      icon: 'lock'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
