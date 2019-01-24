import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AbstractSubscriber } from '../../core/abstract-subscriber';

import { Observable } from 'rxjs';

import { ModalService } from '../../shared/layout/modal/modal.service';
import {
  BlacklistedAgent,
  BlacklistedAgentStatus
} from '../../shared/backend-services/blacklist/blacklist.types';
import { BlacklistRepository } from '../../shared/backend-services/blacklist/blacklist.repository';
import { ConfirmModalConfig } from '../../shared/layout/modal/confirm-modal/confirm-modal-config.model';
import {
  Notification,
  NotificationType
} from '../../shared/layout/notifications/notification.model';


@Component({
  selector: 'alv-user-info',
  templateUrl: './blacklist.component.html',
  //styleUrls: ['./user-info.component.scss']
})
export class BlacklistComponent extends AbstractSubscriber implements OnInit {

  public blacklistedAgents$: Observable<BlacklistedAgent[]>;

  public alert: Notification = null;

  private readonly ALERTS = {
    userTechError: {
      type: NotificationType.ERROR,
      messageKey: 'portal.admin.user-info.alert.user-info-technical',
      isSticky: true
    } as Notification,
    changeSuccess: {
      type: NotificationType.SUCCESS,
      messageKey: 'blacklisted-agent.change-status-success-message',
      isSticky: true
    } as Notification,
    addSuccess: {
      type: NotificationType.SUCCESS,
      messageKey: 'blacklisted-agent.add-success-message',
      isSticky: true
    } as Notification
  };


  constructor(private fb: FormBuilder,
              private blacklistRepository: BlacklistRepository,
              private modalService: ModalService) {
    super();
  }

  ngOnInit() {
    this.getAllBlacklistedAgents();

  }

  isActive(agent: BlacklistedAgent) {
    return !!agent && agent.status === BlacklistedAgentStatus.ACTIVE;
  }

  private getAllBlacklistedAgents() {
    this.blacklistedAgents$ = this.blacklistRepository.getAllBlacklistedAgents();
  }

  private saveChangeStatus(agent: BlacklistedAgent) {
    let status:BlacklistedAgentStatus;
    if (this.isActive(agent)){
      status = BlacklistedAgentStatus.INACTIVE;
    } else {
      status = BlacklistedAgentStatus.ACTIVE;
    }
    this.blacklistRepository.changeStatus(agent, status)
        .subscribe(() => {
          this.getAllBlacklistedAgents()
          this.alert = this.ALERTS.changeSuccess;
        }, error => {
          this.alert = this.ALERTS.userTechError;

        })
  }

  public openChangeStatusDialog(agent: BlacklistedAgent){
    this.modalService.openConfirm({
      title: 'blacklisted-agent.change-status-dialog.title',
      content: 'blacklisted-agent.change-status-dialog.message',
      contentParams: { agentName: agent.name },
      confirmLabel: 'blacklisted-agent.change-status-dialog.change-status',
      cancelLabel: 'blacklisted-agent.change-status-dialog.cancel'
    } as ConfirmModalConfig).result
      .then(
        () => {
          this.saveChangeStatus(agent);
        },
        () => {});
  }

  dismissAlert() {
    this.alert = null;
  }
}
