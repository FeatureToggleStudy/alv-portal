import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../../core/i18n.service';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { SystemNotificationRepository } from '../../backend-services/system-notifications/system-notification-repository';
import { Notification, NotificationType } from '../notifications/notification.model';
import {
  SystemNotificationDto,
  SystemNotificationType
} from '../../backend-services/system-notifications/system-notification.types';
import { map, takeUntil } from 'rxjs/operators';
import { AbstractSubscriber } from '../../../core/abstract-subscriber';

function extractMessageKey(systemNotificationDto: SystemNotificationDto, currentLang: string) {
  switch (currentLang) {
    case 'fr':
      return systemNotificationDto.text_fr;
    case 'it':
      return systemNotificationDto.text_it;
    case 'en':
      return systemNotificationDto.text_en;
    default:
      return systemNotificationDto.text_de;
  }
}

function extractType(systemNotificationDto: SystemNotificationDto) {
  return systemNotificationDto.type.toLowerCase() === SystemNotificationType.SYSTEMERROR ? NotificationType.ERROR : NotificationType.WARNING;
}

@Component({
  selector: 'alv-system-notification',
  templateUrl: './system-notification.component.html',
  styleUrls: ['./system-notification.component.scss']

})
export class SystemNotificationComponent extends AbstractSubscriber implements OnInit {

  NotificationType = NotificationType;

  currentLanguage$: Observable<string>;

  systemNotifications$ = new BehaviorSubject<Notification[]>([]);

  constructor(private i18nService: I18nService,
              private systemNotificationRepository: SystemNotificationRepository) {
    super();
  }

  ngOnInit() {
    this.currentLanguage$ = this.i18nService.currentLanguage$;

    combineLatest(this.i18nService.currentLanguage$, this.systemNotificationRepository.getActiveSystemNotifications()).pipe(
      map(([currentLang, systemNotifications]) => {
        return systemNotifications.map(systemNotificationDto => {
          return {
            type: extractType(systemNotificationDto),
            messageKey: extractMessageKey(systemNotificationDto, currentLang),
            isSticky: true
          };
        });
      }),
      takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        this.systemNotifications$.next(value);
      });
  }

  hideSystemNotification(index: number) {
    const notifications = this.systemNotifications$.value;
    notifications.splice(index, 1);
    this.systemNotifications$.next(notifications);
  }

}
