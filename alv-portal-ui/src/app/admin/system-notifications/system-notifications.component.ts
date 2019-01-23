import {Component, OnInit} from '@angular/core';
import {AbstractSubscriber} from '../../core/abstract-subscriber';
import {Observable} from 'rxjs';
import {SystemNotification} from '../../shared/backend-services/system-notifications/system-notification.types';
import {SystemNotificationRepository} from '../../shared/backend-services/system-notifications/system-notification-repository';
import {ModalService} from '../../shared/layout/modal/modal.service';
import {SystemNotificationEditModalComponent} from './edit-modal/system-notification-edit-modal.component';
import {SystemNotificationCreateModalComponent} from './create-modal/system-notification-create-modal.component';
import {SystemNotificationDeleteModalComponent} from './delete-modal/system-notification-delete-modal.component';
import {Notification, NotificationType} from '../../shared/layout/notifications/notification.model';

const ALERTS = {
  createSuccess: {
    type: NotificationType.SUCCESS,
    messageKey: 'SUCCESS',
    isSticky: true
  } as Notification,
  editSuccess: {
    type: NotificationType.SUCCESS,
    messageKey: 'SUCCESS',
    isSticky: true
  } as Notification,
  deleteSuccess: {
    type: NotificationType.SUCCESS,
    messageKey: 'SUCCESS',
    isSticky: true
  } as Notification
};

@Component({
  selector: 'alv-system-notifications',
  templateUrl: './system-notifications.component.html',
})
export class SystemNotificationsComponent extends AbstractSubscriber implements OnInit {

  systemNotifications$: Observable<SystemNotification[]>;

  alert: Notification = null;

  constructor(private systemNotificationRepository: SystemNotificationRepository,
              private modalService: ModalService) {
    super();
  }

  ngOnInit(): void {
    this.systemNotifications$ = this.systemNotificationRepository.getAllSystemNotifications();
  }

  openCreateModal() {
    const createModalRef = this.modalService.openLarge(SystemNotificationCreateModalComponent);
    createModalRef.result
      .then(() => {
        this.alert = ALERTS.createSuccess;
      })
      .catch(() => {
      });
  }

  openEditModal(systemNotification: SystemNotification) {
    const modalRef = this.modalService.openLarge(SystemNotificationEditModalComponent);
    const editModalComponent = <SystemNotificationEditModalComponent>modalRef.componentInstance;
    editModalComponent.systemNotification = systemNotification;
    modalRef.result.then(() => {
      this.alert = ALERTS.editSuccess;
    })
      .catch(() => {
      });
  }

  //FIXME fago: use confirm dialog
  openDeleteModal(id: string) {
    const modalRef = this.modalService.openLarge(SystemNotificationDeleteModalComponent);
    const deleteModalComponent = <SystemNotificationDeleteModalComponent>modalRef.componentInstance;
    deleteModalComponent.id = id;
    modalRef.result.then(() => {
      this.alert = ALERTS.deleteSuccess;
    })
      .catch(() => {
      });
  }

  //FIXME fago: improve this
  toggleStatus(systemNotification: SystemNotification,
               isActivated: boolean) {
    systemNotification.active = isActivated;
    this.systemNotificationRepository.updateSystemNotification(systemNotification);
  }
}
