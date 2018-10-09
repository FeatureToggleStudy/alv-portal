import { Component, OnInit } from '@angular/core';
import { Notification } from '../notification.model';

@Component({
  selector: 'alv-notifications-container',
  templateUrl: './notifications-container.component.html',
  styleUrls: ['./notifications-container.component.scss']
})
export class NotificationsContainerComponent implements OnInit {

  public notifications: Notification[];
  constructor(){ }

  ngOnInit() {
  }

}
