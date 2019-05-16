import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private zone: NgZone, private errorHandlerService: ErrorHandlerService) {

  }

  handleError(error) {
    // we need to run the following code inside a angular zone
    this.zone.run(() => {
      if (error instanceof HttpErrorResponse) {
        this.errorHandlerService.handleHttpError(error);
      } else {
        const rejection = error.rejection;
        if (rejection instanceof HttpErrorResponse) {
          this.errorHandlerService.handleHttpError(rejection);
        } else {
          this.errorHandlerService.handleError(error);
        }
      }
    });
  }

}
