import { Component, OnInit } from '@angular/core';
import { Notification } from '../notification.model';
import { NotificationsService } from '../../../../core/notifications.service';

@Component({
  selector: 'alv-notifications-container',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public notifications: Notification[];

  constructor(private notificationsService: NotificationsService) {
    this.notifications = this.notificationsService.notifications;
  }

  dismiss(notification: Notification) {
    this.notificationsService.remove(notification.id);
  }

  ngOnInit() {
  }

}
