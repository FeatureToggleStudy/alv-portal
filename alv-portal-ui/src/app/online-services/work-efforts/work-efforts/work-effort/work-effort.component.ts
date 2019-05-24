import { Component, Input, OnInit } from '@angular/core';
import {
  WorkEffort,
  WorkEffortResult
} from '../../../../shared/backend-services/work-efforts/work-efforts.types';
import { InlineBadge } from '../../../../shared/layout/inline-badges/inline-badge.types';

@Component({
  selector: 'alv-work-effort',
  templateUrl: './work-effort.component.html',
  styleUrls: ['./work-effort.component.scss']
})
export class WorkEffortComponent implements OnInit {

  @Input() workEffort: WorkEffort;

  resultBadges: InlineBadge[] = [];

  constructor() { }

  ngOnInit() {
    this.mapResultBadges();
  }

  deleteWorkEffort() {

  }

  mapResultBadges() {
    if (this.workEffort.results.includes(WorkEffortResult.INTERVIEW)) {
      this.resultBadges.push({
        cssClass: 'badge-availability',
        label: WorkEffortResult.INTERVIEW
      });
    }

    if (this.workEffort.results.includes(WorkEffortResult.INTERVIEW)) {
      this.resultBadges.push({
        cssClass: 'badge-availability',
        label: WorkEffortResult.EMPLOYED
      });
    }
  }
}
