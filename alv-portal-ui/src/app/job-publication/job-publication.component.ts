import { Component } from '@angular/core';
import { NotificationType } from '../shared/layout/notifications/notification.model';

@Component({
  selector: 'alv-job-publication',
  templateUrl: './job-publication.component.html',
  styleUrls: ['./job-publication.component.scss']
})
export class JobPublicationComponent {

  successNotification = {
    type: NotificationType.SUCCESS,
    messageKey: 'portal.job-publication.submit.success',
    isSticky: true
  };

  infoNotification = {
    type: NotificationType.INFO,
    isSticky: true
  };

  submitted = false;

  jobPublicationCreated() {
    this.submitted = true;
  }

  createNewJobPublication() {
    this.submitted = false;
  }
}
