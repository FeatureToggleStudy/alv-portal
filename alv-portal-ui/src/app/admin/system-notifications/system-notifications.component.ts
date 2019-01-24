import { Component, OnInit } from '@angular/core';
import { AbstractSubscriber } from '../../core/abstract-subscriber';
import { Subject } from 'rxjs';
import { SystemNotificationDto } from '../../shared/backend-services/system-notifications/system-notification.types';
import { SystemNotificationRepository } from '../../shared/backend-services/system-notifications/system-notification-repository';
import { ModalService } from '../../shared/layout/modal/modal.service';
import { SystemNotificationEditModalComponent } from './edit-modal/system-notification-edit-modal.component';
import { SystemNotificationCreateModalComponent } from './create-modal/system-notification-create-modal.component';
import { NotificationsService } from '../../core/notifications.service';
import { ConfirmModalConfig } from '../../shared/layout/modal/confirm-modal/confirm-modal-config.model';

@Component({
  selector: 'alv-system-notifications',
  templateUrl: './system-notifications.component.html',
})
export class SystemNotificationsComponent extends AbstractSubscriber implements OnInit {

  systemNotifications$ = new Subject<SystemNotificationDto[]>();

  constructor(private systemNotificationRepository: SystemNotificationRepository,
              private modalService: ModalService,
              private notificationsService: NotificationsService) {
    super();
  }

  ngOnInit(): void {
    this.loadSystemNotifications();
  }

  openCreateModal() {
    const createModalRef = this.modalService.openLarge(SystemNotificationCreateModalComponent);
    createModalRef.result
      .then(() => {
        this.loadSystemNotifications();
        this.notificationsService.success('portal.admin.system-notifications.notifications.create.success', false);
      })
      .catch(() => {
      });
  }

  openEditModal(systemNotification: SystemNotificationDto) {
    const modalRef = this.modalService.openLarge(SystemNotificationEditModalComponent);
    const editModalComponent = <SystemNotificationEditModalComponent>modalRef.componentInstance;
    editModalComponent.systemNotification = systemNotification;
    modalRef.result
      .then(() => {
        this.loadSystemNotifications();
        this.notificationsService.success('portal.admin.system-notifications.notifications.edit.success', false);
      })
      .catch(() => {
      });
  }

  openDeleteModal(id: string) {
    this.modalService.openConfirm({
      title: 'portal.admin.system-notifications.delete.modal.title',
      content: 'portal.admin.system-notifications.delete.modal.text',
      confirmLabel: 'portal.admin.system-notifications.delete.modal.confirm-dialog.yes',
      cancelLabel: 'portal.admin.system-notifications.delete.modal.confirm-dialog.no'
    } as ConfirmModalConfig).result
      .then(
        () => {
          this.notificationsService.success('portal.admin.system-notifications.notifications.delete.success', false);
          this.systemNotificationRepository.deleteSystemNotification(id)
            .subscribe(() => this.loadSystemNotifications());
        })
      .catch(() => {
      });

  }

  toggleStatus(systemNotification: SystemNotificationDto) {
    const activated = !systemNotification.active;
    const updatedNotification = {
      ...systemNotification,
      active: activated
    };
    this.systemNotificationRepository.updateSystemNotification(updatedNotification)
      .subscribe(() => {
        systemNotification.active = activated;
      });
  }

  private loadSystemNotifications() {
    this.systemNotificationRepository.getAllSystemNotifications()
      .subscribe(value => {
        this.systemNotifications$.next(value);
      });
  }
}
