import { Injectable } from '@angular/core';
import { ProofOfWorkEffortsRepository } from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.repository';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { InitialFormValueConfig } from '../../../job-advertisement/job-publication/job-publication-form/job-publication-form-value-factory';
import { mapToWorkEffortFormValue } from './work-effort-form.mapper';
import { map, take } from 'rxjs/operators';
import { WorkEffort } from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';
import { WorkEffortFormValue } from './work-effort-form.types';

@Injectable({
  providedIn: 'root'
})
export class WorkEffortFormResolverService implements Resolve<Observable<WorkEffortFormValue>> {

  constructor(private proofOfWorkEffortsRepository: ProofOfWorkEffortsRepository) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkEffortFormValue> {
    const workEffortId = route.params['id'];
    return this.proofOfWorkEffortsRepository.getWorkEffortById(workEffortId).pipe(
      map((workEffort: WorkEffort) => mapToWorkEffortFormValue(workEffort))
    );
  }
}
