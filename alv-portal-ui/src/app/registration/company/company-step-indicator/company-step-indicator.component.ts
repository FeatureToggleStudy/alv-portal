import { Component, Input, OnInit } from '@angular/core';
import { Step } from '../../step-indicator/step.model';

@Component({
  selector: 'alv-company-step-indicator',
  templateUrl: './company-step-indicator.component.html',
  styleUrls: ['./company-step-indicator.component.scss']
})
export class CompanyStepIndicatorComponent implements OnInit {

  @Input() currentStep: number;

  steps: Step[] = [
    {
      label: 'UID eingeben',
      icon: 'user'
    },
    {
      label: 'Freischaltcode anfordern',
      icon: 'envelope'
    },
    {
      label: 'Freischaltcode eingeben',
      icon: 'lock'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
