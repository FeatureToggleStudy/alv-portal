import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RestError } from './error';
import { NotificationsService } from '../notifications.service';
import { NotificationType } from '../../shared/layout/notifications/notification.model';

function isNil(value){
  return value === undefined || value === null;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  private exceptionStatusRegistry: { [id: number]: ErrorMappingEntry; } = {};

  private exceptionNameRegistry: { [id: string]: ErrorMappingEntry; } = {};

  constructor(private notificationsService: NotificationsService) {

  }

  handleError(error) {
    this.showFixedMessage('An error on the server occured', NotificationType.ERROR);
    console.error(error);
  }

  handleHttpError(httpErrorResponse: HttpErrorResponse) {
    if (!(httpErrorResponse instanceof HttpErrorResponse)) {
      throw new Error('The given ErrorResponse is not type HttpErrorResponse');
    }

    if (this.handleByStatus(httpErrorResponse)) {
      return;
    }

    if (this.handleByExceptionName(httpErrorResponse)) {
      return;
    }

    this.handleAny(httpErrorResponse);
  }

  private handleAny(httpErrorResponse: HttpErrorResponse) {
    this.showFixedMessage('An error on the server occured', NotificationType.ERROR);
  }

  private handleByExceptionName(httpErrorResponse: HttpErrorResponse) {
    const errorContent = <RestError> httpErrorResponse.error;
    if (!ErrorHandlerService.isRestError(errorContent)) {
      return false;
    }
    const errorMappingEntry = this.exceptionNameRegistry[errorContent.exceptionName];
    if (errorMappingEntry) {
      this.showFixedMessage(errorMappingEntry.messageKey, errorMappingEntry.type, errorMappingEntry.messageParams(errorContent));
    } else {
      // DEFAULT WITH CORRELATION-ID
      this.showFixedMessage(
          'API.EXCEPTION.STATUS.DEFAULT.MESSAGE.CORRELATIONID',
          NotificationType.ERROR,
          {'correlationId': errorContent.correlationId}
      );
    }
    return true;
  }

  private static isRestError(errorContent: RestError) {
    return !isNil(errorContent) && !isNil(errorContent.correlationId) && !isNil(errorContent.exceptionName);
  }

  private handleByStatus(httpErrorResponse: HttpErrorResponse) {
    const statusErrorMapper = this.exceptionStatusRegistry[httpErrorResponse.status];
    if (statusErrorMapper) {
      this.showFixedMessage(statusErrorMapper.messageKey, statusErrorMapper.type);
      return true;
    }
    return false;
  }

  private showFixedMessage(messageKey: string, type: NotificationType, messageVariables?: any) {
    this.showMessage(messageKey, true, type, messageVariables);
  }

  private showAutoClosedMessage(messageKey: string, type: NotificationType, messageVariables?: any) {
    this.showMessage(messageKey, false, type, messageVariables);
  }

  private showMessage(messageKey: string, sticky: boolean, type: NotificationType, messageVariables?: any) {
    this.notificationsService.add({type: type, messageKey: messageKey, isSticky: sticky});
  }
}

class ErrorMappingEntry {

  constructor(public readonly messageKey,
              public readonly type: NotificationType,
              public readonly messageParams: (restError: RestError) => {} = () => undefined) {
  }


}
