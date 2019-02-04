import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { ManageJobAdsState } from '../state-management/state';
import { Store } from '@ngrx/store';
import { JobAdvertisementRepository } from '../../../shared/backend-services/job-advertisement/job-advertisement.repository';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { JobAdvertisementDetailLoadedAction } from '../state-management/actions';
import { AuthenticationService } from '../../../core/auth/authentication.service';
import { hasAnyAuthorities, UserRole } from '../../../core/auth/user.model';

@Injectable()
export class ManageJobAdDetailGuard implements CanActivate {

  constructor(private store: Store<ManageJobAdsState>,
              private router: Router,
              private jobAdvertisementRepository: JobAdvertisementRepository,
              private authenticationService: AuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = next.params['id'];
    const token = next.queryParamMap.get('token');
    if (token) {
      return this.jobAdvertisementRepository.findByToken(token).pipe(
        tap((jobAd) => {
          this.store.dispatch(new JobAdvertisementDetailLoadedAction({ jobAdvertisement: jobAd }));
        }),
        map(() => {
          return true;
        }),
        catchError(() => {
          this.router.navigate(['home']);
          return of(false);
        })
      );
    }
    return this.authenticationService.getCurrentUser().pipe(
      switchMap(value => {
        const result = hasAnyAuthorities(value, [UserRole.ROLE_PAV, UserRole.ROLE_COMPANY]);
        if (!result) {
          return of(false);
        }
        return this.jobAdvertisementRepository.findById(id).pipe(
          tap((jobAd) => {
            this.store.dispatch(new JobAdvertisementDetailLoadedAction({ jobAdvertisement: jobAd }));
          }),
          map(() => {
            return true;
          }),
          catchError(() => {
            this.router.navigate(['home']);
            return of(false);
          })
        );
      })
    );


  }
}
