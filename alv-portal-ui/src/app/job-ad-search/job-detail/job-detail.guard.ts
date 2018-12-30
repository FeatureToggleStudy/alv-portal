import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  JobAdSearchState,
  JobAdvertisementDetailLoadedAction
} from '../state-management';
import { Store } from '@ngrx/store';
import { catchError, map, tap } from 'rxjs/internal/operators';
import { JobAdvertisementRepository } from '../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { Injectable } from '@angular/core';

@Injectable()
export class JobDetailGuard implements CanActivate {

  constructor(private store: Store<JobAdSearchState>, private jobAdvertisementService: JobAdvertisementRepository) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.params['id'];
    return this.jobAdvertisementService.findById(id).pipe(
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
