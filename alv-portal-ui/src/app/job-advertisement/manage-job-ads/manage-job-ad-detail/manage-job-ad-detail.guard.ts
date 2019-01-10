import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { ManageJobAdsState } from '../state-management/state';
import { Store } from '@ngrx/store';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { JobAdvertisementDetailLoadedAction } from '../state-management/actions';

@Injectable()
export class ManageJobAdDetailGuard implements CanActivate {

  constructor(private store: Store<ManageJobAdsState>, private jobAdvertisementRepository: JobAdvertisementRepository) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = next.params['id'];
    return this.jobAdvertisementRepository.findById(id).pipe(
      tap((jobAd) => {
        this.store.dispatch(new JobAdvertisementDetailLoadedAction({ jobAdvertisement: jobAd }));
      }),
      map(() => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
