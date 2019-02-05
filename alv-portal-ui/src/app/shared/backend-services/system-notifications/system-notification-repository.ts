import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SystemNotificationDto } from './system-notification.types';

@Injectable({providedIn: 'root'})
export class SystemNotificationRepository {

  public static SYSTEM_NOTIFICATION_URL = '/api/system-notifications/';
  public static SYSTEM_NOTIFICATION_ACTIVE_URL = '/api/active-system-notifications';

  constructor(private http: HttpClient) {
  }

  createSystemNotification(systemNotification: SystemNotificationDto): Observable<SystemNotificationDto> {
    return this.http.post<SystemNotificationDto>(SystemNotificationRepository.SYSTEM_NOTIFICATION_URL, systemNotification);
  }

  deleteSystemNotification(id: string): Observable<SystemNotificationDto> {
    return this.http.delete<SystemNotificationDto>(`${SystemNotificationRepository.SYSTEM_NOTIFICATION_URL}${id}`);
  }

  updateSystemNotification(systemNotification: SystemNotificationDto): Observable<SystemNotificationDto> {
    return this.http.patch<SystemNotificationDto>(SystemNotificationRepository.SYSTEM_NOTIFICATION_URL, systemNotification);
  }

  getAllSystemNotifications(): Observable<SystemNotificationDto[]> {
    return this.http.get<SystemNotificationDto[]>(`${SystemNotificationRepository.SYSTEM_NOTIFICATION_URL}`);
  }

  getActiveSystemNotifications(): Observable<SystemNotificationDto[]> {
    return this.http.get<SystemNotificationDto[]>(SystemNotificationRepository.SYSTEM_NOTIFICATION_ACTIVE_URL);
  }

}
