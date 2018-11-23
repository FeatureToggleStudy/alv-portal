import { Component, OnInit } from '@angular/core';
import { Notification } from '../notification.model';
import { NotificationsService } from '../../../../core/notifications.service';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'alv-notifications-container',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  animations: [
    trigger('insertRemoveNotification', [
      transition(':enter', [
        style({
          transform: 'translateY(-200px)',
          opacity: 1,
          height: 0
        }),
        animate('0.5s ease-in-out', style({
          transform: 'translateY(0)',
          opacity: 1,
          height: '100%'
        })),
      ]),
      transition(':leave', [
        animate('0.5s ease-in', keyframes([
          style({
            transform: 'translateX(0%)',
            opacity: 1,
            maxHeight: '250px'
          }),
          style({
            transform: 'translateX(120%)',
            opacity: 0.5
          }),
          style({
            opacity: 0,
            maxHeight: 0
          })
        ]))
      ])
    ]),
  ]
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
