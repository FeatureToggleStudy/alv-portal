import { Component, Input, OnInit } from '@angular/core';
import {
  ControlPeriod,
  WorkEffortStatus
} from '../../../../shared/backend-services/work-efforts/work-efforts.types';

@Component({
  selector: 'alv-control-period',
  templateUrl: './control-period.component.html',
  styleUrls: ['./control-period.component.scss']
})
export class ControlPeriodComponent implements OnInit {

  @Input() controlPeriod: ControlPeriod;

  @Input() expanded: boolean;

  constructor() { }

  ngOnInit() {
  }

  isSentSuccessfully(controlPeriod: ControlPeriod): boolean {
    return controlPeriod.status === WorkEffortStatus.SENT;
  }
}
