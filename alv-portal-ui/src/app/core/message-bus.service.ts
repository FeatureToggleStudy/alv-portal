import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

/**
 * Message bus service, simple implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class MessageBusService {

  private eventEmitters = new Array<EventEmitter<string>>();

  constructor() {
  }

  emit(messageType: MessageType, message?: string) {
    this.getChannel(messageType).emit(message);
  }

  of(messageType: MessageType): Observable<string> {
    return this.getChannel(messageType).asObservable();
  }

  private getChannel(messageType: MessageType): EventEmitter<string> {
    if (!this.eventEmitters[messageType]) {
      this.eventEmitters[messageType] = new EventEmitter<string>(false);
    }

    return this.eventEmitters[messageType];
  }
}

export enum MessageType {
  LOGOUT,
  LOGIN,
  TOGGLE_NAVIGATION
}

