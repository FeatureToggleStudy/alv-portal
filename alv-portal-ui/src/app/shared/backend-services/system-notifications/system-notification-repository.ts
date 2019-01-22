import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {SystemNotification} from "./system-notification.types";

@Injectable({providedIn: 'root'})
export class SystemNotificationRepository {

  public static SYSTEM_NOTIFICATION_URL = '/api/system-notifications/';

  constructor(private http: HttpClient) {
  }

  createSystemNotification(systemNotification: SystemNotification): Observable<SystemNotification> {
    return this.http.post<SystemNotification>(SystemNotificationRepository.SYSTEM_NOTIFICATION_URL, systemNotification)
  }

  deleteSystemNotification(systemNotification: SystemNotification): Observable<SystemNotification> {
    return this.http.delete<SystemNotification>(`${SystemNotificationRepository.SYSTEM_NOTIFICATION_URL}/${systemNotification.id}`)
  }

  updateSystemNotification(systemNotification: SystemNotification): Observable<SystemNotification> {
    return this.http.patch<SystemNotification>(SystemNotificationRepository.SYSTEM_NOTIFICATION_URL, systemNotification)
  }

  getAllSystemNotifications(): Observable<SystemNotification[]> {
    return this.http.get<SystemNotification[]>(`${SystemNotificationRepository.SYSTEM_NOTIFICATION_URL}`)
  }

  getActiveSystemNotifications(): Observable<SystemNotification[]> {
    return this.http.get<SystemNotification[]>(SystemNotificationRepository.SYSTEM_NOTIFICATION_URL)
  }

}
