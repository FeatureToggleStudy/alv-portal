import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { WorkEffortFormComponent } from './work-effort-form.component';
import { Observable, of } from 'rxjs';
import { ConfirmModalConfig } from '../../../shared/layout/modal/confirm-modal/confirm-modal-config.model';
import { ModalService } from '../../../shared/layout/modal/modal.service';
import { fromPromise } from 'rxjs/internal-compatibility';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class WorkEffortFormGuard implements CanDeactivate<WorkEffortFormComponent> {

  constructor(private modalService: ModalService) {
  }

  canDeactivate(component: WorkEffortFormComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.workEffortFormGroup.dirty) {
      return fromPromise(
        this.modalService.openConfirm({
          title: 'portal.work-efforts.work-effort.confirm-discard-modal.title',
          content: 'portal.work-efforts.work-effort.confirm-discard-modal.content',
          confirmLabel: 'portal.work-efforts.work-effort.confirm-discard-modal.confirm-label',
          cancelLabel: 'portal.work-efforts.work-effort.confirm-discard-modal.cancel-label'
        } as ConfirmModalConfig).result).pipe(
        map(result => !!result),
        catchError(err => of(false))
      );
    }
    return true;
  }

}
