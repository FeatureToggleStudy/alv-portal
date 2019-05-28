import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {
  ControlPeriod,
  WorkEffort,
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

  @HostBinding('class.current-period')
  @Input() isCurrentPeriod: boolean;

  constructor() { }

  ngOnInit() {
    this.expanded = this.isCurrentPeriod;
  }

  isSentSuccessfully(controlPeriod: ControlPeriod): boolean {
    return controlPeriod.status === WorkEffortStatus.SENT;
  }

  getDateStringFromControlPeriod(controlPeriod: ControlPeriod): string {
    const date = new Date(controlPeriod.date);
    return `${date.getFullYear()}${('0' + (date.getMonth() + 1)).slice(-2)}`;
  }

  getPdfFileNamePrefix(): string {
    return this.isCurrentPeriod ?
      'portal.work-efforts.control-period.pdf-file.temporary-name' :
      'portal.work-efforts.control-period.pdf-file.name';
  }

  removeWorkEffort(deletedWorkEffort: WorkEffort) {
    const indexToRemove = this.controlPeriod.workEfforts.findIndex(workEffort => workEffort.id === deletedWorkEffort.id);
    this.controlPeriod.workEfforts.splice(indexToRemove, 1);
  }
}
