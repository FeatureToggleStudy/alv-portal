import { Component, Input, OnInit } from '@angular/core';
import {
  SystemNotificationDto,
  SystemNotificationType
} from '../../backend-services/system-notifications/system-notification.types';
import { I18nService } from '../../../core/i18n.service';

@Component({
  selector: 'alv-system-notification',
  templateUrl: './system-notification.component.html',
  styleUrls: ['./system-notification.component.scss']

})
export class SystemNotificationComponent implements OnInit {

  @Input() activeSystemNotifications: SystemNotificationDto[];

  private visible = true;

  constructor(private i18nService: I18nService) {
  }

  ngOnInit() {
  }

  getTypeClass(type: SystemNotificationType): string {
    return `system-notification-${type.toString().toLowerCase()}`;
  }

  getType(type: SystemNotificationType): string {
    return `portal.admin.system-notifications.systemnotification.type.${type.toString().toLowerCase()}`;
  }

  getIconClass(type: SystemNotificationType): string {
    return type.toString().toLowerCase() === SystemNotificationType.SYSTEMERROR ? `fa fa-ban` : `fa fa-exclamation`;
  }

  toggleVisible() {
    this.visible = !this.visible;
  }

  getCurrentLanguage(type: SystemNotificationType) {
    //todo fago translate the values
  }

}
