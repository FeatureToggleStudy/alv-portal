import { HttpErrorResponse } from '@angular/common/http';

export function matchesStatus(error: HttpErrorResponse, status: number) {
  return error.status === status;
}

export interface HttpErrorHandlerStrategy {

  matches: (error: HttpErrorResponse) => boolean;

  handle(): void;

}
