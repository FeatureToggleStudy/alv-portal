import { Component, Input, OnInit } from '@angular/core';
import {
  ControlPeriod,
  WorkEffort,
  WorkEffortResult, WorkEffortStatus
} from '../../../../shared/backend-services/work-efforts/work-efforts.types';
import { InlineBadge } from '../../../../shared/layout/inline-badges/inline-badge.types';
import { getDeleteConfirmModalConfig } from '../../../../shared/job-search-profiles/modal-config.types';
import { ModalService } from '../../../../shared/layout/modal/modal.service';
import { deleteWorkEffortModalConfig } from '../modal-config.types';

@Component({
  selector: 'alv-work-effort',
  templateUrl: './work-effort.component.html',
  styleUrls: ['./work-effort.component.scss']
})
export class WorkEffortComponent implements OnInit {

  @Input() workEffort: WorkEffort;

  resultBadges: InlineBadge[] = [];

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.mapResultBadges();
  }

  deleteWorkEffort() {
    this.modalService.openConfirm(
      deleteWorkEffortModalConfig
    ).result
      .then(result => {
        // TODO: call backend
      })
      .catch(() => {
      });
  }

  mapResultBadges() {
    if (this.workEffort.results.includes(WorkEffortResult.INTERVIEW)) {
      this.resultBadges.push({
        cssClass: 'badge-work-effort-result-interview',
        label: WorkEffortResult.INTERVIEW
      });
    }

    if (this.workEffort.results.includes(WorkEffortResult.EMPLOYED)) {
      this.resultBadges.push({
        cssClass: 'badge-work-effort-result-employed',
        label: WorkEffortResult.EMPLOYED
      });
    }

    if (this.workEffort.results.includes(WorkEffortResult.PENDING)) {
      this.resultBadges.push({
        cssClass: 'badge-work-effort-result-pending',
        label: WorkEffortResult.PENDING
      });
    }

    if (this.workEffort.results.includes(WorkEffortResult.REJECTED)) {
      this.resultBadges.push({
        cssClass: 'badge-work-effort-result-rejected',
        label: WorkEffortResult.REJECTED
      });
    }
  }

  isSentSuccessfully(workEffort: WorkEffort): boolean {
    return workEffort.status === WorkEffortStatus.SENT;
  }
}
