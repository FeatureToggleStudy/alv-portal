import {
  ActivatedRouteSnapshot,
  CanActivate, CanDeactivate,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  JobAdFavouritesState,
  JobAdvertisementDetailLoadedAction, JobAdvertisementDetailUnloadAction
} from '../state-management';
import { Store } from '@ngrx/store';
import { catchError, map, tap } from 'rxjs/operators';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { Injectable } from '@angular/core';

@Injectable()
export class JobAdFavouriteDetailGuard implements CanActivate, CanDeactivate<any> {

  constructor(private store: Store<JobAdFavouritesState>,
              private jobAdvertisementService: JobAdvertisementRepository) {
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

  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean {
    this.store.dispatch(new JobAdvertisementDetailUnloadAction({}));
    return true;
  }

}

