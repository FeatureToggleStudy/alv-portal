import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { WorkEffortsRepository } from '../../../shared/backend-services/work-efforts/work-efforts.repository';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { InitialFormValueConfig } from '../../../job-advertisement/job-publication/job-publication-form/job-publication-form-value-factory';
import { mapToWorkEffortFormValue, WorkEffortFormValue } from './work-effort-form.mapper';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkEffortFormResolverService implements Resolve<Observable<InitialFormValueConfig>> {

  constructor(private workEffortsRepository: WorkEffortsRepository) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkEffortFormValue> {
    const workEffortId = route.params['id'];
    return this.workEffortsRepository.getWorkEffortById(workEffortId).pipe(
      map(workEffort => mapToWorkEffortFormValue(workEffort))
    );
  }
}
