import { Component, OnInit } from '@angular/core';
import { mockMonthlyEmployments } from './employments/employments.mock';
import { EmploymentsModel } from './employments/employments.model';

@Component({
  selector: 'alv-avp-form',
  templateUrl: './avp-form.component.html',
  styleUrls: ['./avp-form.component.scss']
})
export class AvpFormComponent implements OnInit {

  monthly: EmploymentsModel;

  constructor() {
  }

  ngOnInit(): void {
    this.monthly = mockMonthlyEmployments;
  }

}
