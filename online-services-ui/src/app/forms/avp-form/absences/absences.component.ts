import { Component, OnInit } from '@angular/core';
import { EmploymentsComponent } from '../employments/employments.component';

@Component({
  selector: 'os-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.scss']
})
export class AbsencesComponent implements OnInit {

  model: EmploymentsComponent;

  constructor() {
  }

  ngOnInit(): void {
  }

}
