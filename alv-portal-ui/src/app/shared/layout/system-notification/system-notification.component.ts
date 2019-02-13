import {Component, OnInit} from '@angular/core';
import {I18nService} from '../../../core/i18n.service';
import {combineLatest, Observable} from 'rxjs';
import {SystemNotificationRepository} from '../../backend-services/system-notifications/system-notification-repository';
import {Notification, NotificationType} from '../notifications/notification.model';
import {
  SystemNotificationDto,
  SystemNotificationType
} from '../../backend-services/system-notifications/system-notification.types';
import {map} from 'rxjs/operators';

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
export class SystemNotificationComponent implements OnInit {

  NotificationType = NotificationType;

  currentLanguage$: Observable<string>;

  systemNotifications$: Observable<Notification[]>;

  constructor(private i18nService: I18nService,
              private systemNotificationRepository: SystemNotificationRepository) {
  }

  ngOnInit() {
    this.currentLanguage$ = this.i18nService.currentLanguage$;

    this.systemNotifications$ = combineLatest(this.i18nService.currentLanguage$, this.systemNotificationRepository.getActiveSystemNotifications())
      .pipe(
        map(([currentLang, systemNotifications]) => {
          return systemNotifications.map(systemNotificationDto => {
            return {
              type: extractType(systemNotificationDto),
              isSticky: true,
              messageKey: extractMessageKey(systemNotificationDto, currentLang)
            };
          });
        }));
  }


  hideSystemNotification(index: number) {
    //FIXME pado this.systemNotifications$.
  }

}
