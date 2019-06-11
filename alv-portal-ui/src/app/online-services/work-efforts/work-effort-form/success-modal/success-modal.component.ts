import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationType } from '../../../../shared/layout/notifications/notification.model';

export enum ActionsOnClose {
  RECORD_NEW = 'RECORD_NEW',
  GO_TO_LIST = 'BACK_TO_LIST'
}

@Component({
  selector: 'alv-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent implements OnInit {
  notificationType = NotificationType;

  constructor(private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
  }

  goToWorkEffortList() {
    this.activeModal.close(ActionsOnClose.GO_TO_LIST)
  }

  recordAnotherWorkEffort() {
    this.activeModal.close(ActionsOnClose.RECORD_NEW);

  }
}


