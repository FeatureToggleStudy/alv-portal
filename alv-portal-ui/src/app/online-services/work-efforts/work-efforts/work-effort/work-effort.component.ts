import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  WorkEffort,
  WorkEffortResult,
  WorkEffortsReportStatus
} from '../../../../shared/backend-services/work-efforts/work-efforts.types';
import { InlineBadge } from '../../../../shared/layout/inline-badges/inline-badge.types';
import { ModalService } from '../../../../shared/layout/modal/modal.service';
import { deleteWorkEffortModalConfig } from '../modal-config.types';
import { NotificationsService } from '../../../../core/notifications.service';

@Component({
  selector: 'alv-work-effort',
  templateUrl: './work-effort.component.html',
  styleUrls: ['./work-effort.component.scss']
})
export class WorkEffortComponent implements OnInit {

  @Input() workEffort: WorkEffort;

  @Input() forecastSubmissionDate: string;

  @Output() deleted = new EventEmitter<WorkEffort>();

  resultBadges: InlineBadge[] = [];

  constructor(private modalService: ModalService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.mapResultBadges();
  }

  deleteWorkEffort() {
    this.modalService.openConfirm(
      deleteWorkEffortModalConfig
    ).result
      .then(result => {
        // TODO: call backend
        this.deleted.emit(this.workEffort);
        this.notificationsService.success('portal.work-efforts.work-effort.notification.deleted');
      })
      .catch(() => {
      });
  }

  mapResultBadges() {
    if (this.workEffort.results.includes(WorkEffortResult.INTERVIEW)) {
      this.resultBadges.push({
        cssClass: 'badge-work-effort-result-interview',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortResult.INTERVIEW
      });
    }

    if (this.workEffort.results.includes(WorkEffortResult.EMPLOYED)) {
      this.resultBadges.push({
        cssClass: 'badge-work-effort-result-employed',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortResult.EMPLOYED
      });
    }

    if (this.workEffort.results.includes(WorkEffortResult.PENDING)) {
      this.resultBadges.push({
        cssClass: 'badge-work-effort-result-pending',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortResult.PENDING
      });
    }

    if (this.workEffort.results.includes(WorkEffortResult.REJECTED)) {
      this.resultBadges.push({
        cssClass: 'badge-work-effort-result-rejected',
        label: 'portal.work-efforts.work-effort-result.' + WorkEffortResult.REJECTED
      });
    }
  }

  isSentSuccessfully(workEffort: WorkEffort): boolean {
    return !!workEffort.submittedAt;
  }

  getSubmissionDate(workEffort: WorkEffort): string {
    return workEffort.submittedAt || this.forecastSubmissionDate;
  }

  getSubmissionText(workEffort: WorkEffort): string {
    return 'portal.work-efforts.submit-status.text.' +
      (this.isSentSuccessfully(workEffort) ? WorkEffortsReportStatus.SUBMITTED : WorkEffortsReportStatus.OPEN);
  }
}
