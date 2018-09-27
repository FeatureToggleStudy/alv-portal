import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

/**
 * Message bus service, simple implementation.
 */
@Injectable({
  providedIn: 'root'
})
export class MessageBusService {

  private eventEmitters = new Array<EventEmitter<any>>();

  constructor() {
  }

  emit<T>(messageType: MessageType, message?: T) {
    this.getChannel(messageType).emit(message);
  }

  of<T>(messageType: MessageType): Observable<T> {
    return this.getChannel<T>(messageType).asObservable();
  }

  private getChannel<T>(messageType: MessageType): EventEmitter<T> {
    if (!this.eventEmitters[messageType]) {
      this.eventEmitters[messageType] = new EventEmitter<T>(false);
    }

    return this.eventEmitters[messageType];
  }

}

export enum MessageType {
  CURRENT_USER,
  TOGGLE_NAVIGATION
}

