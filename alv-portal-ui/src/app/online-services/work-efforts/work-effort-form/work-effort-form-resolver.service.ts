import { Injectable } from '@angular/core';
import { ProofOfWorkEffortsRepository } from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.repository';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { mapToWorkEffortFormValue } from './work-effort-form.mapper';
import { map } from 'rxjs/operators';
import { WorkEffort } from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';
import { WorkEffortFormInfo } from './work-effort-form.types';

@Injectable({
  providedIn: 'root'
})
export class WorkEffortFormResolverService implements Resolve<Observable<WorkEffortFormInfo>> {

  constructor(private proofOfWorkEffortsRepository: ProofOfWorkEffortsRepository) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkEffortFormInfo> {
    const proofOfWorkEffortsId = route.params['proof-id'];
    const workEffortId = route.params['id'];
    return this.proofOfWorkEffortsRepository.getWorkEffortById(proofOfWorkEffortsId, workEffortId).pipe(
      map((workEffort: WorkEffort) => {
        return {
          workEffortFormValue: mapToWorkEffortFormValue(workEffort),
          readonly: !!workEffort.submittedAt
        };
      })
    );
  }
}
