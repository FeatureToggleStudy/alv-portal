import { Component, Input, OnInit } from '@angular/core';
import {
  SystemNotificationDto,
  SystemNotificationType
} from '../../backend-services/system-notifications/system-notification.types';
import { I18nService } from '../../../core/i18n.service';
import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SystemNotificationRepository } from '../../backend-services/system-notifications/system-notification-repository';
import { Notification, NotificationType } from '../notifications/notification.model';

@Component({
  selector: 'alv-system-notification',
  templateUrl: './system-notification.component.html',
  styleUrls: ['./system-notification.component.scss']

})
export class SystemNotificationComponent implements OnInit {

  @Input() activeSystemNotifications: SystemNotificationDto[];

  visible = true;

  systemNotifications: Notification[];

  constructor(private i18nService: I18nService,
              private systemNotificationRepository: SystemNotificationRepository) {
  }

  ngOnInit() {
    this.loadActiveSystemNotifications().subscribe(
      systemNotifications => {
        this.systemNotifications = systemNotifications;
      }
    );
  }

  getTypeStyleClass(type: SystemNotificationType): string {
    return `system-notification-${type.toString().toLowerCase()}`;
  }

  getType(type: SystemNotificationType): string {
    return `portal.admin.system-notifications.systemnotification.type.${type.toString().toLowerCase()}`;
  }

  getIconClass(type: SystemNotificationType): string {
    return type.toString().toLowerCase() === SystemNotificationType.SYSTEMERROR ? `fa fa-ban` : `fa fa-exclamation`;
  }

  dismissNotification() {
    this.visible = !this.visible;
  }

  getCurrentLanguage(activeSystemNotification: SystemNotificationDto): Observable<string> {
    return this.i18nService.currentLanguage$.pipe(
      switchMap((language) => {
        if (language === 'de') {
          return of(activeSystemNotification.text_de);
        }
        if (language === 'fr') {
          return of(activeSystemNotification.text_fr);
        }
        if (language === 'it') {
          return of(activeSystemNotification.text_it);
        }
        if (language === 'en') {
          return of(activeSystemNotification.text_en);
        }
      }));
  }

  private loadActiveSystemNotifications(): Observable<Notification[]> {
    return this.systemNotificationRepository.getActiveSystemNotifications().pipe(
      withLatestFrom(this.i18nService.currentLanguage$),
      map(([notifications, currentLanguage]) => notifications.map(notification => {
        return {
          type: notification.type === 'systemerror' ? NotificationType.ERROR : NotificationType.WARNING,
          messageKey: notification['text_' + currentLanguage],
          isSticky: true
        };
      }))
    );
  }
}
