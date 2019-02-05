import { Component } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';

/**
 * Alert is typically used in forms and inline
 */
@Component({
  selector: 'alv-alert',
  templateUrl: '../notification/notification.component.html',
  styleUrls: ['../notification/notification.component.scss']
})
export class AlertComponent extends NotificationComponent {

  constructor() {
    super();
  }

}
