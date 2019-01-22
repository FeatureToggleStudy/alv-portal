import {Component, OnInit} from "@angular/core";
import {AbstractSubscriber} from "../../core/abstract-subscriber";
import {Observable} from "rxjs";
import {SystemNotification} from "../../shared/backend-services/system-notifications/system-notification.types";
import {SystemNotificationRepository} from "../../shared/backend-services/system-notifications/system-notification-repository";
import {ModalService} from '../../shared/layout/modal/modal.service';
import {SystemNotificationEditModalComponent} from "./edit-modal/system-notification-edit-modal.component";
import {SystemNotificationCreateModalComponent} from "./create-modal/system-notification-create-modal.component";
import {SystemNotificationDeleteModalComponent} from "./delete-modal/system-notification-delete-modal.component";

@Component({
  selector: 'system-notifications-dashboard',
  templateUrl: './system-notifications-dashboard.component.html',
})
export class SystemNotificationsDashboardComponent extends AbstractSubscriber implements OnInit {

  systemNotifications$: Observable<SystemNotification[]>;

  constructor(private systemNotificationRepository: SystemNotificationRepository,
              private modalService: ModalService) {
    super();
  }

  ngOnInit(): void {
    this.systemNotifications$ = this.systemNotificationRepository.getAllSystemNotifications();
  }

  openCreateModal(systemNotification: SystemNotification) {
    const modalRef = this.modalService.openLarge(SystemNotificationCreateModalComponent);
    modalRef.componentInstance.systemNotification = systemNotification;
    modalRef.componentInstance.createEvent.subscribe(
      (systemNotification) => {
        this.systemNotificationRepository.createSystemNotification(systemNotification);
      }
    );
  }

  openEditModal(systemNotification: SystemNotification) {
    const modalRef = this.modalService.openLarge(SystemNotificationEditModalComponent);
    modalRef.componentInstance.systemNotification = systemNotification;
    modalRef.componentInstance.updateEvent.subscribe(
      (systemNotification) => {
        this.systemNotificationRepository.updateSystemNotification(systemNotification);
      }
    );
  }

  openDeleteModal(systemNotification: SystemNotification) {
    const modalRef = this.modalService.openLarge(SystemNotificationDeleteModalComponent);
    modalRef.componentInstance.systemNotification = systemNotification;
    modalRef.componentInstance.deleteEvent.subscribe(
      (systemNotification) => {
        this.systemNotificationRepository.deleteSystemNotification(systemNotification);
      }
    );
  }
  //FIXME fago: improve this
  toggleStatus(systemNotification: SystemNotification,
               isActivated: boolean) {
    systemNotification.active = isActivated;
    this.systemNotificationRepository.updateSystemNotification(systemNotification);
  };
}
