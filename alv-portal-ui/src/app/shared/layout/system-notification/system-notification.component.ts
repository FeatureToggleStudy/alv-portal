import { Component, Input, OnInit } from '@angular/core';
import { SystemNotificationDto } from '../../backend-services/system-notifications/system-notification.types';
import { I18nService } from '../../../core/i18n.service';

@Component({
  selector: 'alv-system-notification',
  templateUrl: './system-notification.component.html',
  styleUrls: ['./system-notification.component.scss']

})
export class SystemNotificationComponent implements OnInit {


  @Input() activeSystemNotifications: SystemNotificationDto[];

  constructor(private i18nService: I18nService) {
  }

  ngOnInit() {
  }

}
