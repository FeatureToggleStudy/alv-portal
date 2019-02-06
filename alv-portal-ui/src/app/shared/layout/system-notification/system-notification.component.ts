import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../../core/i18n.service';
import { Observable } from 'rxjs';
import { SystemNotificationRepository } from '../../backend-services/system-notifications/system-notification-repository';
import { NotificationType } from '../notifications/notification.model';
import {
  SystemNotificationDto,
  SystemNotificationType
} from '../../backend-services/system-notifications/system-notification.types';

@Component({
  selector: 'alv-system-notification',
  templateUrl: './system-notification.component.html',
  styleUrls: ['./system-notification.component.scss']

})
export class SystemNotificationComponent implements OnInit {

  NotificationType = NotificationType;

  currentLanguage$: Observable<string>;

  systemNotifications: SystemNotificationDto[];

  constructor(private i18nService: I18nService,
              private systemNotificationRepository: SystemNotificationRepository) {
  }

  ngOnInit() {
    this.currentLanguage$ = this.i18nService.currentLanguage$;

    this.loadActiveSystemNotifications().subscribe(
      systemNotifications => {
        this.systemNotifications = systemNotifications;
      }
    );
  }

  mapNotificationType(systemNotificationType: SystemNotificationType): NotificationType {
    return systemNotificationType.toLowerCase() === SystemNotificationType.SYSTEMERROR ? NotificationType.ERROR : NotificationType.WARNING;
  }

  hideSystemNotification(index: number) {
    this.systemNotifications.splice(index, 1);
  }
  private loadActiveSystemNotifications(): Observable<SystemNotificationDto[]> {
    return this.systemNotificationRepository.getActiveSystemNotifications();
  }
}
/*
withLatestFrom(this.i18nService.currentLanguage$),
      map(([notifications, currentLanguage]) => notifications.map(notification => {
        return {
          type: notification.type === 'systemerror' ? NotificationType.ERROR : NotificationType.WARNING,
          messageKey: notification['text_' + currentLanguage],
          isSticky: true
        };
      }))
 */
