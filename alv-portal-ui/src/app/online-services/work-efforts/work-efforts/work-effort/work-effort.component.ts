import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  WorkEffort,
  ProofOfWorkEffortsStatus
} from '../../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';
import { InlineBadge } from '../../../../shared/layout/inline-badges/inline-badge.types';
import { ModalService } from '../../../../shared/layout/modal/modal.service';
import { deleteWorkEffortModalConfig } from '../modal-config.types';
import { NotificationsService } from '../../../../core/notifications.service';
import { WorkEffortsOverviewFilterBadgesMapper } from '../work-efforts-overview-filter-badges.mapper';
import { ProofOfWorkEffortsRepository } from '../../../../shared/backend-services/work-efforts/proof-of-work-efforts.repository';
import { WorkEffortModel } from './work-effort.model';

@Component({
  selector: 'alv-work-effort',
  templateUrl: './work-effort.component.html',
  styleUrls: ['./work-effort.component.scss']
})
export class WorkEffortComponent implements OnInit {

  @Input() workEffortModel: WorkEffortModel;

  @Output() deleted = new EventEmitter<WorkEffort>();

  constructor(private modalService: ModalService,
              private workEffortsBadgesMapperService: WorkEffortsOverviewFilterBadgesMapper,
              private proofOfWorkEffortsRepository: ProofOfWorkEffortsRepository,
              private notificationsService: NotificationsService) {
  }

  ngOnInit() {

  }

  deleteWorkEffort() {
    this.modalService.openConfirm(
      deleteWorkEffortModalConfig
    ).result
      .then(result => {
        this.proofOfWorkEffortsRepository.deleteWorkEffort(this.workEffortModel.proofOfWorkEfforts.id, this.workEffortModel.workEffort.id)
          .subscribe(() => {
            this.deleted.emit(this.workEffortModel.workEffort);
            this.notificationsService.success('portal.work-efforts.work-effort.notification.deleted');
          });
      })
      .catch(() => {
      });
  }

}
