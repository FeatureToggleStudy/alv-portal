import { Component, OnInit } from '@angular/core';
import { Notification, NotificationsService } from '../notifications.service';

@Component({
  selector: 'alv-notifications-container',
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.scss']
})
export class NotificationsContainerComponent implements OnInit {

  public notifications: Array<Notification> = [];

  constructor(private notificationsService: NotificationsService) {
    this.notifications = notificationsService.notifications;
  }

  ngOnInit() {
  }

}
