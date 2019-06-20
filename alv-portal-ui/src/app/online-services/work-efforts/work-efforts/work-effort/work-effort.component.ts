import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  WorkEffort,
  WorkEffortsReportStatus
} from '../../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';
import { InlineBadge } from '../../../../shared/layout/inline-badges/inline-badge.types';
import { ModalService } from '../../../../shared/layout/modal/modal.service';
import { deleteWorkEffortModalConfig } from '../modal-config.types';
import { NotificationsService } from '../../../../core/notifications.service';
import { WorkEffortsService } from '../work-efforts.service';
import { ProofOfWorkEffortsRepository } from '../../../../shared/backend-services/work-efforts/proof-of-work-efforts.repository';

@Component({
  selector: 'alv-work-effort',
  templateUrl: './work-effort.component.html',
  styleUrls: ['./work-effort.component.scss']
})
export class WorkEffortComponent implements OnInit {

  @Input() workEffortsReportId: string;

  @Input() workEffort: WorkEffort;

  @Input() forecastSubmissionDate: string;

  @Output() deleted = new EventEmitter<WorkEffort>();

  resultBadges: InlineBadge[] = [];

  constructor(private modalService: ModalService,
              private workEffortsService: WorkEffortsService,
              private proofOfWorkEffortsRepository: ProofOfWorkEffortsRepository,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {
    this.resultBadges = this.workEffortsService.mapResultBadges(this.workEffort.results);
  }

  deleteWorkEffort() {
    this.modalService.openConfirm(
      deleteWorkEffortModalConfig
    ).result
      .then(result => {
        this.proofOfWorkEffortsRepository.deleteWorkEffort(this.workEffortsReportId, this.workEffort.id)
          .subscribe(() => {
            this.deleted.emit(this.workEffort);
            this.notificationsService.success('portal.work-efforts.work-effort.notification.deleted');
          });
      })
      .catch(() => {
      });
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
