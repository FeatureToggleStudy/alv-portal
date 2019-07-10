import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalService } from '../../../../shared/layout/modal/modal.service';
import { deleteWorkEffortModalConfig } from '../modal-config.types';
import { NotificationsService } from '../../../../core/notifications.service';
import { ProofOfWorkEffortsRepository } from '../../../../shared/backend-services/work-efforts/proof-of-work-efforts.repository';
import { WorkEffortModel } from './work-effort.model';

@Component({
  selector: 'alv-work-effort',
  templateUrl: './work-effort.component.html',
  styleUrls: ['./work-effort.component.scss']
})
export class WorkEffortComponent {

  @Input() workEffortModel: WorkEffortModel;

  @Output() deleted = new EventEmitter<WorkEffortModel>();

  constructor(private modalService: ModalService,
              private proofOfWorkEffortsRepository: ProofOfWorkEffortsRepository,
              private notificationsService: NotificationsService) {
  }

  deleteWorkEffort() {
    this.modalService.openConfirm(
      deleteWorkEffortModalConfig
    ).result
      .then(result => {
        this.proofOfWorkEffortsRepository.deleteWorkEffort(this.workEffortModel.id, this.workEffortModel.id)
          .subscribe(() => {
            this.deleted.emit(this.workEffortModel);
            this.notificationsService.success('portal.work-efforts.work-effort.notification.deleted');
          });
      })
      .catch(() => {
      });
  }

}
