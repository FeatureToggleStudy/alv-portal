import { Component, Input, OnInit } from '@angular/core';
import { WorkEffort } from '../../../../shared/backend-services/work-efforts/work-efforts.types';

@Component({
  selector: 'alv-work-effort',
  templateUrl: './work-effort.component.html',
  styleUrls: ['./work-effort.component.scss']
})
export class WorkEffortComponent implements OnInit {

  @Input() workEffort: WorkEffort;

  constructor() { }

  ngOnInit() {
  }

  deleteWorkEffort() {

  }
}
