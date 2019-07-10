import { Injectable } from '@angular/core';
import { ProofOfWorkEffortsRepository } from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.repository';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { mapToWorkEffortFormValue } from './work-effort-form.mapper';
import { map } from 'rxjs/operators';
import { WorkEffort } from '../../../shared/backend-services/work-efforts/proof-of-work-efforts.types';
import { WorkEffortFormValue } from './work-effort-form.types';

@Injectable({
  providedIn: 'root'
})
export class WorkEffortFormResolverService implements Resolve<Observable<WorkEffortFormValue>> {

  constructor(private proofOfWorkEffortsRepository: ProofOfWorkEffortsRepository) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<WorkEffortFormValue> {
    const proofOfWorkEffortsId = route.params['proof-id'];
    const workEffortId = route.params['id'];
    return this.proofOfWorkEffortsRepository.getWorkEffortById(proofOfWorkEffortsId, workEffortId).pipe(
      map((workEffort: WorkEffort) => mapToWorkEffortFormValue(workEffort))
    );
  }
}
